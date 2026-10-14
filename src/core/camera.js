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

import { Ct, jt, zn } from './math.js';
var kn = R;
function Ma(s, e) {
  return (
    Math.sin(s * 1 + e) * 0.5 +
    Math.sin(s * 2.31 + e * 1.7) * 0.3 +
    Math.sin(s * 5.13 + e * 2.9) * 0.2
  );
}
var Lc = class {
  constructor(e, t, n = {}) {
    ((this.cam = e),
      (this.g = t),
      (this.shakeScale = n.shake ?? 1),
      (this.baseFov = n.fov ?? 49),
      (this.pos = new kn()),
      (this.look = new kn()),
      (this.trauma = 0),
      (this.zoom = 0),
      (this.zoomTarget = 0),
      (this.zoomHold = 0),
      (this.fovKick = 0),
      (this.roll = 0),
      (this.rollTarget = 0),
      (this.t = 0),
      (this.side = 1),
      (this.init = !1),
      (this.lift = 0),
      (this.liftTarget = 0),
      (this.intro = 1),
      (this.focusBlend = 0.5));
  }
  event(e) {
    switch (e.type) {
      case "slam":
        (this.addTrauma(e.double ? 0.75 : 0.55),
          this.pulseZoom(e.double ? 4.5 : 3, 0.9));
        break;
      case "hit":
        (this.addTrauma(e.final ? 0.3 : 0.14),
          (this.fovKick -= e.final ? 2.5 : 1));
        break;
      case "finisher":
        (this.addTrauma(1),
          (this.fovKick -= 7),
          (this.roll = 0.09 * (e.dmg & 1 ? 1 : -1)));
        break;
      case "dash":
        this.fovKick += 6;
        break;
      case "roll":
        this.fovKick += 2.5;
        break;
      case "stomp":
        this.addTrauma(0.07);
        break;
      case "cogLand":
        this.addTrauma(0.22);
        break;
      case "stagger":
        (this.addTrauma(0.35), this.pulseZoom(-1, 1.8));
        break;
      case "staggerLand":
        this.addTrauma(0.5);
        break;
      case "roarStart":
        this.pulseZoom(6.5, 2.6);
        break;
      case "phase2":
        this.addTrauma(0.95);
        break;
      case "kHurt":
        this.addTrauma(0.5);
        break;
      case "leapLaunch":
        this.liftTarget = 1;
        break;
      case "land":
        e.big && (this.addTrauma(0.2), (this.liftTarget = 0));
        break;
      case "sweepStart":
        this.pulseZoom(2, 1.2);
        break;
      case "cogWind":
        this.pulseZoom(2, 1.5);
        break;
      case "slamWind":
        this.pulseZoom(e.double ? 3 : 1.8, 1);
        break;
    }
  }
  addTrauma(e) {
    this.trauma = Math.min(1.2, this.trauma + e);
  }
  pulseZoom(e, t) {
    (Math.abs(e) >= Math.abs(this.zoomTarget) || this.zoomHold <= 0) &&
      ((this.zoomTarget = e), (this.zoomHold = t));
  }
  update(e) {
    let t = this.g,
      n = t.knight,
      i = t.boss;
    this.t += e;
    let r = new kn(n.pos.x, 0, n.pos.z),
      o = new kn(r.x, 0, r.z),
      a = o.length();
    a < 0.5
      ? (o.set(Math.sin(i.yaw), 0, Math.cos(i.yaw)), (a = 0.5))
      : o.divideScalar(a);
    let c = new kn(o.z, 0, -o.x);
    ((this.zoomHold -= e),
      this.zoomHold <= 0 && (this.zoomTarget = 0),
      (this.zoom = zn(
        this.zoom,
        this.zoomTarget,
        1 - Math.exp(-e * (this.zoomTarget > this.zoom ? 3.2 : 1.6)),
      )),
      (this.lift = zn(this.lift, this.liftTarget, 1 - Math.exp(-e * 4))),
      n.action !== "leap" && (this.liftTarget = 0));
    let l = i.state,
      h = l === "buckle" || l === "vulnerable" || n.action === "leap" ? 1 : 0;
    this.stag = zn(this.stag || 0, h, 1 - Math.exp(-e * (h ? 5 : 1.6)));
    let d = Ct((9 - a) / 7, 0, 1),
      u = 7.9 + d * 2.4 + this.zoom + this.stag * 3.2;
    u = Math.max(u, 14.5 - a);
    let f =
        2.7 + d * 0.8 + this.zoom * 0.35 + this.lift * 0.9 + this.stag * 1.6,
      v = 2.3 + this.stag * 3.6,
      g = new kn().copy(r).addScaledVector(o, u).addScaledVector(c, v);
    g.y = f + n.y * 0.3;
    let m = new kn(0, 0, 0).lerp(i.rig.coreW, 0.5);
    m.y = Math.max(4.8, i.rig.coreW.y * 0.85);
    let p = new kn()
      .copy(r)
      .setY(1 + n.y * 0.6)
      .lerp(m, 0.58)
      .addScaledVector(c, 1.5 + this.stag * 0.6);
    if (((p.y += this.zoom * 0.14 - this.stag * 0.6), this.stag > 0.01)) {
      let I = i.rig.coreW,
        C = new kn(I.x - r.x, 0, I.z - r.z);
      C.normalize();
      let b = new kn(-C.z, 0, C.x),
        T = new kn().copy(r).lerp(new kn(I.x, 0, I.z), 0.42);
      this.stagSide ||
        (this.stagSide =
          Math.sign(b.dot(new kn().subVectors(this.pos, T))) || 1);
      let D = r
        .clone()
        .addScaledVector(b, 3.4 * this.stagSide)
        .addScaledVector(C, -6.2);
      D.y = 2.2 + n.y * 0.75;
      let z = r.clone().lerp(new kn(I.x, 0, I.z), 0.6);
      ((z.y = 1.4 + n.y * 0.5 + (I.y - 1.4) * 0.45),
        g.lerp(D, wt(this.stag)),
        p.lerp(z, wt(this.stag)));
    } else this.stagSide = 0;
    if (
      ((this.death = zn(
        this.death || 0,
        n.dead ? 1 : 0,
        1 - Math.exp(-e * 1.3),
      )),
      this.death > 0.001)
    ) {
      let I = r.clone().addScaledVector(o, 6).addScaledVector(c, 1.6);
      I.y = 2.6;
      let C = r.clone().lerp(m, 0.12);
      ((C.y = 0.9), g.lerp(I, wt(this.death)), p.lerp(C, wt(this.death)));
    }
    {
      let I = Math.hypot(g.x, g.z);
      I > 21 && ((g.x *= 21 / I), (g.z *= 21 / I), (g.y += (I - 21) * 0.35));
    }
    (this.init ||
      ((this.init = !0),
      this.pos.copy(g).addScaledVector(o, 3.5),
      (this.pos.y += 2.2),
      this.look.copy(p),
      (this.look.y += 1.5)),
      (this.intro = Math.max(0, this.intro - e / 0.9)));
    let S = 1 - Math.exp(-e * (4.2 + (1 - this.intro) * 0.5 + this.stag * 3)),
      E = 1 - Math.exp(-e * 6.5);
    (this.pos.lerp(g, S),
      this.look.lerp(p, E),
      (this.trauma = Math.max(0, this.trauma - e * 1.5)));
    let y = this.trauma * this.trauma * this.shakeScale,
      w = this.t * 26,
      A = this.cam;
    (A.position.copy(this.pos),
      (A.position.x += Ma(w, 1.3) * y * 0.22),
      (A.position.y += Ma(w, 4.1) * y * 0.22),
      A.lookAt(this.look),
      A.rotateZ(Ma(w, 7.7) * y * 0.05 + this.roll),
      A.rotateX(Ma(w, 2.2) * y * 0.03),
      A.rotateY(Ma(w, 9.1) * y * 0.03),
      (this.roll *= Math.exp(-e * 2.5)),
      (this.fovKick *= Math.exp(-e * 4.5)),
      (A.fov = this.baseFov + this.fovKick + this.zoom * 0.6),
      A.updateProjectionMatrix(),
      (t.camBasis = { fwd: o.clone().negate(), right: c.clone() }));
  }
};

export { kn, Ma, Lc, Lc as CameraController };
