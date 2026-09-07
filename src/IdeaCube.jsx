import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { IconCube } from '@tabler/icons-react';

export default function IdeaCube({ animate }) {
  const host = useRef(null);
  const motion = useRef(animate);
  const [failed, setFailed] = useState(false);
  useEffect(() => { motion.current = animate; }, [animate]);
  useEffect(() => {
    const container = host.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); } catch { setFailed(true); return; }
    renderer.setSize(160, 160);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    camera.position.set(2.6, 1.8, 3.8); camera.lookAt(0, 0, 0);
    const cube = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1.25, 1.25, 1.25);
    const material = new THREE.MeshPhysicalMaterial({ color: 0x9fb486, transparent: true, opacity: .22, metalness: .18, roughness: .12, side: THREE.DoubleSide, depthWrite: false });
    const solid = new THREE.Mesh(geometry, material); cube.add(solid);
    const edgeGeo = new THREE.EdgesGeometry(geometry);
    const edges = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: 0xd1dbc4, transparent: true, opacity: .95 })); cube.add(edges);
    const innerGeo = new THREE.IcosahedronGeometry(.28, 0);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x8eaa76, metalness: .4, roughness: .4, flatShading: true });
    const inner = new THREE.Mesh(innerGeo, innerMat); cube.add(inner);
    const innerEdges = new THREE.LineSegments(new THREE.EdgesGeometry(innerGeo), new THREE.LineBasicMaterial({ color: 0xf5f8e9 })); cube.add(innerEdges);
    scene.add(cube); scene.add(new THREE.HemisphereLight(0xffffff, 0x708657, 3));
    const light = new THREE.DirectionalLight(0xfff5dc, 4); light.position.set(-3, 5, 3); scene.add(light);
    let frame, visible = true, last = 0, time = 0;
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }); observer.observe(container);
    function tick(now) { frame = requestAnimationFrame(tick); const delta = Math.min((now - last) / 1000, .04); last = now; if (!visible || document.hidden) return; if (motion.current) time += delta; cube.rotation.y = time * .22; cube.rotation.z = Math.sin(time * .55) * .07; cube.position.y = Math.sin(time * 1.05) * .1; inner.rotation.y = time * -.45; innerEdges.rotation.copy(inner.rotation); renderer.render(scene, camera); }
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); scene.traverse(o => { o.geometry?.dispose(); if (o.material) o.material.dispose(); }); renderer.dispose(); container.replaceChildren(); };
  }, []);
  return failed ? <IconCube size={68} stroke={1}/> : <span className="cube-canvas" ref={host} aria-hidden="true"/>;
}
