import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

interface STLViewerProps {
  url: string;
  width?: string | number;
  height?: string | number;
  containerStyle?: React.CSSProperties;
  className?: string;
  rotate?: boolean;
  color?: number;
  backgroundColor?: number | null;
  initialZoomOut?: number;
  minZoomOutFactor?: number;
  maxZoomOutFactor?: number;
}

const STLViewer: React.FC<STLViewerProps> = ({
  url,
  width = '100%',
  height = '100%',
  containerStyle = {},
  className,
  rotate = false,
  color = 0x808080,
  backgroundColor = null, // Set to null for transparent background
  initialZoomOut = 1,
  minZoomOutFactor = 0.5,
  maxZoomOutFactor = 2.5,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.background = backgroundColor !== null ? new THREE.Color(backgroundColor) : null;

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Ensure the renderer's canvas fills the parent div
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

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

        // Center the geometry
        geometry.center();

        // Create the mesh
        mesh = new THREE.Mesh(geometry, material);
        // Adjust rotation if needed
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);

        // Compute the bounding box to get the size
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        const size = new THREE.Vector3();
        bbox?.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);

        // Adjust the camera position to fit the model
        const fov = camera.fov * (Math.PI / 180); // Convert vertical fov to radians
        let cameraZ = maxDim / (2 * Math.tan(fov / 2));
        cameraZ *= 1.5 * initialZoomOut; // Add some distance (50% extra), adjusted by initialZoomOut
        camera.position.set(0, 0, cameraZ);

        // Ensure the camera looks at the center of the scene
        camera.lookAt(0, 0, 0);

        // Set controls target to the center of the scene
        controls.target.set(0, 0, 0);

        // Set min and max distance for zooming using the provided zoom factors
        controls.minDistance = cameraZ * minZoomOutFactor;
        controls.maxDistance = cameraZ * maxZoomOutFactor;

        controls.update();

        setIsLoading(false); // STL is loaded, update loading state
      },
      undefined,
      (error) => {
        console.error('Error loading STL file:', error);
        setIsLoading(false); // Update loading state even if there is an error
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
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      scene.clear();
    };
  }, [
    url,
    rotate,
    color,
    backgroundColor,
    initialZoomOut,
    minZoomOutFactor,
    maxZoomOutFactor,
  ]);

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        ...containerStyle,
      }}
      className={className}
    >
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      />
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent', // Set to transparent
            zIndex: 1,
          }}
        >
          {/* Simple loading spinner */}
          <div
            style={{
              border: '8px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              borderTop: '8px solid #3498db',
              width: '60px',
              height: '60px',
              animation: 'spin 2s linear infinite',
            }}
          />
          {/* Keyframes for spinner animation */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
};

export default STLViewer;
