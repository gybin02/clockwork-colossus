import * as THREE from 'three';
import { zn, Ct, jt, wt, Mi, Hi, un, Ip } from './math.js';
import { jr, Pt } from '../entities/knight-rig.js';
import { Ac, Ac as BossRig } from '../entities/boss-rig.js';
import { Rc, Rc as KnightRig } from '../entities/knight-rig.js';
import { Tn, vn, Dp, Ly, Op, Bp, zp, ss, Hp, kp, Cc, Vp, Up, ya, Pc, Gp, Wp, Xp, Yp } from '../entities/boss-attacks.js';


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


var
  $e = R,
  Ic = Math.PI * 2,
  Eu = 1 / 120,
  ys = (s) => ((s = (s + Math.PI) % Ic), s < 0 && (s += Ic), s - Math.PI),
  Hn = (s, e, t, n) => Math.hypot(s - t, e - n),
  Tu = class {
    constructor(e) {
      ((this.g = e),
        (this.rig = e.bRig),
        (this.yaw = 0),
        (this.maxHp = 16e3),
        (this.hp = this.maxHp),
        (this.hpShown = this.maxHp),
        (this.phase = 1),
        (this.overheat = 0),
        (this.gear = 0),
        (this.gearSpeed = 1),
        (this.pose = Hi()),
        (this.work = Hi()),
        (this.action = null),
        (this.at = 0),
        (this.seq = 0),
        (this.seqPhase = 1),
        (this.recoil = 0),
        (this.recoilV = 0),
        (this.jolt = [new $e(), new $e()]),
        (this.breakMeter = 0),
        (this.staggers = 0),
        (this.impacts = []),
        (this.bladeSpin = [0, 0]),
        (this.bladeSpinV = [0, 0]),
        (this.steam = 0),
        (this.coreFlash = 0),
        (this.roaring = 0),
        (this.lastFistAng = null));
    }
    get state() {
      return this.action ? this.action.state(this.at) : "idle";
    }
    _keys(e) {
      return [
        { t: 0, pose: un(this.pose) },
        ...e.map(([t, n, i]) => ({ t, pose: n, ease: i || wt })),
      ];
    }
    mkIdle(e) {
      let t = Hi();
      return {
        name: "idle",
        dur: e,
        keys: this._keys([[Math.min(0.5, e), t]]),
        events: [],
        trackUntil: e,
        state: () => "idle",
      };
    }
    mkSlam(e, t = {}) {
      let n = this.phase === 2,
        i = Hi(),
        r = [],
        o = [],
        a = [],
        c = 0,
        l = 0.13,
        h = t.wind ?? (n ? 0.6 : 0.85),
        d = n ? 0.36 : 0.5,
        u = 0.18,
        f = t.planted ?? (n ? 1.55 : 1.85),
        v = n ? 0.38 : 0.42,
        g = !!t.double,
        m = h * 0.55,
        p = [];
      (e.forEach((y, w) => {
        let A = y === 0 ? -1 : 1,
          I = w === 0 ? h : d,
          C = un(i);
        ((C.pelvisY = 3.55),
          (C.torsoPitch = -0.14),
          (C.headPitch = -0.15),
          g
            ? (C.fist[0].set(-2.3, 12, -0.9),
              C.fist[1].set(2.3, 12, -0.9),
              (C.torsoPitch = -0.2))
            : ((C.torsoRoll = A * 0.1),
              (C.torsoYaw = -A * 0.28),
              C.fist[y].set(A * 2.1, 12.2, -0.7),
              C.fist[1 - y].set(-A * 3.3, 2.6, 1.8)));
        let b = un(i);
        ((b.pelvisY = 2.5),
          (b.torsoPitch = 0.62),
          (b.headPitch = 0.3),
          g
            ? (b.fist[0].set(-1.7, Mi.fistR, 6.1),
              b.fist[1].set(1.7, Mi.fistR, 6.1),
              (b.torsoPitch = 0.68))
            : ((b.torsoYaw = A * 0.16),
              b.fist[y].set(A * 1.4, Mi.fistR, 6.3),
              b.fist[1 - y].set(-A * 3.3, 1.7, 2.6)));
        let T = un(b);
        ((T.pelvisY = 2.62),
          (T.torsoPitch -= 0.04),
          r.push([c + I * 0.72, C, jt.out]));
        let D = un(C);
        ((D.pelvisY += 0.08),
          (D.torsoPitch -= 0.05),
          g
            ? ((D.fist[0].y += 0.4), (D.fist[1].y += 0.4))
            : (D.fist[y].y += 0.4),
          r.push([c + I, D, jt.inout]),
          r.push([c + I + l, b, jt.in3]));
        let z = w === e.length - 1,
          G = z ? f : u;
        r.push([c + I + l + G, T, jt.lin]);
        let W = c + I + l,
          X = g ? [0, 1] : [y],
          V = new $e();
        for (let se of X) V.add(this.rig.predictFist(b, 0, se));
        (V.divideScalar(X.length),
          (V.y = 0),
          p.push({ local: V, t: W }),
          o.push({
            t: c + I * 0.1,
            fn: () => {
              this.g.emit({
                type: "slamWind",
                arms: X,
                double: g,
                t: W - (c + I * 0.1),
              });
            },
          }),
          o.push({ t: W, fn: () => this._impact(X, g, n) }),
          a.push({ t0: W, t1: W + G, arms: X, long: z }),
          (c = W + G));
      }),
        r.push([c + v, i, jt.inout]));
      let S = c + v;
      return {
        name: g ? "double" : e.length > 1 ? "multi" : "slam",
        dur: S,
        keys: this._keys(r),
        events: o,
        trackUntil: m,
        windows: a,
        staggerOnCombo: !!t.stagger,
        impactsLocal: p,
        state: (y) => {
          for (let w of a)
            if (y >= w.t0 && y < w.t1) return w.long ? "planted" : "strike";
          return y >= a[a.length - 1].t1 ? "recover" : "wind";
        },
        plantedArms: (y) => {
          for (let w of a)
            if (y >= w.t0 && y < w.t1)
              return { arms: w.arms, remain: w.t1 - y, long: w.long };
          return null;
        },
      };
    }
    mkSweep(e, t) {
      let n = this.phase === 2,
        i = e === 0 ? -1 : 1,
        r = Hi(),
        o = n ? 0.5 : 0.62,
        a = t ? 1.1 : 0.56,
        c = n ? 0.4 : 0.42,
        l = un(r);
      ((l.pelvisY = 2.45),
        (l.torsoPitch = 0.4),
        (l.torsoYaw = i * 1.05),
        (l.headPitch = 0.2),
        l.fist[e].set(i * 6.7, 1.15, 0.5),
        l.fist[1 - e].set(-i * 2.6, 3, 2.4),
        (l.blade[e] = 1),
        (l.bladeSpin[e] = 1));
      let h = un(l),
        d = t ? Ic + 3.2 : 3.3;
      h.torsoYaw = i * 1.05 - i * d;
      let u = un(r);
      u.torsoYaw = 0;
      let f = [
        [o, l, jt.out],
        [o + 0.02, l, jt.lin],
        [o + a, h, t ? jt.lin : jt.inout],
      ];
      return {
        name: "sweep",
        arm: e,
        dur: o + a + c,
        keys: this._keys(f),
        trackUntil: o * 0.5,
        events: [
          { t: 0.05, fn: () => this.g.emit({ type: "sweepWind", arm: e }) },
          { t: o, fn: () => this.g.emit({ type: "sweepStart", arm: e }) },
          {
            t: o + a,
            fn: () => {
              (this.g.emit({ type: "sweepEnd", arm: e }),
                (this.pose.torsoYaw = ys(this.pose.torsoYaw)),
                (this.action.keys = this._keysFrom(this.pose, [[c, u]])),
                (this.action.keyOffset = o + a));
            },
          },
        ],
        sweeping: (g) => g >= o && g < o + a,
        state: (g) => (g < o ? "wind" : g < o + a ? "sweep" : "recover"),
      };
    }
    _keysFrom(e, t) {
      return [
        { t: 0, pose: un(e) },
        ...t.map(([n, i, r]) => ({ t: n, pose: i, ease: r || wt })),
      ];
    }
    mkCogs(e) {
      let t = this.phase === 2,
        n = Hi(),
        i = t ? 0.42 : 0.55,
        r = t ? 0.13 : 0.17,
        o = 0.75,
        a = un(n);
      ((a.pelvisY = 3.5),
        (a.torsoPitch = -0.22),
        (a.headPitch = -0.35),
        (a.hatch = 1),
        a.fist[0].set(-5, 4.2, 0.6),
        a.fist[1].set(5, 4.2, 0.6));
      let c = un(a);
      ((c.torsoPitch = -0.1), (c.pelvisY = 3.35));
      let l = i + r * (e - 1) + 0.2,
        h = [
          [i, a, jt.out],
          [l, c, jt.lin],
          [l + o, n, jt.inout],
        ],
        d = [{ t: 0.02, fn: () => this.g.emit({ type: "cogWind" }) }],
        u = e <= 3 ? [-0.55, 0.05, 0.6] : [-0.9, -0.45, 0, 0.45, 0.9];
      for (let f = 0; f < e; f++)
        d.push({
          t: i + f * r,
          fn: () => this.g.spawnCog(f, u[f % u.length], t),
        });
      return {
        name: "cogs",
        dur: l + o,
        keys: this._keys(h),
        events: d,
        trackUntil: i,
        state: (f) => (f < i ? "wind" : f < l ? "cogs" : "recover"),
      };
    }
    mkStagger() {
      let e = Hi(),
        t = 0.42,
        n = 1.55,
        i = 0.55,
        r = un(e);
      ((r.pelvisY = 1.85),
        (r.pelvisZ = 0.3),
        (r.pelvisPitch = 0.22),
        (r.torsoPitch = 0.5),
        (r.headPitch = 0.35),
        (r.coreOpen = 1),
        r.fist[0].set(-4.1, Mi.fistR, 3.3),
        r.fist[1].set(4.1, Mi.fistR, 3.3),
        (r.fistRot = [0.3, -0.3]));
      let o = un(r);
      ((o.pelvisY = 1.78), (o.torsoPitch = 0.56));
      let a = [
        [t * 0.6, r, jt.in],
        [t, o, jt.out],
        [t + n, r, jt.lin],
        [t + n + i, e, jt.inout],
      ];
      return {
        name: "stagger",
        dur: t + n + i,
        keys: this._keys(a),
        trackUntil: 0,
        vulnerable: [t * 0.7, t + n],
        events: [
          { t: t * 0.6, fn: () => this.g.emit({ type: "staggerLand" }) },
          { t: t + n, fn: () => this.g.emit({ type: "staggerEnd" }) },
        ],
        state: (c) =>
          c < t * 0.7 ? "buckle" : c < t + n ? "vulnerable" : "recover",
      };
    }
    mkRoar(e = !1) {
      let t = Hi(),
        n = un(t);
      ((n.pelvisY = 2.4),
        (n.torsoPitch = 0.75),
        (n.headPitch = 0.5),
        n.fist[0].set(-2.6, 1, 3.2),
        n.fist[1].set(2.6, 1, 3.2),
        (n.coreOpen = 1));
      let i = un(t);
      ((i.pelvisY = 3.7),
        (i.torsoPitch = -0.38),
        (i.headPitch = -0.6),
        (i.coreOpen = 1),
        (i.hatch = 1),
        i.fist[0].set(-6, 9, 0.2),
        i.fist[1].set(6, 9, 0.2));
      let r = un(i);
      ((r.torsoPitch = -0.32),
        r.fist[0].set(-5.8, 8.6, 0.6),
        r.fist[1].set(5.8, 8.6, 0.6));
      let o = [
        [0.35, n, jt.inout],
        [0.62, i, jt.out3],
        [1.65, r, jt.lin],
        [2.1, t, jt.inout],
      ];
      return {
        name: "roar",
        dur: 2.1,
        keys: this._keys(o),
        trackUntil: 0.4,
        events: [
          {
            t: 0.02,
            fn: () => {
              this.g.emit({ type: "roarStart" });
            },
          },
          {
            t: 0.58,
            fn: () => {
              e ||
                ((this.phase = 2),
                this.g.emit({ type: "phase2" }),
                this.g.spawnRing(new $e(0, 0, 0), 1.6, !0, "burst"),
                (this.roaring = 1.2));
            },
          },
        ],
        state: (a) => (a < 0.58 ? "roarWind" : a < 1.7 ? "roar" : "recover"),
      };
    }
    nextAction() {
      if (this.g.knight && this.g.knight.dead)
        return this.gloated
          ? this.mkIdle(2)
          : ((this.gloated = !0), this.mkRoar(!0));
      let e = [
          () => this.mkIdle(0.3),
          () => this.mkSlam([0], { stagger: !0 }),
          () => this.mkSweep(1, !1),
          () => this.mkCogs(3),
          () => this.mkSlam([0], { double: !0, stagger: !0 }),
          () => this.mkRoar(),
        ],
        t = [
          () => this.mkSlam([0, 1, 0], { stagger: !0 }),
          () => this.mkSweep(0, !0),
          () => this.mkSlam([1], { stagger: !0 }),
          () => this.mkCogs(5),
          () => this.mkSlam([1], { double: !0, stagger: !0 }),
          () => this.mkSweep(1, !0),
          () => this.mkSlam([1, 0, 1], { stagger: !0 }),
          () => this.mkCogs(4),
          () => this.mkSlam([0], { stagger: !0 }),
        ];
      if (this.pendingStagger)
        return ((this.pendingStagger = !1), this.mkStagger());
      if (this.seqPhase === 1) {
        let i = e[this.seq++]();
        return (
          this.seq >= e.length && ((this.seqPhase = 2), (this.seq = 0)),
          i
        );
      }
      let n = t[this.seq % t.length]();
      return (this.seq++, n);
    }
    startAction(e) {
      ((this.action = e),
        (this.at = 0),
        (e.keyOffset = 0),
        (this.holdUsed = 0));
      for (let t of e.events) t.done = !1;
      if (((this.impacts = []), e.impactsLocal))
        for (let t of e.impactsLocal)
          this.impacts.push({ local: t.local, t: t.t, pos: new $e() });
    }
    triggerStagger() {
      (this.action && this.action.name === "stagger") ||
        ((this.pendingStagger = !1),
        this.staggers++,
        (this.breakMeter = 1),
        this.startAction(this.mkStagger()),
        this.g.emit({ type: "stagger" }));
    }
    _impact(e, t, n) {
      let i = new $e();
      for (let a of e) i.add(this.rig.fistW[a]);
      (i.divideScalar(e.length), (i.y = 0));
      let r = t ? 1.5 : 1;
      (this.g.spawnRing(i, r, n, t ? "double" : "slam"),
        t &&
          this.g.after(0.22, () =>
            this.g.spawnRing(i.clone(), 0.9, n, "after"),
          ),
        this.g.emit({
          type: "slam",
          pos: i.clone(),
          power: r,
          double: t,
          phase: this.phase,
          arms: e,
        }));
      let o = this.g.knight;
      Hn(o.pos.x, o.pos.z, i.x, i.z) < 3 && o.y < 1 && o.hurt(18, i);
    }
    hit(e, t, n) {
      let i = this.phase === 1 ? this.maxHp * 0.5 + 1 : this.maxHp * 0.06;
      ((this.hp = Math.max(i, this.hp - e)),
        n != null &&
          n >= 0 &&
          this.jolt[n].set(
            (this.g.rand() - 0.5) * 0.5,
            0.35,
            (this.g.rand() - 0.5) * 0.5,
          ),
        (this.recoilV += t ? -2.2 : -0.5),
        (this.coreFlash = t ? 1 : Math.max(this.coreFlash, 0.35)),
        t &&
          this.action &&
          this.action.name === "stagger" &&
          (this.action.skipTo = this.at + 0.6),
        t || (this.breakMeter = Math.min(0.95, this.breakMeter + 0.16)));
    }
    step(e) {
      let t = this.g;
      this.action || this.startAction(this.nextAction());
      let n = this.action;
      if (((this.at += e), n.windows)) {
        let m = t.knight;
        for (let p of n.windows)
          p.long &&
            this.at >= p.t1 - 0.12 &&
            this.at < p.t1 &&
            this.holdUsed < 1.3 &&
            (m.action === "attack" || m.action === "dash") &&
            ((this.at -= e), (this.holdUsed += e));
      }
      if (
        (n.skipTo != null &&
          this.at >= n.skipTo &&
          n.vulnerable &&
          this.at < n.vulnerable[1] &&
          ((this.at = n.vulnerable[1]), (n.skipTo = null)),
        n.staggerOnCombo && n.windows)
      ) {
        let m = n.windows[n.windows.length - 1];
        if (this.at >= m.t1 - 0.05 && !n.staggered) {
          ((n.staggered = !0), this.triggerStagger());
          return;
        }
      }
      let i = n.keys,
        r = this.at - (n.keyOffset || 0),
        o = i[i.length - 1].pose;
      for (let m = 0; m < i.length - 1; m++)
        if (r < i[m + 1].t) {
          let p = Ct((r - i[m].t) / Math.max(1e-4, i[m + 1].t - i[m].t), 0, 1);
          o = Ip(i[m].pose, i[m + 1].pose, i[m + 1].ease(p), this.work);
          break;
        }
      let a = un(o),
        c = t.time,
        l = n.state(this.at),
        h = l === "idle" || l === "recover" ? 1 : 0.4;
      ((a.pelvisY += Math.sin(c * 1.7) * 0.06 * h),
        (a.torsoPitch += Math.sin(c * 1.7 + 0.6) * 0.02 * h),
        (this.recoilV += (-this.recoil * 60 - this.recoilV * 12) * e),
        (this.recoil += this.recoilV * e),
        (a.torsoPitch += this.recoil * 0.25));
      for (let m = 0; m < 2; m++)
        (a.fist[m].add(this.jolt[m]),
          this.jolt[m].multiplyScalar(Math.exp(-e * 14)));
      if (this.phase === 2 || this.roaring > 0) {
        let m = this.roaring > 0 ? 0.05 : 0.012;
        ((a.torsoRoll += Math.sin(c * 37) * m),
          (a.pelvisY += Math.sin(c * 29) * m));
      }
      let d = t.knight,
        u = Math.atan2(d.pos.x, d.pos.z),
        f = ys(u - this.yaw - a.torsoYaw);
      if (
        ((a.headYaw += Ct(f, -0.7, 0.7) * (l === "roar" ? 0.2 : 0.8)),
        (this.pose = a),
        this.at < n.trackUntil || l === "idle")
      ) {
        let p = ys(u - this.yaw),
          S = (this.phase === 2 ? 1.9 : 1.35) * e;
        this.yaw += Ct(p, -S, S);
      }
      for (let m = 0; m < 2; m++) {
        let p = a.bladeSpin[m] * (this.phase === 2 ? 34 : 26);
        ((this.bladeSpinV[m] += (p - this.bladeSpinV[m]) * Math.min(1, e * 4)),
          (this.bladeSpin[m] += this.bladeSpinV[m] * e));
      }
      ((this.overheat =
        this.phase === 2 ? Math.min(1, this.overheat + e * 1.4) : 0),
        (this.gearSpeed = zn(
          this.gearSpeed,
          (this.phase === 2 ? 2.6 : 1) *
            (l === "vulnerable" || l === "buckle" ? 0.25 : 1),
          e * 3,
        )),
        (this.gear += this.gearSpeed * e),
        (this.coreFlash = Math.max(0, this.coreFlash - e * 5.5)),
        (this.roaring = Math.max(0, this.roaring - e)),
        (this.breakMeter =
          l === "recover" && n.name === "stagger"
            ? Math.max(0, this.breakMeter - e * 1.6)
            : this.breakMeter),
        this.rig.apply(a, this.yaw, e, c));
      for (let m of this.rig.stepEvents)
        t.emit({ type: "stomp", pos: m.pos, i: m.i });
      this.rig.stepEvents.length = 0;
      let v = Math.cos(this.yaw),
        g = Math.sin(this.yaw);
      for (let m of this.impacts)
        ((this.at < n.trackUntil || !m.locked) &&
          m.pos.set(
            m.local.x * v + m.local.z * g,
            0,
            -m.local.x * g + m.local.z * v,
          ),
          this.at >= n.trackUntil && (m.locked = !0));
      this.impacts = this.impacts.filter((m) => m.t > this.at - 0.05);
      for (let m of n.events)
        !m.done && this.at >= m.t && ((m.done = !0), m.fn());
      if (this.action === n) {
        if (n.name === "sweep" && n.sweeping(this.at)) {
          let m = this.rig.fistW[n.arm],
            p = Math.atan2(m.x, m.z);
          if (this.lastFistAng != null) {
            let S = ys(p - this.lastFistAng),
              E = Math.hypot(d.pos.x, d.pos.z),
              y = ys(u - this.lastFistAng);
            (E > 2.2 &&
              E < 8.4 &&
              Math.sign(y) === Math.sign(S) &&
              Math.abs(y) <= Math.abs(S) + 0.02 &&
              (d.y < 0.55 && d.iframe <= 0
                ? d.hurt(14, m)
                : t.emit({
                    type: "nearMiss",
                    kind: "blade",
                    pos: d.pos.clone(),
                  })),
              (this.sweepAngVel = S / e));
          }
          ((this.lastFistAng = p), (this.sweepAng = p), (t.sweepActive = !0));
        } else ((this.lastFistAng = null), (t.sweepActive = !1));
        ((this.hpShown = zn(this.hpShown, this.hp, Math.min(1, e * 2.2))),
          this.at >= n.dur && this.startAction(this.nextAction()));
      }
    }
    plantInfo() {
      let e = this.action;
      if (!e || !e.plantedArms) return null;
      let t = e.plantedArms(this.at);
      return !t || !t.long ? null : t;
    }
  },
  wu = class {
    constructor(e) {
      ((this.g = e),
        (this.rig = e.kRig),
        (this.pos = new $e(1.2, 0, 12.6)),
        (this.vel = new $e(0, 0, -6.5)),
        (this.y = 0),
        (this.vy = 0),
        (this.yaw = Math.PI),
        (this.action = "move"),
        (this.at = 0),
        (this.adur = 0),
        (this.astep = 0),
        (this.queued = !1),
        (this.hitDone = 0),
        (this.maxHp = 80),
        (this.hp = this.maxHp),
        (this.dead = !1),
        (this.stamina = 100),
        (this.iframe = 0),
        (this.runPhase = 0),
        (this.speed = 6.5),
        (this.pose = jr()),
        (this.fromPose = null),
        (this.fade = 1),
        (this.fadeDur = 0.1),
        (this.circleDir = 1),
        (this.dodgeFlip = 0),
        (this.rollDir = new $e()),
        (this.target = null),
        (this.leapPhase = ""),
        (this.leapTarget = new $e()),
        (this.combo = 0),
        (this.comboTimer = 0),
        (this.lastHurt = -10),
        (this.dashDir = new $e()),
        (this.footT = 0),
        (this.landT = 0),
        (this.thinkCooldown = 0),
        (this.attackTarget = null),
        (this.finisherDone = !1));
    }
    setAction(e, t, n = 0.08) {
      ((this.fromPose = Pt(this.pose, this.pose, 0)),
        (this.fade = 0),
        (this.fadeDur = n),
        (this.action = e),
        (this.at = 0),
        (this.adur = t),
        (this.hitDone = 0));
    }
    get busy() {
      return this.action !== "move";
    }
    hurt(e, t) {
      let n = this.g;
      if (
        this.dead ||
        this.iframe > 0 ||
        this.action === "leap" ||
        n.time - this.lastHurt < 0.8
      )
        return;
      if (
        ((this.lastHurt = n.time),
        n.boss.phase === 2 && (e = Math.round(e * 1.15)),
        (this.hp -= e),
        n.autoplay && (this.hp = Math.max(this.maxHp * 0.35, this.hp)),
        !n.autoplay && this.hp <= 0)
      )
        return this.die(e, t);
      let i = new $e(this.pos.x - t.x, 0, this.pos.z - t.z).normalize();
      (this.vel.copy(i).multiplyScalar(7),
        (this.vy = 4),
        (this.y = Math.max(this.y, 0.01)),
        this.setAction("hurt", 0.55, 0.05),
        (this.combo = 0),
        n.emit({
          type: "kHurt",
          dmg: e,
          pos: this.pos.clone(),
          src: this.action + "/" + n.boss.action.name + ":" + n.boss.state,
        }));
    }
    die(e, t) {
      let n = this.g;
      ((this.hp = 0), (this.dead = !0));
      let i = new $e(this.pos.x - t.x, 0, this.pos.z - t.z).normalize();
      (this.vel.copy(i).multiplyScalar(6),
        (this.vy = 4.5),
        (this.y = Math.max(this.y, 0.01)),
        this.setAction("dead", 1e9, 0.05),
        (this.combo = 0),
        (n.slowmo = { t: 1.4, dur: 1.4, scale: 0.22 }),
        n.emit({ type: "kHurt", dmg: e, pos: this.pos.clone(), src: "death" }),
        n.emit({ type: "kDeath", pos: this.pos.clone() }));
    }
    faceTo(e, t, n, i) {
      let r = Math.atan2(e - this.pos.x, t - this.pos.z),
        o = ys(r - this.yaw);
      this.yaw += n == null ? o : Ct(o, -n * i, n * i);
    }
    startRoll(e) {
      return this.stamina < 8
        ? !1
        : (this.rollDir.copy(e).setY(0).normalize(),
          (this.yaw = Math.atan2(this.rollDir.x, this.rollDir.z)),
          this.setAction("roll", 0.5, 0.05),
          (this.stamina -= 18),
          (this.iframe = 0.5),
          this.g.emit({
            type: "roll",
            pos: this.pos.clone(),
            dir: this.rollDir.clone(),
          }),
          !0);
    }
    startJump() {
      (this.setAction("jump", 0.7, 0.05),
        (this.vy = 7.4),
        (this.y = 0.01),
        this.vel.multiplyScalar(0.6),
        (this.stamina -= 10),
        this.g.emit({ type: "jump", pos: this.pos.clone() }));
    }
    startDash(e, t = 5) {
      ((this.dashDist = Ct(t, 2, 7.5)),
        this.dashDir.copy(e).setY(0).normalize(),
        (this.yaw = Math.atan2(this.dashDir.x, this.dashDir.z)),
        this.setAction("dash", 0.26, 0.04),
        (this.iframe = 0.26),
        (this.stamina -= 12),
        this.g.emit({
          type: "dash",
          pos: this.pos.clone(),
          dir: this.dashDir.clone(),
        }));
    }
    startAttack(e, t) {
      ((this.astep = e),
        (this.attackTarget = t ? t.clone() : null),
        (this.queued = !1),
        this.setAction("attack", [0.34, 0.34, 0.52][e], 0.05),
        t && (this.yaw = Math.atan2(t.x - this.pos.x, t.z - this.pos.z)),
        (this.stamina -= 5),
        this.g.emit({ type: "swing", step: e, pos: this.pos.clone() }));
    }
    startLeap(e) {
      (this.leapTarget.copy(e),
        this.setAction("leap", 99, 0.06),
        (this.leapPhase = "crouch"),
        (this.lp = 0),
        (this.yaw = Math.atan2(e.x - this.pos.x, e.z - this.pos.z)),
        this.g.emit({ type: "leapStart", pos: this.pos.clone() }));
    }
    safestDir(e) {
      let t = this.g,
        n = t.boss,
        i = e[0],
        r = -1e9;
      for (let o of e) {
        let a = 99;
        for (let c = 0.05; c <= 0.75; c += 0.05) {
          let l = Math.min(1, c / 0.5) * 4.6,
            h = this.pos.x + o.x * l,
            d = this.pos.z + o.z * l;
          (Math.hypot(h, d) > Si - 1.6 && (a = Math.min(a, -3)),
            Math.hypot(h, d) < 2.6 && (a = Math.min(a, -1)));
          for (let u of t.cogs) {
            if (!u.alive || u.state === "fall") continue;
            let f, v;
            (u.state === "roll"
              ? ((f = u.pos.x + u.rollDir.x * u.speed * c),
                (v = u.pos.z + u.rollDir.z * u.speed * c))
              : ((f = u.pos.x + u.vel.x * c), (v = u.pos.z + u.vel.z * c)),
              (a = Math.min(a, Math.hypot(h - f, d - v) - u.radius - 0.4)));
          }
          for (let u of n.impacts) {
            let f = u.t - n.at;
            Math.abs(f - c) < 0.15 &&
              (a = Math.min(a, Math.hypot(h - u.pos.x, d - u.pos.z) - 3.2));
          }
        }
        a > r + 1e-6 && ((r = a), (i = o));
      }
      return i;
    }
    think(e) {
      let t = this.g,
        n = t.boss,
        i = this.pos.x,
        r = this.pos.z;
      if (!(
        this.action === "move" ||
        (this.action === "attack" && this.at > this.adur * 0.45)
      ))
        return;
      for (let u of t.rings) {
        if (!u.alive || u.r > u.maxR - 1) continue;
        let f = Hn(i, r, u.c.x, u.c.z);
        if (f <= u.r - 0.3) continue;
        let v = (f - u.r) / u.speed;
        if (v < 0.14) {
          this.dodgeFlip ^= 1;
          let g = null,
            m = !1;
          for (let p of n.impacts) {
            let S = p.t - n.at;
            S > 0.05 &&
              S < 1.25 &&
              ((m = !0), Hn(i, r, p.pos.x, p.pos.z) < 5.5 && (g = p));
          }
          if (g) {
            this.startRoll(new $e(i - g.pos.x, 0, r - g.pos.z));
            return;
          }
          if (
            (m && (this.dodgeFlip = 1),
            (this.dodgeFlip || v < 0.085) && this.stamina > 20)
          ) {
            let p = new $e(u.c.x - i, 0, u.c.z - r);
            (p.lengthSq() < 0.01 && p.set(0, 0, -1), this.startRoll(p));
          } else this.startJump();
          return;
        }
      }
      if (t.sweepActive && n.sweepAngVel) {
        let u = Math.hypot(i, r);
        if (u > 2 && u < 8.8) {
          let f = Math.atan2(i, r),
            v = ys(f - n.sweepAng),
            g = n.sweepAngVel;
          if (Math.sign(v) === Math.sign(g)) {
            let m = v / g;
            if (m > 0 && m < 0.17) {
              this.startJump();
              return;
            }
          }
        }
      }
      for (let u of t.cogs)
        if (u.alive) {
          if (u.state === "roll") {
            let f = i - u.pos.x,
              v = r - u.pos.z,
              g = u.rollDir.x * u.speed,
              m = u.rollDir.z * u.speed,
              p = g * g + m * m,
              S = (f * g + v * m) / p;
            if (S > 0 && S < 0.26) {
              let E = f - g * S,
                y = v - m * S;
              if (Math.hypot(E, y) < u.radius + 0.75) {
                let w = Math.hypot(g, m) || 1,
                  A = -m / w,
                  I = g / w,
                  C = [
                    new $e(A, 0, I),
                    new $e(-A, 0, -I),
                    new $e(A - (g / w) * 0.6, 0, I - (m / w) * 0.6).normalize(),
                    new $e(
                      -A - (g / w) * 0.6,
                      0,
                      -I - (m / w) * 0.6,
                    ).normalize(),
                  ];
                this.startRoll(this.safestDir(C));
                return;
              }
            }
          } else if (u.state === "air" && u.vel.y < 0) {
            let f = (u.pos.y - u.radius) / -u.vel.y,
              v = u.pos.x + u.vel.x * f,
              g = u.pos.z + u.vel.z * f;
            if (f < 0.3 && Hn(i, r, v, g) < 2.2) {
              let m = new $e(i - v, 0, r - g).normalize();
              this.startRoll(
                this.safestDir([m, new $e(-m.z, 0, m.x), new $e(m.z, 0, -m.x)]),
              );
              return;
            }
          }
        }
      for (let u of n.impacts) {
        let f = u.t - n.at;
        if (f > 0 && f < 0.22 && Hn(i, r, u.pos.x, u.pos.z) < 3.3) {
          this.startRoll(new $e(i - u.pos.x, 0, r - u.pos.z));
          return;
        }
      }
      if (this.action === "move") {
        let u = [],
          f = Math.hypot(i, r);
        for (let v of t.cogs) {
          if (!v.alive || v.state === "fall") continue;
          let g = Math.hypot(v.pos.x, v.pos.z);
          (v.state === "roll" && g > f + 1.2) ||
            u.push(Math.atan2(v.rollDir.x, v.rollDir.z));
        }
        if (u.length) {
          let v = Math.atan2(i, r),
            g = Ct(f, 7, 11),
            m = v,
            p = -1e9;
          for (let S = -0.9; S <= 0.9001; S += 0.05) {
            let E = v + S,
              y = 9;
            for (let A of u) y = Math.min(y, Math.abs(ys(E - A)) * g);
            let w = Math.min(y, 3.2) - Math.abs(S) * 1.2;
            w > p && ((p = w), (m = E));
          }
          ((this.desired = new $e(Math.sin(m) * g, 0, Math.cos(m) * g)),
            (this.maxSpeed = 7.5));
          return;
        }
      }
      if (this.action !== "move") {
        this.action === "attack" &&
          this.queued === !1 &&
          this.astep < 2 &&
          this.attackTarget &&
          n.plantInfo() &&
          (this.queued = !0);
        return;
      }
      let a = n.state;
      if (
        ((this.desired = null),
        (a === "vulnerable" || a === "buckle") && !this.finisherDone)
      ) {
        let u = n.rig.coreW,
          f = new $e(i - u.x, 0, r - u.z),
          v = f.length() || 1;
        (f.divideScalar(v),
          f
            .multiplyScalar(0.3)
            .add(
              new $e(Math.sin(n.yaw), 0, Math.cos(n.yaw)).multiplyScalar(0.7),
            )
            .normalize());
        let g = new $e(u.x, 0, u.z).addScaledVector(f, 2.4),
          m = Hn(i, r, g.x, g.z);
        if (a === "vulnerable" && m < 1) {
          this.startLeap(u.clone());
          return;
        }
        if (m > 4.5 && this.stamina > 25) {
          this.startDash(new $e(g.x - i, 0, g.z - r), m - 0.3);
          return;
        }
        ((this.desired = g), (this.maxSpeed = 7.5));
        return;
      }
      let c = n.plantInfo();
      if (c && c.remain > 0.4) {
        let u = new $e();
        for (let v of c.arms) u.add(n.rig.fistW[v]);
        (u.divideScalar(c.arms.length), (u.y = 0.8));
        let f = !1;
        for (let v of t.rings) {
          if (!v.alive) continue;
          let g = Hn(i, r, v.c.x, v.c.z);
          g > v.r && (g - v.r) / v.speed < 0.45 && (f = !0);
        }
        if (!f) {
          let v = new $e(i - u.x, 0, r - u.z),
            g = v.length() || 1;
          v.divideScalar(g);
          let m = new $e(u.x, 0, u.z).addScaledVector(v, 1.7),
            p = Hn(i, r, m.x, m.z);
          if (p < 0.9) {
            this.startAttack(0, u);
            return;
          }
          if (p > 3 && this.stamina > 25) {
            this.startDash(new $e(m.x - i, 0, m.z - r), p - 0.2);
            return;
          }
          ((this.desired = m), (this.maxSpeed = 8));
          return;
        }
      }
      for (let u of n.impacts)
        if (u.t - n.at > 0 && Hn(i, r, u.pos.x, u.pos.z) < 4.6) {
          let g = new $e(i - u.pos.x, 0, r - u.pos.z).normalize();
          ((this.desired = new $e(u.pos.x, 0, u.pos.z).addScaledVector(g, 5.6)),
            (this.maxSpeed = 7.5));
          return;
        }
      let l = n.phase === 2 ? 9.2 : 8.4,
        h = Math.atan2(i, r);
      h > 0.75 ? (this.circleDir = -1) : h < -0.75 && (this.circleDir = 1);
      let d =
        Math.abs(h) > 0.95 ? h - Math.sign(h) * 0.8 : h + this.circleDir * 0.55;
      ((this.desired = new $e(Math.sin(d) * l, 0, Math.cos(d) * l)),
        (this.maxSpeed = 5.2));
    }
    step(e) {
      let t = this.g,
        n = t.boss;
      ((this.at += e),
        (this.iframe = Math.max(0, this.iframe - e)),
        (this.stamina = Math.min(
          100,
          this.stamina + e * (this.action === "move" ? 34 : 12),
        )),
        t.autoplay
          ? (this.hp = Math.min(this.maxHp, this.hp + e * 2.4))
          : !this.dead &&
            t.time - this.lastHurt > 3 &&
            (this.hp = Math.min(this.maxHp, this.hp + e * 0.75)),
        t.autoplay ? this.think(e) : this.player(e));
      let i,
        r = 24;
      switch (this.action) {
        case "move": {
          let l = new $e();
          if (this.desired) {
            l.set(this.desired.x - this.pos.x, 0, this.desired.z - this.pos.z);
            let p = l.length();
            p > 0.05
              ? l.multiplyScalar(Math.min(this.maxSpeed || 6, p * 3.2) / p)
              : l.set(0, 0, 0);
          }
          t.inputVel && l.copy(t.inputVel);
          let h = 38 * e,
            d = l.x - this.vel.x,
            u = l.z - this.vel.z,
            f = Math.hypot(d, u);
          (f > h
            ? ((this.vel.x += (d / f) * h), (this.vel.z += (u / f) * h))
            : ((this.vel.x = l.x), (this.vel.z = l.z)),
            (this.speed = Math.hypot(this.vel.x, this.vel.z)),
            this.speed > 1.2
              ? this.faceTo(
                  this.pos.x + this.vel.x,
                  this.pos.z + this.vel.z,
                  12,
                  e,
                )
              : this.faceTo(0, 0, 6, e),
            (this.runPhase += e * (4 + this.speed * 1.55)));
          let v = Ct(this.speed / 6.5, 0, 1),
            g = zp(t.time),
            m = Bp(this.runPhase, Math.max(1e-4, v));
          if (((i = Pt(g, m, wt(Ct(v * 1.6, 0, 1)))), v > 0.3)) {
            let p = Math.floor(this.runPhase / Math.PI);
            p !== this.footT &&
              ((this.footT = p),
              t.emit({ type: "footstep", pos: this.pos.clone(), i: p & 1 }));
          }
          break;
        }
        case "roll": {
          let l = this.at / this.adur,
            h = 12 * (1 - l * l * 0.85);
          (this.vel.copy(this.rollDir).multiplyScalar(h),
            (i = Hp(l)),
            l >= 1 && this.setAction("move", 0, 0.12));
          break;
        }
        case "jump": {
          let l = this.at / this.adur;
          ((this.vy -= r * e),
            (i = kp(Ct(l, 0, 1))),
            this.y <= 0 &&
              this.vy < 0 &&
              this.at > 0.1 &&
              ((this.y = 0),
              (this.vy = 0),
              this.setAction("move", 0, 0.1),
              t.emit({ type: "land", pos: this.pos.clone() })));
          break;
        }
        case "dash": {
          let l = this.at / this.adur;
          (this.vel
            .copy(this.dashDir)
            .multiplyScalar(
              (this.dashDist / (this.adur * 0.7)) * (1 - l * 0.6),
            ),
            (i = Vp(l)),
            l >= 1 &&
              (this.vel.multiplyScalar(0.35), this.setAction("move", 0, 0.08)));
          break;
        }
        case "attack": {
          let l = this.at / this.adur,
            h =
              Math.max(0, Math.sin(Ct(l * 1.4, 0, 1) * Math.PI)) *
              (this.astep === 2 ? 3 : 4.2),
            d = new $e(Math.sin(this.yaw), 0, Math.cos(this.yaw));
          (this.attackTarget &&
            Hn(
              this.pos.x,
              this.pos.z,
              this.attackTarget.x,
              this.attackTarget.z,
            ) < 1.15 &&
            d.multiplyScalar(0),
            this.vel.copy(d).multiplyScalar(h),
            (i = Op(this.astep, Ct(l, 0, 1))));
          let u = this.astep === 2 ? [0.42, 0.6] : [0.38];
          for (let f = 0; f < u.length; f++)
            this.hitDone === f &&
              l >= u[f] &&
              (this.hitDone++, this._landHit(f === u.length - 1));
          l >= 1 &&
            (this.queued && this.astep < 2
              ? this.startAttack(this.astep + 1, this.attackTarget)
              : (this.setAction("move", 0, 0.15), (this.combo = 0)));
          break;
        }
        case "leap": {
          this.lp += e;
          let l = this.leapTarget;
          if (this.leapPhase === "crouch") {
            if (
              ((i = ya("crouch", this.lp / 0.15)),
              this.vel.multiplyScalar(0.8),
              this.lp >= 0.15)
            ) {
              ((this.leapPhase = "rise"), (this.lp = 0));
              let h = Math.max(1.5, l.y - 1.05);
              ((this.vy = Math.sqrt(2 * r * h)), (this.y = 0.01));
              let d = this.vy / r,
                u = new $e(l.x - this.pos.x, 0, l.z - this.pos.z),
                f = u.length();
              (u.normalize(),
                this.vel.copy(u).multiplyScalar(Math.max(0, f - 1.25) / d),
                t.emit({ type: "leapLaunch", pos: this.pos.clone() }));
            }
          } else
            this.leapPhase === "rise"
              ? ((this.vy -= r * e),
                (i = ya("rise", this.lp / 0.45)),
                this.vy <= 0.8 &&
                  ((this.leapPhase = "smash"),
                  (this.lp = 0),
                  (this.vy = 0),
                  this.vel.multiplyScalar(0.2)))
              : this.leapPhase === "smash"
                ? ((this.vy = 0),
                  (i = ya("smash", this.lp / 0.11)),
                  this.lp >= 0.11 &&
                    ((this.leapPhase = "fall"),
                    (this.lp = 0),
                    this._finisher()))
                : ((this.vy -= r * e),
                  (i = ya("fall", this.lp / 0.75)),
                  this.y <= 0 &&
                    this.vy < 0 &&
                    ((this.y = 0),
                    (this.vy = 0),
                    this.setAction("move", 0, 0.15),
                    t.emit({ type: "land", pos: this.pos.clone(), big: !0 })));
          break;
        }
        case "dead": {
          ((this.vy -= r * e),
            this.vel.multiplyScalar(Math.exp(-e * 3)),
            (i = Gp(Ct(this.at / 0.9, 0, 1))));
          break;
        }
        case "hurt": {
          let l = this.at / this.adur;
          ((this.vy -= r * e),
            this.vel.multiplyScalar(Math.exp(-e * 4)),
            (i = Wp(Ct(l, 0, 1))),
            l >= 1 && this.y <= 0 && this.setAction("move", 0, 0.12));
          break;
        }
      }
      ((this.pos.x += this.vel.x * e),
        (this.pos.z += this.vel.z * e),
        (this.action === "jump" ||
          this.action === "leap" ||
          this.action === "hurt" ||
          this.action === "dead" ||
          this.y > 0) &&
          (this.action !== "jump" &&
            this.action !== "leap" &&
            this.action !== "hurt" &&
            this.action !== "dead" &&
            (this.vy -= r * e),
          (this.y += this.vy * e),
          this.y < 0 &&
            ((this.y = 0),
            this.action !== "jump" &&
              this.action !== "leap" &&
              (this.vy = 0))));
      let o = Math.hypot(this.pos.x, this.pos.z),
        a = n.state === "vulnerable" || n.state === "buckle" ? 1.6 : 2.4;
      o < a &&
        this.y < 3 &&
        ((this.pos.x *= a / (o || 1)), (this.pos.z *= a / (o || 1)));
      for (let l = 0; l < 2; l++) {
        let h = n.rig.fistW[l];
        if (h.y < 1.6) {
          let d = Hn(this.pos.x, this.pos.z, h.x, h.z);
          if (d < 1.15 && this.y < 1.5) {
            let u = 1.15 / (d || 1);
            ((this.pos.x = h.x + (this.pos.x - h.x) * u),
              (this.pos.z = h.z + (this.pos.z - h.z) * u));
          }
        }
      }
      let c = Math.hypot(this.pos.x, this.pos.z);
      if (c > Si - 1.2) {
        let l = (Si - 1.2) / c;
        ((this.pos.x *= l), (this.pos.z *= l));
      }
      (this.fade < 1 &&
        this.fromPose &&
        ((this.fade = Math.min(1, this.fade + e / this.fadeDur)),
        (i = Pt(this.fromPose, i, wt(this.fade)))),
        (this.pose = i),
        this.rig.apply(i, this.pos.x, this.y, this.pos.z, this.yaw));
    }
    _landHit(e) {
      let t = this.g,
        n = t.boss,
        i = null,
        r = -1,
        o = !1,
        a = new $e(Math.sin(this.yaw), 0, Math.cos(this.yaw)),
        c = new $e(this.pos.x, 0.9 + this.y, this.pos.z).addScaledVector(
          a,
          1.3,
        ),
        l = 2.6;
      for (let g = 0; g < 2; g++) {
        let m = n.rig.fistW[g],
          p = c.distanceTo(m);
        p < l + 0.6 && m.y < 2 && ((l = p), (i = m.clone()), (r = g));
      }
      if (!i)
        for (let g = 0; g < 2; g++) {
          let p = n.rig.shin[g].getWorldPosition(new $e());
          p.y = 1.2;
          let S = c.distanceTo(p);
          S < l && ((l = S), (i = p), (r = -1));
        }
      if (!i) {
        t.emit({ type: "whiff", pos: c.clone() });
        return;
      }
      let h = i.clone().lerp(c, 0.45),
        d = !1,
        u = this.astep === 2 ? (e ? 320 : 170) : this.astep === 1 ? 190 : 150,
        f = Math.round((u + t.rand() * 80) * (n.phase === 2 ? 1.25 : 1));
      (this.combo++,
        t.comboCount++,
        (t.comboTimer = 2.2),
        n.hit(f, d, r),
        (t.hitStop = Math.max(
          t.hitStop,
          this.astep === 2 && e ? 0.085 : 0.045,
        )),
        t.emit({
          type: "hit",
          pos: h,
          dmg: f,
          crit: d,
          step: this.astep,
          final: e,
          arm: r,
        }));
      let v = n.action;
      this.astep === 2 &&
        e &&
        v &&
        v.staggerOnCombo &&
        !v.staggered &&
        ((v.staggered = !0), t.after(0.12, () => n.triggerStagger()));
    }
    _finisher() {
      let e = this.g,
        t = e.boss;
      this.finisherDone = !0;
      let n = t.rig.coreW.clone(),
        i = Math.round(2100 + e.rand() * 500);
      (t.phase === 1 &&
        t.staggers >= 2 &&
        (i = Math.max(i, Math.round(t.hp - t.maxHp * 0.5))),
        t.hit(i, !0, -1),
        e.comboCount++,
        (e.comboTimer = 2.6),
        (e.hitStop = 0.24),
        (e.slowmo = { t: 0.75, dur: 0.75, scale: 0.28 }),
        e.emit({ type: "finisher", pos: n, dmg: i }),
        (this.vy = 6.5),
        this.vel.set(-Math.sin(this.yaw) * 5.5, 0, -Math.cos(this.yaw) * 5.5));
    }
    player(e) {
      let t = this.g,
        n = t.input,
        i = t.boss;
      if (((t.inputVel = null), this.dead)) {
        n.rollPressed = n.jumpPressed = n.attackPressed = n.dashPressed = !1;
        return;
      }
      let r = t.camBasis;
      if (this.action === "move") {
        let o = new $e();
        if (
          (r && o.addScaledVector(r.fwd, -n.z).addScaledVector(r.right, n.x),
          o.lengthSq() > 0 && o.normalize().multiplyScalar(7.2),
          (t.inputVel = o),
          (this.desired = null),
          n.rollPressed)
        ) {
          let a =
            o.lengthSq() > 0
              ? o
              : new $e(Math.sin(this.yaw), 0, Math.cos(this.yaw));
          this.startRoll(a);
        } else if (n.jumpPressed) this.startJump();
        else if (n.dashPressed && this.stamina > 15) {
          let a = o.lengthSq() > 0 ? o : new $e(-this.pos.x, 0, -this.pos.z);
          this.startDash(a);
        } else if (n.attackPressed)
          if (
            i.state === "vulnerable" &&
            !this.finisherDone &&
            i.rig.coreW.distanceTo(this.pos) < 5.5
          )
            this.startLeap(i.rig.coreW.clone());
          else {
            let c = null,
              l = 4;
            for (let h = 0; h < 2; h++) {
              let d = i.rig.fistW[h];
              if (d.y < 2) {
                let u = Hn(d.x, d.z, this.pos.x, this.pos.z);
                u < l && ((l = u), (c = d.clone()));
              }
            }
            this.startAttack(0, c);
          }
      } else
        this.action === "attack" &&
          (n.attackPressed && this.astep < 2 && (this.queued = !0),
          n.rollPressed &&
            this.at > this.adur * 0.4 &&
            this.startRoll(
              new $e(Math.sin(this.yaw), 0, Math.cos(this.yaw)).negate(),
            ));
      n.rollPressed = n.jumpPressed = n.attackPressed = n.dashPressed = !1;
    }
  },
  Dc = class {
    constructor({ seed: e = 7, autoplay: t = !0 } = {}) {
      ((this.rand = Xp((e * 2654435761) >>> 0)),
        (this.autoplay = t),
        (this.time = 0),
        (this.realTime = 0),
        (this.acc = 0),
        (this.hitStop = 0),
        (this.slowmo = { t: 0, dur: 1, scale: 1 }),
        (this.timeScale = 1),
        (this.events = []),
        (this.timers = []),
        (this.kRig = new Rc()),
        (this.bRig = new Ac()),
        (this.rings = []),
        (this.cogs = []),
        (this.ringId = 0),
        (this.cogId = 0),
        (this.comboCount = 0),
        (this.comboTimer = 0),
        (this.input = {
          x: 0,
          z: 0,
          rollPressed: !1,
          jumpPressed: !1,
          attackPressed: !1,
          dashPressed: !1,
        }),
        (this.inputVel = null),
        (this.camBasis = null),
        (this.stats = { hits: 0, staggers: 0, dodges: 0, kHurt: 0, slams: 0 }),
        (this.boss = new Tu(this)),
        (this.knight = new wu(this)),
        (this.sweepActive = !1),
        this.bRig.apply(this.boss.pose, 0, 0),
        this.kRig.apply(
          this.knight.pose,
          this.knight.pos.x,
          0,
          this.knight.pos.z,
          this.knight.yaw,
        ));
    }
    emit(e) {
      ((e.time = this.time), this.events.push(e));
      let t = this.stats;
      e.type === "hit"
        ? t.hits++
        : e.type === "stagger"
          ? t.staggers++
          : e.type === "roll" || e.type === "jump"
            ? t.dodges++
            : e.type === "kHurt"
              ? (t.kHurt++,
                (t.hurtAt = t.hurtAt || []).push(
                  +this.time.toFixed(2) + ":" + (e.src || ""),
                ))
              : e.type === "slam" && t.slams++;
    }
    drainEvents() {
      let e = this.events;
      return ((this.events = []), e);
    }
    after(e, t) {
      this.timers.push({ t: this.time + e, fn: t });
    }
    spawnRing(e, t, n, i) {
      let r = (n ? 16.5 : 13.5) * (i === "burst" ? 0.95 : 1),
        o = {
          id: this.ringId++,
          c: e.clone(),
          r: 0.5,
          speed: r,
          power: t,
          hot: n,
          kind: i,
          alive: !0,
          maxR: i === "burst" ? 24 : 21 + t * 3,
          age: 0,
          passed: !1,
        };
      return (this.rings.push(o), o);
    }
    spawnCog(e, t, n) {
      let i = this.boss,
        r = this.knight,
        a = Math.atan2(r.pos.x, r.pos.z) + t + (this.rand() - 0.5) * 0.15,
        c = new $e(
          Math.sin(a) * (4.6 + this.rand() * 1.2),
          1,
          Math.cos(a) * (4.6 + this.rand() * 1.2),
        ),
        l = i.rig.chest.getWorldPosition(new $e()),
        h = new $e(-Math.sin(i.yaw), 0, -Math.cos(i.yaw));
      (l.addScaledVector(h, 1.6),
        (l.y += 2.8),
        (l.x += (e % 2 ? 1 : -1) * 1.6));
      let d = 0.72,
        u = 26,
        f = new $e(
          (c.x - l.x) / d,
          (c.y - l.y) / d + 0.5 * u * d,
          (c.z - l.z) / d,
        ),
        v = new $e(c.x, 0, c.z).normalize(),
        g = {
          id: this.cogId++,
          pos: l,
          vel: f,
          state: "air",
          radius: 1,
          speed: n ? 10.5 : 8.6,
          rollDir: v,
          spin: 0,
          spinV: 0,
          alive: !0,
          hot: n,
          age: 0,
          bounces: 0,
          tumble: this.rand() * Ic,
        };
      (this.cogs.push(g),
        this.emit({ type: "cogLaunch", cog: g, pos: l.clone() }));
    }
    updateHazards(e) {
      let t = this.knight;
      for (let n of this.rings) {
        if (!n.alive) continue;
        let i = n.r;
        if (((n.r += n.speed * e), (n.age += e), n.r > n.maxR)) {
          n.alive = !1;
          continue;
        }
        let r = Hn(t.pos.x, t.pos.z, n.c.x, n.c.z);
        !n.passed &&
          i - 0.5 <= r &&
          n.r + 0.5 >= r &&
          ((n.passed = !0),
          t.y < 0.5 && t.iframe <= 0 && t.action !== "leap"
            ? t.hurt(n.kind === "burst" ? 10 : 15, n.c)
            : this.emit({
                type: "nearMiss",
                kind: "ring",
                pos: t.pos.clone(),
                ring: n.id,
              }));
      }
      this.rings = this.rings.filter((n) => n.alive || n.age < 0.1);
      for (let n of this.cogs)
        n.alive &&
          ((n.age += e),
          n.state === "air"
            ? ((n.vel.y -= 26 * e),
              n.pos.addScaledVector(n.vel, e),
              (n.spin += 8 * e),
              n.pos.y <= n.radius &&
                n.vel.y < 0 &&
                ((n.pos.y = n.radius),
                (n.state = "roll"),
                (n.vy = 3.2),
                (n.y = 0),
                this.emit({ type: "cogLand", cog: n, pos: n.pos.clone() })))
            : n.state === "roll"
              ? (n.pos.addScaledVector(n.rollDir, n.speed * e),
                (n.spin += (n.speed / n.radius) * e),
                (n.vy -= 30 * e),
                (n.y += n.vy * e),
                n.y < 0 &&
                  ((n.y = 0),
                  n.vy < -2
                    ? ((n.vy = -n.vy * 0.3),
                      this.emit({
                        type: "cogBounce",
                        cog: n,
                        pos: n.pos.clone(),
                      }))
                    : (n.vy = 0)),
                (n.pos.y = n.radius + n.y),
                Math.hypot(n.pos.x, n.pos.z) > Si + 0.4 &&
                  ((n.state = "fall"),
                  n.vel.set(n.rollDir.x * n.speed, 0, n.rollDir.z * n.speed),
                  this.emit({ type: "cogFall", cog: n, pos: n.pos.clone() })),
                Hn(t.pos.x, t.pos.z, n.pos.x, n.pos.z) < n.radius + 0.35 &&
                  t.y < 1.7 &&
                  (t.iframe <= 0 && t.action !== "leap"
                    ? t.hurt(12, n.pos)
                    : n.nm ||
                      ((n.nm = !0),
                      this.emit({
                        type: "nearMiss",
                        kind: "cog",
                        pos: t.pos.clone(),
                      }))))
              : ((n.vel.y -= 26 * e),
                n.pos.addScaledVector(n.vel, e),
                (n.spin += 6 * e),
                n.pos.y < -60 && (n.alive = !1)));
      this.cogs = this.cogs.filter((n) => n.alive);
    }
    step(e) {
      this.time += e;
      for (let t = this.timers.length - 1; t >= 0; t--)
        if (this.timers[t].t <= this.time) {
          let n = this.timers[t];
          (this.timers.splice(t, 1), n.fn());
        }
      (this.boss.step(e),
        this.knight.step(e),
        this.updateHazards(e),
        this.boss.state !== "vulnerable" &&
          this.boss.state !== "buckle" &&
          (this.knight.finisherDone = !1),
        (this.comboTimer -= e),
        this.comboTimer <= 0 && (this.comboCount = 0));
    }
    update(e) {
      ((e = Math.min(e, 1 / 30)), (this.realTime += e));
      let t = 1;
      if (this.hitStop > 0) ((this.hitStop -= e), (t = 0));
      else if (this.slowmo.t > 0) {
        this.slowmo.t -= e;
        let i = Ct(this.slowmo.t / this.slowmo.dur, 0, 1);
        t = zn(1, this.slowmo.scale, wt(Math.min(1, i * 1.6)));
      }
      ((this.timeScale = t), (this.acc += e * t));
      let n = 0;
      for (; this.acc >= Eu - 1e-9 && n < 8;)
        ((this.acc -= Eu), this.step(Eu), n++);
      return e * t;
    }
  };

export { Dc, Dc as Simulation };