import * as THREE from 'three';
import { Ot, Zp, bt, er, bi, Au, Uc, Ei, Ht, In } from './shaders.js';


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
const Ys = 303;
const xi = THREE.NoBlending;
const mi = THREE.NormalBlending;
const Ut = THREE.DoubleSide;


var Ln = R,
  Kt = Math.random,
  K = (s, e) => s + (e - s) * Math.random(),
  nr = class {
    constructor(
      e,
      t,
      {
        tex: n,
        blending: i = $t,
        stretch: r = !1,
        depthTest: o = !0,
        renderOrder: a = 0,
      },
    ) {
      this.max = t;
      let c = new mn(1, 1),
        l = new la();
      ((l.index = c.index),
        l.setAttribute("position", c.attributes.position),
        l.setAttribute("uv", c.attributes.uv),
        (this.aPos = new Kn(new Float32Array(t * 3), 3).setUsage(Bi)),
        (this.aVel = new Kn(new Float32Array(t * 3), 3).setUsage(Bi)),
        (this.aCol = new Kn(new Float32Array(t * 4), 4).setUsage(Bi)),
        (this.aSR = new Kn(new Float32Array(t * 2), 2).setUsage(Bi)),
        l.setAttribute("iPos", this.aPos),
        l.setAttribute("iVel", this.aVel),
        l.setAttribute("iCol", this.aCol),
        l.setAttribute("iSR", this.aSR),
        (l.instanceCount = 0),
        (this.geo = l));
      let h = new Mt({
        uniforms: { map: { value: n }, uStretch: { value: r ? 1 : 0 } },
        vertexShader: `attribute vec3 iPos; attribute vec3 iVel; attribute vec4 iCol; attribute vec2 iSR; uniform float uStretch;
        varying vec2 vUv; varying vec4 vCol;
        void main(){
          vUv = uv; vCol = iCol;
          vec4 a = modelViewMatrix * vec4(iPos, 1.0);
          vec2 c = position.xy;
          if (uStretch > 0.5) {
            vec4 b = modelViewMatrix * vec4(iPos - iVel, 1.0);
            vec2 d = a.xy - b.xy; float L = length(d);
            vec2 dir = L > 1e-5 ? d / L : vec2(0.0, 1.0);
            vec2 n = vec2(-dir.y, dir.x);
            vec4 p = mix(b, a, c.y + 0.5);
            p.xy += n * c.x * iSR.x + dir * c.y * iSR.x;
            gl_Position = projectionMatrix * p;
          } else {
            float cs = cos(iSR.y), sn = sin(iSR.y);
            a.xy += mat2(cs, sn, -sn, cs) * c * iSR.x;
            gl_Position = projectionMatrix * a;
          }
        }`,
        fragmentShader: `uniform sampler2D map; varying vec2 vUv; varying vec4 vCol;
        void main(){ vec4 t = texture2D(map, vUv); gl_FragColor = vec4(vCol.rgb * t.rgb, vCol.a * t.a); }`,
        transparent: !0,
        depthWrite: !1,
        depthTest: o,
        blending: i,
      });
      ((this.mesh = new Ae(l, h)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = a),
        e.add(this.mesh),
        (this.P = []),
        (this.free = []));
    }
    spawn(e) {
      if (this.P.length >= this.max) return null;
      let t = {
        x: e.pos.x,
        y: e.pos.y,
        z: e.pos.z,
        vx: e.vel ? e.vel.x : 0,
        vy: e.vel ? e.vel.y : 0,
        vz: e.vel ? e.vel.z : 0,
        age: 0,
        life: e.life || 1,
        s0: e.s0 ?? 0.3,
        s1: e.s1 ?? e.s0 ?? 0.3,
        c0: e.c0 || [1, 1, 1],
        c1: e.c1 || e.c0 || [1, 1, 1],
        a0: e.a0 ?? 1,
        a1: e.a1 ?? 0,
        drag: e.drag ?? 0,
        grav: e.grav ?? 0,
        rot: e.rot ?? Kt() * 6.28,
        spin: e.spin ?? 0,
        st: e.st ?? 0.04,
        floor: e.floor ?? -1e9,
        bounce: e.bounce ?? 0,
        fadeIn: e.fadeIn ?? 0,
      };
      return (this.P.push(t), t);
    }
    update(e) {
      let t = this.P,
        n = 0,
        i = this.aPos.array,
        r = this.aVel.array,
        o = this.aCol.array,
        a = this.aSR.array;
      for (let c = 0; c < t.length; c++) {
        let l = t[c];
        if (((l.age += e), l.age >= l.life)) continue;
        let h = Math.exp(-l.drag * e);
        ((l.vx *= h),
          (l.vy = l.vy * h + l.grav * e),
          (l.vz *= h),
          (l.x += l.vx * e),
          (l.y += l.vy * e),
          (l.z += l.vz * e),
          l.y < l.floor &&
            ((l.y = l.floor),
            (l.vy = -l.vy * l.bounce),
            (l.vx *= 0.6),
            (l.vz *= 0.6)),
          (l.rot += l.spin * e));
        let d = l.age / l.life,
          u = l.a0 + (l.a1 - l.a0) * d;
        (l.fadeIn > 0 && (u *= Math.min(1, l.age / l.fadeIn)),
          (i[n * 3] = l.x),
          (i[n * 3 + 1] = l.y),
          (i[n * 3 + 2] = l.z),
          (r[n * 3] = l.vx * l.st),
          (r[n * 3 + 1] = l.vy * l.st),
          (r[n * 3 + 2] = l.vz * l.st),
          (o[n * 4] = l.c0[0] + (l.c1[0] - l.c0[0]) * d),
          (o[n * 4 + 1] = l.c0[1] + (l.c1[1] - l.c0[1]) * d),
          (o[n * 4 + 2] = l.c0[2] + (l.c1[2] - l.c0[2]) * d),
          (o[n * 4 + 3] = u),
          (a[n * 2] = l.s0 + (l.s1 - l.s0) * d),
          (a[n * 2 + 1] = l.rot),
          (t[n] = l),
          n++);
      }
      ((t.length = n),
        (this.geo.instanceCount = n),
        (this.aPos.needsUpdate =
          this.aVel.needsUpdate =
          this.aCol.needsUpdate =
          this.aSR.needsUpdate =
            !0),
        this.aPos.addUpdateRange?.(0, n * 3));
    }
  },
  zc = class {
    constructor(e, t, n, i) {
      ((this.mesh = new si(t, n, i)),
        (this.mesh.castShadow = !0),
        (this.mesh.receiveShadow = !0),
        (this.mesh.frustumCulled = !1),
        (this.mesh.count = 0),
        e.add(this.mesh),
        (this.C = []),
        (this.max = i),
        (this.m = new Ke()),
        (this.q = new qt()),
        (this.e = new pn()),
        (this.s = new Ln()),
        (this.p = new Ln()));
    }
    spawn(e, t, n, i = 2.5) {
      (this.C.length >= this.max && this.C.shift(),
        this.C.push({
          p: e.clone(),
          v: t.clone(),
          r: new Ln(Kt() * 6, Kt() * 6, Kt() * 6),
          w: new Ln(K(-9, 9), K(-9, 9), K(-9, 9)),
          s: n,
          age: 0,
          life: i,
        }));
    }
    update(e) {
      let t = 0;
      for (let n of this.C) {
        if (((n.age += e), n.age > n.life)) continue;
        ((n.v.y -= 24 * e),
          n.p.addScaledVector(n.v, e),
          Math.hypot(n.p.x, n.p.z) < Si + 1.5 &&
            n.p.y < n.s * 0.5 &&
            ((n.p.y = n.s * 0.5),
            (n.v.y = Math.abs(n.v.y) * 0.32),
            (n.v.x *= 0.62),
            (n.v.z *= 0.62),
            n.w.multiplyScalar(0.6)),
          n.r.addScaledVector(n.w, e));
        let r = Math.min(1, (n.life - n.age) / 0.4);
        (this.e.set(n.r.x, n.r.y, n.r.z),
          this.q.setFromEuler(this.e),
          this.s.setScalar(n.s * r),
          this.m.compose(n.p, this.q, this.s),
          this.mesh.setMatrixAt(t++, this.m));
      }
      ((this.C = this.C.filter((n) => n.age <= n.life)),
        (this.mesh.count = t),
        (this.mesh.instanceMatrix.needsUpdate = !0));
    }
  },
  ro = class {
    constructor(
      e,
      t,
      {
        color: n = [0.6, 0.95, 1],
        core: i = [1, 1, 1],
        intensity: r = 3,
        life: o = 0.22,
        widthFade: a = !0,
      },
    ) {
      ((this.n = t), (this.life = o), (this.hist = []));
      let c = (t * 4 - 3) * 2;
      this.maxV = c;
      let l = new xt();
      ((this.pos = new _t(new Float32Array(c * 3), 3).setUsage(Bi)),
        (this.uv = new _t(new Float32Array(c * 2), 2).setUsage(Bi)),
        l.setAttribute("position", this.pos),
        l.setAttribute("uv", this.uv));
      let h = [];
      for (let d = 0; d < c / 2 - 1; d++) {
        let u = d * 2;
        h.push(u, u + 1, u + 2, u + 1, u + 3, u + 2);
      }
      (l.setIndex(h),
        (this.geo = l),
        (this.mat = new Mt({
          uniforms: {
            uCol: { value: new _e(...n).multiplyScalar(r) },
            uCore: { value: new _e(...i).multiplyScalar(r * 1.6) },
            uAlpha: { value: 1 },
          },
          vertexShader:
            "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
          fragmentShader: `uniform vec3 uCol; uniform vec3 uCore; uniform float uAlpha; varying vec2 vUv;
        void main(){
          float age = vUv.x; float v = vUv.y;
          float a = pow(1.0 - age, 1.6) * smoothstep(0.0, 0.45, v) * uAlpha;
          float edge = smoothstep(0.75, 1.0, v) * (1.0 - age);
          vec3 c = mix(uCol, uCore, edge);
          gl_FragColor = vec4(c * a, a);
        }`,
          transparent: !0,
          depthWrite: !1,
          blending: $t,
          side: Ut,
        })),
        (this.mesh = new Ae(l, this.mat)),
        (this.mesh.frustumCulled = !1),
        e.add(this.mesh),
        l.setDrawRange(0, 0));
    }
    push(e, t, n) {
      (this.hist.unshift({ a: e.clone(), b: t.clone(), t: n }),
        this.hist.length > this.n && this.hist.pop());
    }
    update(e) {
      this.hist = this.hist.filter((h) => e - h.t < this.life);
      let t = this.hist;
      if (t.length < 2) {
        this.geo.setDrawRange(0, 0);
        return;
      }
      let n = this.pos.array,
        i = this.uv.array,
        r = 0,
        o = (h, d, u, f, v, g) => {
          let m = v * v,
            p = m * v;
          return (
            (g.x =
              0.5 *
              (2 * d.x +
                (-h.x + u.x) * v +
                (2 * h.x - 5 * d.x + 4 * u.x - f.x) * m +
                (-h.x + 3 * d.x - 3 * u.x + f.x) * p)),
            (g.y =
              0.5 *
              (2 * d.y +
                (-h.y + u.y) * v +
                (2 * h.y - 5 * d.y + 4 * u.y - f.y) * m +
                (-h.y + 3 * d.y - 3 * u.y + f.y) * p)),
            (g.z =
              0.5 *
              (2 * d.z +
                (-h.z + u.z) * v +
                (2 * h.z - 5 * d.z + 4 * u.z - f.z) * m +
                (-h.z + 3 * d.z - 3 * u.z + f.z) * p)),
            g
          );
        },
        a = new Ln(),
        c = new Ln(),
        l = (t.length - 1) * 4 + 1;
      for (let h = 0; h < t.length - 1; h++) {
        let d = t[Math.max(0, h - 1)],
          u = t[h],
          f = t[h + 1],
          v = t[Math.min(t.length - 1, h + 2)],
          g = h === t.length - 2 ? 5 : 4;
        for (let m = 0; m < g && !(r >= this.maxV); m++) {
          let p = m / 4;
          (o(d.a, u.a, f.a, v.a, p, a), o(d.b, u.b, f.b, v.b, p, c));
          let S = h * 4 + m,
            E = Math.min(1, (e - u.t + (u.t - f.t) * p) / this.life);
          ((n[r * 3] = a.x),
            (n[r * 3 + 1] = a.y),
            (n[r * 3 + 2] = a.z),
            (i[r * 2] = E),
            (i[r * 2 + 1] = 0),
            r++,
            (n[r * 3] = c.x),
            (n[r * 3 + 1] = c.y),
            (n[r * 3 + 2] = c.z),
            (i[r * 2] = E),
            (i[r * 2 + 1] = 1),
            r++);
        }
      }
      ((this.pos.needsUpdate = !0),
        (this.uv.needsUpdate = !0),
        this.geo.setDrawRange(0, Math.max(0, (r / 2 - 1) * 6)));
    }
  };
function im(s, e, t, n, i, r) {
  let { golem: o, knight: a } = r,
    c = Au(64, 0.25),
    l = Au(128, 0),
    h = Uc(256, 3),
    d = bi(
      64,
      64,
      (re, ke) => {
        (re.clearRect(0, 0, ke, ke),
          (re.fillStyle = "#fff"),
          re.beginPath(),
          re.moveTo(ke / 2, 4),
          re.bezierCurveTo(
            ke * 0.95,
            ke * 0.3,
            ke * 0.8,
            ke * 0.85,
            ke / 2,
            ke - 4,
          ),
          re.bezierCurveTo(ke * 0.2, ke * 0.85, ke * 0.05, ke * 0.3, ke / 2, 4),
          re.fill());
      },
      { srgb: !1 },
    ),
    u = new nr(s, 4e3, { tex: c, stretch: !0, renderOrder: 5 }),
    f = new nr(s, 2e3, { tex: l, renderOrder: 6 }),
    v = new nr(s, 200, { tex: l, renderOrder: 6 }),
    g = new nr(s, 5e3, { tex: h, blending: mi, renderOrder: 3 }),
    m = new nr(s, 800, { tex: d, blending: mi, renderOrder: 4 }),
    p = new Bs(0.5, 0),
    S = bt(
      { map: i.rockDiff, color: 15786696, roughness: 1 },
      { rim: 0.8, key: "debris" },
    ),
    E = new zc(s, p, S, 260),
    y = new Wt(0.22, 0.04, 0.14),
    w = bt(
      { color: 14723664, metalness: 1, roughness: 0.3 },
      { rim: 1, key: "shard" },
    ),
    A = new zc(s, y, w, 200),
    I = [];
  for (let re = 0; re < 4; re++) {
    let ke = new Fi(16752704, 0, 18, 1.5);
    (s.add(ke), I.push({ l: ke, t: 0, dur: 1, i0: 0 }));
  }
  let C = 0,
    b = (re, ke, Ue, ce = 0.5, we = 18) => {
      let Ye = I[C++ % I.length];
      (Ye.l.position.copy(re),
        Ye.l.color.set(ke),
        (Ye.l.distance = we),
        (Ye.i0 = Ue),
        (Ye.t = 0),
        (Ye.dur = ce));
    },
    T = new St(1, 1, 1, 160, 1, !0);
  T.translate(0, 0.5, 0);
  let D = new Mt({
      uniforms: {
        uTime: Ot.uTime,
        uCol: { value: new _e() },
        uAlpha: { value: 1 },
      },
      vertexShader:
        "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform float uTime; uniform vec3 uCol; uniform float uAlpha; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
      float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){
        float y = vUv.y;
        float n = n2(vec2(vUv.x * 90.0, y * 2.0 - uTime * 3.0)) * 0.6 + n2(vec2(vUv.x * 230.0, y * 5.0 - uTime * 6.0)) * 0.4;
        float band = pow(1.0 - y, 1.5) * smoothstep(0.0, 0.06, y);
        float a = band * (0.35 + 0.85 * n) * uAlpha;
        vec3 c = mix(uCol, vec3(1.0, 0.97, 0.9) * 3.0, pow(1.0 - y, 6.0));
        gl_FragColor = vec4(c * a, a);
      }`,
      transparent: !0,
      depthWrite: !1,
      blending: $t,
      side: Ut,
    }),
    z = new mn(2, 2);
  z.rotateX(-Math.PI / 2);
  let G = new Mt({
      uniforms: {
        uCol: { value: new _e() },
        uAlpha: { value: 1 },
        uW: { value: 0.1 },
      },
      vertexShader:
        "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uCol; uniform float uAlpha; uniform float uW; varying vec2 vUv;
      void main(){ float d = length(vUv * 2.0 - 1.0); float a = smoothstep(1.0 - uW * 3.0, 0.985, d) * (1.0 - smoothstep(0.985, 1.0, d)); a = pow(a, 1.5) * uAlpha; gl_FragColor = vec4(uCol * a, a); }`,
      transparent: !0,
      depthWrite: !1,
      blending: $t,
      polygonOffset: !0,
      polygonOffsetFactor: -4,
    }),
    W = new Mt({
      uniforms: { uAlpha: { value: 1 } },
      vertexShader:
        "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform float uAlpha; varying vec2 vUv;
      void main(){ float d = length(vUv * 2.0 - 1.0); float a = smoothstep(0.55, 0.95, d) * (1.0 - smoothstep(0.95, 1.0, d)); gl_FragColor = vec4(0.12, 0.08, 0.05, a * 0.45 * uAlpha); }`,
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -3,
    }),
    X = new Di(0.72, 1.08, 128, 1);
  X.rotateX(-Math.PI / 2);
  let V = new Mt({
      uniforms: {
        uCenter: { value: new Ln() },
        uAmp: { value: 0.012 },
        uR: { value: 1 },
      },
      vertexShader: `uniform vec3 uCenter; varying vec2 vDir; varying float vT;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vec3 rd = normalize(w.xyz - uCenter + 1e-5);
        vec4 c0 = projectionMatrix * viewMatrix * w;
        vec4 c1 = projectionMatrix * viewMatrix * vec4(w.xyz + rd * 0.5, 1.0);
        vec2 s0 = c0.xy / c0.w, s1 = c1.xy / c1.w;
        vDir = normalize(s1 - s0 + 1e-6);
        vT = (length(position.xz) - 0.72) / 0.36;
        gl_Position = c0;
      }`,
      fragmentShader: `uniform float uAmp; varying vec2 vDir; varying float vT;
      void main(){ float b = sin(clamp(vT, 0.0, 1.0) * 3.14159); b = b * b; gl_FragColor = vec4(vDir * b * uAmp, 0.0, 1.0); }`,
      transparent: !0,
      depthWrite: !1,
      depthTest: !1,
      blending: $t,
    }),
    se = new Map();
  function ee(re) {
    let Ue = re.hot ? new _e(3, 0.9, 0.25) : new _e(2.4, 1.7, 0.9),
      ce = new Ae(T, D.clone());
    ((ce.material.uniforms.uTime = Ot.uTime),
      ce.material.uniforms.uCol.value.copy(Ue));
    let we = new Ae(z, G.clone());
    we.material.uniforms.uCol.value.copy(Ue).multiplyScalar(1.3);
    let Ye = new Ae(z, W.clone()),
      vt = new Ae(X, V.clone());
    ((ce.renderOrder = 7), (we.renderOrder = 2), (Ye.renderOrder = 1));
    for (let rn of [ce, we, Ye]) ((rn.frustumCulled = !1), s.add(rn));
    return (
      (vt.frustumCulled = !1),
      e.distScene.add(vt),
      { wall: ce, glow: we, scorch: Ye, dist: vt, ring: re, fade: 1, dead: !1 }
    );
  }
  let ye = new Mt({
      uniforms: {
        uProg: { value: 0 },
        uTime: Ot.uTime,
        uCol: { value: new _e(2.2, 0.9, 0.25) },
        uAlpha: { value: 1 },
      },
      vertexShader:
        "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform float uProg; uniform float uTime; uniform vec3 uCol; uniform float uAlpha; varying vec2 vUv;
      void main(){
        vec2 p = vUv * 2.0 - 1.0 + vec2(1e-4, 2e-4); float d = length(p);
        if (d > 1.0) discard;
        float a = atan(p.x, p.y); float u = fract(a / 6.28318 + 1.0);
        float ring = smoothstep(0.03, 0.0, abs(d - 0.93)) + smoothstep(0.018, 0.0, abs(d - 0.8)) * 0.6;
        float ticks = step(0.83, d) * step(d, 0.9) * step(0.94, fract(u * 12.0 + 0.03));
        float sweep = step(u, uProg) * smoothstep(0.92, 0.2, d) * 0.28;
        float hand = smoothstep(0.03, 0.0, abs(fract(u - uProg + 0.5) - 0.5) * d * 6.28) * step(d, 0.9);
        float pulse = 0.75 + 0.25 * sin(uTime * 18.0);
        float inner = smoothstep(0.35, 0.0, d) * uProg * 0.4;
        float alpha = (ring * pulse + ticks + sweep + hand * 1.5 + inner) * uAlpha;
        gl_FragColor = vec4(uCol * alpha, alpha);
      }`,
      transparent: !0,
      depthWrite: !1,
      blending: $t,
      polygonOffset: !0,
      polygonOffsetFactor: -6,
    }),
    Ee = [],
    Ie = new mn(1, 1);
  Ie.rotateX(-Math.PI / 2);
  let Ge = bi(
      512,
      512,
      (re, ke) => {
        re.clearRect(0, 0, ke, ke);
        let Ue = ke / 2;
        re.lineCap = "round";
        for (let we = 0; we < 16; we++) {
          let Ye = (we / 16) * Math.PI * 2 + K(-0.15, 0.15),
            vt = Ue,
            rn = Ue,
            Vn = K(6, 11);
          (re.beginPath(), re.moveTo(vt, rn));
          let Gn = K(0.55, 0.95) * Ue;
          for (let _n = 0; _n < 14; _n++)
            ((Ye += K(-0.35, 0.35)),
              (vt += (Math.cos(Ye) * Gn) / 14),
              (rn += (Math.sin(Ye) * Gn) / 14),
              re.lineTo(vt, rn));
          ((re.strokeStyle = "rgba(255,255,255,1)"),
            (re.lineWidth = Vn),
            re.stroke());
        }
        let ce = re.createRadialGradient(Ue, Ue, 0, Ue, Ue, Ue * 0.45);
        (ce.addColorStop(0, "rgba(255,255,255,0.9)"),
          ce.addColorStop(1, "rgba(255,255,255,0)"),
          (re.fillStyle = ce),
          re.beginPath(),
          re.arc(Ue, Ue, Ue * 0.45, 0, 7),
          re.fill());
      },
      { srgb: !1 },
    ),
    Xe = [];
  function et(re, ke, Ue) {
    let ce = new yt({
        map: Ge,
        color: 1708554,
        transparent: !0,
        opacity: 0.85,
        depthWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -5,
      }),
      we = new Ae(Ie, ce);
    (we.scale.set(ke, 1, ke),
      we.position.set(re.x, 0.02, re.z),
      (we.rotation.y = Kt() * 6),
      s.add(we));
    let Ye = new yt({
        map: Ge,
        color: Ue ? new _e(4, 1.1, 0.2) : new _e(2.5, 1.6, 0.8),
        transparent: !0,
        opacity: 1,
        blending: $t,
        depthWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -6,
        toneMapped: !1,
      }),
      vt = new Ae(Ie, Ye);
    if (
      (vt.scale.set(ke * 0.92, 1, ke * 0.92),
      vt.position.copy(we.position),
      (vt.position.y = 0.025),
      (vt.rotation.y = we.rotation.y),
      s.add(vt),
      Xe.push({ m: we, h: vt, t: 0, life: Ue ? 6 : 4.5, hot: Ue }),
      Xe.length > 10)
    ) {
      let rn = Xe.shift();
      s.remove(rn.m, rn.h);
    }
  }
  let tt = new ro(s, 16, {
      color: [0.45, 0.9, 1],
      core: [1, 1, 1],
      intensity: 2.6,
      life: 0.2,
    }),
    oe = new ro(s, 16, {
      color: [0.15, 0.5, 1],
      core: [0.3, 0.8, 1],
      intensity: 0.9,
      life: 0.26,
    }),
    me = [
      new ro(s, 18, {
        color: [1, 0.55, 0.2],
        core: [1, 0.9, 0.7],
        intensity: 1.6,
        life: 0.3,
      }),
      new ro(s, 18, {
        color: [1, 0.55, 0.2],
        core: [1, 0.9, 0.7],
        intensity: 1.6,
        life: 0.3,
      }),
    ],
    Pe = new Mt({
      uniforms: {
        uAlpha: { value: 0.5 },
        uCol: { value: new _e(0.2, 0.75, 1.6) },
      },
      vertexShader:
        "varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }",
      fragmentShader:
        "uniform float uAlpha; uniform vec3 uCol; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 2.2); float a = (0.08 + f * 1.4) * uAlpha; gl_FragColor = vec4(uCol * a, a); }",
      transparent: !0,
      depthWrite: !1,
      blending: $t,
      side: Ut,
    }),
    De = [];
  (t.kRig.root.traverse((re) => {
    re.isMesh && !re.material.blending && De.push(re);
  }),
    t.kRig.root.traverse((re) => {
      re.isMesh &&
        re.material.blending === mi &&
        !re.material.transparent &&
        !De.includes(re) &&
        De.push(re);
    }));
  let Oe = [];
  for (let re = 0; re < 7; re++) {
    let ke = new ht(),
      Ue = Pe.clone();
    for (let Ye of De) {
      let vt = new Ae(Ye.geometry, Ue);
      ((vt.matrixAutoUpdate = !1), (vt.frustumCulled = !1), ke.add(vt));
    }
    let ce = new xt();
    (ce.setAttribute("position", a.cape.geometry.attributes.position.clone()),
      ce.setIndex(a.cape.geometry.index),
      ce.setAttribute("normal", a.cape.geometry.attributes.position.clone()));
    let we = new Ae(ce, Ue);
    ((we.frustumCulled = !1),
      ke.add(we),
      (ke.visible = !1),
      s.add(ke),
      Oe.push({ g: ke, mat: Ue, t: 0, life: 0.3, cape: ce }));
  }
  let nt = 0;
  function dt(re = 0.3, ke) {
    let Ue = Oe[nt++ % Oe.length];
    ((Ue.g.visible = !0),
      (Ue.t = 0),
      (Ue.life = re),
      ke && Ue.mat.uniforms.uCol.value.copy(ke));
    for (let ce = 0; ce < De.length; ce++)
      Ue.g.children[ce].matrix.copy(De[ce].matrixWorld);
    (Ue.cape.attributes.position.array.set(
      a.cape.geometry.attributes.position.array,
    ),
      (Ue.cape.attributes.position.needsUpdate = !0),
      Ue.cape.attributes.normal.array.set(
        a.cape.geometry.attributes.normal.array,
      ),
      (Ue.cape.attributes.normal.needsUpdate = !0));
  }
  let U = In({
      rOut: 1,
      rRoot: 0.84,
      teeth: 12,
      depth: 0.36,
      hole: 0.18,
      spokes: 5,
      bevel: 0.03,
    }),
    fe = o.mats.brass,
    Y = new yt({
      color: new _e(3.5, 1, 0.25),
      transparent: !0,
      opacity: 0,
      blending: $t,
      depthWrite: !1,
      toneMapped: !1,
    }),
    $ = new ut(0.92, 0.07, 6, 36),
    te = new Map(),
    ie = [];
  function pe(re, ke, Ue = 0.01, ce = 0.35) {
    let we = new Ae(X, V.clone());
    (we.material.uniforms.uCenter.value.copy(re),
      we.position.copy(re),
      (we.frustumCulled = !1),
      e.distScene.add(we),
      ie.push({ m: we, t: 0, dur: ce, size: ke, amp: Ue }));
  }
  let xe = new Mt({
      uniforms: { uTime: Ot.uTime, uAmp: { value: 0 } },
      vertexShader:
        "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform float uTime; uniform float uAmp; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
      float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){
        vec2 p = vUv * 6.0 + vec2(0.0, -uTime * 2.2);
        vec2 o = vec2(n2(p) - 0.5, n2(p + 17.3) - 0.5);
        float m = smoothstep(0.5, 0.1, length(vUv - 0.5)) * smoothstep(0.0, 0.35, vUv.y);
        gl_FragColor = vec4(o * uAmp * m, 0.0, 1.0);
      }`,
      transparent: !0,
      depthWrite: !1,
      depthTest: !1,
      blending: $t,
    }),
    F = [];
  for (let re = 0; re < 3; re++) {
    let ke = new Ae(new mn(1, 1), xe);
    ((ke.frustumCulled = !1), e.distScene.add(ke), F.push(ke));
  }
  let B = new Ln(),
    _ = new Ln(),
    x = [0.74, 0.64, 0.52],
    P = [0.58, 0.5, 0.42],
    H = new Ln(),
    O = new Ln();
  function L(
    re,
    ke,
    {
      speed: Ue = 4,
      up: ce = 1.5,
      size: we = [0.8, 2.2],
      life: Ye = [0.7, 1.4],
      col: vt = x,
      alpha: rn = 0.45,
      radius: Vn = 0.5,
    } = {},
  ) {
    rn *= 0.55;
    let Gn = O.copy(re);
    for (let _n = 0; _n < ke; _n++) {
      let wi = Kt() * 6.283,
        wn = Ue * K(0.4, 1);
      g.spawn({
        pos: H.set(
          Gn.x + Math.cos(wi) * Vn * Kt(),
          Gn.y + 0.2,
          Gn.z + Math.sin(wi) * Vn * Kt(),
        ),
        vel: _.set(Math.cos(wi) * wn, ce * K(0.3, 1), Math.sin(wi) * wn),
        life: K(...Ye),
        s0: K(we[0], we[0] * 1.4),
        s1: K(we[1], we[1] * 1.5),
        c0: vt,
        c1: P,
        a0: rn,
        a1: 0,
        drag: 2.5,
        grav: 0.3,
        spin: K(-1, 1),
        fadeIn: 0.05,
      });
    }
  }
  function Q(
    re,
    ke,
    {
      speed: Ue = 12,
      col: ce = [4, 2.2, 0.8],
      col1: we = [2, 0.4, 0.05],
      life: Ye = [0.25, 0.6],
      dir: vt = null,
      spread: rn = 1,
      size: Vn = 0.06,
      grav: Gn = -18,
      up: _n = 0.4,
    } = {},
  ) {
    for (let wi = 0; wi < ke; wi++)
      (_.set(K(-1, 1), K(-0.2, 1) + _n, K(-1, 1)).normalize(),
        vt && _.multiplyScalar(rn).add(vt).normalize(),
        u.spawn({
          pos: re,
          vel: _.multiplyScalar(Ue * K(0.35, 1)),
          life: K(...Ye),
          s0: Vn * K(0.7, 1.3),
          s1: Vn * 0.3,
          c0: ce,
          c1: we,
          a0: 1,
          a1: 0.2,
          drag: 1.5,
          grav: Gn,
          st: 0.045,
          floor: 0.02,
          bounce: 0.35,
        }));
  }
  function Z(re, ke, Ue, ce = 0.15) {
    v.spawn({
      pos: re,
      life: ce,
      s0: ke,
      s1: ke * 1.6,
      c0: Ue,
      c1: Ue,
      a0: 1,
      a1: 0,
    });
  }
  function de(re, ke) {
    let Ue = O.copy(re);
    for (let ce = 0; ce < ke; ce++)
      m.spawn({
        pos: H.set(Ue.x + K(-2, 2), Ue.y + K(0.2, 2), Ue.z + K(-2, 2)),
        vel: _.set(K(-4, 4), K(2, 6), K(-4, 4)),
        life: K(1.5, 3),
        s0: 0.18,
        s1: 0.14,
        c0: [1, 0.72, 0.84],
        c1: [1, 0.8, 0.9],
        a0: 1,
        a1: 0,
        drag: 1.8,
        grav: -2.5,
        spin: K(-6, 6),
      });
  }
  let ve = 0,
    ne = 0,
    ge = 0,
    Ce = 0,
    Se = 0,
    ue = 0,
    ze = new _e(1, 0.9, 0.7),
    k = new ae(0.5, 0.5),
    he = () => {
      (B.copy(t.bRig.coreW).project(n),
        k.set(B.x * 0.5 + 0.5, B.y * 0.5 + 0.5));
    },
    Te = [new Ln(), new Ln()],
    Be = 0,
    Me = 0,
    le = 0,
    Le = 0,
    We = 0,
    lt = 0,
    ot = 0,
    gt = "",
    It = 0;
  function Xt(re) {
    let ke = t.boss,
      Ue = t.knight;
    switch (re.type) {
      case "slam": {
        let ce = re.pos,
          we = ke.phase === 2;
        L(ce, re.double ? 70 : 45, {
          speed: 9,
          up: 3,
          size: [1.4, 3.6],
          life: [0.9, 1.8],
          alpha: 0.55,
          radius: 1.5,
        });
        for (let Ye = 0; Ye < (re.double ? 36 : 22); Ye++)
          E.spawn(
            B.set(ce.x + K(-1.5, 1.5), 0.5, ce.z + K(-1.5, 1.5)),
            _.set(K(-7, 7), K(6, 15), K(-7, 7)),
            K(0.18, 0.6),
            K(1.6, 3),
          );
        (Q(B.set(ce.x, 0.4, ce.z), re.double ? 120 : 70, {
          speed: 16,
          col: we ? [5, 1.6, 0.3] : [4, 2.6, 1.2],
          up: 0.8,
        }),
          Z(
            B.set(ce.x, 1, ce.z),
            re.double ? 14 : 10,
            we ? [3, 1.2, 0.3] : [2.6, 2, 1.4],
            0.22,
          ),
          b(
            B.set(ce.x, 2.5, ce.z),
            we ? 16738848 : 16760944,
            re.double ? 260 : 160,
            0.6,
            26,
          ),
          et(ce, re.double ? 11 : 8, we),
          de(ce, 26));
        for (let Ye of re.arms) {
          let vt = t.bRig.fistW[Ye];
          Q(vt, 30, { speed: 10, col: [5, 3, 1.5] });
        }
        if (we)
          for (let Ye = 0; Ye < 40; Ye++)
            f.spawn({
              pos: B.set(ce.x + K(-2, 2), K(0.2, 1.5), ce.z + K(-2, 2)),
              vel: _.set(K(-3, 3), K(3, 8), K(-3, 3)),
              life: K(0.8, 1.6),
              s0: K(0.08, 0.16),
              s1: 0.02,
              c0: [5, 1.6, 0.3],
              c1: [2, 0.3, 0.05],
              a0: 1,
              a1: 0,
              drag: 1.2,
              grav: 1.5,
            });
        ge = Math.max(ge, re.double ? 0.012 : 0.008);
        break;
      }
      case "hit": {
        let ce = re.pos,
          we = _.set(ce.x - Ue.pos.x, 0.25, ce.z - Ue.pos.z)
            .normalize()
            .clone();
        (Q(ce, re.final ? 70 : 40, {
          speed: re.final ? 16 : 12,
          col: [5, 3.4, 1.4],
          dir: we,
          spread: 1.4,
          size: 0.07,
        }),
          Q(ce, 16, {
            speed: 9,
            col: [1.6, 3.2, 4.5],
            col1: [0.3, 0.8, 2],
            dir: we,
            spread: 1.8,
            size: 0.05,
          }),
          Z(ce, re.final ? 4.2 : 2.6, [3.2, 2.6, 1.8], 0.12),
          Z(ce, re.final ? 1.8 : 1.2, [6, 6, 6], 0.06));
        for (let Ye = 0; Ye < (re.final ? 10 : 5); Ye++)
          A.spawn(
            ce,
            B.set(
              we.x * K(2, 6) + K(-3, 3),
              K(3, 8),
              we.z * K(2, 6) + K(-3, 3),
            ),
            K(0.6, 1.2),
            K(1, 2),
          );
        (b(ce, 16767392, re.final ? 90 : 50, 0.25, 10),
          pe(ce, re.final ? 3.5 : 2.2, re.final ? 0.005 : 0.003, 0.3),
          (ge = Math.max(ge, re.final ? 0.006 : 0.003)),
          re.final && (ne = Math.max(ne, 0.12)));
        break;
      }
      case "finisher": {
        let ce = re.pos;
        (he(),
          (ve = 1),
          (ne = 0.32),
          (ge = 0.02),
          (Ce = 1),
          ze.setRGB(1, 0.95, 0.85));
        let we = new Ln(ce.x - Ue.pos.x, 0.35, ce.z - Ue.pos.z).normalize();
        (Q(ce, 120, {
          speed: 28,
          col: [4, 2.6, 1.2],
          size: 0.07,
          up: 0.2,
          life: [0.3, 0.7],
          dir: we,
          spread: 2.2,
        }),
          Q(ce, 40, {
            speed: 20,
            col: [1.4, 3, 4.5],
            col1: [0.4, 1, 3],
            size: 0.06,
            dir: we,
            spread: 2.5,
          }),
          Z(ce, 3, [1.2, 1.1, 0.9], 0.1),
          Z(ce, 1.2, [4, 4, 4], 0.04));
        for (let Ye = 0; Ye < 40; Ye++)
          A.spawn(
            ce,
            B.set(K(-10, 10), K(2, 12), K(-10, 10)),
            K(0.8, 1.6),
            K(1.5, 3),
          );
        for (let Ye = 0; Ye < 26; Ye++)
          f.spawn({
            pos: ce,
            vel: B.set(K(-8, 8), K(-2, 10), K(-8, 8)).addScaledVector(we, 5),
            life: K(0.5, 1),
            s0: K(0.06, 0.12),
            s1: 0.02,
            c0: ke.phase === 2 ? [5, 1.6, 0.3] : [1.6, 4, 5],
            c1: [1, 0.4, 0.1],
            a0: 1,
            a1: 0,
            drag: 1.4,
            grav: -3,
          });
        (L(B.set(ce.x, 0, ce.z), 40, {
          speed: 10,
          up: 2,
          size: [1.5, 3.5],
          alpha: 0.4,
          radius: 2,
        }),
          b(ce, ke.phase === 2 ? 16740400 : 10481919, 140, 0.45, 20),
          pe(ce, 9, 0.012, 0.6),
          de(ce, 40));
        break;
      }
      case "stagger": {
        for (let ce of o.stacks) {
          ce.getWorldPosition(B);
          for (let we = 0; we < 25; we++)
            g.spawn({
              pos: B,
              vel: _.set(K(-2, 2), K(6, 12), K(-2, 2)),
              life: K(1, 2),
              s0: 1,
              s1: 4,
              c0: [0.95, 0.95, 0.95],
              c1: [0.7, 0.72, 0.75],
              a0: 0.6,
              a1: 0,
              drag: 1.5,
              grav: 1,
            });
        }
        break;
      }
      case "staggerLand": {
        for (let ce = 0; ce < 2; ce++) {
          let we = t.bRig.fistW[ce];
          (L(B.set(we.x, 0, we.z), 35, {
            speed: 7,
            up: 2.5,
            size: [1.2, 3],
            alpha: 0.5,
            radius: 1.2,
          }),
            Q(B.set(we.x, 0.3, we.z), 30, { speed: 10 }));
        }
        for (let ce = 0; ce < 2; ce++)
          (t.bRig.shin[ce].getWorldPosition(B),
            (B.y = 0),
            L(B, 25, { speed: 6, up: 2, size: [1, 2.5], alpha: 0.45 }));
        break;
      }
      case "roarStart":
        ue = 2.6;
        break;
      case "phase2": {
        let ce = t.bRig.coreW;
        ((ne = 0.45),
          ze.setRGB(1, 0.55, 0.25),
          (ge = 0.025),
          Q(ce, 220, {
            speed: 24,
            col: [6, 2, 0.4],
            size: 0.09,
            life: [0.5, 1.4],
          }),
          Z(ce, 10, [3, 1.2, 0.3], 0.5),
          b(ce, 16732176, 900, 1.6, 40),
          pe(ce, 12, 0.014, 0.8));
        for (let we of o.stacks) {
          we.getWorldPosition(B);
          for (let Ye = 0; Ye < 60; Ye++)
            g.spawn({
              pos: B,
              vel: _.set(K(-3, 3), K(10, 20), K(-3, 3)),
              life: K(1.2, 2.4),
              s0: 1.2,
              s1: 6,
              c0: [1, 0.95, 0.92],
              c1: [0.55, 0.52, 0.55],
              a0: 0.7,
              a1: 0,
              drag: 1.4,
              grav: 2,
            });
        }
        for (let we = 0; we < 160; we++)
          f.spawn({
            pos: B.set(K(-14, 14), K(0, 2), K(-14, 14)),
            vel: _.set(K(-1, 1), K(3, 9), K(-1, 1)),
            life: K(1.2, 2.8),
            s0: K(0.08, 0.2),
            s1: 0.02,
            c0: [5, 1.5, 0.3],
            c1: [2, 0.3, 0.05],
            a0: 1,
            a1: 0,
            drag: 0.5,
            grav: 0.5,
          });
        L(B.set(0, 0, 0), 90, {
          speed: 14,
          up: 2,
          size: [2, 5],
          alpha: 0.5,
          radius: 4,
          life: [1, 2],
        });
        break;
      }
      case "cogLaunch": {
        (Q(re.pos, 40, { speed: 10, col: [5, 2.5, 0.8], up: 1.5 }),
          Z(re.pos, 4, [3, 1.6, 0.6], 0.15));
        for (let ce = 0; ce < 14; ce++)
          g.spawn({
            pos: re.pos,
            vel: _.set(K(-2, 2), K(2, 6), K(-2, 2)),
            life: K(0.8, 1.6),
            s0: 0.8,
            s1: 2.6,
            c0: [0.9, 0.9, 0.9],
            c1: [0.6, 0.6, 0.62],
            a0: 0.55,
            a1: 0,
            drag: 2,
          });
        break;
      }
      case "cogLand": {
        (L(B.set(re.pos.x, 0, re.pos.z), 30, {
          speed: 6,
          up: 2.5,
          size: [1, 2.6],
          alpha: 0.55,
          radius: 0.8,
        }),
          Q(B.set(re.pos.x, 0.2, re.pos.z), 40, {
            speed: 12,
            col: re.cog.hot ? [5, 1.6, 0.3] : [4, 2.6, 1.2],
          }));
        for (let ce = 0; ce < 10; ce++)
          E.spawn(
            B.set(re.pos.x, 0.4, re.pos.z),
            _.set(K(-5, 5), K(4, 9), K(-5, 5)),
            K(0.15, 0.4),
            2,
          );
        (et(re.pos, 4.5, re.cog.hot),
          b(B.set(re.pos.x, 1.5, re.pos.z), 16756832, 60, 0.35, 12));
        break;
      }
      case "cogBounce":
        (Q(B.set(re.pos.x, 0.1, re.pos.z), 18, { speed: 8 }),
          L(B.set(re.pos.x, 0, re.pos.z), 8, { speed: 3, size: [0.6, 1.6] }));
        break;
      case "roll":
      case "dash": {
        if (
          (L(B.set(Ue.pos.x, 0, Ue.pos.z), re.type === "dash" ? 14 : 10, {
            speed: 3,
            up: 0.8,
            size: [0.4, 1.3],
            alpha: 0.4,
            life: [0.4, 0.9],
          }),
          dt(0.28),
          re.type === "dash")
        )
          for (let ce = 0; ce < 24; ce++)
            u.spawn({
              pos: B.set(
                Ue.pos.x + K(-0.5, 0.5),
                K(0.3, 1.6),
                Ue.pos.z + K(-0.5, 0.5),
              ),
              vel: _.copy(re.dir).multiplyScalar(-K(8, 16)),
              life: K(0.15, 0.3),
              s0: 0.03,
              s1: 0.01,
              c0: [1.5, 3, 4],
              c1: [0.4, 1, 2],
              a0: 0.9,
              a1: 0,
              st: 0.06,
            });
        break;
      }
      case "jump":
        (L(B.set(Ue.pos.x, 0, Ue.pos.z), 10, {
          speed: 3.5,
          up: 0.4,
          size: [0.4, 1.2],
          alpha: 0.35,
        }),
          dt(0.25));
        break;
      case "land":
        L(B.set(Ue.pos.x, 0, Ue.pos.z), re.big ? 26 : 10, {
          speed: re.big ? 6 : 3.5,
          up: 0.6,
          size: [0.5, re.big ? 2 : 1.3],
          alpha: 0.4,
        });
        break;
      case "leapLaunch":
        (L(B.set(Ue.pos.x, 0, Ue.pos.z), 24, {
          speed: 6,
          up: 1,
          size: [0.6, 2],
          alpha: 0.5,
        }),
          (Ce = 0.6),
          dt(0.35));
        break;
      case "footstep":
        Kt() < 0.8 &&
          g.spawn({
            pos: B.set(
              Ue.pos.x + K(-0.15, 0.15),
              0.08,
              Ue.pos.z + K(-0.15, 0.15),
            ),
            vel: _.set(K(-0.6, 0.6), K(0.3, 0.8), K(-0.6, 0.6)),
            life: K(0.4, 0.7),
            s0: 0.25,
            s1: 0.7,
            c0: x,
            c1: P,
            a0: 0.35,
            a1: 0,
            drag: 2,
          });
        break;
      case "stomp":
        L(B.set(re.pos.x, 0, re.pos.z), 16, {
          speed: 4,
          up: 1,
          size: [0.8, 2.2],
          alpha: 0.4,
          radius: 1,
        });
        break;
      case "nearMiss":
        for (let ce = 0; ce < 14; ce++)
          f.spawn({
            pos: B.set(
              Ue.pos.x + K(-0.6, 0.6),
              K(0.3, 1.8),
              Ue.pos.z + K(-0.6, 0.6),
            ),
            vel: _.set(K(-1, 1), K(1, 3), K(-1, 1)),
            life: K(0.3, 0.6),
            s0: 0.12,
            s1: 0.02,
            c0: [1.5, 3.5, 4],
            c1: [0.5, 1.5, 3],
            a0: 1,
            a1: 0,
            drag: 2,
          });
        break;
      case "kHurt":
        ((ne = Math.max(ne, 0.25)),
          ze.setRGB(1, 0.2, 0.1),
          Q(B.set(Ue.pos.x, 1, Ue.pos.z), 30, {
            speed: 9,
            col: [5, 0.8, 0.4],
          }));
        break;
      case "sweepStart":
        break;
    }
  }
  let li = new Ln();
  function rs(re, ke, Ue) {
    let ce = t.boss,
      we = t.knight;
    It += ke;
    for (let M of Ue) Xt(M);
    let Ye = t.timeScale === 0,
      vt = ke,
      rn = new Set();
    for (let M of t.rings) {
      rn.add(M.id);
      let N = se.get(M.id);
      N || ((N = ee(M)), se.set(M.id, N));
      let j = M.r / M.maxR,
        J = Math.min(1, (1 - j) * 2.2) * N.fade,
        q = (M.kind === "burst" ? 1.6 : 0.85) * M.power * (1 - j * 0.5);
      if (
        (N.wall.scale.set(M.r, q, M.r),
        N.wall.position.set(M.c.x, 0.02, M.c.z),
        (N.wall.material.uniforms.uAlpha.value = J),
        N.glow.scale.set(M.r * 1.02, 1, M.r * 1.02),
        N.glow.position.set(M.c.x, 0.04, M.c.z),
        (N.glow.material.uniforms.uAlpha.value = J),
        (N.glow.material.uniforms.uW.value = Math.min(
          0.3,
          0.6 / Math.max(M.r, 1),
        )),
        N.scorch.scale.set(M.r, 1, M.r),
        N.scorch.position.set(M.c.x, 0.03, M.c.z),
        (N.scorch.material.uniforms.uAlpha.value = J),
        N.dist.scale.set(M.r, 1, M.r),
        N.dist.position.set(M.c.x, 0.05, M.c.z),
        N.dist.material.uniforms.uCenter.value.copy(M.c),
        (N.dist.material.uniforms.uAmp.value = 0.0042 * J * M.power),
        !Ye && M.alive)
      ) {
        let be = Math.round(10 * M.power * Math.min(1, M.r / 4) * (1 - j));
        for (let Re = 0; Re < be; Re++) {
          let Ve = Kt() * 6.283,
            He = M.c.x + Math.cos(Ve) * M.r,
            qe = M.c.z + Math.sin(Ve) * M.r;
          Math.hypot(He, qe) > Si + 1 ||
            Math.hypot(He - we.pos.x, qe - we.pos.z) < 3.2 ||
            g.spawn({
              pos: B.set(He, 0.15, qe),
              vel: _.set(Math.cos(Ve) * 3, K(0.8, 2.2), Math.sin(Ve) * 3),
              life: K(0.5, 1),
              s0: K(0.5, 0.9),
              s1: K(1.4, 2.2),
              c0: M.hot ? [0.85, 0.62, 0.5] : x,
              c1: P,
              a0: 0.22,
              a1: 0,
              drag: 2.8,
              grav: 0.4,
              fadeIn: 0.06,
            });
        }
        if (Kt() < 0.18 * M.power) {
          let Re = Kt() * 6.283;
          E.spawn(
            B.set(M.c.x + Math.cos(Re) * M.r, 0.3, M.c.z + Math.sin(Re) * M.r),
            _.set(Math.cos(Re) * 4, K(4, 8), Math.sin(Re) * 4),
            K(0.1, 0.28),
            1.6,
          );
        }
        if (M.hot && Kt() < 0.8) {
          let Re = Kt() * 6.283;
          f.spawn({
            pos: B.set(
              M.c.x + Math.cos(Re) * M.r,
              0.3,
              M.c.z + Math.sin(Re) * M.r,
            ),
            vel: _.set(Math.cos(Re) * 2, K(2, 5), Math.sin(Re) * 2),
            life: K(0.5, 1),
            s0: 0.12,
            s1: 0.02,
            c0: [5, 1.5, 0.3],
            c1: [2, 0.3, 0.05],
            a0: 1,
            a1: 0,
          });
        }
      }
    }
    for (let [M, N] of se)
      rn.has(M) ||
        ((N.fade -= re * 4),
        (N.wall.material.uniforms.uAlpha.value *= 0.8),
        (N.glow.material.uniforms.uAlpha.value *= 0.8),
        (N.dist.material.uniforms.uAmp.value *= 0.8),
        N.fade <= 0 &&
          (s.remove(N.wall, N.glow, N.scorch),
          e.distScene.remove(N.dist),
          se.delete(M)));
    let Vn = 0;
    for (let M of ce.impacts) {
      let N = M.t - ce.at;
      if (N <= 0) continue;
      let j = Math.max(0.3, M.t - (ce.action.windStart || 0)),
        J = Ee[Vn];
      (J ||
        ((J = new Ae(Ie, ye.clone())),
        (J.material.uniforms.uTime = Ot.uTime),
        (J.frustumCulled = !1),
        s.add(J),
        Ee.push(J)),
        (J.visible = !0));
      let q = ce.action.name === "double" ? 9 : 7;
      (J.scale.set(q, 1, q),
        J.position.set(M.pos.x, 0.03, M.pos.z),
        (J.rotation.y = ce.yaw + Math.PI));
      let be = 1 - Math.min(1, N / Math.min(j, 1));
      ((J.material.uniforms.uProg.value = be),
        (J.material.uniforms.uAlpha.value = Math.min(
          1,
          (1 - Math.min(1, N / 1.2)) * 3 + 0.2,
        )),
        J.material.uniforms.uCol.value.setRGB(
          ce.phase === 2 ? 3.2 : 2.4,
          ce.phase === 2 ? 0.6 : 1,
          ce.phase === 2 ? 0.15 : 0.3,
        ),
        Vn++);
    }
    for (let M = Vn; M < Ee.length; M++) Ee[M].visible = !1;
    for (let M of Xe)
      ((M.t += re),
        (M.m.material.opacity =
          0.85 * Math.min(1, Math.max(0, (M.life - M.t) / 1.5))),
        (M.h.material.opacity = M.hot
          ? Math.max(0, 1 - M.t / M.life) * (0.7 + 0.3 * Math.sin(M.t * 9))
          : Math.max(0, 1 - M.t / 0.6)));
    let Gn = new Set();
    for (let M of t.cogs) {
      Gn.add(M.id);
      let N = te.get(M.id);
      if (!N) {
        let j = new ht();
        j.rotation.order = "YXZ";
        let J = new Ae(U, fe);
        ((J.castShadow = !0), (J.receiveShadow = !0), j.add(J));
        let q = Y.clone(),
          be = new Ae($, q);
        (j.add(be), s.add(j), (N = { g: j, hm: q }), te.set(M.id, N));
      }
      (N.g.position.copy(M.pos),
        (N.g.rotation.y = Math.atan2(M.rollDir.z, -M.rollDir.x)),
        (N.g.rotation.x = M.state === "air" ? M.tumble + M.age * 3 : 0),
        (N.g.rotation.z = -M.spin),
        (N.hm.opacity = M.hot ? 0.85 + 0.15 * Math.sin(It * 20) : 0),
        !Ye &&
          M.state === "roll" &&
          (Kt() < 0.7 &&
            g.spawn({
              pos: B.set(M.pos.x + K(-0.3, 0.3), 0.1, M.pos.z + K(-0.3, 0.3)),
              vel: _.set(K(-1, 1), K(0.5, 1.5), K(-1, 1)),
              life: K(0.5, 0.9),
              s0: 0.5,
              s1: 1.4,
              c0: x,
              c1: P,
              a0: 0.4,
              a1: 0,
              drag: 2,
            }),
          Kt() < 0.6 &&
            u.spawn({
              pos: B.set(M.pos.x, 0.05, M.pos.z),
              vel: _.set(
                -M.rollDir.x * K(4, 9) + K(-2, 2),
                K(2, 5),
                -M.rollDir.z * K(4, 9) + K(-2, 2),
              ),
              life: K(0.2, 0.4),
              s0: 0.05,
              s1: 0.02,
              c0: M.hot ? [5, 1.5, 0.3] : [4, 2.5, 1],
              c1: [1.5, 0.3, 0.05],
              a0: 1,
              a1: 0,
              grav: -15,
              st: 0.05,
            })),
        !Ye &&
          M.hot &&
          Kt() < 0.8 &&
          f.spawn({
            pos: M.pos,
            vel: _.set(K(-1, 1), K(1, 3), K(-1, 1)),
            life: K(0.4, 0.8),
            s0: 0.12,
            s1: 0.02,
            c0: [5, 1.5, 0.3],
            c1: [2, 0.3, 0.05],
            a0: 1,
            a1: 0,
          }));
    }
    for (let [M, N] of te) Gn.has(M) || (s.remove(N.g), te.delete(M));
    let _n = t.kRig;
    ((we.action === "attack" ||
      (we.action === "leap" &&
        (we.leapPhase === "smash" || we.leapPhase === "rise")) ||
      we.action === "dash") &&
      !Ye &&
      (tt.push(_n.baseW, _n.tipW, It),
      oe.push(
        _.lerpVectors(_n.baseW, _n.tipW, -0.25),
        B.lerpVectors(_n.baseW, _n.tipW, 1.18),
        It,
      )),
      tt.update(It),
      oe.update(It),
      (we.action === "roll" || we.action === "dash") &&
        !Ye &&
        ((We += ke),
        We > (we.action === "dash" ? 0.05 : 0.09) &&
          ((We = 0),
          dt(we.action === "dash" ? 0.25 : 0.2),
          we.action === "roll" &&
            g.spawn({
              pos: B.set(we.pos.x, 0.1, we.pos.z),
              vel: _.set(K(-1, 1), K(0.5, 1.2), K(-1, 1)),
              life: 0.7,
              s0: 0.4,
              s1: 1.2,
              c0: x,
              c1: P,
              a0: 0.4,
              a1: 0,
              drag: 2,
            }))),
      we.action === "leap" &&
        we.leapPhase === "rise" &&
        !Ye &&
        ((We += ke),
        We > 0.12 && ((We = 0), dt(0.22, new _e(0.25, 0.7, 1.6)))));
    for (let M = 0; M < 2; M++) {
      if (Math.abs(ce.bladeSpinV[M]) > 8 && ce.pose.blade[M] > 0.5 && !Ye) {
        let j = t.bRig.fistW[M];
        if (
          (t.bRig.blade[M].getWorldPosition(B),
          me[M].push(
            _.set(B.x, Math.max(0.05, B.y - 1.4), B.z),
            B.clone().setY(B.y + 1.3),
            It,
          ),
          B.y - 1.4 < 0.35)
        ) {
          for (let q = 0; q < 6; q++)
            u.spawn({
              pos: _.set(B.x, 0.05, B.z),
              vel: B.set(K(-8, 8), K(3, 9), K(-8, 8)),
              life: K(0.2, 0.5),
              s0: 0.06,
              s1: 0.02,
              c0: ce.phase === 2 ? [6, 1.8, 0.3] : [5, 3, 1.2],
              c1: [1.5, 0.3, 0.05],
              a0: 1,
              a1: 0,
              grav: -18,
              st: 0.05,
              floor: 0.02,
              bounce: 0.3,
            });
          (t.bRig.blade[M].getWorldPosition(B),
            Kt() < 0.6 &&
              g.spawn({
                pos: B.setY(0.2),
                vel: _.set(K(-1, 1), K(1, 2), K(-1, 1)),
                life: 0.8,
                s0: 0.6,
                s1: 1.8,
                c0: x,
                c1: P,
                a0: 0.4,
                a1: 0,
                drag: 2,
              }));
        } else
          Kt() < 0.5 &&
            u.spawn({
              pos: B,
              vel: _.set(K(-6, 6), K(-2, 6), K(-6, 6)),
              life: 0.3,
              s0: 0.05,
              s1: 0.01,
              c0: [4, 2.5, 1],
              c1: [1, 0.2, 0],
              a0: 1,
              a1: 0,
              st: 0.05,
              grav: -10,
            });
      }
      me[M].update(It);
    }
    if (!Ye) {
      Be += ke * (ce.phase === 2 ? 16 : 8) * (1 + ce.roaring * 3);
      for (let M = 0; M < 2; M++) o.stacks[M].getWorldPosition(Te[M]);
      for (; Be > 1;) {
        Be -= 1;
        let M = Te[Kt() < 0.5 ? 0 : 1],
          N = ce.phase === 2;
        (g.spawn({
          pos: M,
          vel: _.set(K(-0.8, 0.8), K(3, 6) * (N ? 1.4 : 1), K(-0.8, 0.8) - 1),
          life: K(0.9, 1.6),
          s0: K(0.45, 0.8),
          s1: K(2, 3.4),
          c0: N ? [0.55, 0.48, 0.46] : [0.92, 0.92, 0.94],
          c1: N ? [0.22, 0.2, 0.22] : [0.72, 0.75, 0.8],
          a0: N ? 0.5 : 0.35,
          a1: 0,
          drag: 1,
          grav: 1.2,
          spin: K(-0.6, 0.6),
          fadeIn: 0.1,
        }),
          N &&
            Kt() < 0.5 &&
            f.spawn({
              pos: M,
              vel: _.set(K(-2, 2), K(4, 9), K(-2, 2)),
              life: K(0.6, 1.4),
              s0: K(0.1, 0.2),
              s1: 0.02,
              c0: [5, 1.6, 0.3],
              c1: [2, 0.3, 0.05],
              a0: 1,
              a1: 0,
              drag: 0.8,
            }));
      }
      if (ce.phase === 2) {
        for (Me += ke * 26; Me > 1;)
          ((Me -= 1),
            f.spawn({
              pos: B.set(
                n.position.x + K(-22, 22),
                K(0, 3),
                n.position.z + K(-26, 4),
              ),
              vel: _.set(K(-0.5, 1.5), K(1.5, 4), K(-0.5, 0.5)),
              life: K(1.5, 3),
              s0: K(0.05, 0.12),
              s1: 0.02,
              c0: [5, 1.8, 0.4],
              c1: [2, 0.4, 0.05],
              a0: 1,
              a1: 0,
              drag: 0.2,
            }));
        Kt() < 0.5 &&
          f.spawn({
            pos: t.bRig.coreW,
            vel: _.set(K(-2, 2), K(1, 4), K(-2, 2)),
            life: K(0.4, 0.8),
            s0: 0.15,
            s1: 0.03,
            c0: [5, 1.8, 0.4],
            c1: [2, 0.3, 0.05],
            a0: 1,
            a1: 0,
          });
      }
      for (le += ke * 14; le > 1;)
        ((le -= 1),
          f.spawn({
            pos: B.set(
              n.position.x + K(-14, 14),
              K(0.3, 7),
              n.position.z + K(-20, 0),
            ),
            vel: _.set(K(-0.3, 0.3), K(-0.1, 0.3), K(-0.3, 0.3)),
            life: K(2, 4),
            s0: K(0.03, 0.06),
            s1: 0.03,
            c0: [2.2, 1.9, 1.4],
            c1: [2.2, 1.9, 1.4],
            a0: 0,
            a1: 0,
            fadeIn: 0,
          }));
    }
    for (let M of f.P) M.a0 === 0 && M.a1;
    (u.update(vt),
      f.update(vt),
      v.update(re),
      g.update(vt),
      m.update(vt),
      E.update(vt),
      A.update(vt));
    {
      let M = f.aCol.array,
        N = 0;
      for (let j of f.P) {
        if (j.a0 === 0 && j.a1 === 0) {
          let J = j.age / j.life;
          M[N * 4 + 3] = Math.sin(J * Math.PI) * 0.7;
        }
        N++;
      }
    }
    for (let M of I) {
      M.t += re;
      let N = Math.min(1, M.t / M.dur);
      M.l.intensity = M.i0 * Math.pow(1 - N, 2);
    }
    for (let M of Oe) {
      if (!M.g.visible) continue;
      M.t += re;
      let N = M.t / M.life;
      ((M.mat.uniforms.uAlpha.value = 0.32 * (1 - N) * (1 - N)),
        N >= 1 && (M.g.visible = !1));
    }
    for (let M = ie.length - 1; M >= 0; M--) {
      let N = ie[M];
      N.t += re;
      let j = N.t / N.dur,
        J = N.size * (0.2 + j * 1.2);
      (N.m.scale.set(J, J, J),
        (N.m.material.uniforms.uAmp.value = N.amp * (1 - j)),
        j >= 1 && (e.distScene.remove(N.m), ie.splice(M, 1)));
    }
    for (let M of ie)
      (M.m.quaternion.copy(n.quaternion), M.m.rotateX(Math.PI / 2));
    xe.uniforms.uAmp.value = 0.012 * ce.overheat + ce.roaring * 0.01;
    for (let M = 0; M < 3; M++) {
      let N = F[M];
      (M < 2
        ? (o.stacks[M].getWorldPosition(N.position),
          (N.position.y += 2),
          N.scale.set(4, 6, 1))
        : (N.position.copy(t.bRig.coreW),
          (N.position.y += 1),
          N.scale.set(5, 5, 1)),
        N.quaternion.copy(n.quaternion));
    }
    let wn = e.U;
    ((wn.uTime.value += re),
      ve > 0
        ? ((wn.uImpact.value = ve > 0.5 ? 1 : 0), (ve -= re / 0.11))
        : (wn.uImpact.value = 0),
      wn.uImpactCenter.value.copy(k),
      (ne = Math.max(0, ne - re * 4.5)),
      (wn.uFlash.value = ne),
      wn.uFlashCol.value.copy(ze),
      (ge = Math.max(0.0012, ge - re * 0.06)),
      (wn.uCA.value = ge),
      (Ce = Math.max(0, Ce - re * 2.4)),
      (wn.uSpeed.value = Ce * Ce * (t.timeScale < 0.9 ? 0.8 : 0.4)),
      we.action === "leap" && we.leapPhase === "rise" && he(),
      (wn.uHeat.value = ce.overheat),
      (ue -= re),
      (Se += ((ue > 0 ? 1 : 0) - Se) * Math.min(1, re * 6)),
      (wn.uLetterbox.value = Se));
  }
  return { update: rs };
}


export { im, im as createParticleSystem };