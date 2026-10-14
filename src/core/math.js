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

var Su = new R(),
  Pp = new R(),
  Ry = new R(),
  Rp = new Ke(),
  AS = new qt(),
  zn = (s, e, t) => s + (e - s) * t,
  Ct = (s, e, t) => (s < e ? e : s > t ? t : s),
  wt = (s) => s * s * (3 - 2 * s),
  _s = (s) => 1 - (1 - s) * (1 - s),
  Cy = (s) => 1 - Math.pow(1 - s, 3),
  xa = (s) => s * s,
  Py = (s) => s * s * s,
  _a = (s) => (s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2),
  Iy = (s) => 1 + 2.70158 * Math.pow(s - 1, 3) + 1.70158 * Math.pow(s - 1, 2),
  jt = {
    lin: (s) => s,
    smooth: wt,
    out: _s,
    out3: Cy,
    in: xa,
    in3: Py,
    inout: _a,
    back: Iy,
  };
function wc(s, e, t) {
  let n = Su.copy(e).negate().normalize(),
    i = Pp.crossVectors(n, t);
  (i.lengthSq() < 1e-8 && i.set(1, 0, 0), i.normalize());
  let r = Ry.crossVectors(i, n).normalize();
  (Rp.makeBasis(i, n, r), s.quaternion.setFromRotationMatrix(Rp));
}
function Cp(s, e, t, n, i, r) {
  let o = Su.subVectors(e, s),
    a = o.length(),
    c = o.clone().divideScalar(a || 1);
  a = Ct(a, Math.abs(t - n) + 0.001, t + n - 0.001);
  let l = Ct((t * t + a * a - n * n) / (2 * t * a), -1, 1),
    h = Math.sqrt(1 - l * l),
    d = i.clone().sub(c.clone().multiplyScalar(i.dot(c)));
  return (
    d.lengthSq() < 1e-8 && d.set(0, 0, 1),
    d.normalize(),
    r
      .copy(s)
      .addScaledVector(c, t * l)
      .addScaledVector(d, t * h),
    a
  );
}
var Mi = {
  pelvisY: 3.3,
  hipX: 1.45,
  hipY: -0.25,
  footX: 1.75,
  footZ: 0.25,
  footY: 0.5,
  thigh: 1.85,
  shin: 1.85,
  spineY: 0.45,
  chestY: 2.6,
  shoulderX: 2.75,
  shoulderY: 1.25,
  upper: 3.25,
  fore: 3.35,
  fistR: 0.75,
  headY: 2.3,
  headZ: 1,
  coreY: 0.05,
  coreZ: 1.45,
  height: 10,
};
function Hi() {
  return {
    pelvisY: 3.3,
    pelvisZ: 0,
    pelvisPitch: 0,
    torsoPitch: 0.22,
    torsoYaw: 0,
    torsoRoll: 0,
    fist: [new R(-3.5, 1.8, 1.5), new R(3.5, 1.8, 1.5)],
    fistRot: [0, 0],
    headPitch: 0.15,
    headYaw: 0,
    blade: [0, 0],
    bladeSpin: [0, 0],
    coreOpen: 0,
    hatch: 0,
    feet: null,
  };
}
function un(s) {
  return {
    ...s,
    fist: [s.fist[0].clone(), s.fist[1].clone()],
    fistRot: [...s.fistRot],
    blade: [...s.blade],
    bladeSpin: [...s.bladeSpin],
  };
}
var Dy = [new R(-2.75, 7.4, 0.6), new R(2.75, 7.4, 0.6)];
function Ip(s, e, t, n) {
  n = n || un(s);
  for (let i of [
    "pelvisY",
    "pelvisZ",
    "pelvisPitch",
    "torsoPitch",
    "torsoYaw",
    "torsoRoll",
    "headPitch",
    "headYaw",
    "coreOpen",
    "hatch",
  ])
    n[i] = zn(s[i], e[i], t);
  for (let i = 0; i < 2; i++) {
    ((n.fistRot[i] = zn(s.fistRot[i], e.fistRot[i], t)),
      (n.blade[i] = zn(s.blade[i], e.blade[i], t)),
      (n.bladeSpin[i] = zn(s.bladeSpin[i], e.bladeSpin[i], t)));
    let r = Dy[i],
      o = Su.subVectors(s.fist[i], r),
      a = Pp.subVectors(e.fist[i], r),
      c = o.length(),
      l = a.length(),
      h = o.clone().normalize(),
      d = a.clone().normalize(),
      u = Ct(h.dot(d), -1, 1),
      f = Math.acos(u),
      v;
    if (f < 0.001) v = h.lerp(d, t);
    else {
      let g = Math.sin(f);
      v = h
        .multiplyScalar(Math.sin((1 - t) * f) / g)
        .add(d.multiplyScalar(Math.sin(t * f) / g));
    }
    n.fist[i].copy(r).addScaledVector(v.normalize(), zn(c, l, t));
  }
  return n;
}

export {
  Su, Pp, Ry, Rp, AS,
  zn, Ct, wt, _s, Cy, xa, Py, _a, Iy, jt,
  wc, Cp, Mi, Hi, un, Dy, Ip
};
