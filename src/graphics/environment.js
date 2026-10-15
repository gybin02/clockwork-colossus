import * as THREE from 'three';
import { Ot, Zp, bt, er, bi, Au, Uc, Ei, Kp, Jp, Ru, Ht, In, Dn, eo, to, $p, tr, Nc, zy, ba, By, Qt, ct, je } from './shaders.js';


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
const Ut = THREE.DoubleSide;


function jp(s, e, t) {
  let n = new ht();
  s.add(n);
  let i = [],
    r = Math.atan2(tr.z, tr.x),
    o = By - r;
  ((t.sky.mapping = Ys),
    (t.sky.colorSpace = zt),
    (s.background = t.sky),
    (s.backgroundIntensity = 0.95),
    s.backgroundRotation.set(0, o, 0));
  let a = new Jr(e);
  t.hdr.mapping = Ys;
  let c = a.fromEquirectangular(t.hdr);
  ((s.environment = c.texture),
    (s.environmentIntensity = 0.85),
    s.environmentRotation.set(0, o, 0),
    (s.fog = new No(11847384, 0.0019)));
  let l = new vs(16768174, 3.4);
  (l.position.copy(tr).multiplyScalar(70),
    (l.castShadow = !0),
    l.shadow.mapSize.set(4096, 4096));
  let h = l.shadow.camera;
  ((h.left = -27),
    (h.right = 27),
    (h.top = 27),
    (h.bottom = -27),
    (h.near = 10),
    (h.far = 160),
    (l.shadow.bias = -3e-4),
    (l.shadow.normalBias = 0.035),
    s.add(l, l.target));
  let d = new vs(12571903, 0.55);
  (d.position.set(0.4, 0.5, 1).multiplyScalar(50), s.add(d));
  let u = new ra(13624319, 7035452, 0.35);
  s.add(u);
  let f = (() => {
      let B = document.createElement("canvas");
      B.width = B.height = 512;
      let _ = B.getContext("2d"),
        x = _.createImageData(512, 512);
      for (let H = 0; H < 512; H++)
        for (let O = 0; O < 512; O++) {
          let L = (O / 512) * 2 - 1,
            Q = (H / 512) * 2 - 1,
            Z = Math.hypot(L, Q),
            de = ba(O * 0.018 + 3, H * 0.018 + 7),
            ve = ba(O * 0.05 + 11, H * 0.05 + 2),
            ne = 0.78 + (de - 0.5) * 0.55 + (ve - 0.5) * 0.18,
            ge = Math.exp(-Math.pow((Z - 0.42) / 0.16, 2)) * 0.18;
          ((ne += ge), (ne -= Math.max(0, Z - 0.85) * 1.2));
          let Ce = Math.max(0, ve - 0.55) * 1.6 * Math.min(1, Z * 1.4),
            Se = (H * 512 + O) * 4;
          ((x.data[Se] = Math.max(
            0,
            Math.min(255, 128 * ne * (1 - Ce * 0.35)),
          )),
            (x.data[Se + 1] = Math.max(
              0,
              Math.min(255, 128 * ne * (1 + Ce * 0.12)),
            )),
            (x.data[Se + 2] = Math.max(
              0,
              Math.min(255, 128 * ne * (1 - Ce * 0.45)),
            )),
            (x.data[Se + 3] = 255));
        }
      _.putImageData(x, 0, 0);
      let P = new Os(B);
      return ((P.colorSpace = Bn), P);
    })(),
    v = bt(
      {
        map: t.floorDiff,
        normalMap: t.floorNor,
        roughnessMap: t.floorArm,
        aoMap: t.floorArm,
        aoMapIntensity: 1,
        roughness: 1,
        metalness: 0,
        normalScale: new ae(1.4, 1.4),
        color: 14866632,
        envMapIntensity: 0.55,
      },
      {
        rim: 0.2,
        key: "floor",
        extra: (F) => {
          ((F.uniforms.tMacro = { value: f }),
            (F.vertexShader =
              `varying vec2 vMacro;
` +
              F.vertexShader.replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
 vMacro = position.xy / ${(Qt + 0.6).toFixed(2)} * 0.5 + 0.5;`,
              )),
            (F.fragmentShader =
              `uniform sampler2D tMacro; varying vec2 vMacro;
` +
              F.fragmentShader.replace(
                "#include <map_fragment>",
                `#include <map_fragment>
        vec3 mac = texture2D(tMacro, vMacro).rgb * 2.0;
        diffuseColor.rgb *= mac;
        diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(0.3,0.59,0.11))), diffuseColor.rgb, 1.25);`,
              )));
        },
      },
    ),
    g = new Pi(Qt + 0.6, 160);
  {
    let F = g.attributes.uv,
      B = g.attributes.position;
    for (let _ = 0; _ < F.count; _++)
      F.setXY(_, B.getX(_) / 2.6, B.getY(_) / 2.6);
  }
  let m = new Ae(g, v);
  ((m.rotation.x = -Math.PI / 2), (m.receiveShadow = !0), n.add(m));
  let p = bi(
      2048,
      2048,
      (F, B) => {
        let _ = B / 2,
          x = _ / (Qt + 0.6);
        F.clearRect(0, 0, B, B);
        let P = (L, Q, Z) => {
          (F.beginPath(),
            F.arc(_, _, Q * x, 0, Math.PI * 2),
            F.arc(_, _, L * x, 0, Math.PI * 2, !0),
            (F.fillStyle = Z),
            F.fill("evenodd"));
        };
        (P(16.4, 17.15, "rgba(214,160,72,1)"),
          P(15.95, 16.08, "rgba(214,160,72,1)"),
          P(3.9, 4.35, "rgba(214,160,72,1)"),
          P(4.6, 4.68, "rgba(214,160,72,1)"),
          F.save(),
          F.translate(_, _));
        for (let L = 0; L < 60; L++) {
          (F.save(),
            F.rotate((L / 60) * Math.PI * 2),
            (F.fillStyle = "rgba(214,160,72,1)"));
          let Q = L % 5 === 0;
          (F.fillRect(
            -(Q ? 0.16 : 0.06) * x,
            -16.35 * x,
            (Q ? 0.32 : 0.12) * x,
            (Q ? 1.1 : 0.4) * x,
          ),
            F.restore());
        }
        let H = [
          "XII",
          "I",
          "II",
          "III",
          "IIII",
          "V",
          "VI",
          "VII",
          "VIII",
          "IX",
          "X",
          "XI",
        ];
        ((F.font = `bold ${Math.round(1.6 * x)}px "Cinzel", Georgia, serif`),
          (F.textAlign = "center"),
          (F.textBaseline = "middle"));
        for (let L = 0; L < 12; L++)
          (F.save(),
            F.rotate((L / 12) * Math.PI * 2 + Math.PI),
            F.translate(0, 13.9 * x),
            F.rotate(Math.PI),
            (F.fillStyle = "rgba(214,160,72,1)"),
            F.fillText(H[L], 0, 0),
            F.restore());
        F.fillStyle = "rgba(214,160,72,0.95)";
        let O = (L, Q, Z) => {
          (F.save(),
            F.rotate(L),
            F.beginPath(),
            F.moveTo(-Z * x, -4.6 * x),
            F.lineTo(0, -Q * x),
            F.lineTo(Z * x, -4.6 * x),
            F.closePath(),
            F.fill(),
            F.restore());
        };
        (O(-Math.PI * 0.32, 11.5, 0.5),
          O(Math.PI * 0.36, 14.8, 0.32),
          F.restore());
      },
      { srgb: !0 },
    ),
    S = bt(
      {
        map: p,
        transparent: !0,
        metalness: 0.9,
        roughness: 0.35,
        color: 16777215,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        envMapIntensity: 1.2,
        normalMap: t.floorNor,
        normalScale: new ae(0.3, 0.3),
      },
      { rim: 0.4, key: "inlay" },
    ),
    E = new Ae(new mn((Qt + 0.6) * 2, (Qt + 0.6) * 2), S);
  ((E.rotation.x = -Math.PI / 2),
    (E.position.y = 0.012),
    (E.receiveShadow = !0),
    n.add(E));
  let y = bt(
      {
        map: t.cliffDiff,
        normalMap: t.cliffNor,
        roughnessMap: t.cliffArm,
        aoMap: t.cliffArm,
        color: 15259328,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 0.7,
      },
      { rim: 0.6, key: "rock" },
    ),
    w = (F, B, _ = 64, x = 28, P = 0.12) => {
      let H = [];
      for (let Z = 0; Z <= x; Z++) {
        let de = Z / x,
          ve = -B * (1 - de),
          ne =
            F *
            (0.04 + 0.96 * Math.pow(de, 0.55)) *
            (de > 0.96 ? 1 - (de - 0.96) * 0.6 : 1);
        H.push([ne, ve]);
      }
      let O = Dn(H, _),
        L = O.attributes.position,
        Q = O.attributes.uv;
      for (let Z = 0; Z < L.count; Z++) {
        let de = L.getX(Z),
          ve = L.getY(Z),
          ne = L.getZ(Z),
          ge = Math.atan2(ne, de),
          Ce = ba(ge * 3 + 10, ve * 0.12 * (40 / B) + 3),
          Se = Math.sin(ve * 1.7 + Ce * 3) * 0.03,
          ue = 1 + (Ce - 0.5) * P * 2.2 + Se,
          ze = Math.max(0, 1 + ve / B);
        (L.setXYZ(Z, de * ue, ve + (Ce - 0.5) * B * 0.05 * (1 - ze), ne * ue),
          Q.setXY(Z, Q.getX(Z) * Math.round(F * 0.7), ve / 7));
      }
      return (O.computeVertexNormals(), O);
    },
    A = new Ae(w(Qt + 2.2, 30), y);
  ((A.position.y = 0.05),
    (A.receiveShadow = !0),
    (A.castShadow = !0),
    n.add(A));
  let I = bt(
    {
      map: t.grassDiff,
      normalMap: t.grassNor,
      color: 11061360,
      roughness: 0.95,
      metalness: 0,
    },
    { rim: 0.5, key: "grass" },
  );
  {
    let F = new Di(Qt + 0.4, Qt + 2.4, 160, 3),
      B = F.attributes.uv,
      _ = F.attributes.position;
    for (let P = 0; P < B.count; P++) B.setXY(P, _.getX(P) / 3, _.getY(P) / 3);
    let x = new Ae(F, I);
    ((x.rotation.x = -Math.PI / 2),
      (x.position.y = 0.02),
      (x.receiveShadow = !0),
      n.add(x));
  }
  let C = bt(
    {
      map: t.rockDiff,
      normalMap: t.rockNor,
      roughnessMap: t.rockArm,
      color: 14274496,
      roughness: 1,
    },
    { rim: 0.5, key: "curb" },
  );
  {
    let F = [];
    for (let x = 0; x < 96; x++) {
      let P = (x / 96) * Math.PI * 2,
        H = ((2 * Math.PI * (Qt + 0.6)) / 96) * 0.92,
        O = new Ht(H, 0.32 + ct() * 0.06, 0.55, 2, 0.08);
      (O.rotateY(-P),
        O.translate(Math.cos(P) * (Qt + 0.75), 0.13, Math.sin(P) * (Qt + 0.75)),
        F.push(O));
    }
    let _ = new Ae(Ei(F), C);
    ((_.castShadow = !0), (_.receiveShadow = !0), n.add(_));
  }
  {
    let F = new mn(0.07, 0.5, 1, 3);
    F.translate(0, 0.25, 0);
    let B = F.attributes.position;
    for (let ue = 0; ue < B.count; ue++) {
      let ze = B.getY(ue);
      B.setX(ue, B.getX(ue) * (1 - ze / 0.55));
    }
    let _ = bt(
      { color: 8826954, roughness: 0.9, side: Ut },
      {
        rim: 0.6,
        key: "blade",
        extra: (ue) => {
          ((ue.uniforms.uTime = Ot.uTime),
            (ue.vertexShader =
              `uniform float uTime;
` +
              ue.vertexShader.replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
          vec4 wp0 = instanceMatrix * vec4(0.0,0.0,0.0,1.0);
          float sway = sin(uTime * 1.8 + wp0.x * 0.35 + wp0.z * 0.27) * 0.12 + sin(uTime * 3.7 + wp0.x) * 0.04;
          transformed.x += sway * position.y * position.y * 4.0;`,
              )),
            (ue.fragmentShader = ue.fragmentShader.replace(
              "#include <color_fragment>",
              `#include <color_fragment>
 diffuseColor.rgb *= mix(0.45, 1.15, vUv.y);`,
            )));
        },
      },
    );
    _.defines = { USE_UV: "" };
    let x = 9e3,
      P = new si(F, _, x),
      H = new Ke(),
      O = new qt(),
      L = new pn(),
      Q = new R(),
      Z = new R(),
      de = new _e();
    for (let ue = 0; ue < x; ue++) {
      let ze = ct() * Math.PI * 2,
        k = Qt + 1 + Math.pow(ct(), 0.7) * 1.4;
      (Z.set(Math.cos(ze) * k, 0.02, Math.sin(ze) * k),
        L.set(je(-0.25, 0.25), ct() * Math.PI, je(-0.25, 0.25)),
        O.setFromEuler(L));
      let he = je(0.6, 1.5);
      (Q.set(je(0.8, 1.4), he, 1),
        H.compose(Z, O, Q),
        P.setMatrixAt(ue, H),
        de.setHSL(0.22 + je(-0.04, 0.05), je(0.45, 0.7), je(0.32, 0.5)),
        P.setColorAt(ue, de));
    }
    ((P.receiveShadow = !0), n.add(P));
    let ve = new kr(0.07, 0),
      ne = bt(
        { color: 16777215, roughness: 0.6, emissive: 2228240 },
        { rim: 0.8, key: "flower" },
      ),
      ge = 1400,
      Ce = new si(ve, ne, ge),
      Se = [16758741, 16777215, 16744368, 16769658, 14133503];
    for (let ue = 0; ue < ge; ue++) {
      let ze = ct() * Math.PI * 2,
        k = Qt + 1.1 + ct() * 1.3;
      (Z.set(Math.cos(ze) * k, je(0.25, 0.6), Math.sin(ze) * k),
        O.identity(),
        Q.setScalar(je(0.7, 1.5)),
        H.compose(Z, O, Q),
        Ce.setMatrixAt(ue, H),
        Ce.setColorAt(ue, de.setHex(Se[Math.floor(ct() * Se.length)])));
    }
    n.add(Ce);
  }
  let b = bt(
      {
        color: 6965814,
        roughness: 0.9,
        normalMap: t.rockNor,
        normalScale: new ae(0.6, 0.6),
      },
      { rim: 0.6, key: "bark" },
    ),
    T = bt(
      { color: 16777215, vertexColors: !0, roughness: 0.85, metalness: 0 },
      {
        rim: 0.9,
        key: "leaf",
        extra: (F) => {
          ((F.uniforms.uTime = Ot.uTime),
            (F.vertexShader =
              `uniform float uTime;
` +
              F.vertexShader.replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
        vec3 wq = (modelMatrix * vec4(position,1.0)).xyz;
        transformed += normal * (sin(uTime * 1.3 + wq.x * 0.4 + wq.y * 0.3) * 0.06);`,
              )));
        },
      },
    ),
    D = bi(
      128,
      128,
      (F, B) => {
        F.clearRect(0, 0, B, B);
        let _ = (x, P, H, O, L) => {
          (F.save(), F.translate(x, P), F.rotate(L), (F.fillStyle = O));
          for (let Q = 0; Q < 5; Q++)
            (F.rotate((Math.PI * 2) / 5),
              F.beginPath(),
              F.ellipse(0, -H * 0.55, H * 0.38, H * 0.55, 0, 0, Math.PI * 2),
              F.fill());
          ((F.fillStyle = "#ffe9a0"),
            F.beginPath(),
            F.arc(0, 0, H * 0.18, 0, 7),
            F.fill(),
            F.restore());
        };
        for (let x = 0; x < 9; x++) {
          let P = ct() * 6.28,
            H = ct() * B * 0.28;
          _(
            B / 2 + Math.cos(P) * H,
            B / 2 + Math.sin(P) * H,
            B * je(0.13, 0.2),
            ["#ffffff", "#f4f4f4", "#ffffff"][x % 3],
            ct() * 6,
          );
        }
      },
      { srgb: !0 },
    ),
    z = bt(
      { map: D, vertexColors: !0, alphaTest: 0.45, side: Ut, roughness: 0.8 },
      {
        rim: 0.12,
        rimFill: 0.1,
        key: "card",
        extra: (F) => {
          ((F.uniforms.uTime = Ot.uTime),
            (F.vertexShader =
              `uniform float uTime;
` +
              F.vertexShader.replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
        vec3 wq = (modelMatrix * vec4(position,1.0)).xyz;
        transformed += normal * (sin(uTime * 1.3 + wq.x * 0.4 + wq.y * 0.3) * 0.06) + vec3(sin(uTime * 2.7 + wq.y * 2.0 + wq.x), 0.0, cos(uTime * 2.3 + wq.z * 2.0)) * 0.03;`,
              )));
        },
      },
    ),
    G = new mn(1, 1);
  function W(F = 6, B = 16761048, _ = 15891112, x = 0) {
    let P = new ht(),
      H = [
        [0, 0, 0],
        [x * 0.3 + je(-0.3, 0.3), F * 0.35, je(-0.3, 0.3)],
        [x * 0.7 + je(-0.5, 0.5), F * 0.65, je(-0.5, 0.5)],
        [x + je(-0.4, 0.4), F * 0.85, je(-0.4, 0.4)],
      ],
      O = new Ae(to(H, F * 0.06, 16, 8), b);
    ((O.castShadow = !0), (O.receiveShadow = !0), P.add(O));
    let L = new Ae(new ms(F * 0.12, F * 0.15, 8, 1, !0), b);
    ((L.position.y = F * 0.06), P.add(L));
    let Q = new R(...H[3]),
      Z = [],
      de = 9;
    for (let ne = 0; ne < de; ne++) {
      let ge = (ne / de) * Math.PI * 2 + ct(),
        Ce = je(0.25, 1) * F * 0.32,
        Se = new R(
          Q.x + Math.cos(ge) * Ce,
          Q.y + je(-0.15, 0.35) * F * 0.25 + (ne === 0 ? F * 0.08 : 0),
          Q.z + Math.sin(ge) * Ce,
        ),
        ue = new Ae(
          to(
            [
              [...H[2]],
              [
                (H[2][0] + Se.x) / 2,
                (H[2][1] + Se.y) / 2 + 0.3,
                (H[2][2] + Se.z) / 2,
              ],
              [Se.x, Se.y, Se.z],
            ],
            F * 0.022,
            8,
            5,
          ),
          b,
        );
      ((ue.castShadow = !0), P.add(ue));
      let ze = je(0.55, 0.95) * F * 0.24,
        k = new kr(ze, 3),
        he = k.attributes.position,
        Te = new Float32Array(he.count * 3),
        Be = new _e(B),
        Me = new _e(_),
        le = new _e();
      for (let gt = 0; gt < he.count; gt++) {
        let It = he.getX(gt),
          Xt = he.getY(gt),
          li = he.getZ(gt),
          rs = ba(It * 1.4 + ne * 7, li * 1.4 + Xt * 1.1),
          re = 1 + (rs - 0.5) * 0.55;
        (he.setXYZ(gt, It * re, Xt * re * 0.82, li * re),
          le
            .copy(Me)
            .lerp(
              Be,
              Math.min(
                1,
                Math.max(0, (Xt / ze) * 0.6 + 0.45 + (rs - 0.5) * 0.6),
              ),
            ),
          (Te[gt * 3] = le.r),
          (Te[gt * 3 + 1] = le.g),
          (Te[gt * 3 + 2] = le.b));
      }
      (k.setAttribute("color", new _t(Te, 3)),
        k.deleteAttribute("normal"),
        k.deleteAttribute("uv"));
      let Le = Jp(k);
      (k.dispose(), Le.computeVertexNormals());
      let We = Le,
        lt = We.attributes.normal,
        ot = We.attributes.position;
      for (let gt = 0; gt < ot.count; gt++) {
        let It = new R(ot.getX(gt), ot.getY(gt), ot.getZ(gt)).normalize(),
          Xt = new R(lt.getX(gt), lt.getY(gt), lt.getZ(gt));
        (Xt.lerp(It, 0.55).normalize(), lt.setXYZ(gt, Xt.x, Xt.y, Xt.z));
      }
      (We.translate(Se.x, Se.y, Se.z), Z.push(We));
    }
    let ve = new Ae(Ei(Z), T);
    ((ve.castShadow = !0), (ve.receiveShadow = !0), P.add(ve));
    {
      let ne = ve.geometry,
        ge = ne.attributes.position,
        Ce = ne.attributes.normal,
        Se = ne.attributes.color,
        ue = [],
        ze = Math.round(46 * F),
        k = new R(),
        he = new R(),
        Te = new Ke(),
        Be = new R();
      for (let le = 0; le < ze; le++) {
        let Le = Math.floor(ct() * ge.count);
        if (
          (k.set(ge.getX(Le), ge.getY(Le), ge.getZ(Le)),
          he.set(Ce.getX(Le), Ce.getY(Le), Ce.getZ(Le)),
          he.y < -0.5 && ct() < 0.7)
        )
          continue;
        let We = F * je(0.075, 0.13),
          lt = G.clone();
        (lt.rotateZ(ct() * 6.28),
          lt.scale(We, We, We),
          Te.lookAt(
            Be,
            new R(
              he.x + je(-0.7, 0.7),
              he.y + je(-0.7, 0.7),
              he.z + je(-0.7, 0.7),
            ),
            new R(0, 1, 0),
          ),
          lt.applyMatrix4(Te),
          lt.translate(
            k.x + he.x * We * 0.25,
            k.y + he.y * We * 0.25,
            k.z + he.z * We * 0.25,
          ));
        let ot = new Float32Array(12),
          gt = new Float32Array(12),
          It = je(0.9, 1);
        for (let Xt = 0; Xt < 4; Xt++)
          ((ot[Xt * 3] = he.x),
            (ot[Xt * 3 + 1] = he.y),
            (ot[Xt * 3 + 2] = he.z),
            (gt[Xt * 3] = Math.min(1, Se.getX(Le) * It)),
            (gt[Xt * 3 + 1] = Math.min(1, Se.getY(Le) * It)),
            (gt[Xt * 3 + 2] = Math.min(1, Se.getZ(Le) * It)));
        (lt.setAttribute("normal", new _t(ot, 3)),
          lt.setAttribute("color", new _t(gt, 3)),
          ue.push(lt));
      }
      let Me = new Ae(Ei(ue), z);
      ((Me.receiveShadow = !0), P.add(Me));
    }
    return ((P.userData.canopyTop = Q), P);
  }
  let X = (F) => Math.atan2(Math.sin(F), Math.cos(F)),
    V = [
      [-2.35, 7.5],
      [-2, 5.8],
      [-2.62, 6.8],
      [2.3, 6.4],
      [2.05, 7.8],
      [2.6, 5.6],
      [-2.85, 6],
      [2.95, 6.6],
      [3.3, 5.4],
    ];
  for (let [F, B] of V) {
    let _ = F,
      x = W(
        B,
        ct() < 0.3 ? 16773366 : 16761048,
        ct() < 0.5 ? 15891112 : 14966163,
        je(-0.8, 0.8),
      ),
      P = Qt + je(0.9, 1.6);
    (x.position.set(Math.sin(_) * P, 0, Math.cos(_) * P),
      (x.rotation.y = ct() * 6),
      n.add(x));
  }
  let se = bt(
      {
        map: t.rockDiff,
        normalMap: t.rockNor,
        roughnessMap: t.rockArm,
        color: 15327698,
        roughness: 1,
      },
      { rim: 0.7, key: "stone" },
    ),
    ee = bt(
      { color: 13803596, metalness: 1, roughness: 0.35 },
      { rim: 0.9, key: "brassdeco" },
    );
  function ye(F, B = !0) {
    let _ = new ht(),
      x = new Ae(new Ht(1.5, 0.5, 1.5, 2, 0.08), se);
    ((x.position.y = 0.25), _.add(x));
    let P = new St(0.5, 0.56, F, 16, 6);
    if (B) {
      let O = P.attributes.position;
      for (let L = 0; L < O.count; L++)
        O.getY(L) > F / 2 - 0.01 && O.setY(L, F / 2 - ct() * 0.6);
      P.computeVertexNormals();
    }
    let H = new Ae(P, se);
    ((H.position.y = 0.5 + F / 2), _.add(H));
    for (let O of [0.9, F * 0.6]) {
      let L = new Ae(new ut(0.55, 0.07, 8, 24), ee);
      ((L.rotation.x = Math.PI / 2), (L.position.y = O), _.add(L));
    }
    if (!B) {
      let O = new Ae(new Ht(1.4, 0.4, 1.4, 2, 0.08), se);
      ((O.position.y = F + 0.7), _.add(O));
    }
    return (
      _.traverse((O) => {
        O.isMesh && ((O.castShadow = !0), (O.receiveShadow = !0));
      }),
      _
    );
  }
  for (let [F, B, _] of [
    [-1.85, 4.5, !0],
    [1.9, 5.5, !0],
    [-2.6, 3.2, !0],
    [2.35, 6.5, !1],
    [-1.9, 7, !1],
    [2.85, 2.6, !0],
  ]) {
    let x = F,
      P = ye(B, _),
      H = Qt + 0.4;
    (P.position.set(Math.sin(x) * H, 0, Math.cos(x) * H),
      (P.rotation.y = ct() * 3),
      n.add(P));
  }
  {
    let F = new ht(),
      B = ye(7.5, !1);
    ((B.position.x = -4.2), F.add(B));
    let _ = ye(7.5, !1);
    ((_.position.x = 4.2), F.add(_));
    let x = new Ae(new ut(4.2, 0.55, 10, 32, Math.PI), se);
    ((x.position.y = 8.7), (x.scale.z = 1.6), (x.castShadow = !0), F.add(x));
    let P = new Ae(new ut(4.2, 0.12, 8, 40, Math.PI), ee);
    (P.position.set(0, 8.7, 0.95),
      F.add(P),
      F.position.set(0, 0, -(Qt + 1.2)),
      n.add(F));
  }
  let Ee = [];
  for (let [F, B, _] of t.props
    ? []
    : [
        [-2.15, 4.2, 0.12],
        [2.25, 3.4, -0.16],
        [-0.35 + Math.PI, 2.6, 0.2],
      ]) {
    let x = F,
      P = new Ae(
        In({
          rOut: B,
          rRoot: B * 0.88,
          teeth: Math.round(B * 6),
          depth: 0.5,
          hole: B * 0.18,
          spokes: 6,
          bevel: 0.05,
        }),
        ee,
      );
    ((P.castShadow = !0), (P.receiveShadow = !0));
    let H = new ht(),
      O = Qt + 1.6;
    (H.position.set(Math.sin(x) * O, B * 0.35, Math.cos(x) * O),
      (H.rotation.y = x),
      H.add(P),
      n.add(H),
      Ee.push({ gm: P, sp: _ }));
  }
  i.push((F) => {
    for (let B of Ee) B.gm.rotation.z = F * B.sp;
  });
  let Ie = new yt({
    color: new _e(16757594).multiplyScalar(4),
    toneMapped: !1,
  });
  for (let F of [-1.95, 1.95, -2.5, 2.5, 3.14]) {
    let B = F,
      _ = new ht(),
      x = new Ae(new St(0.06, 0.09, 2.6, 8), ee);
    ((x.position.y = 1.3), _.add(x));
    let P = new Ae(new St(0.2, 0.16, 0.42, 6, 1, !0), ee);
    ((P.position.y = 2.75), _.add(P));
    let H = new Ae(new Lt(0.14, 12, 8), Ie);
    ((H.position.y = 2.75), _.add(H));
    let O = Qt + 0.2;
    (_.position.set(Math.sin(B) * O, 0, Math.cos(B) * O), n.add(_));
  }
  {
    let F = new Bs(0.5, 1),
      B = F.attributes.position;
    for (let Q = 0; Q < B.count; Q++) {
      let Z = new R(B.getX(Q), B.getY(Q), B.getZ(Q)),
        de = ba(Z.x * 2 + 5, Z.y * 2 + Z.z);
      (Z.multiplyScalar(0.8 + de * 0.5), B.setXYZ(Q, Z.x, Z.y * 0.7, Z.z));
    }
    F.computeVertexNormals();
    let _ = 60,
      x = new si(F, C, _),
      P = new Ke(),
      H = new qt(),
      O = new R(),
      L = new R();
    for (let Q = 0; Q < _; Q++) {
      let Z = ct() * Math.PI * 2,
        de = Qt + je(1.2, 2.3);
      (L.set(Math.cos(Z) * de, 0.05, Math.sin(Z) * de),
        H.setFromEuler(new pn(ct(), ct() * 6, ct())),
        O.setScalar(je(0.35, 1)),
        P.compose(L, H, O),
        x.setMatrixAt(Q, P));
    }
    ((x.castShadow = !0), (x.receiveShadow = !0), n.add(x));
  }
  {
    let F = bt({ color: 5204783, roughness: 0.9 }, { rim: 0.5, key: "vine" }),
      B = [];
    for (let x = 0; x < 46; x++) {
      let P = ct() * Math.PI * 2,
        H = Qt + 2 + je(-0.3, 0.2),
        O = je(2, 7),
        L = Math.cos(P) * H,
        Q = Math.sin(P) * H;
      B.push(
        to(
          [
            [L, 0.1, Q],
            [L * 1.01, -O * 0.4, Q * 1.01],
            [L * 0.99 + je(-0.3, 0.3), -O, Q * 0.99 + je(-0.3, 0.3)],
          ],
          je(0.04, 0.09),
          10,
          5,
        ),
      );
    }
    let _ = new Ae(Ei(B), F);
    n.add(_);
  }
  let Ge = new Mt({
    uniforms: { uTime: Ot.uTime, uCol: { value: new _e(14086911) } },
    vertexShader:
      "varying vec2 vUv; varying float vFog; void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.0); vFog = -mv.z; gl_Position = projectionMatrix*mv; }",
    fragmentShader: `uniform float uTime; uniform vec3 uCol; varying vec2 vUv; varying float vFog;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
      float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      void main(){
        vec2 uv = vUv;
        float streak = n2(vec2(uv.x * 18.0, uv.y * 3.0 + uTime * 2.6)) * 0.6 + n2(vec2(uv.x * 40.0, uv.y * 6.0 + uTime * 3.4)) * 0.4;
        float edge = smoothstep(0.0, 0.18, uv.x) * smoothstep(1.0, 0.82, uv.x);
        float fadeB = smoothstep(0.0, 0.45, uv.y);
        float a = edge * fadeB * (0.45 + 0.55 * streak);
        vec3 c = mix(uCol * 0.75, vec3(1.0), smoothstep(0.55, 0.95, streak));
        gl_FragColor = vec4(c * 1.3, a * 0.9);
      }`,
    transparent: !0,
    depthWrite: !1,
    side: Ut,
    fog: !1,
  });
  function Xe(F, B, _, x, P, H, O) {
    let L = new mn(P, H, 1, 12);
    L.translate(0, -H / 2, 0);
    let Q = L.attributes.position;
    for (let de = 0; de < Q.count; de++) {
      let ve = Math.max(0, -Q.getY(de));
      Q.setZ(de, Math.min(1.5, Math.sqrt(ve) * 0.45));
    }
    let Z = new Ae(L, Ge);
    return (Z.position.set(B, _, x), (Z.rotation.y = O), F.add(Z), Z);
  }
  for (let F of [-2, 2.15, Math.PI - 0.55]) {
    let B = F,
      _ = Qt + 2.6;
    Xe(n, Math.sin(B) * _, 0.15, Math.cos(B) * _, 2.4, 40, B);
  }
  let et = y,
    tt = [
      [-95, 14, -150, 22],
      [120, 6, -170, 30],
      [-190, 22, 30, 26],
      [200, 34, -40, 18],
      [40, 2, -260, 40],
      [-60, 44, -300, 24],
      [260, 12, 120, 30],
      [-230, 8, 170, 34],
      [-150, -8, -95, 16],
      [130, 58, -320, 22],
      [-300, 30, -180, 28],
      [320, 20, -220, 26],
    ];
  for (let [F, B, _, x] of tt) {
    let P = new ht(),
      H = w(x, x * 1.4, 36, 16, 0.16),
      O = new Ae(H, et);
    P.add(O);
    let L = new Ae(new Pi(x * 1, 32), I);
    ((L.rotation.x = -Math.PI / 2), (L.position.y = 0.1), P.add(L));
    let Q = 2 + Math.floor(ct() * 4);
    for (let de = 0; de < Q; de++) {
      let ve = W(
          je(0.25, 0.42) * x,
          ct() < 0.5 ? 16765154 : 13166746,
          ct() < 0.5 ? 15232415 : 6989903,
          je(-1, 1),
        ),
        ne = ct() * 6.28,
        ge = ct() * x * 0.65;
      (ve.position.set(Math.cos(ne) * ge, 0, Math.sin(ne) * ge), P.add(ve));
    }
    if (ct() < 0.6) {
      let de = ye(x * 0.3, ct() < 0.5);
      (de.scale.setScalar(x * 0.06),
        de.position.set(je(-0.4, 0.4) * x, 0, je(-0.4, 0.4) * x),
        P.add(de));
    }
    let Z = 1 + Math.floor(ct() * 2);
    for (let de = 0; de < Z; de++) {
      let ve = Math.atan2(-_, -F) + je(-0.7, 0.7);
      Xe(
        P,
        Math.cos(ve) * x * 0.98,
        0.1,
        Math.sin(ve) * x * 0.98,
        x * 0.12,
        x * 3.2,
        Math.PI / 2 - ve,
      );
    }
    (P.position.set(F, B, _), (P.rotation.y = ct() * 6), n.add(P));
  }
  {
    let F = new ht();
    F.add(new Ae(w(30, 45, 36, 16, 0.18), et));
    let B = new Ae(new Pi(30, 32), I);
    ((B.rotation.x = -Math.PI / 2), (B.position.y = 0.1), F.add(B));
    let _ = new Ae(new St(6, 7.5, 50, 8), se);
    ((_.position.y = 25), F.add(_));
    let x = new Ae(
      new ms(8.5, 18, 8),
      bt({ color: 4087162, roughness: 0.6, metalness: 0.3 }, { key: "roof" }),
    );
    ((x.position.y = 59), F.add(x));
    let P = new Ae(
      new Pi(4.5, 32),
      new yt({ color: new _e(16765578).multiplyScalar(1.6), toneMapped: !1 }),
    );
    (P.position.set(0, 40, 6.3), F.add(P));
    let H = new Ae(new ut(4.6, 0.5, 8, 32), ee);
    (H.position.set(0, 40, 6.4),
      F.add(H),
      F.position.set(-20, 10, -420),
      (F.rotation.y = 0.2),
      n.add(F));
  }
  let oe = new Ae(
    new mn(4e3, 4e3, 1, 1),
    new Mt({
      uniforms: {
        uTime: Ot.uTime,
        uSun: { value: tr },
        uHorizon: { value: new _e(11124178) },
        uHeat: Ot.uHeat,
      },
      vertexShader:
        "varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }",
      fragmentShader: `uniform float uTime; uniform vec3 uSun; uniform vec3 uHorizon; uniform float uHeat; varying vec3 vW;
      float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
      float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
      float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<6;i++){ s+=n2(p)*a; p=p*2.03+vec2(1.7,9.2); a*=0.5; } return s; }
      void main(){
        vec2 p = vW.xz * 0.006 + vec2(uTime * 0.004, uTime * 0.002);
        float d = fbm(p);
        float d2 = fbm(p + vec2(0.02, 0.02) + uSun.xz * 0.03);
        float cov = smoothstep(0.38, 0.7, d);
        float lit = clamp((d - d2) * 9.0 + 0.55, 0.0, 1.0);
        vec3 shadowC = vec3(0.40, 0.50, 0.68);
        vec3 litC = mix(vec3(1.0, 0.93, 0.85), vec3(1.0, 0.78, 0.62), uHeat * 0.5);
        vec3 c = mix(shadowC, litC, lit);
        vec3 deep = vec3(0.42, 0.56, 0.74);
        c = mix(deep, c, cov);
        float dist = length(vW.xz - cameraPosition.xz);
        float fogF = 1.0 - exp(-dist * 0.0011);
        c = mix(c, uHorizon, clamp(fogF, 0.0, 1.0));
        gl_FragColor = vec4(c, 1.0);
      }`,
      fog: !1,
    }),
  );
  ((oe.rotation.x = -Math.PI / 2), (oe.position.y = -85), n.add(oe));
  let me = Uc(256, 7),
    Pe = new Dr({
      map: me,
      color: 16777215,
      transparent: !0,
      depthWrite: !1,
      opacity: 0.85,
      fog: !0,
    }),
    De = [];
  for (let F = 0; F < 80; F++) {
    let B = new Fo(Pe),
      _ = ct() * Math.PI * 2,
      x = je(75, 320);
    B.position.set(Math.cos(_) * x, je(-45, 4), Math.sin(_) * x);
    let P = je(45, 140);
    (B.scale.set(P, P * 0.45, 1),
      n.add(B),
      De.push({ s: B, sp: je(0.3, 1.2) }));
  }
  i.push((F, B) => {
    for (let _ of De)
      ((_.s.position.x += _.sp * B),
        _.s.position.x > 320 && (_.s.position.x = -320));
  });
  let Oe = new mn(0.075, 0.1, 2, 1);
  {
    let F = Oe.attributes.position;
    for (let B = 0; B < F.count; B++) F.setZ(B, Math.abs(F.getX(B)) * 0.4);
    Oe.computeVertexNormals();
  }
  let nt = bi(
      64,
      64,
      (F, B) => {
        (F.clearRect(0, 0, B, B),
          (F.fillStyle = "#fff"),
          F.beginPath(),
          F.moveTo(B / 2, 3),
          F.bezierCurveTo(B * 0.98, B * 0.3, B * 0.75, B * 0.9, B / 2, B - 3),
          F.bezierCurveTo(B * 0.25, B * 0.9, B * 0.02, B * 0.3, B / 2, 3),
          F.fill());
      },
      { srgb: !1 },
    ),
    dt = new $n({
      color: 16758994,
      roughness: 0.7,
      side: Ut,
      emissive: 3804700,
      alphaMap: nt,
      alphaTest: 0.5,
    }),
    U = 900,
    fe = new si(Oe, dt, U);
  fe.frustumCulled = !1;
  let Y = [];
  for (let F = 0; F < U; F++)
    (Y.push({
      p: new R(je(-30, 30), je(0, 14), je(-30, 30)),
      ph: ct() * 10,
      sp: je(0.6, 1.4),
      rot: new pn(ct() * 6, ct() * 6, ct() * 6),
      c: ct(),
    }),
      fe.setColorAt(
        F,
        new _e().setHSL(0.93 + je(-0.03, 0.03), je(0.6, 0.9), je(0.75, 0.92)),
      ));
  n.add(fe);
  let $ = new Ke(),
    te = new qt(),
    ie = new R(1, 1, 1),
    pe = new R(),
    xe = new R(1.6, 0, 0.9);
  return (
    i.push((F, B, _) => {
      let x = _.position.x,
        P = _.position.z;
      for (let H = 0; H < U; H++) {
        let O = Y[H];
        ((O.p.x += (xe.x * O.sp + Math.sin(F * 1.3 + O.ph) * 0.6) * B),
          (O.p.z += (xe.z * O.sp + Math.cos(F * 1.1 + O.ph) * 0.6) * B),
          (O.p.y += (Math.sin(F * 2 + O.ph) * 0.4 - 0.35) * B),
          O.p.x - x > 30 ? (O.p.x -= 60) : O.p.x - x < -30 && (O.p.x += 60),
          O.p.z - P > 30 ? (O.p.z -= 60) : O.p.z - P < -30 && (O.p.z += 60),
          O.p.y < 0.1 ? (O.p.y += 14) : O.p.y > 14 && (O.p.y -= 14),
          (O.rot.x += B * 2.1 * O.sp),
          (O.rot.y += B * 1.3),
          (O.rot.z += B * 1.7 * O.sp),
          te.setFromEuler(O.rot),
          $.compose(O.p, te, ie),
          fe.setMatrixAt(H, $));
      }
      fe.instanceMatrix.needsUpdate = !0;
    }),
    {
      sun: l,
      fill: d,
      hemi: u,
      floor: m,
      world: n,
      update(F, B, _) {
        for (let x of i) x(F, B, _);
      },
    }
  );
}

export { jp, jp as createArena };