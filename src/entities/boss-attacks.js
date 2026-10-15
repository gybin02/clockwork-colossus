import * as THREE from 'three';
import { zn, Ct, jt, Mi, Hi, un, wt, _s, xa, _a } from '../core/math.js';
import { jr, Pt } from './knight-rig.js';


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

const pn = THREE.Euler;
const si = THREE.InstancedMesh;
const ra = THREE.HemisphereLight;
const vs = THREE.DirectionalLight;
const Fi = THREE.PointLight;
const Fo = THREE.Sprite;
const Dr = THREE.SpriteMaterial;
const Di = THREE.RingGeometry;
const St = THREE.CylinderGeometry;
const ms = THREE.ConeGeometry;
const Bs = THREE.DodecahedronGeometry;
const Qo = THREE.LatheGeometry;
const Ii = THREE.Shape;
const gs = THREE.Path;
const ea = THREE.ShapeGeometry;
const zr = THREE.CatmullRomCurve3;
const Jr = THREE.PMREMGenerator;
const No = THREE.FogExp2;
const Kn = THREE.InstancedBufferAttribute;
const la = THREE.InstancedBufferGeometry;
const ns = THREE.OrthographicCamera;
const Mt = THREE.ShaderMaterial;
const ha = THREE.Clock;

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

const ARENA_RADIUS = 18;
const Si = ARENA_RADIUS;

const ol = 35044, Bi = 35048;
const jh = "300 es", fi = 2e3, Ro = 2001;
const Ys = 303;


var Qr = Math.PI * 2;
function Tn(s) {
  let e = jr();
  for (let t in s) {
    let n = s[t];
    Array.isArray(n) && Array.isArray(n[0])
      ? (e[t] = n.map((i) => [...i]))
      : Array.isArray(n)
        ? (e[t] = [...n])
        : (e[t] = n);
  }
  return e;
}
var vn = Tn({
  bodyY: -0.05,
  spine: [0.14, -0.25, 0],
  chest: [0.05, -0.1, 0],
  head: [-0.05, 0.3, 0],
  sh: [
    [0.55, 0.3, 0.1],
    [0.35, 0.35, 0.2],
  ],
  el: [1.15, 0.9],
  wr: [
    [-0.35, 0.25, 0.4],
    [0, 0, 0],
  ],
  th: [
    [0.4, 0.16, 0],
    [-0.25, 0.12, 0],
  ],
  kn: [0.55, 0.35],
  ft: [-0.2, 0.15],
});
function Dp(s, e) {
  if (e <= s[0][0]) return s[0][1];
  for (let t = 0; t < s.length - 1; t++) {
    let [n, i] = s[t],
      [r, o, a] = s[t + 1];
    if (e <= r) {
      let c = (e - n) / (r - n || 1);
      return Pt(i, o, (a || wt)(Ct(c, 0, 1)));
    }
  }
  return s[s.length - 1][1];
}
var Ly = [
    [
      0,
      Tn({
        bodyY: -0.08,
        spine: [0.15, 0.55, 0],
        chest: [0, 0.35, 0],
        head: [0, -0.5, 0],
        sh: [
          [1.2, 0.55, 1.25],
          [0.4, 0.6, 0],
        ],
        el: [0.6, 0.8],
        wr: [
          [-0.5, 0, 1.5],
          [0, 0, 0],
        ],
        th: [
          [0.55, 0.15, 0],
          [-0.35, 0.2, 0],
        ],
        kn: [0.7, 0.3],
        ft: [-0.3, 0.2],
      }),
    ],
    [
      0.38,
      Tn({
        bodyY: -0.12,
        spine: [0.25, -0.2, 0],
        chest: [0.05, -0.2, 0],
        head: [0, 0.2, 0],
        sh: [
          [1.45, 0.2, -0.15],
          [0.3, 0.7, 0],
        ],
        el: [0.1, 0.6],
        wr: [
          [-0.2, 0, 1.5],
          [0, 0, 0],
        ],
        th: [
          [0.75, 0.15, 0],
          [-0.45, 0.2, 0],
        ],
        kn: [0.8, 0.25],
        ft: [-0.35, 0.25],
      }),
      xa,
    ],
    [
      0.62,
      Tn({
        bodyY: -0.12,
        spine: [0.22, -0.75, 0],
        chest: [0.05, -0.45, 0],
        head: [0, 0.6, 0],
        sh: [
          [1.3, -0.1, -1.35],
          [0.2, 0.8, 0],
        ],
        el: [0.35, 0.5],
        wr: [
          [-0.3, 0, 1.4],
          [0, 0, 0],
        ],
        th: [
          [0.75, 0.15, 0],
          [-0.45, 0.2, 0],
        ],
        kn: [0.8, 0.25],
        ft: [-0.35, 0.25],
      }),
      _s,
    ],
    [1, vn, wt],
  ],
  Uy = [
    [
      0,
      Tn({
        bodyY: -0.1,
        spine: [0.2, -0.7, 0],
        chest: [0.05, -0.4, 0],
        head: [0, 0.6, 0],
        sh: [
          [0.9, -0.15, -1.3],
          [0.3, 0.7, 0],
        ],
        el: [0.5, 0.6],
        wr: [
          [0.3, 0, -1.6],
          [0, 0, 0],
        ],
        th: [
          [0.6, 0.15, 0],
          [-0.4, 0.2, 0],
        ],
        kn: [0.75, 0.3],
        ft: [-0.3, 0.2],
      }),
    ],
    [
      0.36,
      Tn({
        bodyY: -0.05,
        spine: [0.12, 0.1, 0],
        chest: [0, 0.15, 0],
        head: [-0.1, 0, 0],
        sh: [
          [1.75, 0.25, 0.1],
          [0.3, 0.7, 0],
        ],
        el: [0.15, 0.6],
        wr: [
          [-0.3, 0, -1.6],
          [0, 0, 0],
        ],
        th: [
          [0.7, 0.15, 0],
          [-0.4, 0.2, 0],
        ],
        kn: [0.6, 0.3],
        ft: [-0.3, 0.2],
      }),
      xa,
    ],
    [
      0.62,
      Tn({
        bodyY: 0,
        spine: [-0.05, 0.75, 0],
        chest: [-0.1, 0.4, 0],
        head: [-0.15, -0.5, 0],
        sh: [
          [2.3, 0.65, 1],
          [0.3, 0.8, 0],
        ],
        el: [0.3, 0.6],
        wr: [
          [-0.5, 0, -1.5],
          [0, 0, 0],
        ],
        th: [
          [0.6, 0.15, 0],
          [-0.3, 0.2, 0],
        ],
        kn: [0.5, 0.3],
        ft: [-0.3, 0.2],
      }),
      _s,
    ],
    [1, vn, wt],
  ],
  bu = Tn({
    bodyY: -0.15,
    spine: [0.2, 0, -0.15],
    chest: [0, 0, 0],
    head: [0, 0, 0],
    sh: [
      [1.5, 1.25, 0.25],
      [0.7, 1.2, -0.2],
    ],
    el: [0.08, 0.3],
    wr: [
      [-0.1, 0, 1.55],
      [0, 0, 0],
    ],
    th: [
      [0.6, 0.35, 0],
      [-0.2, 0.35, 0],
    ],
    kn: [0.9, 0.5],
    ft: [-0.3, 0.2],
  }),
  Lp = Tn({
    bodyY: -0.2,
    spine: [0.3, 0.9, 0],
    chest: [0.1, 0.4, 0],
    head: [0, -0.8, 0],
    sh: [
      [1.1, 0.9, 1.4],
      [0.5, 0.9, 0],
    ],
    el: [0.5, 0.6],
    wr: [
      [-0.2, 0, 1.5],
      [0, 0, 0],
    ],
    th: [
      [0.7, 0.25, 0],
      [-0.3, 0.25, 0],
    ],
    kn: [1, 0.5],
    ft: [-0.3, 0.2],
  });
function Op(s, e) {
  if (s === 0) return Dp(Ly, e);
  if (s === 1) return Dp(Uy, e);
  let t;
  (e < 0.22
    ? (t = Pt(vn, Lp, wt(e / 0.22)))
    : e < 0.4
      ? (t = Pt(Lp, bu, wt((e - 0.22) / 0.18)))
      : e < 0.78
        ? (t = bu)
        : (t = Pt(bu, vn, wt((e - 0.78) / 0.22))),
    (t = Pt(t, t, 0)));
  let n =
    e < 0.22
      ? -0.5 * wt(e / 0.22)
      : e < 0.8
        ? -0.5 - (Qr + 0.5) * _s((e - 0.22) / 0.58)
        : -Qr;
  return (
    (t.bodyYaw = n < -Qr + 0.01 ? 0 : n),
    (t.bodyY += Math.sin(Ct((e - 0.25) / 0.5, 0, 1) * Math.PI) * 0.35),
    (t.swordGlow = 1),
    t
  );
}
function Bp(s, e, t) {
  let n = t || jr(),
    i = Math.sin,
    r = Math.cos;
  ((n.bodyY = -0.04 * e + Math.abs(i(s)) * 0.07 * e),
    (n.bodyPitch = 0),
    (n.bodyRoll = i(s) * 0.04 * e),
    (n.bodyYaw = 0),
    (n.spine[0] = 0.32 * e),
    (n.spine[1] = i(s) * 0.18 * e),
    (n.spine[2] = 0),
    (n.chest[0] = 0.05 * e),
    (n.chest[1] = 0),
    (n.chest[2] = 0),
    (n.head[0] = -0.25 * e),
    (n.head[1] = -i(s) * 0.15 * e),
    (n.head[2] = 0));
  for (let o = 0; o < 2; o++) {
    let a = s + (o === 0 ? 0 : Math.PI);
    ((n.th[o][0] = i(a) * 0.95 * e + 0.15 * e),
      (n.th[o][1] = 0.05),
      (n.th[o][2] = 0),
      (n.kn[o] = (0.25 + 1.25 * Math.max(0, -r(a - 0.3))) * e),
      (n.ft[o] = (-0.2 + 0.5 * Math.max(0, i(a))) * e));
  }
  return (
    (n.sh[0][0] = -0.55 * e + i(s + Math.PI) * 0.15 * e),
    (n.sh[0][1] = 0.35 * e),
    (n.sh[0][2] = 0.1),
    (n.el[0] = 0.35 * e),
    (n.wr[0][0] = 1 * e),
    (n.wr[0][1] = 0),
    (n.wr[0][2] = 0.3 * e),
    (n.sh[1][0] = i(s) * 0.9 * e + 0.1),
    (n.sh[1][1] = 0.25 * e),
    (n.sh[1][2] = 0),
    (n.el[1] = (0.9 + 0.3 * i(s)) * e),
    (n.wr[1][0] = 0),
    (n.wr[1][1] = 0),
    (n.wr[1][2] = 0),
    (n.swordGlow = 0),
    n
  );
}
function zp(s, e) {
  let t = Pt(vn, vn, 0, e),
    n = Math.sin(s * 2.6);
  return (
    (t.bodyY += n * 0.012),
    (t.spine[0] += n * 0.025),
    (t.sh[1][0] += n * 0.04),
    (t.sh[0][0] += n * 0.03),
    t
  );
}
var ss = Tn({
  bodyY: -0.2,
  spine: [0.9, 0, 0],
  chest: [0.4, 0, 0],
  head: [0.4, 0, 0],
  sh: [
    [1.2, 0.2, 0],
    [1.2, 0.3, 0],
  ],
  el: [1.6, 1.8],
  wr: [
    [1.2, 0, 0.3],
    [0, 0, 0],
  ],
  th: [
    [1.7, 0.15, 0],
    [1.6, 0.15, 0],
  ],
  kn: [2.2, 2.2],
  ft: [0.3, 0.3],
});
function Hp(s) {
  let e;
  s < 0.18
    ? (e = Pt(vn, ss, wt(s / 0.18)))
    : s < 0.75
      ? (e = Pt(ss, ss, 0))
      : (e = Pt(ss, vn, wt((s - 0.75) / 0.25)));
  let t = Ct((s - 0.08) / 0.75, 0, 1);
  return (
    (e.bodyPitch = _a(t) * Qr),
    (e.bodyY += -0.12 * Math.sin(t * Math.PI)),
    e
  );
}
function kp(s) {
  let e;
  s < 0.15
    ? (e = Pt(vn, ss, wt(s / 0.15)))
    : s < 0.78
      ? (e = Pt(ss, ss, 0))
      : (e = Pt(ss, vn, wt((s - 0.78) / 0.22)));
  let t = Ct((s - 0.08) / 0.72, 0, 1);
  return ((e.bodyPitch = _a(t) * Qr), (e.bodyY += 0.1), (e.swordGlow = 0.3), e);
}
var Cc = Tn({
  bodyY: -0.18,
  bodyPitch: 0.25,
  spine: [0.45, 0, 0],
  chest: [0.1, 0, 0],
  head: [-0.4, 0, 0],
  sh: [
    [-0.9, 0.35, 0.2],
    [0.9, 0.4, 0],
  ],
  el: [0.2, 1],
  wr: [
    [1.1, 0, 0.3],
    [0, 0, 0],
  ],
  th: [
    [1, 0.1, 0],
    [-0.8, 0.1, 0],
  ],
  kn: [0.9, 0.6],
  ft: [-0.2, 0.6],
});
function Vp(s) {
  let e =
    s < 0.2
      ? Pt(vn, Cc, wt(s / 0.2))
      : s > 0.8
        ? Pt(Cc, vn, wt((s - 0.8) / 0.2))
        : Pt(Cc, Cc, 0);
  return ((e.swordGlow = 0.4), e);
}
var Up = Tn({
    bodyY: -0.28,
    spine: [0.5, 0, 0],
    chest: [0.2, 0, 0],
    head: [-0.4, 0, 0],
    sh: [
      [-0.6, 0.3, 0],
      [-0.4, 0.3, 0],
    ],
    el: [0.4, 0.5],
    wr: [
      [1, 0, 0.2],
      [0, 0, 0],
    ],
    th: [
      [1.3, 0.2, 0],
      [1, 0.2, 0],
    ],
    kn: [1.9, 1.7],
    ft: [-0.4, -0.4],
  }),
  Np = Tn({
    bodyY: 0.05,
    spine: [-0.35, 0, 0],
    chest: [-0.25, 0, 0],
    head: [-0.4, 0, 0],
    sh: [
      [2.95, 0.15, 0.1],
      [2.85, 0.25, 0],
    ],
    el: [0.6, 0.9],
    wr: [
      [-0.9, 0, 0],
      [0, 0, 0],
    ],
    th: [
      [0.5, 0.1, 0],
      [-0.3, 0.1, 0],
    ],
    kn: [1.2, 0.4],
    ft: [0.4, 0.3],
  }),
  Fp = Tn({
    bodyY: 0,
    spine: [0.75, 0, 0],
    chest: [0.35, 0, 0],
    head: [0.1, 0, 0],
    sh: [
      [1.2, 0.1, -0.1],
      [1.25, 0.15, -0.5],
    ],
    el: [0.15, 0.3],
    wr: [
      [0, 0, 0],
      [0, 0, 0],
    ],
    th: [
      [1.2, 0.1, 0],
      [0.9, 0.1, 0],
    ],
    kn: [1.5, 1.5],
    ft: [0.3, 0.3],
  });
function ya(s, e) {
  let t;
  return (
    s === "crouch"
      ? (t = Pt(vn, Up, wt(e)))
      : s === "rise"
        ? (t = Pt(Up, Np, _s(Ct(e * 2.2, 0, 1))))
        : s === "smash"
          ? (t = Pt(Np, Fp, xa(Ct(e, 0, 1))))
          : ((t = Pt(Fp, ss, wt(Ct(e * 3, 0, 1)))),
            e > 0.7 && (t = Pt(t, vn, wt((e - 0.7) / 0.3))),
            (t.bodyPitch = -_a(Ct(e / 0.85, 0, 1)) * Qr)),
    (t.swordGlow = s === "fall" ? Math.max(0, 1 - e * 2) : 1),
    t
  );
}
var Pc = Tn({
    bodyY: -0.05,
    bodyPitch: -0.35,
    spine: [-0.3, 0.2, 0.2],
    chest: [-0.2, 0, 0],
    head: [-0.5, 0, 0],
    sh: [
      [0.2, 0.9, 0],
      [0.4, 1.1, 0],
    ],
    el: [0.5, 0.6],
    wr: [
      [0.6, 0, 0],
      [0, 0, 0],
    ],
    th: [
      [0.4, 0.2, 0],
      [-0.4, 0.2, 0],
    ],
    kn: [0.4, 0.3],
    ft: [0, 0],
  }),
  Ny = Tn({
    bodyY: -0.3,
    bodyPitch: -1.38,
    spine: [-0.15, 0.1, 0],
    chest: [-0.1, 0, 0],
    head: [-0.35, 0.35, 0],
    sh: [
      [0.9, 1.4, 0],
      [1.1, 1.3, 0],
    ],
    el: [0.2, 0.35],
    wr: [
      [0.3, 0, 0],
      [0, 0, 0],
    ],
    th: [
      [0.12, 0.12, 0],
      [-0.05, -0.18, 0],
    ],
    kn: [0.3, 0.12],
    ft: [0.2, 0],
  });
function Gp(s) {
  return s < 0.3 ? Pt(vn, Pc, _s(s / 0.3)) : Pt(Pc, Ny, wt((s - 0.3) / 0.7));
}
function Wp(s) {
  return s < 0.25
    ? Pt(vn, Pc, _s(s / 0.25))
    : Pt(Pc, vn, wt((s - 0.25) / 0.75));
}
function Xp(s) {
  let e = s >>> 0;
  return function () {
    ((e |= 0), (e = (e + 1831565813) | 0));
    let t = Math.imul(e ^ (e >>> 15), 1 | e);
    return (
      (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
function Yp() {
  let s = new URLSearchParams(location.search);
  return {
    autoplay: s.get("autoplay") === "1",
    seed: parseInt(s.get("seed") || "7", 10) || 7,
    debug: s.get("debug") || "",
    pose: s.get("pose") || "",
    t: parseFloat(s.get("t") || "0") || 0,
  };
}

export {
  Tn, vn, Dp, Ly, Op, Bp, zp, ss, Hp, kp, Cc, Vp, Up, ya, Pc, Gp, Wp, Xp, Yp
};