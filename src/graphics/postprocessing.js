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

function nm(s, e, t, n, i) {
  let r = new ln(n, i, { type: sn, samples: 4 }),
    o = new Oc(s, r);
  (o.setPixelRatio(1), o.setSize(n, i));
  let a = new Bc(e, t);
  o.addPass(a);
  let c = new Ms({
    uniforms: { tDiffuse: { value: null } },
    vertexShader:
      "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader:
      "uniform sampler2D tDiffuse; varying vec2 vUv; void main(){ vec4 c = texture2D(tDiffuse, vUv); if (any(isnan(c)) || any(isinf(c))) c = vec4(0.0, 0.0, 0.0, 1.0); gl_FragColor = vec4(min(c.rgb, vec3(200.0)), 1.0); }",
  });
  o.addPass(c);
  let l = new Ms({
    uniforms: {
      tDiffuse: { value: null },
      uSun: { value: new ae(0.3, 0.5) },
      uStr: { value: 0.2 },
      uAspect: { value: n / i },
      uVis: { value: 1 },
      uTint: { value: new _e(1, 0.82, 0.55) },
    },
    vertexShader:
      "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uStr; uniform float uAspect; uniform float uVis; uniform vec3 uTint; varying vec2 vUv;
      float h12(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
      void main(){
        vec4 base = texture2D(tDiffuse, vUv);
        vec2 d = (uSun - vUv);
        float dist = length(d * vec2(uAspect, 1.0));
        const int N = 36;
        vec2 stepv = d / float(N) * 0.85;
        vec2 p = vUv + stepv * h12(vUv * 913.0);
        float acc = 0.0, w = 1.0;
        for (int i = 0; i < N; i++) {
          vec3 c = texture2D(tDiffuse, p).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          acc += smoothstep(1.3, 3.0, l) * w;
          w *= 0.955;
          p += stepv;
        }
        acc /= float(N);
        float fall = exp(-dist * 1.6);
        gl_FragColor = vec4(base.rgb + uTint * acc * uStr * fall * uVis * 3.0, base.a);
      }`,
  });
  o.addPass(l);
  let h = new so(new ae(n / 2, i / 2), 0.36, 0.5, 1.4);
  o.addPass(h);
  let d = new Ms(Vy);
  (d.uniforms.uRes.value.set(n, i), o.addPass(d));
  let u = new ln(Math.round(n / 2), Math.round(i / 2), { type: sn }),
    f = new Us();
  d.uniforms.tDistort.value = u.texture;
  function v() {
    (s.setRenderTarget(u),
      s.setClearColor(0, 0),
      s.clear(),
      s.render(f, t),
      s.setRenderTarget(null),
      o.render());
  }
  return {
    composer: o,
    bloom: h,
    fin: d,
    rays: l,
    U: d.uniforms,
    distScene: f,
    render: v,
  };
}
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

export { nm, nm as createPostProcessing };
