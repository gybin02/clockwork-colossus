import * as THREE from 'three';

const R = THREE.Vector3;
const ae = THREE.Vector2;
const qt = THREE.Quaternion;
const st = THREE.Matrix3;
const Ke = THREE.Matrix4;
const Tt = THREE.Vector4;
const xt = THREE.BufferGeometry;
const _t = THREE.BufferAttribute;
const it = THREE.Float32BufferAttribute;
const Ae = THREE.Mesh;
const ht = THREE.Group;
const Ne = THREE.Object3D;
const yt = THREE.MeshBasicMaterial;
const Fr = THREE.LineBasicMaterial;
const Os = THREE.CanvasTexture;
const Pi = THREE.CircleGeometry;
const Wt = THREE.BoxGeometry;
const Hs = THREE.ExtrudeGeometry;
const kr = THREE.IcosahedronGeometry;
const mn = THREE.PlaneGeometry;
const Lt = THREE.SphereGeometry;
const ut = THREE.TorusGeometry;
const ta = THREE.TubeGeometry;
const Zn = THREE.Box3;
const _e = THREE.Color;
const Us = THREE.Scene;
const nn = THREE.PerspectiveCamera;
const bc = THREE.WebGLRenderer;
const ln = THREE.WebGLRenderTarget;
const Ks = THREE.UniformsUtils;
const _c = THREE.DefaultLoadingManager;
const Vs = THREE.TextureLoader;
const Sn = THREE.MeshPhysicalMaterial;
const $n = THREE.MeshStandardMaterial;

const qs = THREE.LinearFilter;
const Jt = THREE.NearestFilter;
const ri = THREE.LinearMipmapLinearFilter;
const fn = THREE.NearestFilter;
const Nn = THREE.ClampToEdgeWrapping;
const gi = THREE.RepeatWrapping;
const wr = THREE.MirroredRepeatWrapping;
const Rl = THREE.PCFSoftShadowMap;
const _i = THREE.NoToneMapping;
const $t = THREE.AdditiveBlending;
const zt = 'srgb';
const Bn = '';
const on = 'srgb-linear';
const mt = { workingColorSpace: 'srgb-linear' };

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
const Tc = RGBELoader;

import { Yp } from './entities/boss-attacks.js';
import { Si, Dc } from './core/simulation.js';
import { Lc } from './core/camera.js';
import { qp } from './core/input.js';
import { Ot, Pn, tr } from './graphics/shaders.js';
import { jp } from './graphics/environment.js';
import { Qp } from './graphics/boss-view.js';
import { em } from './graphics/knight-view.js';
import { nm } from './graphics/postprocessing.js';
import { im, sm } from './graphics/particles.js';
import { um, dm } from './graphics/models.js';

var ld = Yp(),
  gm = 1.32,
  ud = innerWidth,
  dd = innerHeight,
  Vi = new bc({
    antialias: !1,
    powerPreference: "high-performance",
    stencil: !1,
  });
Vi.setPixelRatio(1);
Vi.setSize(ud, dd);
Vi.shadowMap.enabled = !0;
Vi.shadowMap.type = Rl;
Vi.toneMapping = _i;
document.body.prepend(Vi.domElement);
var rr = new Us(),
  en = new nn(47, ud / dd, 0.1, 2500),
  od = document.getElementById("loader"),
  fm = document.getElementById("ldFill"),
  pm = document.getElementById("ldText"),
  ad = 0.06,
  wa = (s, e) => {
    fm &&
      ((ad = Math.max(ad, s)),
      (fm.style.width = (ad * 100).toFixed(1) + "%"),
      e && pm && (pm.textContent = e));
  },
  vm = [],
  xm = new MessageChannel();
xm.port1.onmessage = () => vm.shift()?.();
var fd = () =>
  new Promise((s) => {
    document.hidden
      ? (vm.push(s), xm.port2.postMessage(0))
      : requestAnimationFrame(() => s());
  });
_c.onProgress = (s, e, t) => wa(0.06 + 0.7 * (e / t));
async function n1() {
  let s = "./assets/tex/",
    [e, t, n, i, r, o, a, c, l, h, d, u, f, v, g, m] = await Promise.all([
      Pn(s + "sky_kloppenheim06_8k.webp", { srgb: !0, repeat: 1 }),
      new Tc().loadAsync(s + "env_kloppenheim06_512.hdr"),
      Pn(s + "grassy_cobblestone_diff_2k.webp", { srgb: !0 }),
      Pn(s + "grassy_cobblestone_nor_gl_2k.webp"),
      Pn(s + "grassy_cobblestone_arm_1k.webp"),
      Pn(s + "cliff_side_diff_2k.webp", { srgb: !0 }),
      Pn(s + "cliff_side_nor_gl_2k.webp"),
      Pn(s + "cliff_side_arm_1k.webp"),
      Pn(s + "metal_plate_02_nor_gl_2k.webp"),
      Pn(s + "metal_plate_02_arm_1k.webp"),
      Pn(s + "leafy_grass_diff_1k.webp", { srgb: !0 }),
      Pn(s + "leafy_grass_nor_gl_1k.webp"),
      Pn(s + "rock_face_diff_1k.webp", { srgb: !0 }),
      Pn(s + "rock_face_nor_gl_1k.webp"),
      Pn(s + "rock_face_arm_1k.webp"),
      um(),
    ]);
  return (
    (e.wrapS = e.wrapT = Nn),
    (e.generateMipmaps = !0),
    await Promise.all(
      [
        "900 20px CinzelDeco",
        "700 20px CinzelDeco",
        "700 20px Cinzel",
        "700 20px Oswald",
      ].map((p) => document.fonts.load(p).catch(() => null)),
    ),
    {
      props: m,
      sky: e,
      hdr: t,
      floorDiff: n,
      floorNor: i,
      floorArm: r,
      cliffDiff: o,
      cliffNor: a,
      cliffArm: c,
      plateNor: l,
      plateArm: h,
      grassDiff: d,
      grassNor: u,
      rockDiff: f,
      rockNor: v,
      rockArm: g,
    }
  );
}
var sr = await n1();
wa(0.78, "Assembling the colossus");
await fd();
var i1 = jp(rr, Vi, sr),
  mm = sr.props ? dm(rr, sr.props, { R: Si }) : null,
  xn = new Dc({ seed: ld.seed, autoplay: ld.autoplay });
qp(xn);
for (let s of document.querySelectorAll('a[href*="discord.gg"]'))
  for (let e of ["pointerdown", "mousedown"])
    s.addEventListener(e, (t) => t.stopPropagation());
var cd = -1,
  _m = () => {
    xn.knight.dead && performance.now() - cd > 1500 && location.reload();
  };
addEventListener("keydown", (s) => {
  (s.code === "KeyR" || s.code === "Enter") && _m();
});
addEventListener("pointerdown", _m);
rr.add(xn.kRig.root, xn.bRig.root);
xn.kRig.root.scale.setScalar(gm);
var ym = Qp(xn.bRig, sr),
  pd = em(xn.kRig, sr, gm);
rr.add(pd.cape);
var lo = nm(Vi, rr, en, ud, dd),
  s1 = im(rr, lo, xn, en, sr, { golem: ym, knight: pd }),
  r1 = sm(xn, en),
  hd = new Lc(en, xn, { shake: 1 }),
  Vc = ld.debug;
function Mm() {
  if (Vc === "knight") {
    let s = xn.knight.pos;
    return (
      en.position.set(s.x + 2.2, 1.4, s.z + 2.4),
      en.lookAt(s.x, 0.9, s.z),
      (en.fov = 40),
      en.updateProjectionMatrix(),
      !0
    );
  }
  return Vc === "golem"
    ? (en.position.set(9, 7, 17),
      en.lookAt(0, 5.5, 0),
      (en.fov = 45),
      en.updateProjectionMatrix(),
      !0)
    : Vc === "wide"
      ? (en.position.set(0, 14, 42),
        en.lookAt(0, 4, 0),
        (en.fov = 50),
        en.updateProjectionMatrix(),
        !0)
      : !1;
}
var ao = new R(),
  Gc = null,
  o1 = 0,
  Sm = !1;
function bm(s) {
  requestAnimationFrame(bm);
  let e = s / 1e3,
    t = Gc == null ? 1 / 60 : e - Gc;
  if (((Gc = e), (t = Math.min(Math.max(t, 0), 1 / 30)), !Sm)) return;
  let n = xn.update(t),
    i = xn.drainEvents();
  cd < 0 && xn.knight.dead && (cd = performance.now());
  for (let r of i) hd.event(r);
  (hd.update(t),
    Mm(),
    (Ot.uTime.value += t),
    (Ot.uHeat.value = xn.boss.overheat),
    ao.copy(tr).transformDirection(en.matrixWorldInverse),
    Ot.uRimDir.value.copy(ao),
    ao.copy(tr).multiplyScalar(800).add(en.position).project(en),
    lo.rays.uniforms.uSun.value.set(ao.x * 0.5 + 0.5, ao.y * 0.5 + 0.5),
    (lo.rays.uniforms.uVis.value = ao.z < 1 ? 1 : 0),
    i1.update(Ot.uTime.value, t, en),
    mm && mm.update(Ot.uTime.value),
    ym.update(xn, t, Ot.uTime.value),
    pd.update(xn, t, n),
    s1.update(t, n, i),
    r1.update(t, i),
    Vc === "nodist" && (lo.U.uDistAmt.value = 0),
    lo.render(),
    o1++);
}
hd.update(1 / 60);
Mm();
wa(0.84, "Polishing the brass");
for (let s of Object.values(sr))
  s && s.isTexture && (Vi.initTexture(s), await fd());
wa(0.93, "Winding the mainspring");
await fd();
await Vi.compileAsync(rr, en);
lo.render();
wa(1, "Fight");
Sm = !0;
document.body.classList.add("ready");
od && (od.classList.add("done"), setTimeout(() => od.remove(), 900));
requestAnimationFrame((s) => {
  ((Gc = s / 1e3), requestAnimationFrame(bm));
});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

// Clockwork Colossus Game Entry
