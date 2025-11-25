import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const PrismScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. Setup Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 2. Background: GPU Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount; i++) {
      posArray[i*3] = (Math.random() - 0.5) * 25;
      posArray[i*3+1] = (Math.random() - 0.5) * 25;
      posArray[i*3+2] = (Math.random() - 0.5) * 15 - 5; 
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#17f7f7') }
      },
      vertexShader: `
        uniform float uTime;
        attribute float aScale;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.2 + pos.x) * 0.05;
          pos.x += cos(uTime * 0.1 + pos.y) * 0.05;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (2.0 * aScale + 1.0) * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = smoothstep(20.0, 5.0, -mvPosition.z) * 0.4;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          gl_FragColor = vec4(uColor, vAlpha * (1.0 - r*2.0));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // --- 3. The Object: High Res Faceted/Smooth Hybrid ---
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const posAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    const seed = 42;
    
    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);
      const noise = Math.sin(vertex.x * 2.5 + seed) * Math.cos(vertex.y * 2.5 + seed) * Math.sin(vertex.z * 2.5 + seed);
      const displacement = 1.0 + noise * 0.2; 
      vertex.multiplyScalar(displacement);
      posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
    scene.add(cubeCamera);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    
    const light1 = new THREE.PointLight(0xffffff, 2, 20);
    light1.position.set(5, 5, 10);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x17f7f7, 3, 20); 
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x17f7f7,
      transmission: 0.95,
      opacity: 1.0,
      metalness: 0.0,
      roughness: 0.05,
      ior: 1.5,
      thickness: 2.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      attenuationColor: new THREE.Color(0x00aaaa),
      attenuationDistance: 5.0,
    });

    const prismMesh = new THREE.Mesh(geometry, glassMaterial);
    scene.add(prismMesh);

    // --- 4. Beams Setup ---
    const spectralColors = [
      0xff0000, // Red
      0xff7f00, // Orange
      0xffff00, // Yellow
      0x00ff00, // Green
      0x0000ff, // Blue
      0x4b0082, // Indigo
      0x8f00ff  // Violet
    ];

    const spectralIORs = [
        1.40, // Red
        1.42,
        1.44,
        1.46,
        1.48,
        1.50,
        1.52  // Violet
    ];

    const createBeamMesh = (color: number, width: number, opacity: number) => {
      const geom = new THREE.CylinderGeometry(width, width, 1, 6, 1, true);
      geom.translate(0, 0.5, 0);
      geom.rotateX(-Math.PI / 2);
      
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(geom, mat);
      mesh.visible = false;
      scene.add(mesh);
      return mesh;
    };

    const incomingBeam = createBeamMesh(0xffffff, 0.015, 0.9);
    const internalBeams = spectralColors.map((c, i) => {
      const intensity = i < 2 ? 0.2 : (i < 4 ? 0.5 : 0.8); 
      return createBeamMesh(c, 0.02, intensity);
    });
    const outgoingBeams = spectralColors.map(c => createBeamMesh(c, 0.01, 0.7));

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const internalRaycaster = new THREE.Raycaster();
    internalRaycaster.near = 0.01;

    const onMouseMove = (e: MouseEvent) => {
      setIsInteracting(true);
      const rect = containerRef.current?.getBoundingClientRect();
      if(!rect) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const refract = (I: THREE.Vector3, N: THREE.Vector3, iorRatio: number): THREE.Vector3 | null => {
       const cosI = -N.dot(I);
       const sinT2 = iorRatio * iorRatio * (1.0 - cosI * cosI);
       if (sinT2 > 1.0) return null;
       const cosT = Math.sqrt(1.0 - sinT2);
       return I.clone().multiplyScalar(iorRatio).add(N.clone().multiplyScalar(iorRatio * cosI - cosT));
    };

    const updateBeamGeometry = (mesh: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3) => {
       mesh.visible = true;
       mesh.position.copy(start);
       mesh.lookAt(end);
       const dist = start.distanceTo(end);
       mesh.scale.z = dist;
    };

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const time = clock.getElapsedTime();
      
      if (!isInteracting) {
        prismMesh.rotation.y = Math.sin(time * 0.2) * 0.3;
        prismMesh.rotation.z = Math.cos(time * 0.15) * 0.1;
      }

      particlesMaterial.uniforms.uTime.value = time;

      prismMesh.visible = false;
      cubeCamera.update(renderer, scene);
      prismMesh.visible = true;

      raycaster.setFromCamera(mouse, camera);
      
      // Use visual origin near camera (but behind near plane)
      const beamOrigin = new THREE.Vector3(mouse.x, mouse.y, -0.5).unproject(camera);
      
      const intersects = raycaster.intersectObject(prismMesh);

      if (intersects.length > 0) {
         const hit = intersects[0];
         const entryPoint = hit.point;
         const entryNormal = hit.normal!.clone();
         
         const incomingDir = raycaster.ray.direction.clone().normalize();

         updateBeamGeometry(incomingBeam, beamOrigin, entryPoint);

         spectralColors.forEach((_, i) => {
            const ior = spectralIORs[i];
            const iorRatio = 1.0 / ior;

            const refractedDir = refract(incomingDir, entryNormal, iorRatio);

            if (refractedDir) {
               internalRaycaster.set(entryPoint, refractedDir);
               
               // Check both sides for exit
               glassMaterial.side = THREE.DoubleSide; 
               const internalHits = internalRaycaster.intersectObject(prismMesh);
               glassMaterial.side = THREE.FrontSide;

               let exitHit = null;
               for (let h of internalHits) {
                   if (h.distance > 0.05) {
                       exitHit = h;
                       break;
                   }
               }

               if (exitHit) {
                   const exitPoint = exitHit.point;
                   const exitNormalForCalc = exitHit.normal!.clone().negate(); 
                   
                   updateBeamGeometry(internalBeams[i], entryPoint, exitPoint);

                   const finalDir = refract(refractedDir, exitNormalForCalc, ior / 1.0);
                   
                   if (finalDir) {
                       const beamEnd = exitPoint.clone().add(finalDir.multiplyScalar(10));
                       updateBeamGeometry(outgoingBeams[i], exitPoint, beamEnd);
                   } else {
                       outgoingBeams[i].visible = false;
                   }

               } else {
                   internalBeams[i].visible = false;
                   outgoingBeams[i].visible = false;
               }

            } else {
               internalBeams[i].visible = false;
               outgoingBeams[i].visible = false;
            }
         });

      } else {
         incomingBeam.visible = false;
         internalBeams.forEach(b => b.visible = false);
         outgoingBeams.forEach(b => b.visible = false);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometry.dispose();
      glassMaterial.dispose();
      cubeRenderTarget.dispose();
      renderer.dispose();
      incomingBeam.geometry.dispose();
      (incomingBeam.material as THREE.Material).dispose();
      internalBeams.forEach(b => { b.geometry.dispose(); (b.material as THREE.Material).dispose(); });
      outgoingBeams.forEach(b => { b.geometry.dispose(); (b.material as THREE.Material).dispose(); });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden cursor-crosshair">
      <div className="absolute top-8 left-8 z-10 pointer-events-none select-none">
        <h1 className="text-white font-serif text-4xl tracking-tight mb-2 drop-shadow-lg">Spectral Lens</h1>
        <div className="flex items-center gap-3">
           <div className="w-8 h-[1px] bg-[#17f7f7]"></div>
           <p className="text-[#17f7f7] font-mono text-xs uppercase tracking-widest opacity-90">
             Refractive Index 1.52
           </p>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
         <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
           System Active • Projection Ready
         </p>
      </div>

      {!isInteracting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[300px] h-[300px] border border-[#17f7f7]/10 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-20"></div>
        </div>
      )}
    </div>
  );
};
