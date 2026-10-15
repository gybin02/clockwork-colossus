import * as THREE from 'three';
import { Su, Pp, Ry, Rp, AS, zn, Ct, wt, _s, Cy, xa, Py, _a, Iy, jt, wc, Cp, Mi, Hi, un, Dy, Ip } from '../core/math.js';


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


var Ac = class {
    constructor() {
      let e = Mi;
      ((this.root = new Ne()),
        (this.root.name = "bossRoot"),
        (this.pelvis = new Ne()),
        this.root.add(this.pelvis),
        (this.torso = new Ne()),
        (this.torso.rotation.order = "YXZ"),
        (this.torso.position.y = e.spineY),
        this.pelvis.add(this.torso),
        (this.chest = new Ne()),
        (this.chest.position.y = e.chestY),
        this.torso.add(this.chest),
        (this.core = new Ne()),
        this.core.position.set(0, e.coreY, e.coreZ),
        this.chest.add(this.core),
        (this.head = new Ne()),
        (this.head.rotation.order = "YXZ"),
        this.head.position.set(0, e.headY, e.headZ),
        this.chest.add(this.head),
        (this.shoulder = [new Ne(), new Ne()]),
        (this.upper = [new Ne(), new Ne()]),
        (this.fore = [new Ne(), new Ne()]),
        (this.fist = [new Ne(), new Ne()]),
        (this.blade = [new Ne(), new Ne()]),
        (this.hip = [new Ne(), new Ne()]),
        (this.thigh = [new Ne(), new Ne()]),
        (this.shin = [new Ne(), new Ne()]),
        (this.foot = [new Ne(), new Ne()]));
      for (let t = 0; t < 2; t++) {
        let n = t === 0 ? -1 : 1;
        (this.shoulder[t].position.set(n * e.shoulderX, e.shoulderY, 0),
          this.chest.add(this.shoulder[t]),
          this.root.add(this.upper[t]),
          this.root.add(this.fore[t]),
          this.fist[t].position.set(0, -e.fore, 0),
          this.fore[t].add(this.fist[t]),
          this.blade[t].position.set(n * 0.95, -e.fore * 0.55, -0.1),
          this.fore[t].add(this.blade[t]),
          this.hip[t].position.set(n * e.hipX, e.hipY, 0),
          this.pelvis.add(this.hip[t]),
          this.root.add(this.thigh[t]),
          this.root.add(this.shin[t]),
          this.root.add(this.foot[t]));
      }
      ((this.feetW = [
        new R(-e.footX, e.footY, e.footZ),
        new R(e.footX, e.footY, e.footZ),
      ]),
        (this.stepT = [-1, -1]),
        (this.stepFrom = [new R(), new R()]),
        (this.stepTo = [new R(), new R()]),
        (this.stepEvents = []),
        (this.footLift = [0, 0]),
        (this.pose = Hi()),
        (this.fistW = [new R(), new R()]),
        (this.coreW = new R()),
        (this.headW = new R()),
        (this.elbowL = [new R(), new R()]),
        (this.kneeOverride = null));
    }
    apply(e, t, n, i = 0) {
      let r = Mi;
      ((this.pose = e),
        (this.root.rotation.y = t),
        this.pelvis.position.set(0, e.pelvisY, e.pelvisZ),
        (this.pelvis.rotation.x = e.pelvisPitch),
        this.torso.rotation.set(e.torsoPitch, e.torsoYaw, e.torsoRoll),
        this.head.rotation.set(e.headPitch, e.headYaw, 0),
        this.root.updateMatrixWorld(!0));
      let o = (l, h) => this.root.worldToLocal(l.getWorldPosition(h)),
        a = Math.cos(e.torsoYaw),
        c = Math.sin(e.torsoYaw);
      for (let l = 0; l < 2; l++) {
        let h = l === 0 ? -1 : 1,
          d = o(this.shoulder[l], new R()),
          u = e.fist[l],
          f = new R(u.x * a + u.z * c, u.y, -u.x * c + u.z * a),
          v = new R(h * 1, -0.15, -0.85);
        v.set(v.x * a + v.z * c, v.y, -v.x * c + v.z * a);
        let g = new R();
        (Cp(d, f, r.upper, r.fore, v, g), this.elbowL[l].copy(g));
        let m = new R().subVectors(f, g),
          p = m.length();
        m.divideScalar(p || 1);
        let S = g.clone().addScaledVector(m, r.fore);
        (this.upper[l].position.copy(d),
          wc(this.upper[l], new R().subVectors(g, d), v),
          this.fore[l].position.copy(g));
        let E = v.clone().applyAxisAngle(m, e.fistRot[l]);
        (wc(this.fore[l], new R().subVectors(S, g), E),
          this.blade[l].rotation.set(0, 0, 0));
      }
      n > 0 && this._updateFeet(t, n, e);
      for (let l = 0; l < 2; l++) {
        let h = l === 0 ? -1 : 1,
          d = o(this.hip[l], new R()),
          u = this.root.worldToLocal(this.feetW[l].clone());
        u.y += this.footLift[l];
        let f = new R(h * 0.35, 0.1, 1),
          v = new R();
        (Cp(d, u, r.thigh, r.shin, f, v),
          this.thigh[l].position.copy(d),
          wc(this.thigh[l], new R().subVectors(v, d), f),
          this.shin[l].position.copy(v),
          wc(this.shin[l], new R().subVectors(u, v), f),
          this.foot[l].position.copy(u),
          this.foot[l].rotation.set(0, 0, 0));
      }
      this.root.updateMatrixWorld(!0);
      for (let l = 0; l < 2; l++) this.fist[l].getWorldPosition(this.fistW[l]);
      (this.core.getWorldPosition(this.coreW),
        this.head.getWorldPosition(this.headW));
    }
    _updateFeet(e, t, n) {
      let i = Mi,
        r = Math.cos(e),
        o = Math.sin(e);
      for (let a = 0; a < 2; a++) {
        let l = (a === 0 ? -1 : 1) * i.footX,
          h = i.footZ + n.pelvisZ * 0.5;
        n.feet && ((l = n.feet[a].x), (h = n.feet[a].z));
        let d = new R(l * r + h * o, i.footY, -l * o + h * r);
        if (this.stepT[a] >= 0) {
          this.stepT[a] += t / 0.42;
          let u = Math.min(1, this.stepT[a]),
            f = wt(u);
          (this.feetW[a].lerpVectors(this.stepFrom[a], this.stepTo[a], f),
            (this.footLift[a] = Math.sin(u * Math.PI) * 0.9),
            u >= 1 &&
              ((this.stepT[a] = -1),
              (this.footLift[a] = 0),
              this.stepEvents.push({ i: a, pos: this.feetW[a].clone() })));
        } else
          !(this.stepT[1 - a] >= 0) &&
            this.feetW[a].distanceTo(d) > 0.75 &&
            ((this.stepT[a] = 0),
            this.stepFrom[a].copy(this.feetW[a]),
            this.stepTo[a].copy(d));
      }
    }
    predictFist(e, t, n) {
      let i = this.feetW.map((a) => a.clone()),
        r = this.pose;
      this.apply(e, t, 0);
      let o = this.fistW[n].clone();
      return ((this.feetW = i), this.apply(r, t, 0), o);
    }
  },
  Zt = {
    bodyY: 0.55,
    hipUp: 0.2,
    upper: 0.27,
    fore: 0.25,
    thigh: 0.36,
    shin: 0.33,
    sword: 1.05,
  };

export { Ac, Ac as BossRig };