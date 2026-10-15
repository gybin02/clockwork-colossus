import * as THREE from 'three';
import { Ot, Zp, bt, er, Ei, Ht, Dn, to, In, eo, $p } from './shaders.js';
import { Mi } from '../core/math.js';


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
const pi = THREE.FrontSide;
const gn = THREE.BackSide;
const Ut = THREE.DoubleSide;


function Qp(s, e) {
  let t = Mi,
    n = (Y) => $p({ nor: e.plateNor, arm: e.plateArm, ...Y }),
    i = bt(
      { color: 14197322, metalness: 1, roughness: 0.4, envMapIntensity: 1.25 },
      {
        rim: 1.1,
        extra: n({
          scale: 0.32,
          normalStrength: 0.55,
          roughBase: 0.34,
          roughVar: 0.5,
          grime: 0.42,
        }),
        key: "brass",
      },
    ),
    r = bt(
      { color: 10514478, metalness: 1, roughness: 0.45, envMapIntensity: 1.1 },
      {
        rim: 0.9,
        extra: n({
          scale: 0.45,
          normalStrength: 0.6,
          roughBase: 0.42,
          roughVar: 0.5,
          grime: 0.5,
        }),
        key: "brassd",
      },
    ),
    o = bt(
      { color: 13136202, metalness: 1, roughness: 0.38, envMapIntensity: 1.2 },
      {
        rim: 1,
        extra: n({
          scale: 0.6,
          normalStrength: 0.4,
          roughBase: 0.36,
          roughVar: 0.45,
          grime: 0.35,
        }),
        key: "copper",
      },
    ),
    a = bt(
      {
        color: 2893603,
        metalness: 0.75,
        roughness: 0.6,
        envMapIntensity: 0.55,
      },
      {
        rim: 0.7,
        extra: n({
          scale: 0.5,
          normalStrength: 0.8,
          roughBase: 0.58,
          roughVar: 0.45,
          grime: 0.4,
        }),
        key: "iron",
      },
    ),
    c = bt(
      { color: 14673130, metalness: 1, roughness: 0.16, envMapIntensity: 1.4 },
      { rim: 1.2, key: "steel" },
    ),
    l = new $n({ color: 789001, metalness: 0.5, roughness: 0.8 }),
    h = new _e(4897023),
    d = new yt({ color: h.clone().multiplyScalar(6), toneMapped: !1 }),
    u = new yt({ color: h.clone().multiplyScalar(2.2), toneMapped: !1 }),
    f = new yt({ color: new _e(16738842).multiplyScalar(0), toneMapped: !1 }),
    v = [],
    g = (Y, $, te, ie, pe, xe) => {
      let F = new Ae($, te);
      return (
        ie && F.position.set(...ie),
        pe && F.rotation.set(...pe),
        xe &&
          (typeof xe == "number" ? F.scale.setScalar(xe) : F.scale.set(...xe)),
        (F.castShadow = !0),
        (F.receiveShadow = !0),
        Y.add(F),
        v.push(F),
        F
      );
    },
    m = [],
    p = s.chest,
    E = g(
      p,
      Dn(
        [
          [0.01, -2.25],
          [1.2, -2.25],
          [1.55, -2.1],
          [1.72, -1.5],
          [1.95, -0.6],
          [2.2, 0.4],
          [2.38, 1.1],
          [2.35, 1.55],
          [2.1, 1.95],
          [1.55, 2.2],
          [0.01, 2.25],
        ],
        40,
      ),
      i,
      [0, 0, 0],
      null,
      [1, 1, 0.8],
    );
  (g(
    p,
    new ut(1.92, 0.11, 8, 48),
    a,
    [0, -0.62, 0],
    [Math.PI / 2, 0, 0],
    [1, 0.8, 1],
  ),
    g(
      p,
      new ut(2.33, 0.12, 8, 56),
      a,
      [0, 1.2, 0],
      [Math.PI / 2, 0, 0],
      [1, 0.8, 1],
    ),
    g(
      p,
      new ut(1.62, 0.13, 8, 48),
      a,
      [0, -1.85, 0],
      [Math.PI / 2, 0, 0],
      [1, 0.8, 1],
    ),
    g(p, eo({ rx: 2, rz: 1.62, y: -0.35, n: 40, size: 0.075 }), r),
    g(p, eo({ rx: 2.4, rz: 1.95, y: 0.95, n: 48, size: 0.08 }), r));
  for (let Y of [-1, 1]) {
    let $ = new ht();
    ($.position.set(Y * 1.85, -0.4, 0.95),
      $.rotation.set(0, Y * 0.75, 0),
      p.add($));
    for (let te = 0; te < 4; te++)
      g($, new Wt(0.7, 0.07, 0.12), a, [0, 0.35 - te * 0.2, 0.05]);
    g($, new Ht(0.9, 1, 0.12, 2, 0.04), r, [0, 0.05, -0.04]);
  }
  {
    let Y = g(
      p,
      new ut(1.8, 0.05, 6, 64),
      u,
      [0, -1.2, 0],
      [Math.PI / 2, 0, 0],
      [1, 0.8, 1],
    );
    Y.castShadow = !1;
  }
  {
    let Y = g(
      p,
      new ut(2.36, 0.045, 6, 64),
      u,
      [0, 0.62, 0],
      [Math.PI / 2, 0, 0],
      [1, 0.8, 1],
    );
    Y.castShadow = !1;
  }
  g(
    p,
    new ut(1.45, 0.3, 10, 40),
    a,
    [0, 1.95, 0.05],
    [Math.PI / 2, 0, 0],
    [1, 0.82, 1],
  );
  let y = new ht();
  (y.position.set(0, t.coreY, t.coreZ),
    p.add(y),
    g(
      y,
      new St(1, 1.05, 0.7, 40, 1, !0),
      l,
      [0, 0, -0.15],
      [Math.PI / 2, 0, 0],
    ),
    g(y, new ut(1.08, 0.16, 12, 48), i, [0, 0, 0.18]));
  let w = new ht();
  ((w.position.z = 0.22),
    y.add(w),
    g(w, new Di(1.2, 1.62, 60), a, [0, 0, -0.04]),
    g(w, new ut(1.62, 0.09, 8, 60), i));
  let A = [];
  for (let Y = 0; Y < 12; Y++) {
    let $ = (Y / 12) * Math.PI * 2,
      te = Y % 3 === 0,
      ie = new Wt(te ? 0.16 : 0.08, te ? 0.32 : 0.2, 0.08);
    (ie.translate(0, 1.4, 0), ie.rotateZ($), A.push(ie));
  }
  g(w, Ei(A), i);
  let I = new ht();
  (w.add(I), g(I, new Wt(0.12, 1.15, 0.05), r, [0, 0.55, 0.08]));
  let C = new ht();
  (w.add(C), g(C, new Wt(0.08, 1.5, 0.05), r, [0, 0.75, 0.1]));
  for (let Y = 0; Y < 2; Y++)
    g(y, new Wt(Y ? 2.1 : 0.07, Y ? 0.07 : 2.1, 0.07), r, [0, 0, 0.62]);
  let b = new Mt({
      uniforms: {
        uTime: Ot.uTime,
        uCol: { value: new _e(4253439) },
        uCol2: { value: new _e(14221311) },
        uPow: { value: 4 },
        uFlash: { value: 0 },
      },
      vertexShader:
        "varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ vP = position; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }",
      fragmentShader: `uniform float uTime; uniform vec3 uCol; uniform vec3 uCol2; uniform float uPow; uniform float uFlash; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,37.719)))*43758.5453); }
      float n3(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
      void main(){
        float f = 1.0 - max(dot(vN, vV), 0.0);
        vec3 p = vP * 2.4;
        float n = n3(p + vec3(0.0, uTime * 1.6, uTime * 0.7)) * 0.6 + n3(p * 2.3 - vec3(uTime * 2.1, 0.0, uTime)) * 0.4;
        float swirl = smoothstep(0.35, 0.85, n);
        float center = pow(max(dot(vN, vV), 0.0), 3.0);
        vec3 c = mix(uCol, uCol2, center * 0.8 + swirl * 0.5) * (uPow * (0.55 + 0.6 * swirl + 0.9 * center)) + uCol * f * uPow * 1.2;
        c += vec3(uFlash) * 1.2;
        gl_FragColor = vec4(c, 1.0);
      }`,
      toneMapped: !1,
    }),
    T = new Ae(new Lt(0.74, 40, 28), b);
  y.add(T);
  let D = new Ae(
    new Lt(1.05, 24, 16),
    new yt({
      color: new _e(4253439).multiplyScalar(0.6),
      transparent: !0,
      opacity: 0.35,
      blending: $t,
      depthWrite: !1,
      side: gn,
      toneMapped: !1,
    }),
  );
  y.add(D);
  let z = g(
    p,
    In({
      rOut: 1.75,
      rRoot: 1.52,
      teeth: 20,
      depth: 0.32,
      hole: 0.3,
      spokes: 5,
    }),
    i,
    [0, 0.35, -1.62],
  );
  m.push({ obj: z, axis: "z", speed: -0.6 });
  let G = g(
    p,
    In({
      rOut: 0.95,
      rRoot: 0.8,
      teeth: 12,
      depth: 0.28,
      hole: 0.18,
      spokes: 4,
    }),
    o,
    [1.35, -1, -1.45],
  );
  (m.push({ obj: G, axis: "z", speed: 1.2 }),
    g(
      p,
      new St(0.28, 0.28, 0.5, 16),
      a,
      [0, 0.35, -1.72],
      [Math.PI / 2, 0, 0],
    ));
  let W = [];
  for (let Y of [-1, 1]) {
    let $ = new ht();
    ($.position.set(Y * 1.05, 1.45, -1.2),
      $.rotation.set(-0.38, 0, Y * -0.12),
      p.add($),
      g($, new St(0.34, 0.42, 2.6, 18), o, [0, 1.3, 0]),
      g($, new St(0.58, 0.36, 0.55, 18, 1, !0), o, [0, 2.75, 0]),
      g($, new ut(0.4, 0.07, 8, 20), a, [0, 1, 0], [Math.PI / 2, 0, 0]),
      g($, new ut(0.37, 0.07, 8, 20), a, [0, 2.1, 0], [Math.PI / 2, 0, 0]));
    let te = g($, new Pi(0.42, 18), f, [0, 2.9, 0], [-Math.PI / 2, 0, 0]);
    te.castShadow = !1;
    let ie = new Ne();
    (ie.position.set(0, 3.05, 0), $.add(ie), W.push(ie));
  }
  let X = [];
  for (let Y of [-1, 1]) {
    let $ = new ht();
    ($.position.set(Y * 0.95, 1.55, -1.55),
      p.add($),
      g($, new Ht(1, 0.16, 1.1, 2, 0.05), r, [0, 0, -0.45]),
      X.push($));
  }
  let V = s.head,
    se = Dn(
      [
        [0.01, -0.55],
        [0.75, -0.55],
        [0.92, -0.2],
        [0.95, 0.25],
        [0.82, 0.7],
        [0.55, 1],
        [0.01, 1.08],
      ],
      32,
    );
  (g(V, se, i, [0, 0.35, 0], null, [1, 1, 0.95]),
    g(V, new Ht(1.7, 0.32, 0.6, 2, 0.08), a, [0, 0.82, 0.62], [0.35, 0, 0]),
    g(V, new ut(0.36, 0.1, 10, 28), a, [0, 0.45, 0.86]));
  let ee = g(V, new Lt(0.3, 24, 16), d, [0, 0.45, 0.8], null, [1, 1, 0.6]);
  ee.castShadow = !1;
  let ye = g(
    V,
    In({
      rOut: 0.52,
      rRoot: 0.46,
      teeth: 16,
      depth: 0.08,
      hole: 0.38,
      bevel: 0.01,
    }),
    r,
    [0, 0.45, 0.88],
  );
  m.push({ obj: ye, axis: "z", speed: 0.8 });
  for (let Y = -3; Y <= 3; Y++)
    g(V, new Wt(0.08, 0.5, 0.1), a, [
      Y * 0.16,
      -0.05,
      0.86 - Math.abs(Y) * 0.03,
    ]);
  (g(V, new Wt(1.25, 0.12, 0.2), r, [0, 0.22, 0.86]),
    g(V, new Wt(1.15, 0.12, 0.2), r, [0, -0.32, 0.83]));
  let Ee = g(
    V,
    In({ rOut: 0.95, rRoot: 0.8, teeth: 12, depth: 0.2, hole: 0, bevel: 0.02 }),
    r,
    [0, 1.05, -0.15],
    [0, Math.PI / 2, 0],
  );
  m.push({ obj: Ee, axis: "z", speed: 0.35 });
  for (let Y of [-1, 1])
    (g(
      V,
      to(
        [
          [Y * 0.8, 0.5, 0.1],
          [Y * 1.25, 0.9, 0],
          [Y * 1.45, 1.55, -0.3],
          [Y * 1.35, 2.1, -0.7],
        ],
        0.13,
        20,
        10,
      ),
      o,
    ),
      g(
        V,
        new St(0.2, 0.13, 0.3, 12),
        o,
        [Y * 1.33, 2.15, -0.75],
        [-0.6, 0, Y * 0.2],
      ));
  let Ie = s.torso;
  (g(Ie, new St(1.25, 1.35, 0.55, 28), a, [0, -0.05, 0], null, [1, 1, 0.82]),
    g(Ie, new St(1.38, 1.25, 0.5, 28), r, [0, 0.45, 0], null, [1, 1, 0.82]));
  let Ge = g(
    Ie,
    In({ rOut: 1.62, rRoot: 1.46, teeth: 24, depth: 0.18, hole: 1 }),
    i,
    [0, 0.18, 0],
    [Math.PI / 2, 0, 0],
    [1, 0.82, 1],
  );
  m.push({ obj: Ge, axis: "z", speed: 0.5 });
  for (let Y of [-1, 1])
    g(Ie, new St(0.11, 0.11, 1.6, 10), o, [Y * 0.8, 0.2, -1.05]);
  let Xe = s.pelvis;
  (g(
    Xe,
    Dn(
      [
        [0.01, -0.9],
        [1.25, -0.9],
        [1.75, -0.45],
        [1.85, 0.05],
        [1.6, 0.45],
        [0.01, 0.5],
      ],
      32,
    ),
    a,
    [0, 0, 0],
    null,
    [1, 1, 0.8],
  ),
    g(
      Xe,
      new ut(1.8, 0.12, 8, 40),
      r,
      [0, 0, 0],
      [Math.PI / 2, 0, 0],
      [1, 0.8, 1],
    ));
  for (let Y = 0; Y < 7; Y++) {
    let $ = -1.5 + (Y / 6) * 3,
      te = new ht();
    (te.position.set(Math.sin($) * 1.75, -0.15, Math.cos($) * 1.4),
      te.rotation.set(0.32, $, 0),
      Xe.add(te),
      g(te, new Ht(0.85, 1.3, 0.14, 2, 0.05), r, [0, -0.55, 0]),
      g(
        te,
        eo({ rx: 1e-4, rz: 0.08, y: 0, n: 1, size: 0.07 }),
        r,
        [0, -0.05, 0],
      ));
  }
  for (let Y = 0; Y < 2; Y++) {
    let $ = s.hip[Y];
    g($, new Lt(0.78, 24, 16), r);
    let te = g(
      $,
      In({ rOut: 0.95, rRoot: 0.83, teeth: 14, depth: 0.16, hole: 0.3 }),
      a,
      [(Y ? 1 : -1) * 0.45, 0, 0],
      [0, Math.PI / 2, 0],
    );
    m.push({ obj: te, axis: "z", speed: Y ? 0.9 : -0.9 });
  }
  for (let Y = 0; Y < 2; Y++) {
    let $ = Y ? 1 : -1,
      te = s.thigh[Y];
    (g(te, new St(0.62, 0.5, t.thigh, 20), a, [0, -t.thigh / 2, 0]),
      g(te, new St(0.72, 0.6, t.thigh * 0.7, 20, 1, !0, -1.2, 2.4), o, [
        0,
        -t.thigh * 0.42,
        0.05,
      ]),
      g(te, new St(0.1, 0.1, t.thigh * 0.8, 8), o, [0, -t.thigh * 0.5, -0.62]));
    let ie = s.shin[Y];
    g(ie, new Lt(0.66, 20, 14), r);
    {
      let F = g(
        ie,
        new ut(0.67, 0.04, 6, 32),
        u,
        [0, 0, 0],
        [0, Math.PI / 2, 0],
      );
      F.castShadow = !1;
    }
    let pe = g(
      ie,
      In({ rOut: 0.78, rRoot: 0.68, teeth: 12, depth: 0.16, hole: 0.2 }),
      i,
      [$ * 0.42, 0, 0],
      [0, Math.PI / 2, 0],
    );
    (m.push({ obj: pe, axis: "z", speed: 0.7 * $ }),
      g(
        ie,
        Dn(
          [
            [0.82, -1.95],
            [0.84, -1.72],
            [0.64, -1.25],
            [0.56, -0.5],
            [0.5, 0],
          ],
          24,
        ),
        r,
        [0, -0.05, 0],
      ),
      g(ie, new ut(0.6, 0.08, 8, 24), a, [0, -0.7, 0], [Math.PI / 2, 0, 0]),
      g(ie, new ut(0.68, 0.08, 8, 24), a, [0, -1.3, 0], [Math.PI / 2, 0, 0]),
      g(ie, new Ht(0.75, 0.9, 0.3, 2, 0.1), i, [0, -0.1, 0.62], [-0.2, 0, 0]));
    let xe = s.foot[Y];
    (g(xe, new Lt(0.55, 16, 12), a, [0, 0.05, 0]),
      g(xe, new Ht(1.55, 0.6, 2.4, 3, 0.2), a, [0, -0.22, 0.35]));
    for (let F = -1; F <= 1; F++)
      g(
        xe,
        new Ht(0.42, 0.42, 0.55, 2, 0.12),
        i,
        [F * 0.5, -0.3, 1.55],
        [0.15, 0, 0],
      );
    g(xe, new Ht(1.6, 0.18, 1.6, 2, 0.06), r, [0, 0.1, 0.3]);
  }
  let et = [],
    tt = [],
    oe = () =>
      new yt({
        color: new _e(16742954).multiplyScalar(3),
        transparent: !0,
        opacity: 0,
        blending: $t,
        depthWrite: !1,
        toneMapped: !1,
        side: Ut,
      });
  for (let Y = 0; Y < 2; Y++) {
    let $ = Y ? 1 : -1,
      te = s.shoulder[Y];
    g(te, new Lt(1.12, 28, 20), a);
    {
      let L = g(
        te,
        new ut(1.13, 0.045, 6, 48),
        u,
        [0, 0, 0],
        [0, Math.PI / 2, 0],
      );
      L.castShadow = !1;
    }
    let ie = new ht();
    (ie.position.set($ * 0.15, 0.35, 0),
      ie.rotation.set(0, 0, $ * -0.35),
      te.add(ie),
      g(
        ie,
        new Lt(1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.42),
        i,
        [0, -0.2, 0],
        null,
        [1, 0.9, 1.05],
      ),
      g(
        ie,
        new ut(1.36, 0.1, 8, 40),
        r,
        [0, 0.2, 0],
        [Math.PI / 2, 0, 0],
        [1, 1.05, 1],
      ),
      g(ie, eo({ rx: 1.12, rz: 1.18, y: 0.58, n: 22, size: 0.07 }), r));
    let pe = g(
      ie,
      In({
        rOut: 0.85,
        rRoot: 0.73,
        teeth: 12,
        depth: 0.2,
        hole: 0.18,
        spokes: 4,
      }),
      o,
      [$ * 1.3, -0.15, 0],
      [0, Math.PI / 2, 0],
    );
    m.push({ obj: pe, axis: "z", speed: 1.1 * $ });
    let xe = s.upper[Y];
    (g(xe, new St(0.55, 0.5, t.upper, 18), a, [0, -t.upper / 2, 0]),
      g(xe, new St(0.72, 0.68, 0.7, 20), i, [0, -0.95, 0]));
    {
      let L = g(
        xe,
        new ut(0.585, 0.04, 6, 32),
        u,
        [0, -1.6, 0],
        [Math.PI / 2, 0, 0],
      );
      L.castShadow = !1;
    }
    g(xe, new St(0.68, 0.64, 0.5, 20), r, [0, -2.2, 0]);
    for (let L of [-1, 1])
      (g(xe, new St(0.13, 0.13, 2, 10), o, [0, -1.6, L * 0.62]),
        g(xe, new St(0.2, 0.2, 0.7, 10), a, [0, -2.35, L * 0.62]));
    let F = s.fore[Y],
      B = g(
        F,
        In({ rOut: 0.95, rRoot: 0.82, teeth: 14, depth: 0.5, hole: 0.2 }),
        r,
        [0, 0, 0],
        [0, Math.PI / 2, 0],
      );
    (m.push({ obj: B, axis: "z", speed: -0.6 * $ }),
      g(
        F,
        Dn(
          [
            [1, -2.55],
            [1.08, -2.3],
            [0.98, -1.4],
            [0.82, -0.3],
            [0.62, 0],
          ],
          28,
        ),
        r,
      ));
    {
      let L = g(
        F,
        new ut(1.1, 0.05, 6, 40),
        u,
        [0, -2.38, 0],
        [Math.PI / 2, 0, 0],
      );
      L.castShadow = !1;
    }
    {
      let L = g(
        F,
        new ut(0.88, 0.04, 6, 40),
        u,
        [0, -0.55, 0],
        [Math.PI / 2, 0, 0],
      );
      L.castShadow = !1;
    }
    (g(F, new ut(0.9, 0.1, 8, 28), a, [0, -0.9, 0], [Math.PI / 2, 0, 0]),
      g(F, new ut(1.06, 0.11, 8, 28), a, [0, -2.1, 0], [Math.PI / 2, 0, 0]),
      g(F, eo({ rx: 1.02, rz: 1.02, y: -1.55, n: 20, size: 0.075 }), r));
    let _ = s.fist[Y];
    g(_, new Ht(1.75, 1.45, 1.65, 3, 0.28), a, [0, 0.05, 0]);
    for (let L = -1; L <= 1; L++)
      g(_, new Ht(0.48, 0.42, 0.62, 2, 0.12), i, [L * 0.55, -0.68, 0.15]);
    g(_, new Ht(1.85, 0.3, 1.75, 2, 0.1), r, [0, 0.62, 0]);
    let x = new ht();
    s.blade[Y].add(x);
    let P = g(
        x,
        In({
          rOut: 1.45,
          rRoot: 1.18,
          teeth: 26,
          depth: 0.08,
          hole: 0.22,
          sharp: !0,
          bevel: 0,
          spokes: 6,
        }),
        c,
        [0, 0, 0],
        [0, Math.PI / 2, 0],
      ),
      H = g(x, new St(0.32, 0.32, 0.26, 16), i, [0, 0, 0], [0, 0, Math.PI / 2]),
      O = new Ae(new Di(1.15, 1.5, 48), oe());
    ((O.rotation.y = Math.PI / 2),
      x.add(O),
      et.push({ group: x, disc: P, sx: $ }),
      tt.push(O));
  }
  s.root.traverse((Y) => {
    Y.isMesh && (Y.frustumCulled = !1);
  });
  let me = new Fi(4253439, 20, 13, 1.8);
  (y.add(me), (me.position.z = 1.2));
  let Pe = new Fi(4253439, 6, 8, 2);
  (V.add(Pe), Pe.position.set(0, 0.45, 1.6));
  let De = new _e(4175103),
    Oe = new _e(16733208),
    nt = new _e(16757594),
    dt = new _e(10476799),
    U = new _e();
  function fe(Y, $, te) {
    let ie = Y.boss,
      pe = ie.overheat,
      xe = ie.gear;
    for (let B of m) B.obj.rotation[B.axis] = xe * B.speed * 1.6;
    ((C.rotation.z = -xe * 2.4),
      (I.rotation.z = -xe * 0.2),
      (w.rotation.z = ie.pose.coreOpen * 0.2 * Math.sin(te * 8)),
      U.copy(De).lerp(Oe, pe),
      b.uniforms.uCol.value.copy(U),
      b.uniforms.uCol2.value.copy(dt).lerp(nt, pe));
    let F = 1 + Math.sin(te * (4 + pe * 6)) * 0.15;
    ((b.uniforms.uPow.value = (1.25 + ie.pose.coreOpen * 0.9 + pe * 0.7) * F),
      (b.uniforms.uFlash.value = ie.coreFlash),
      D.material.color
        .copy(U)
        .multiplyScalar(0.3 + ie.pose.coreOpen * 0.35 + ie.coreFlash * 0.6),
      me.color.copy(U),
      (me.intensity =
        (14 + ie.pose.coreOpen * 12 + pe * 14 + ie.coreFlash * 50) * F),
      d.color.copy(U).multiplyScalar(5 + pe * 3),
      Pe.color.copy(U),
      u.color
        .copy(U)
        .multiplyScalar(2.6 + Math.sin(te * 5) * 0.6 + ie.coreFlash * 1.2),
      f.color.setRGB(1, 0.35, 0.08).multiplyScalar(pe * 4 + ie.roaring * 4));
    for (let B = 0; B < 2; B++) X[B].rotation.x = -ie.pose.hatch * 1.1;
    for (let B = 0; B < 2; B++) {
      let _ = et[B],
        x = ie.pose.blade[B];
      ((_.group.position.x = _.sx * (-0.35 + x * 0.55)),
        _.group.scale.setScalar(0.72 + x * 0.28),
        (_.disc.rotation.z = ie.bladeSpin[B]),
        (tt[B].material.opacity =
          Math.min(1, Math.abs(ie.bladeSpinV[B]) / 30) * (0.25 + pe * 0.75)));
    }
  }
  return {
    update: fe,
    coreMesh: T,
    coreGroup: y,
    stacks: W,
    mats: { brass: i, iron: a, copper: o, steel: c },
    coreLight: me,
    blades: et,
  };
}

export { Qp, Qp as createBossView };