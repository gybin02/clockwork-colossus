import * as THREE from 'three';
import { Ot, Zp, bt, er, bi, Ei, Ht, Dn } from './shaders.js';
import { Zt } from '../entities/knight-rig.js';


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


function em(s, e, t = 1) {
  let n = er(
      {
        color: 11736876,
        roughness: 0.75,
        metalness: 0,
        sheen: 1,
        sheenColor: new _e(16738922),
        sheenRoughness: 0.5,
      },
      { rim: 1.2, key: "cloth" },
    ),
    i = er(
      {
        color: 1972256,
        roughness: 0.85,
        metalness: 0,
        sheen: 0.3,
        sheenColor: new _e(5914704),
      },
      { rim: 0.7, key: "clothd" },
    ),
    r = er(
      {
        color: 7213088,
        roughness: 0.8,
        metalness: 0,
        sheen: 0.8,
        sheenColor: new _e(13656176),
        side: Ut,
      },
      { rim: 1, key: "tunic" },
    ),
    o = bt(
      { color: 6120816, metalness: 1, roughness: 0.38, envMapIntensity: 0.9 },
      { rim: 1, key: "kdsteel" },
    ),
    a = bt(
      { color: 9345190, metalness: 1, roughness: 0.34, envMapIntensity: 1 },
      { rim: 1.1, key: "ksteel" },
    ),
    c = bt(
      { color: 14725194, metalness: 1, roughness: 0.3, envMapIntensity: 1.2 },
      { rim: 1, key: "kgold" },
    ),
    l = bt(
      { color: 4860954, metalness: 0, roughness: 0.72 },
      { rim: 0.8, key: "leather" },
    ),
    h = new yt({ color: 328711 }),
    d = new yt({ color: new _e(12449535).multiplyScalar(5), toneMapped: !1 }),
    u = (_, x, P, H, O, L, Q = !0) => {
      let Z = new Ae(x, P);
      return (
        H && Z.position.set(...H),
        O && Z.rotation.set(...O),
        L && (typeof L == "number" ? Z.scale.setScalar(L) : Z.scale.set(...L)),
        (Z.castShadow = Q),
        (Z.receiveShadow = !0),
        (Z.frustumCulled = !1),
        _.add(Z),
        Z
      );
    };
  (u(s.hips, new Lt(0.16, 16, 12), i, [0, -0.02, 0], null, [1.05, 0.8, 0.85]),
    u(
      s.hips,
      new ut(0.155, 0.035, 8, 24),
      l,
      [0, 0.04, 0],
      [Math.PI / 2, 0, 0],
      [1, 0.85, 1],
    ),
    u(s.hips, new Wt(0.07, 0.06, 0.03), c, [0, 0.04, 0.135]));
  {
    let _ = Dn(
        [
          [0.26, -0.25],
          [0.225, -0.16],
          [0.185, -0.04],
          [0.165, 0.05],
        ],
        40,
      ),
      x = _.attributes.position;
    for (let P = 0; P < x.count; P++) {
      let H = x.getX(P),
        O = x.getZ(P),
        L = x.getY(P),
        Q = Math.atan2(O, H),
        Z = 1 + Math.sin(Q * 9) * 0.06 * Math.max(0, -L / 0.25);
      (x.setX(P, H * Z), x.setZ(P, O * Z));
    }
    (_.computeVertexNormals(), u(s.hips, _, r, [0, 0, 0], null, [1, 1, 0.9]));
  }
  (u(
    s.hips,
    new Ht(0.2, 0.3, 0.03, 2, 0.012),
    n,
    [0, -0.13, 0.135],
    [0.12, 0, 0],
  ),
    u(
      s.hips,
      new Ht(0.22, 0.3, 0.03, 2, 0.012),
      n,
      [0, -0.13, -0.135],
      [-0.12, 0, 0],
    ),
    u(s.spine, new St(0.13, 0.15, 0.22, 14), i, [0, 0.08, 0]),
    u(
      s.chest,
      new Lt(0.2, 20, 16),
      a,
      [0, 0.02, 0.01],
      null,
      [1.12, 1.15, 0.9],
    ),
    u(
      s.chest,
      new ut(0.18, 0.018, 6, 24, Math.PI),
      c,
      [0, -0.05, 0.03],
      [0, 0, Math.PI],
      [1.2, 1, 1],
    ),
    u(s.chest, new Wt(0.03, 0.2, 0.02), c, [0, 0.03, 0.18]),
    u(
      s.chest,
      Dn(
        [
          [0.3, -0.02],
          [0.27, 0.06],
          [0.2, 0.15],
          [0.11, 0.22],
          [0.09, 0.26],
        ],
        24,
      ),
      n,
      [0, 0, -0.01],
      null,
      [1, 1, 0.82],
    ));
  for (let _ = 0; _ < 2; _++) {
    let x = _ ? 1 : -1,
      P = s.shoulder[_];
    (u(
      P,
      new Lt(0.11, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      a,
      [x * 0.03, 0.02, 0],
      [0, 0, x * -0.35],
      [1.1, 1, 1.1],
    ),
      u(
        P,
        new ut(0.1, 0.012, 6, 18),
        c,
        [x * 0.035, -0, 0],
        [Math.PI / 2, 0, x * -0.35],
        [1.12, 1.12, 1],
      ),
      u(P, new St(0.052, 0.048, Zt.upper, 10), i, [0, -Zt.upper / 2, 0]),
      u(s.elbow[_], new Lt(0.052, 10, 8), a),
      u(
        s.elbow[_],
        Dn(
          [
            [0.058, -Zt.fore + 0.03],
            [0.052, -0.1],
            [0.046, 0],
          ],
          12,
        ),
        l,
      ),
      u(
        s.elbow[_],
        Dn(
          [
            [0.072, -Zt.fore + 0.02],
            [0.074, -Zt.fore + 0.1],
            [0.06, -Zt.fore + 0.12],
          ],
          12,
        ),
        o,
      ),
      u(
        s.elbow[_],
        new ut(0.07, 0.01, 5, 16),
        c,
        [0, -Zt.fore + 0.03, 0],
        [Math.PI / 2, 0, 0],
      ),
      u(s.hand[_], new Lt(0.048, 10, 8), l, [0, -0.02, 0], null, [1, 1.1, 1.2]),
      u(s.thigh[_], new St(0.075, 0.064, Zt.thigh, 12), i, [
        0,
        -Zt.thigh / 2,
        0,
      ]),
      u(s.knee[_], new Lt(0.06, 10, 8), a, [0, 0, 0.02]),
      u(
        s.knee[_],
        Dn(
          [
            [0.062, -Zt.shin + 0.1],
            [0.06, -0.14],
            [0.05, -0.02],
          ],
          12,
        ),
        o,
      ),
      u(
        s.knee[_],
        Dn(
          [
            [0.066, -Zt.shin + 0.02],
            [0.072, -Zt.shin + 0.12],
            [0.064, -Zt.shin + 0.16],
          ],
          12,
        ),
        l,
      ),
      u(s.foot[_], new Ht(0.13, 0.1, 0.26, 2, 0.04), l, [0, -0, 0.05]),
      u(s.foot[_], new Ht(0.14, 0.03, 0.27, 2, 0.012), i, [0, -0.045, 0.05]));
  }
  u(s.head, new Lt(0.125, 16, 12), h, [0, 0.03, 0.01], null, null, !1);
  for (let _ of [-1, 1])
    u(
      s.head,
      new Lt(0.018, 8, 6),
      d,
      [_ * 0.045, 0.045, 0.118],
      null,
      [1, 0.7, 0.5],
      !1,
    );
  {
    let _ = new Lt(
        0.175,
        28,
        20,
        Math.PI / 2 + 0.75,
        Math.PI * 2 - 1.5,
        0,
        Math.PI * 0.78,
      ),
      x = _.attributes.position;
    for (let L = 0; L < x.count; L++) {
      let Q = x.getX(L),
        Z = x.getY(L),
        de = x.getZ(L),
        ve = Math.max(0, -de / 0.175),
        ne = Math.max(0, Z / 0.175);
      if (((de -= ve * ne * ne * 0.12), (Z += ve * ne * 0.05), Z < 0)) {
        let ge = 1 + (-Z / 0.175) * 0.35;
        ((Q *= ge), (de *= ge));
      }
      x.setXYZ(L, Q, Z, de);
    }
    _.computeVertexNormals();
    let P = u(s.head, _, n, [0, 0.04, -0.01], null, [1, 1.08, 1.08]);
    ((P.material = n.clone()),
      (P.material.side = Ut),
      (P.material.onBeforeCompile = n.onBeforeCompile),
      (P.material.customProgramCacheKey = n.customProgramCacheKey),
      (P.material.userData = n.userData));
    let H = new ms(0.08, 0.26, 12, 4);
    H.translate(0, 0.13, 0);
    let O = H.attributes.position;
    for (let L = 0; L < O.count; L++) {
      let Q = O.getY(L);
      O.setZ(L, O.getZ(L) - Q * Q * 1.6);
    }
    (H.computeVertexNormals(),
      u(s.head, H, n, [0, 0.12, -0.15], [-1.05, 0, 0]));
  }
  let f = s.sword;
  (u(f, new St(0.018, 0.02, 0.17, 10), l, [0, 0, 0.015], [Math.PI / 2, 0, 0]),
    u(f, new Lt(0.03, 10, 8), c, [0, 0, -0.08]));
  {
    let _ = new ut(0.14, 0.017, 6, 20, Math.PI * 0.7);
    (_.rotateZ(Math.PI * 0.15 + Math.PI),
      u(f, _, c, [0, 0.11, 0.105], [0, 0, 0], [1, 0.6, 1]),
      u(
        f,
        new Lt(0.024, 8, 6),
        new yt({ color: new _e(8384767).multiplyScalar(3), toneMapped: !1 }),
        [0, 0, 0.105],
      ));
  }
  let v = new Ii(),
    g = Zt.sword - 0.12,
    m = 0.034;
  (v.moveTo(-m, 0),
    v.lineTo(-m * 0.92, g * 0.82),
    v.lineTo(0, g),
    v.lineTo(m * 0.92, g * 0.82),
    v.lineTo(m, 0),
    v.closePath());
  let p = new Hs(v, {
    depth: 0.008,
    bevelEnabled: !0,
    bevelThickness: 0.006,
    bevelSize: 0.01,
    bevelSegments: 1,
  });
  (p.translate(0, 0, -0.004), p.rotateX(Math.PI / 2), u(f, p, a, [0, 0, 0.12]));
  let S = new Ii(),
    E = 0.06;
  (S.moveTo(-E, 0),
    S.lineTo(-E * 0.9, g * 0.82),
    S.lineTo(0, g + 0.05),
    S.lineTo(E * 0.9, g * 0.82),
    S.lineTo(E, 0),
    S.closePath());
  let y = new ea(S);
  y.rotateX(Math.PI / 2);
  let w = new yt({
      color: new _e(9434879).multiplyScalar(2.5),
      transparent: !0,
      opacity: 0,
      blending: $t,
      depthWrite: !1,
      side: Ut,
      toneMapped: !1,
    }),
    A = u(f, y, w, [0, 0, 0.12], null, null, !1),
    I = u(f, y, w, [0, 0, 0.12], [0, 0, Math.PI / 2], null, !1),
    C = new yt({ color: new _e(7334143).multiplyScalar(2.2), toneMapped: !1 });
  u(
    f,
    new Wt(0.008, 0.02, g * 0.6),
    C,
    [0, 0, 0.12 + g * 0.35],
    null,
    null,
    !1,
  );
  let b = 10,
    T = 14,
    D = b * T,
    z = new Float32Array(D * 3),
    G = new Float32Array(D * 3),
    W = (_) => (t * (0.4 + 0.62 * (_ / (T - 1)))) / (b - 1),
    X = 0.073 * t,
    V = new xt(),
    se = new _t(new Float32Array(D * 3), 3);
  se.setUsage(Bi);
  let ee = new Float32Array(D * 2),
    ye = [];
  for (let _ = 0; _ < T; _++)
    for (let x = 0; x < b; x++) {
      let P = _ * b + x;
      ((ee[P * 2] = x / (b - 1)), (ee[P * 2 + 1] = 1 - _ / (T - 1)));
    }
  for (let _ = 0; _ < T - 1; _++)
    for (let x = 0; x < b - 1; x++) {
      let P = _ * b + x,
        H = P + 1,
        O = P + b,
        L = O + 1;
      ye.push(P, O, H, H, O, L);
    }
  (V.setAttribute("position", se),
    V.setAttribute("uv", new _t(ee, 2)),
    V.setIndex(ye));
  let Ee = bi(256, 512, (_, x, P) => {
      let H = _.createLinearGradient(0, 0, 0, P);
      (H.addColorStop(0, "#b3172c"),
        H.addColorStop(1, "#8e0f22"),
        (_.fillStyle = H),
        _.fillRect(0, 0, x, P),
        (_.fillStyle = "#e0b04a"),
        _.fillRect(0, P - 34, x, 10),
        _.fillRect(0, P - 16, x, 5),
        (_.globalAlpha = 0.08));
      for (let O = 0; O < 400; O++)
        ((_.fillStyle = O % 2 ? "#000" : "#fff"),
          _.fillRect(Math.random() * x, Math.random() * P, 1, 6));
      ((_.globalAlpha = 1),
        (_.strokeStyle = "rgba(224,176,74,0.9)"),
        (_.lineWidth = 6),
        _.beginPath(),
        _.arc(x / 2, P * 0.42, 34, 0, Math.PI * 2),
        _.stroke());
      for (let O = 0; O < 8; O++) {
        let L = (O / 8) * Math.PI * 2;
        (_.beginPath(),
          _.moveTo(x / 2 + Math.cos(L) * 34, P * 0.42 + Math.sin(L) * 34),
          _.lineTo(x / 2 + Math.cos(L) * 46, P * 0.42 + Math.sin(L) * 46),
          _.stroke());
      }
      (_.beginPath(),
        _.moveTo(x / 2, P * 0.42 - 60),
        _.lineTo(x / 2, P * 0.42 + 60),
        _.stroke());
    }),
    Ie = er(
      {
        color: 16777215,
        map: Ee,
        roughness: 0.78,
        sheen: 1,
        sheenColor: new _e(16743034),
        sheenRoughness: 0.45,
        side: Ut,
      },
      { rim: 1.25, key: "cape" },
    ),
    Ge = new Ae(V, Ie);
  ((Ge.castShadow = !0), (Ge.receiveShadow = !0), (Ge.frustumCulled = !1));
  let Xe = !1,
    et = new R(),
    tt = new R(),
    oe = new R(),
    me = new R(),
    Pe = new R(),
    De = new R(),
    Oe = new qt();
  function nt() {
    (s.capeAnchor[0].getWorldPosition(tt),
      s.capeAnchor[1].getWorldPosition(et),
      s.chest.getWorldPosition(oe),
      s.hips.getWorldPosition(me),
      s.chest.getWorldQuaternion(Oe),
      Pe.set(0, 0, -1).applyQuaternion(Oe));
  }
  function dt() {
    nt();
    for (let _ = 0; _ < T; _++)
      for (let x = 0; x < b; x++) {
        let P = (_ * b + x) * 3;
        (De.lerpVectors(tt, et, x / (b - 1)),
          De.addScaledVector(Pe, 0.05 + _ * 0.01),
          (De.y -= _ * X),
          (z[P] = G[P] = De.x),
          (z[P + 1] = G[P + 1] = De.y),
          (z[P + 2] = G[P + 2] = De.z));
      }
    Xe = !0;
  }
  let U = [];
  for (let _ = 0; _ < T; _++)
    for (let x = 0; x < b; x++) {
      let P = _ * b + x;
      if (
        (x < b - 1 && U.push(P, P + 1, W(_)),
        _ < T - 1 && U.push(P, P + b, X),
        _ < T - 1 && x < b - 1)
      ) {
        let H = (W(_) + W(_ + 1)) / 2,
          O = Math.hypot(H, X);
        (U.push(P, P + b + 1, O), U.push(P + 1, P + b, O));
      }
      _ < T - 2 && U.push(P, P + 2 * b, X * 2);
    }
  let fe = new Float32Array(U),
    Y = 0;
  function $(_, x, P) {
    ((Y += _), nt());
    let H = -9.8 * _ * _;
    for (let O = 0; O < T; O++)
      for (let L = 0; L < b; L++) {
        let Q = (O * b + L) * 3;
        if (O === 0) continue;
        let Z = z[Q],
          de = z[Q + 1],
          ve = z[Q + 2],
          ne = 0.35 + 0.65 * (O / T),
          ge = (Z - G[Q]) / _,
          Ce = (de - G[Q + 1]) / _,
          Se = (ve - G[Q + 2]) / _,
          ue = (Math.sin(Y * 3.1 + O * 0.7 + L * 0.4) * 0.5 + 0.8) * 1.6,
          ze = Math.sin(Y * 9 + O * 1.3 - L * 0.9) * 2.5 * (O / T),
          k = 1.7 * ne,
          he = k * (x.x * ue - ge) + Pe.x * ze,
          Te = -9.8 + k * (0 - Ce) * 0.6 + Math.sin(Y * 5 + L) * 0.4,
          Be = k * (x.z * ue - Se) + Pe.z * ze,
          Me = Z + (Z - G[Q]) * 0.992 + he * _ * _,
          le = de + (de - G[Q + 1]) * 0.992 + Te * _ * _,
          Le = ve + (ve - G[Q + 2]) * 0.992 + Be * _ * _;
        ((G[Q] = Z),
          (G[Q + 1] = de),
          (G[Q + 2] = ve),
          (z[Q] = Me),
          (z[Q + 1] = le),
          (z[Q + 2] = Le));
      }
    for (let O = 0; O < b; O++) {
      let L = O * 3;
      De.lerpVectors(tt, et, O / (b - 1));
      let Q = Math.sin((O / (b - 1)) * Math.PI) * 0.05;
      (De.addScaledVector(Pe, Q),
        (z[L] = G[L] = De.x),
        (z[L + 1] = G[L + 1] = De.y),
        (z[L + 2] = G[L + 2] = De.z));
    }
    for (let O = 0; O < 4; O++) {
      for (let L = 0; L < fe.length; L += 3) {
        let Q = fe[L] * 3,
          Z = fe[L + 1] * 3,
          de = fe[L + 2],
          ve = z[Z] - z[Q],
          ne = z[Z + 1] - z[Q + 1],
          ge = z[Z + 2] - z[Q + 2],
          Ce = Math.sqrt(ve * ve + ne * ne + ge * ge) || 1e-6,
          Se = (Ce - de) / Ce,
          ue = Q < b * 3,
          ze = Z < b * 3,
          k = ue ? 0 : ze ? 1 : 0.5,
          he = ze ? 0 : ue ? 1 : 0.5;
        ((z[Q] += ve * Se * k),
          (z[Q + 1] += ne * Se * k),
          (z[Q + 2] += ge * Se * k),
          (z[Z] -= ve * Se * he),
          (z[Z + 1] -= ne * Se * he),
          (z[Z + 2] -= ge * Se * he));
      }
      for (let L = b * 3; L < D * 3; L += 3) {
        for (let [ve, ne] of [
          [oe, 0.24 * t],
          [me, 0.21 * t],
        ]) {
          let ge = z[L] - ve.x,
            Ce = z[L + 1] - ve.y,
            Se = z[L + 2] - ve.z,
            ue = Math.sqrt(ge * ge + Ce * Ce + Se * Se);
          if (ue < ne) {
            let ze = ne / (ue || 1e-6);
            ((z[L] = ve.x + ge * ze),
              (z[L + 1] = ve.y + Ce * ze),
              (z[L + 2] = ve.z + Se * ze));
          }
        }
        let Q = z[L] - oe.x,
          Z = z[L + 2] - oe.z,
          de = Q * Pe.x + Z * Pe.z;
        (de < 0.04 &&
          z[L + 1] > me.y - 0.5 &&
          ((z[L] += Pe.x * (0.04 - de) * 0.5),
          (z[L + 2] += Pe.z * (0.04 - de) * 0.5)),
          z[L + 1] < 0.02 && (z[L + 1] = 0.02));
      }
    }
  }
  function te() {
    (se.array.set(z),
      (se.needsUpdate = !0),
      V.computeVertexNormals(),
      V.computeBoundingSphere());
  }
  let ie = 0,
    pe = new R(0.6, 0, 0.4),
    xe = new R(),
    F = new R();
  function B(_, x, P) {
    let H = _.knight;
    if (
      ((w.opacity = Math.min(
        1,
        H.pose.swordGlow * 0.9 +
          (H.action === "attack" ? 0.35 : 0) +
          (H.action === "leap" ? 0.5 : 0),
      )),
      d.color
        .setRGB(0.74, 0.96, 1)
        .multiplyScalar(4 + Math.sin(_.realTime * 3) * 1),
      Xe || (dt(), xe.copy(s.root.position)),
      P > 0)
    ) {
      (F.subVectors(s.root.position, xe).divideScalar(Math.max(1e-4, P)),
        xe.copy(s.root.position),
        (ie += P));
      let O = 0;
      for (; ie >= 1 / 120 && O < 6;) ((ie -= 1 / 120), $(1 / 120, pe, F), O++);
    }
    te();
  }
  return { update: B, cape: Ge, swordGlowMat: w };
}


export { em, em as createKnightView };