import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

type STLViewerProps = {
  stlUrl: string;
};

const STLViewer: React.FC<STLViewerProps> = ({ stlUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth * 0.9, mount.clientHeight * 0.9, false);
    mount.appendChild(renderer.domElement);

    // Lights
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1).normalize();
    scene.add(light1);

    const light2 = new THREE.AmbientLight(0x888888);
    scene.add(light2);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.8;

    // Load STL Model
    const loader = new STLLoader();
    let mesh: THREE.Mesh;

    loader.load(stlUrl, (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees up
      mesh.position.y = -15; // Position STL at the bottom of the container
      mesh.scale.set(0.4, 0.4, 0.4); // Scale down the model to prevent overflow
      scene.add(mesh);
    });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh) {
        mesh.rotation.z += 0.01; // Automatic rotation from left to right
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      scene.clear();
    };
  }, [stlUrl]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;
};

export default STLViewer;
