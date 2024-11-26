import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

interface StlViewerComponentProps {
  url: string;
  width?: string | number;  // Optional width
  height?: string | number; // Optional height
  containerStyle?: React.CSSProperties; // Optional container styles
  className?: string; // Optional className for additional styling
  rotate?: boolean; // Optional parameter to determine if STL should rotate (default false)
  color?: number; // Optional color for the STL model (default grey)
  backgroundColor?: number | null; // Optional background color for the scene (default transparent)
}

const StlViewerComponent: React.FC<StlViewerComponentProps> = ({
  url,
  width = '100%',
  height = '100%',
  containerStyle = {},
  className,
  rotate = false,
  color = 0x808080, // Default to grey
  backgroundColor = null,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.background = backgroundColor !== null ? new THREE.Color(backgroundColor) : null;

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
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


    loader.load(
      url,
      (geometry) => {
        const material = new THREE.MeshStandardMaterial({ color });
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = -20;
        mesh.scale.set(0.7, 0.7, 0.7);
        scene.add(mesh);
      },
      undefined,
      (error) => {
        console.error('Error loading STL file:', error);
      }
    );
    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh && rotate) {
        mesh.rotation.z += 0.01; // Automatic rotation from left to right if rotate is true
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
camera.updateProjectionMatrix();
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
  }, [url, rotate]);

  return (
    <div
      ref={mountRef}
      style={{ width, height, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', ...containerStyle }}
      className={className}
    />
  );
};

export default StlViewerComponent;
