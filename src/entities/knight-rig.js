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

import { zn, Ct, jt } from '../core/math.js';
function jr() {
  return {
    bodyY: 0,
    bodyPitch: 0,
    bodyRoll: 0,
    bodyYaw: 0,
    spine: [0, 0, 0],
    chest: [0, 0, 0],
    head: [0, 0, 0],
    sh: [
      [0, 0, 0],
      [0, 0, 0],
    ],
    el: [0, 0],
    wr: [
      [0, 0, 0],
      [0, 0, 0],
    ],
    th: [
      [0, 0, 0],
      [0, 0, 0],
    ],
    kn: [0, 0],
    ft: [0, 0],
    swordGlow: 0,
  };
}
function Pt(s, e, t, n) {
  n = n || jr();
  let i = (r, o) => r + (o - r) * t;
  ((n.bodyY = i(s.bodyY, e.bodyY)),
    (n.bodyPitch = i(s.bodyPitch, e.bodyPitch)),
    (n.bodyRoll = i(s.bodyRoll, e.bodyRoll)),
    (n.bodyYaw = i(s.bodyYaw, e.bodyYaw)),
    (n.swordGlow = i(s.swordGlow, e.swordGlow)));
  for (let r of ["spine", "chest", "head"])
    for (let o = 0; o < 3; o++) n[r][o] = i(s[r][o], e[r][o]);
  for (let r = 0; r < 2; r++) {
    for (let o = 0; o < 3; o++)
      ((n.sh[r][o] = i(s.sh[r][o], e.sh[r][o])),
        (n.wr[r][o] = i(s.wr[r][o], e.wr[r][o])),
        (n.th[r][o] = i(s.th[r][o], e.th[r][o])));
    ((n.el[r] = i(s.el[r], e.el[r])),
      (n.kn[r] = i(s.kn[r], e.kn[r])),
      (n.ft[r] = i(s.ft[r], e.ft[r])));
  }
  return n;
}
var Rc = class {
  constructor() {
    ((this.root = new Ne()),
      (this.root.name = "knightRoot"),
      (this.body = new Ne()),
      (this.body.rotation.order = "YXZ"),
      (this.body.position.y = Zt.bodyY),
      this.root.add(this.body),
      (this.hips = new Ne()),
      (this.hips.position.y = 0.17),
      this.body.add(this.hips),
      (this.spine = new Ne()),
      (this.spine.rotation.order = "YXZ"),
      (this.spine.position.y = 0.06),
      this.hips.add(this.spine),
      (this.chest = new Ne()),
      (this.chest.rotation.order = "YXZ"),
      (this.chest.position.y = 0.2),
      this.spine.add(this.chest),
      (this.head = new Ne()),
      (this.head.rotation.order = "YXZ"),
      (this.head.position.y = 0.27),
      this.chest.add(this.head),
      (this.shoulder = [new Ne(), new Ne()]),
      (this.elbow = [new Ne(), new Ne()]),
      (this.hand = [new Ne(), new Ne()]),
      (this.thigh = [new Ne(), new Ne()]),
      (this.knee = [new Ne(), new Ne()]),
      (this.foot = [new Ne(), new Ne()]));
    for (let e = 0; e < 2; e++) {
      let t = e === 0 ? -1 : 1,
        n = this.shoulder[e];
      ((n.rotation.order = "YXZ"),
        n.position.set(t * 0.21, 0.13, 0),
        this.chest.add(n),
        (this.elbow[e].position.y = -Zt.upper),
        n.add(this.elbow[e]));
      let i = this.hand[e];
      ((i.rotation.order = "YXZ"),
        (i.position.y = -Zt.fore),
        this.elbow[e].add(i));
      let r = this.thigh[e];
      ((r.rotation.order = "ZXY"),
        r.position.set(t * 0.1, -0.03, 0),
        this.hips.add(r),
        (this.knee[e].position.y = -Zt.thigh),
        r.add(this.knee[e]),
        (this.foot[e].position.y = -Zt.shin),
        this.knee[e].add(this.foot[e]));
    }
    ((this.sword = new Ne()),
      this.sword.position.set(0, -0.06, 0),
      this.hand[0].add(this.sword),
      (this.swordTip = new Ne()),
      this.swordTip.position.set(0, 0, Zt.sword),
      this.sword.add(this.swordTip),
      (this.swordBase = new Ne()),
      this.swordBase.position.set(0, 0, 0.18),
      this.sword.add(this.swordBase),
      (this.capeAnchor = [new Ne(), new Ne()]),
      this.capeAnchor[0].position.set(-0.2, 0.17, -0.13),
      this.capeAnchor[1].position.set(0.2, 0.17, -0.13),
      this.chest.add(this.capeAnchor[0], this.capeAnchor[1]),
      (this.tipW = new R()),
      (this.baseW = new R()));
  }
  apply(e, t, n, i, r) {
    (this.root.position.set(t, n, i),
      (this.root.rotation.y = r),
      (this.body.position.y = Zt.bodyY + e.bodyY),
      this.body.rotation.set(e.bodyPitch, e.bodyYaw, e.bodyRoll),
      this.spine.rotation.set(e.spine[0], e.spine[1], e.spine[2]),
      this.chest.rotation.set(e.chest[0], e.chest[1], e.chest[2]),
      this.head.rotation.set(e.head[0], e.head[1], e.head[2]));
    for (let o = 0; o < 2; o++) {
      let a = o === 0 ? -1 : 1;
      (this.shoulder[o].rotation.set(
        -e.sh[o][0],
        e.sh[o][2] * a,
        e.sh[o][1] * a,
      ),
        this.elbow[o].rotation.set(-e.el[o], 0, 0),
        this.hand[o].rotation.set(e.wr[o][0], e.wr[o][1] * -a, e.wr[o][2] * -a),
        this.thigh[o].rotation.set(-e.th[o][0], 0, e.th[o][1] * a),
        this.knee[o].rotation.set(e.kn[o], 0, 0),
        this.foot[o].rotation.set(e.ft[o], 0, 0));
    }
    (this.root.updateMatrixWorld(!0),
      this.swordTip.getWorldPosition(this.tipW),
      this.swordBase.getWorldPosition(this.baseW));
  }
};

export { jr, Pt, Rc, Rc as KnightRig };
