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

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const Hc = GLTFLoader;
import { Ot, Zp, bt, er, Ei, Ht } from './shaders.js';

async function um() {
  let s = new Hc(),
    [e, t, n] = await Promise.all(
      ["gear_set", "clock_core", "armour_plate"].map((r) =>
        s.loadAsync(`./assets/models/${r}.glb`),
      ),
    ),
    i = {};
  return (
    e.scene.traverse((r) => {
      if (r.isMesh) {
        let o = r.geometry.clone();
        (o.rotateX(Math.PI / 2), (i[r.name] = o));
      }
    }),
    {
      gears: i,
      gearNodes: Qy(e.scene),
      clock: e1(hm(t.scene)),
      plate: t1(hm(n.scene)),
    }
  );
}
function Qy(s) {
  let e = {};
  return (
    s.traverse((t) => {
      t.isMesh && (e[t.name] = t.position.clone());
    }),
    e
  );
}
function hm(s) {
  s.updateMatrixWorld(!0);
  let e = {};
  s.traverse((t) => {
    t.isMesh &&
      (e[t.material.name] ||= []).push(
        t.geometry.clone().applyMatrix4(t.matrixWorld),
      );
  });
  for (let t in e) e[t] = e[t].length > 1 ? Ei(e[t]) : e[t][0];
  return e;
}
function e1(s) {
  let e = s.iron.index ? s.iron.toNonIndexed() : s.iron,
    t = e.attributes.position,
    n = e.attributes.normal,
    i = { ticks: [], hour: [], minute: [] };
  for (let o = 0; o < t.count; o += 3) {
    let a = 0,
      c = 0,
      l = 0,
      h = 0;
    for (let u = 0; u < 3; u++) {
      let f = t.getX(o + u),
        v = t.getY(o + u),
        g = Math.hypot(f, v);
      ((h += g / 3), g > a && ((a = g), (c = f), (l = v)));
    }
    if (h > 0.815) {
      i.ticks.push(o);
      continue;
    }
    let d = Math.atan2(c, l);
    i[Math.abs(d - 0.6) < Math.abs(d - 2.3) ? "hour" : "minute"].push(o);
  }
  let r = (o) => {
    let a = new Float32Array(o.length * 9),
      c = new Float32Array(o.length * 9);
    o.forEach((h, d) => {
      for (let u = 0; u < 3; u++)
        (a.set([t.getX(h + u), t.getY(h + u), t.getZ(h + u)], (d * 3 + u) * 3),
          c.set(
            [n.getX(h + u), n.getY(h + u), n.getZ(h + u)],
            (d * 3 + u) * 3,
          ));
    });
    let l = new xt();
    return (
      l.setAttribute("position", new _t(a, 3)),
      l.setAttribute("normal", new _t(c, 3)),
      l
    );
  };
  return { ...s, ticks: r(i.ticks), hour: r(i.hour), minute: r(i.minute) };
}
function t1(s) {
  let e = (a) => 0.12 - 0.12 * (a / 0.8) * (a / 0.8),
    t = s.copper.index ? s.copper.toNonIndexed() : s.copper.clone(),
    n = t.attributes.position;
  for (let a = 0; a < n.count; a++) n.setZ(a, n.getZ(a) + e(n.getX(a)));
  t.computeVertexNormals();
  let i = s.brass.clone(),
    r = i.attributes.position,
    o = [];
  for (let a = 0; a < 7; a++) o.push(-0.7 + a * 0.233);
  for (let a = 0; a < r.count; a++) {
    let c = r.getX(a),
      l = o.reduce((u, f) => (Math.abs(f - c) < Math.abs(u - c) ? f : u)),
      h = 0.07 + 0.12 * (l / 0.8) * (l / 0.8),
      d = -0.052 + e(l) + 0.012;
    r.setZ(a, r.getZ(a) - h + d);
  }
  return { copper: t, brass: i };
}
function dm(s, e, { R: t }) {
  let n = new ht();
  s.add(n);
  let i = bt(
      { color: 13803596, metalness: 1, roughness: 0.35 },
      { rim: 0.9, key: "brassdeco" },
    ),
    r = bt(
      { color: 13202506, metalness: 1, roughness: 0.38 },
      { rim: 0.9, key: "copperdeco" },
    ),
    o = bt(
      { color: 2960430, metalness: 0.9, roughness: 0.45 },
      { rim: 0.6, key: "irondeco" },
    ),
    a = bt(
      { color: 15260866, metalness: 0, roughness: 0.55 },
      { rim: 0.5, key: "ivorydeco" },
    ),
    c = new yt({ color: new _e(4253439).multiplyScalar(3.2), toneMapped: !1 }),
    l = er(
      {
        color: 14677247,
        metalness: 0,
        roughness: 0.04,
        transparent: !0,
        opacity: 0.16,
        envMapIntensity: 1.6,
        depthWrite: !1,
      },
      { rim: 0.4, key: "glassdeco" },
    ),
    h = (p) => (
      p.traverse((S) => {
        S.isMesh && ((S.castShadow = !0), (S.receiveShadow = !0));
      }),
      p
    ),
    d = [],
    u = e.gears,
    f = e.gearNodes,
    v = u.gear_big,
    g = u.gear_mid,
    m = u.gear_small;
  for (let [p, S, E] of [
    [-2.15, 4.2, 0.12],
    [2.25, 3.4, -0.16],
    [-0.35 + Math.PI, 2.6, 0.2],
  ]) {
    let y = S / 1.16,
      w = new ht(),
      A = t + 1.6;
    (w.position.set(Math.sin(p) * A, S * 0.35, Math.cos(p) * A),
      (w.rotation.y = p));
    let I = E < 0 ? -1 : 1,
      C = [
        [v, i, 0, 0, E],
        [g, r, f.gear_mid.x * I, -f.gear_mid.z, (-E * 24) / 16],
        [m, i, f.gear_small.x * I, -f.gear_small.z, E * 2],
      ];
    for (let [b, T, D, z, G] of C) {
      let W = new Ae(b, T);
      (W.position.set(D * y, z * y, 0.06 * y * (b === v ? 0 : 1)),
        W.scale.setScalar(y),
        w.add(W),
        d.push({ m: W, w: G }));
    }
    n.add(h(w));
  }
  {
    let p = e.clock,
      S = new ht();
    (S.position.set(0, 8.55, -(t + 1.2) + 0.1),
      S.scale.setScalar(3.15),
      S.add(
        new Ae(p.dial_face, a),
        new Ae(p.brass, i),
        new Ae(p.ticks, o),
        new Ae(p.core_glow, c),
      ));
    let E = new Ae(p.hour, o),
      y = new Ae(p.minute, o);
    (S.add(E, y), h(S));
    let w = new Ae(p.dial_glass, l);
    ((w.renderOrder = 2),
      S.add(w),
      n.add(S),
      d.push({ m: y, w: -0.55, a0: 0 }, { m: E, w: -0.55 / 12, a0: 0 }));
  }
  {
    let p = e.plate;
    for (let [S, E, y, w, A, I] of [
      [-2.48, 0.8, 1.7, 1.3, 0.4, 0.15],
      [-1.68, 1.1, 1.5, 1.42, -0.5, -0.2],
      [1.72, 0.9, 1.8, 1.32, 0.9, 0.1],
      [2.52, 1.3, 1.5, 1.18, -0.3, 0.3],
      [-2.95, 1, 1.6, 1.45, 1.2, -0.1],
      [2.98, 0.75, 1.4, 1.1, 0.2, 0.35],
    ]) {
      let C = new ht(),
        b = t + E;
      (C.position.set(
        Math.sin(S) * b,
        y * (0.3 * Math.abs(Math.cos(w)) + 0),
        Math.cos(S) * b,
      ),
        C.rotation.set(w, S + A, I, "YXZ"),
        C.scale.setScalar(y),
        C.add(new Ae(p.copper, r), new Ae(p.brass, i)),
        n.add(h(C)));
    }
  }
  return {
    group: n,
    update(p) {
      for (let S of d) S.m.rotation.z = p * S.w + (S.a0 || 0);
    },
  };
}

export {
  um, um as loadModels,
  Qy, hm, e1, t1,
  dm, dm as createDecorativeGears
};
