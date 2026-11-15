"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  NeutralToneMapping,
  Path,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Shape,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { LOGO_BODY, LOGO_BOX, LOGO_TRI_LARGE, LOGO_TRI_SMALL, type Point } from "@/lib/geometry";

type Props = {
  onReady: () => void;
  onFail: () => void;
  /** Element in the headline whose box the mark is fitted into. */
  anchorRef: RefObject<HTMLElement | null>;
};

// The mark keeps the same on-screen height as before; its width follows the logo's proportions.
const MARK_HEIGHT = 2.8; // world units
const LOGO_SCALE = MARK_HEIGHT / LOGO_BOX.height; // logo units → world units
const MARK_WIDTH = LOGO_BOX.width * LOGO_SCALE;
// Half-sizes of the architectural frames around the mark.
const FRAME_A = 2.35;
const FRAME_B = 3.25;

const BASE = { rx: 0.2, ry: -0.52 };
const FOV = 30;
const DISTANCE = 11;

// Logo units (y down) → world units centred on the origin.
function shapeFromLogo(points: Point[]) {
  const shape = new Shape();
  points.forEach(([x, y], i) => {
    const px = (x - LOGO_BOX.width / 2) * LOGO_SCALE;
    const py = -(y - LOGO_BOX.height / 2) * LOGO_SCALE;
    if (i === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

// Square frame with chamfered corners — the same language as the mark.
function chamferedFrame(half: number, thickness: number, cut: number) {
  const square = (h: number, c: number, target: Shape | Path) => {
    target.moveTo(-h + c, h);
    target.lineTo(h, h);
    target.lineTo(h, -h + c);
    target.lineTo(h - c, -h);
    target.lineTo(-h, -h);
    target.lineTo(-h, h - c);
    target.closePath();
  };
  const outer = new Shape();
  square(half, cut, outer);
  const hole = new Path();
  square(half - thickness, Math.max(cut - thickness * 0.4, 0.01), hole);
  outer.holes.push(hole);
  return outer;
}

export default function HeroScene({ onReady, onFail, anchorRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      onFail();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const pmrem = new PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envMap = pmrem.fromScene(room, 0.04).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 1.15;

    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0, DISTANCE);

    // Materials
    const silver = new MeshPhysicalMaterial({
      color: 0xc7cdd4,
      metalness: 1,
      roughness: 0.27,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
    });
    // Metallic silver for the logo triangles: a grey steel base with strong metalness,
    // so faces show real light-to-dark reflections instead of reading as flat white.
    const brushedSilver = new MeshPhysicalMaterial({
      color: 0xb4bac1,
      metalness: 0.85,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });
    const signal = new MeshPhysicalMaterial({
      color: 0xa84604,
      metalness: 0.45,
      roughness: 0.26,
      clearcoat: 0.2,
      clearcoatRoughness: 0.06,
    });
    const obsidian = new MeshPhysicalMaterial({
      color: 0x101010,
      metalness: 0.85,
      roughness: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const cyanLine = new LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.6 });
    const silverLine = new LineBasicMaterial({ color: 0xc7cdd4, transparent: true, opacity: 0.16 });

    const geometries: BufferGeometry[] = [];
    const track = <T extends BufferGeometry>(g: T) => {
      geometries.push(g);
      return g;
    };

    // Centerpiece: the official mark — orange body and two silver triangles.
    const mark = new Group();
    const extrude = (points: Point[], depth: number) => {
      const g = track(
        new ExtrudeGeometry(shapeFromLogo(points), {
          depth,
          bevelEnabled: true,
          bevelThickness: 0.035,
          bevelSize: 0.028,
          bevelSegments: 3,
          curveSegments: 1,
        }),
      );
      g.translate(0, 0, -depth / 2);
      return g;
    };
    const body = new Mesh(extrude(LOGO_BODY, 0.46), signal);
    const triLarge = new Mesh(extrude(LOGO_TRI_LARGE, 0.46), brushedSilver);
    const triSmall = new Mesh(extrude(LOGO_TRI_SMALL, 0.46), brushedSilver);
    // Triangles sit slightly proud of the body so the layers separate as the mark turns.
    triLarge.position.z = 0.22;
    triSmall.position.z = 0.22;
    mark.add(body, triLarge, triSmall);

    // Architectural frames behind the mark.
    const frames = new Group();
    const frameA = new Mesh(track(new ExtrudeGeometry(chamferedFrame(FRAME_A, 0.055, 0.32), { depth: 0.08, bevelEnabled: false })), obsidian);
    frameA.position.z = -1.1;
    const frameAEdges = new LineSegments(track(new EdgesGeometry(frameA.geometry, 30)), cyanLine);
    frameAEdges.position.copy(frameA.position);

    const frameB = new Mesh(track(new ExtrudeGeometry(chamferedFrame(FRAME_B, 0.035, 0.5), { depth: 0.05, bevelEnabled: false })), obsidian);
    frameB.position.z = -2.6;
    const frameBEdges = new LineSegments(track(new EdgesGeometry(frameB.geometry, 30)), silverLine);
    frameBEdges.position.copy(frameB.position);

    // Registration markers — small machined blocks on the inner frame.
    const markerGeo = track(new BoxGeometry(0.14, 0.14, 0.14));
    const markerA = new Mesh(markerGeo, signal);
    markerA.position.set(FRAME_A, -FRAME_A + 0.32, -1.04);
    const markerB = new Mesh(markerGeo, silver);
    markerB.position.set(-FRAME_A, FRAME_A - 0.32, -1.04);
    frames.add(frameA, frameAEdges, frameB, frameBEdges, markerA, markerB);

    const rig = new Group();
    rig.add(frames, mark);
    scene.add(rig);

    // Controlled cinematic lighting: white key, cyan rim, orange counter.
    scene.add(new AmbientLight(0xffffff, 0.12));
    const key = new DirectionalLight(0xffffff, 2.8);
    key.position.set(4, 6, 7);
    const rim = new DirectionalLight(0x00d4ff, 5);
    rim.position.set(-7, 2, -2);
    const counter = new DirectionalLight(0xea6506, 1.6);
    counter.position.set(6, -5, 2);
    scene.add(key, rim, counter);

    // Layout
    const layout = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Fit the mark into the headline anchor so type and object stay locked together.
      const visibleH = 2 * DISTANCE * Math.tan((FOV * Math.PI) / 360);
      const visibleW = visibleH * camera.aspect;
      const anchor = anchorRef.current;
      if (!anchor) return;
      const m = mount.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();
      const cx = (a.left + a.width / 2 - m.left) / w;
      const cy = (a.top + a.height / 2 - m.top) / h;
      rig.position.set((cx - 0.5) * visibleW, (0.5 - cy) * visibleH, 0);
      const fitH = (a.height / h) * visibleH;
      const fitW = (a.width / w) * visibleW;
      const scale = Math.min(fitH / MARK_HEIGHT, fitW / MARK_WIDTH);
      // Portrait screens: leave breathing room between the mark and the stacked headline.
      rig.scale.setScalar(scale * (camera.aspect < 1 ? 0.7 : 1));
    };

    // Pointer response, rendered on demand while easing.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;

    const apply = () => {
      mark.rotation.set(BASE.rx + current.y * 0.22, BASE.ry + current.x * 0.38, 0);
      frames.rotation.set(BASE.rx * 0.6 + current.y * 0.1, BASE.ry * 0.55 + current.x * 0.16, 0);
      frames.position.set(-current.x * 0.12, current.y * 0.08, 0);    };

    const render = () => renderer.render(scene, camera);

    const tick = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      apply();
      render();
      const settled = Math.abs(target.x - current.x) < 0.0005 && Math.abs(target.y - current.y) < 0.0005;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!visible || e.pointerType === "touch") return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      render();
    });
    resizeObserver.observe(mount);
    if (anchorRef.current) resizeObserver.observe(anchorRef.current);
    // Web fonts shift the headline once loaded; re-fit afterwards.
    document.fonts?.ready.then(() => {
      layout();
      render();
    });

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(mount);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    layout();
    apply();
    render();
    onReady();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      geometries.forEach((g) => g.dispose());
      ([silver, brushedSilver, signal, obsidian, cyanLine, silverLine] as Material[]).forEach((m) => m.dispose());
      envMap.dispose();
      pmrem.dispose();
      room.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady, onFail, anchorRef]);

  return <div ref={mountRef} className="h-full w-full" />;
}
