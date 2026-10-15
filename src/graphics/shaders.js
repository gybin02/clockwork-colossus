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
const rt = THREE.ShaderChunk;

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
const Kh = THREE.TrianglesDrawMode;
const ga = THREE.TriangleStripDrawMode;
const Yr = THREE.TriangleFanDrawMode;

var Ot = {
    uTime: { value: 0 },
    uToon: { value: 0.85 },
    uRimColor: { value: new _e(1, 0.78, 0.5) },
    uRimColor2: { value: new _e(0.45, 0.62, 1) },
    uRimDir: { value: new R(0, 0, 1) },
    uRimPow: { value: 3 },
    uHeat: { value: 0 },
  },
  Fy = `
	float dotNLraw = dot( geometryNormal, directLight.direction );
	float dotNL = saturate( dotNLraw );
	float toonNL = smoothstep( -0.02, 0.16, dotNLraw ) * ( 0.7 + 0.3 * dotNL );
	vec3 irradiance = mix( dotNL, toonNL, uToon ) * directLight.color;`;
function Zp(s, e = {}) {
  let t = e.rim ?? 1,
    n = e.rimFill ?? 0.35;
  return (
    (s.userData.rimK = { value: t }),
    (s.userData.rimFill = { value: n }),
    (s.onBeforeCompile = (i) => {
      ((i.uniforms.uToon = Ot.uToon),
        (i.uniforms.uRimColor = Ot.uRimColor),
        (i.uniforms.uRimColor2 = Ot.uRimColor2),
        (i.uniforms.uRimDir = Ot.uRimDir),
        (i.uniforms.uRimPow = Ot.uRimPow),
        (i.uniforms.uRimK = s.userData.rimK),
        (i.uniforms.uRimFill = s.userData.rimFill),
        (i.fragmentShader =
          `uniform float uToon; uniform vec3 uRimColor; uniform vec3 uRimColor2; uniform vec3 uRimDir; uniform float uRimPow; uniform float uRimK; uniform float uRimFill;
` + i.fragmentShader));
      let r = rt.lights_physical_pars_fragment.replace(
        /float dotNL = saturate\( dot\( geometryNormal, directLight\.direction \) \);\s*vec3 irradiance = dotNL \* directLight\.color;/,
        Fy,
      );
      ((i.fragmentShader = i.fragmentShader.replace(
        "#include <lights_physical_pars_fragment>",
        r,
      )),
        (i.fragmentShader = i.fragmentShader.replace(
          "#include <opaque_fragment>",
          `
      {
        vec3 Vv = normalize( vViewPosition );
        float fres = pow( 1.0 - saturate( dot( normal, Vv ) ), uRimPow );
        float side = saturate( dot( normal, uRimDir ) * 0.75 + 0.35 );
        outgoingLight += ( uRimColor * side + uRimColor2 * ( 1.0 - side ) * uRimFill ) * fres * uRimK;
      }
      #include <opaque_fragment>`,
        )),
        e.extra && e.extra(i));
    }),
    (s.customProgramCacheKey = () => "toon" + (e.key || "")),
    s
  );
}
function bt(s, e) {
  return Zp(new $n(s), e);
}
function er(s, e) {
  return Zp(new Sn(s), e);
}
var Oy = new Vs();
function Pn(s, { srgb: e = !1, repeat: t = 1, aniso: n = 8 } = {}) {
  return new Promise((i, r) => {
    Oy.load(
      s,
      (o) => {
        ((o.colorSpace = e ? zt : Bn),
          (o.wrapS = o.wrapT = gi),
          Array.isArray(t) ? o.repeat.set(t[0], t[1]) : o.repeat.set(t, t),
          (o.anisotropy = n),
          i(o));
      },
      void 0,
      r,
    );
  });
}
function bi(s, e, t, { srgb: n = !0, repeat: i = !1 } = {}) {
  let r = document.createElement("canvas");
  ((r.width = s), (r.height = e));
  let o = r.getContext("2d");
  t(o, s, e);
  let a = new Os(r);
  return (
    (a.colorSpace = n ? zt : Bn),
    i && (a.wrapS = a.wrapT = gi),
    (a.anisotropy = 8),
    a
  );
}
function Au(s = 128, e = 0) {
  return bi(
    s,
    s,
    (t, n) => {
      let i = t.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
      (i.addColorStop(0, "rgba(255,255,255,1)"),
        i.addColorStop(Math.max(0.01, e), "rgba(255,255,255,0.85)"),
        i.addColorStop(1, "rgba(255,255,255,0)"),
        (t.fillStyle = i),
        t.fillRect(0, 0, n, n));
    },
    { srgb: !1 },
  );
}
function Uc(s = 256, e = 1) {
  let t = e,
    n = () => ((t = (t * 16807) % 2147483647), (t - 1) / 2147483646);
  return bi(
    s,
    s,
    (i, r) => {
      i.clearRect(0, 0, r, r);
      for (let o = 0; o < 70; o++) {
        let a = n() * Math.PI * 2,
          c = Math.pow(n(), 0.7) * r * 0.28,
          l = r / 2 + Math.cos(a) * c,
          h = r / 2 + Math.sin(a) * c * 0.8,
          d = r * (0.08 + n() * 0.14),
          u = i.createRadialGradient(l, h, 0, l, h, d);
        (u.addColorStop(0, "rgba(255,255,255,0.35)"),
          u.addColorStop(1, "rgba(255,255,255,0)"),
          (i.fillStyle = u),
          i.beginPath(),
          i.arc(l, h, d, 0, Math.PI * 2),
          i.fill());
      }
    },
    { srgb: !1 },
  );
}
function Ei(s, e = !1) {
  let t = s[0].index !== null,
    n = new Set(Object.keys(s[0].attributes)),
    i = new Set(Object.keys(s[0].morphAttributes)),
    r = {},
    o = {},
    a = s[0].morphTargetsRelative,
    c = new xt(),
    l = 0;
  for (let h = 0; h < s.length; ++h) {
    let d = s[h],
      u = 0;
    if (t !== (d.index !== null))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
        ),
        null
      );
    for (let f in d.attributes) {
      if (!n.has(f))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              '. All geometries must have compatible attributes; make sure "' +
              f +
              '" attribute exists among all geometries, or in none of them.',
          ),
          null
        );
      (r[f] === void 0 && (r[f] = []), r[f].push(d.attributes[f]), u++);
    }
    if (u !== n.size)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". Make sure all geometries have the same number of attributes.",
        ),
        null
      );
    if (a !== d.morphTargetsRelative)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". .morphTargetsRelative must be consistent throughout all geometries.",
        ),
        null
      );
    for (let f in d.morphAttributes) {
      if (!i.has(f))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ".  .morphAttributes must be consistent throughout all geometries.",
          ),
          null
        );
      (o[f] === void 0 && (o[f] = []), o[f].push(d.morphAttributes[f]));
    }
    if (e) {
      let f;
      if (t) f = d.index.count;
      else if (d.attributes.position !== void 0)
        f = d.attributes.position.count;
      else
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". The geometry must have either an index or a position attribute",
          ),
          null
        );
      (c.addGroup(l, f, h), (l += f));
    }
  }
  if (t) {
    let h = 0,
      d = [];
    for (let u = 0; u < s.length; ++u) {
      let f = s[u].index;
      for (let v = 0; v < f.count; ++v) d.push(f.getX(v) + h);
      h += s[u].attributes.position.count;
    }
    c.setIndex(d);
  }
  for (let h in r) {
    let d = Kp(r[h]);
    if (!d)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
            h +
            " attribute.",
        ),
        null
      );
    c.setAttribute(h, d);
  }
  for (let h in o) {
    let d = o[h][0].length;
    if (d === 0) break;
    ((c.morphAttributes = c.morphAttributes || {}),
      (c.morphAttributes[h] = []));
    for (let u = 0; u < d; ++u) {
      let f = [];
      for (let g = 0; g < o[h].length; ++g) f.push(o[h][g][u]);
      let v = Kp(f);
      if (!v)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
              h +
              " morphAttribute.",
          ),
          null
        );
      c.morphAttributes[h].push(v);
    }
  }
  return c;
}
function Kp(s) {
  let e,
    t,
    n,
    i = -1,
    r = 0;
  for (let l = 0; l < s.length; ++l) {
    let h = s[l];
    if ((e === void 0 && (e = h.array.constructor), e !== h.array.constructor))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
        ),
        null
      );
    if ((t === void 0 && (t = h.itemSize), t !== h.itemSize))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
        ),
        null
      );
    if ((n === void 0 && (n = h.normalized), n !== h.normalized))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
        ),
        null
      );
    if ((i === -1 && (i = h.gpuType), i !== h.gpuType))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
        ),
        null
      );
    r += h.count * t;
  }
  let o = new e(r),
    a = new _t(o, t, n),
    c = 0;
  for (let l = 0; l < s.length; ++l) {
    let h = s[l];
    if (h.isInterleavedBufferAttribute) {
      let d = c / t;
      for (let u = 0, f = h.count; u < f; u++)
        for (let v = 0; v < t; v++) {
          let g = h.getComponent(u, v);
          a.setComponent(u + d, v, g);
        }
    } else o.set(h.array, c);
    c += h.count * t;
  }
  return (i !== void 0 && (a.gpuType = i), a);
}
function Jp(s, e = 1e-4) {
  e = Math.max(e, Number.EPSILON);
  let t = {},
    n = s.getIndex(),
    i = s.getAttribute("position"),
    r = n ? n.count : i.count,
    o = 0,
    a = Object.keys(s.attributes),
    c = {},
    l = {},
    h = [],
    d = ["getX", "getY", "getZ", "getW"],
    u = ["setX", "setY", "setZ", "setW"];
  for (let S = 0, E = a.length; S < E; S++) {
    let y = a[S],
      w = s.attributes[y];
    c[y] = new w.constructor(
      new w.array.constructor(w.count * w.itemSize),
      w.itemSize,
      w.normalized,
    );
    let A = s.morphAttributes[y];
    A &&
      (l[y] || (l[y] = []),
      A.forEach((I, C) => {
        let b = new I.array.constructor(I.count * I.itemSize);
        l[y][C] = new I.constructor(b, I.itemSize, I.normalized);
      }));
  }
  let f = e * 0.5,
    v = Math.log10(1 / e),
    g = Math.pow(10, v),
    m = f * g;
  for (let S = 0; S < r; S++) {
    let E = n ? n.getX(S) : S,
      y = "";
    for (let w = 0, A = a.length; w < A; w++) {
      let I = a[w],
        C = s.getAttribute(I),
        b = C.itemSize;
      for (let T = 0; T < b; T++) y += `${~~(C[d[T]](E) * g + m)},`;
    }
    if (y in t) h.push(t[y]);
    else {
      for (let w = 0, A = a.length; w < A; w++) {
        let I = a[w],
          C = s.getAttribute(I),
          b = s.morphAttributes[I],
          T = C.itemSize,
          D = c[I],
          z = l[I];
        for (let G = 0; G < T; G++) {
          let W = d[G],
            X = u[G];
          if ((D[X](o, C[W](E)), b))
            for (let V = 0, se = b.length; V < se; V++) z[V][X](o, b[V][W](E));
        }
      }
      ((t[y] = o), h.push(o), o++);
    }
  }
  let p = s.clone();
  for (let S in s.attributes) {
    let E = c[S];
    if (
      (p.setAttribute(
        S,
        new E.constructor(
          E.array.slice(0, o * E.itemSize),
          E.itemSize,
          E.normalized,
        ),
      ),
      S in l)
    )
      for (let y = 0; y < l[S].length; y++) {
        let w = l[S][y];
        p.morphAttributes[S][y] = new w.constructor(
          w.array.slice(0, o * w.itemSize),
          w.itemSize,
          w.normalized,
        );
      }
  }
  return (p.setIndex(h), p);
}
function Ru(s, e) {
  if (e === Kh)
    return (
      console.warn(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.",
      ),
      s
    );
  if (e === Yr || e === ga) {
    let t = s.getIndex();
    if (t === null) {
      let o = [],
        a = s.getAttribute("position");
      if (a !== void 0) {
        for (let c = 0; c < a.count; c++) o.push(c);
        (s.setIndex(o), (t = s.getIndex()));
      } else
        return (
          console.error(
            "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.",
          ),
          s
        );
    }
    let n = t.count - 2,
      i = [];
    if (e === Yr)
      for (let o = 1; o <= n; o++)
        (i.push(t.getX(0)), i.push(t.getX(o)), i.push(t.getX(o + 1)));
    else
      for (let o = 0; o < n; o++)
        o % 2 === 0
          ? (i.push(t.getX(o)), i.push(t.getX(o + 1)), i.push(t.getX(o + 2)))
          : (i.push(t.getX(o + 2)), i.push(t.getX(o + 1)), i.push(t.getX(o)));
    i.length / 3 !== n &&
      console.error(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.",
      );
    let r = s.clone();
    return (r.setIndex(i), r.clearGroups(), r);
  } else
    return (
      console.error(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",
        e,
      ),
      s
    );
}
var Sa = new R();
function oi(s, e, t, n, i, r) {
  let o = (2 * Math.PI * i) / 4,
    a = Math.max(r - 2 * i, 0),
    c = Math.PI / 4;
  (Sa.copy(e), (Sa[n] = 0), Sa.normalize());
  let l = (0.5 * o) / (o + a),
    h = 1 - Sa.angleTo(s) / c;
  return Math.sign(Sa[t]) === 1 ? h * l : a / (o + a) + l + l * (1 - h);
}
var Ht = class s extends Wt {
  constructor(e = 1, t = 1, n = 1, i = 2, r = 0.1) {
    let o = i * 2 + 1;
    if (
      ((r = Math.min(e / 2, t / 2, n / 2, r)),
      super(1, 1, 1, o, o, o),
      (this.type = "RoundedBoxGeometry"),
      (this.parameters = {
        width: e,
        height: t,
        depth: n,
        segments: i,
        radius: r,
      }),
      o === 1)
    )
      return;
    let a = this.toNonIndexed();
    ((this.index = null),
      (this.attributes.position = a.attributes.position),
      (this.attributes.normal = a.attributes.normal),
      (this.attributes.uv = a.attributes.uv));
    let c = new R(),
      l = new R(),
      h = new R(e, t, n).divideScalar(2).subScalar(r),
      d = this.attributes.position.array,
      u = this.attributes.normal.array,
      f = this.attributes.uv.array,
      v = d.length / 6,
      g = new R(),
      m = 0.5 / o;
    for (let p = 0, S = 0; p < d.length; p += 3, S += 2)
      switch (
        (c.fromArray(d, p),
        l.copy(c),
        (l.x -= Math.sign(l.x) * m),
        (l.y -= Math.sign(l.y) * m),
        (l.z -= Math.sign(l.z) * m),
        l.normalize(),
        (d[p + 0] = h.x * Math.sign(c.x) + l.x * r),
        (d[p + 1] = h.y * Math.sign(c.y) + l.y * r),
        (d[p + 2] = h.z * Math.sign(c.z) + l.z * r),
        (u[p + 0] = l.x),
        (u[p + 1] = l.y),
        (u[p + 2] = l.z),
        Math.floor(p / v))
      ) {
        case 0:
          (g.set(1, 0, 0),
            (f[S + 0] = oi(g, l, "z", "y", r, n)),
            (f[S + 1] = 1 - oi(g, l, "y", "z", r, t)));
          break;
        case 1:
          (g.set(-1, 0, 0),
            (f[S + 0] = 1 - oi(g, l, "z", "y", r, n)),
            (f[S + 1] = 1 - oi(g, l, "y", "z", r, t)));
          break;
        case 2:
          (g.set(0, 1, 0),
            (f[S + 0] = 1 - oi(g, l, "x", "z", r, e)),
            (f[S + 1] = oi(g, l, "z", "x", r, n)));
          break;
        case 3:
          (g.set(0, -1, 0),
            (f[S + 0] = 1 - oi(g, l, "x", "z", r, e)),
            (f[S + 1] = 1 - oi(g, l, "z", "x", r, n)));
          break;
        case 4:
          (g.set(0, 0, 1),
            (f[S + 0] = 1 - oi(g, l, "x", "y", r, e)),
            (f[S + 1] = 1 - oi(g, l, "y", "x", r, t)));
          break;
        case 5:
          (g.set(0, 0, -1),
            (f[S + 0] = oi(g, l, "x", "y", r, e)),
            (f[S + 1] = 1 - oi(g, l, "y", "x", r, t)));
          break;
      }
  }
  static fromJSON(e) {
    return new s(e.width, e.height, e.depth, e.segments, e.radius);
  }
};
function In({
  rOut: s = 1,
  rRoot: e = 0.85,
  teeth: t = 12,
  depth: n = 0.25,
  hole: i = 0.25,
  spokes: r = 0,
  rim: o = 0,
  toothTip: a = 0.45,
  bevel: c = 0.03,
  sharp: l = !1,
  curveSegs: h = 3,
} = {}) {
  let d = new Ii(),
    u = t;
  for (let v = 0; v < u; v++) {
    let g = (v / u) * Math.PI * 2,
      m = (Math.PI * 2) / u;
    if (l) {
      let p = [Math.cos(g) * e, Math.sin(g) * e],
        S = [Math.cos(g + m * 0.78) * s, Math.sin(g + m * 0.78) * s];
      (v === 0 ? d.moveTo(p[0], p[1]) : d.lineTo(p[0], p[1]),
        d.lineTo(S[0], S[1]));
    } else {
      let p = m * 0.5,
        S = m * a * 0.5,
        E = [
          [g - p * 0.5, e],
          [g - S, s],
          [g + S, s],
          [g + p * 0.5, e],
          [g + m - p * 0.5, e],
        ];
      for (let y = 0; y < E.length; y++) {
        let [w, A] = E[y],
          I = Math.cos(w) * A,
          C = Math.sin(w) * A;
        v === 0 && y === 0 ? d.moveTo(I, C) : d.lineTo(I, C);
      }
    }
  }
  if ((d.closePath(), i > 0)) {
    let v = new gs();
    (v.absarc(0, 0, i, 0, Math.PI * 2, !0), d.holes.push(v));
  }
  if (r > 0) {
    let v = Math.max(i + 0.08 * s, s * 0.32),
      g = e * (1 - Math.max(o, 0.16));
    for (let m = 0; m < r; m++) {
      let p = (m / r) * Math.PI * 2 + 0.22 * ((Math.PI * 2) / r) * 0.5,
        S = ((m + 1) / r) * Math.PI * 2 - 0.22 * ((Math.PI * 2) / r) * 0.5,
        E = new gs(),
        y = 10;
      E.moveTo(Math.cos(p) * v, Math.sin(p) * v);
      for (let w = 0; w <= y; w++) {
        let A = p + (S - p) * (w / y);
        E.lineTo(Math.cos(A) * g, Math.sin(A) * g);
      }
      for (let w = y; w >= 0; w--) {
        let A = p + (S - p) * (w / y);
        E.lineTo(Math.cos(A) * v, Math.sin(A) * v);
      }
      d.holes.push(E);
    }
  }
  let f = new Hs(d, {
    depth: n,
    bevelEnabled: c > 0,
    bevelThickness: c,
    bevelSize: c,
    bevelSegments: 2,
    curveSegments: 16,
  });
  return (f.translate(0, 0, -n / 2), f.computeVertexNormals(), f);
}
function Dn(s, e = 32, t = 0, n = Math.PI * 2) {
  return new Qo(
    s.map(([i, r]) => new ae(i, r)),
    e,
    t,
    n,
  );
}
function eo({
  rx: s,
  rz: e,
  y: t,
  n,
  size: i = 0.07,
  arc: r = [0, Math.PI * 2],
  normalOut: o = !0,
}) {
  let a = [],
    c = new Lt(i, 6, 4);
  for (let l = 0; l < n; l++) {
    let h = r[0] + ((r[1] - r[0]) * (l + 0.5)) / n,
      d = c.clone();
    (d.translate(Math.sin(h) * s, t, Math.cos(h) * e), a.push(d));
  }
  return Ei(a);
}
function to(s, e = 0.1, t = 24, n = 8) {
  let i = new zr(s.map((r) => new R(...r)));
  return new ta(i, t, e, n, !1);
}
function $p({
  nor: s,
  arm: e,
  scale: t = 0.5,
  normalStrength: n = 0.8,
  roughBase: i = 0.5,
  roughVar: r = 0.5,
  grime: o = 0.35,
}) {
  return (a) => {
    ((a.uniforms.tTriNor = { value: s }),
      (a.uniforms.tTriArm = { value: e }),
      (a.uniforms.uTriScale = { value: t }),
      (a.uniforms.uTriNS = { value: n }),
      (a.uniforms.uTriRB = { value: i }),
      (a.uniforms.uTriRV = { value: r }),
      (a.uniforms.uTriGrime = { value: o }),
      (a.vertexShader =
        `varying vec3 vTriP; varying vec3 vTriN;
` +
        a.vertexShader.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
 vTriP = position; vTriN = normal;`,
        )),
      (a.fragmentShader =
        `varying vec3 vTriP; varying vec3 vTriN; uniform sampler2D tTriNor; uniform sampler2D tTriArm; uniform float uTriScale; uniform float uTriNS; uniform float uTriRB; uniform float uTriRV; uniform float uTriGrime; uniform mat3 normalMatrix;
      vec3 triW(vec3 n){ vec3 w = pow(abs(n), vec3(4.0)); return w / (w.x + w.y + w.z + 1e-5); }
      ` + a.fragmentShader),
      (a.fragmentShader = a.fragmentShader.replace(
        "#include <roughnessmap_fragment>",
        `
      #include <roughnessmap_fragment>
      vec3 tN = normalize(vTriN); vec3 tw = triW(tN); vec3 tP = vTriP * uTriScale;
      vec3 armX = texture2D(tTriArm, tP.zy).rgb, armY = texture2D(tTriArm, tP.xz).rgb, armZ = texture2D(tTriArm, tP.xy).rgb;
      vec3 arm = armX * tw.x + armY * tw.y + armZ * tw.z;
      roughnessFactor = clamp(uTriRB + (arm.g - 0.5) * uTriRV, 0.04, 1.0);
      diffuseColor.rgb *= mix(1.0 - uTriGrime, 1.0, arm.r);
    `,
      )),
      (a.fragmentShader = a.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `
      #include <normal_fragment_maps>
      {
        vec3 nX = texture2D(tTriNor, tP.zy).xyz * 2.0 - 1.0;
        vec3 nY = texture2D(tTriNor, tP.xz).xyz * 2.0 - 1.0;
        vec3 nZ = texture2D(tTriNor, tP.xy).xyz * 2.0 - 1.0;
        nX.xy *= uTriNS; nY.xy *= uTriNS; nZ.xy *= uTriNS;
        nX = vec3(nX.xy + tN.zy, abs(nX.z) * tN.x);
        nY = vec3(nY.xy + tN.xz, abs(nY.z) * tN.y);
        nZ = vec3(nZ.xy + tN.xy, abs(nZ.z) * tN.z);
        vec3 on = normalize(nX.zyx * tw.x + nY.xzy * tw.y + nZ.xyz * tw.z);
        vec3 vn = normalize(normalMatrix * on);
        normal = faceDirection * vn;
      }
    `,
      )));
  };
}
var tr = new R(-0.62, 0.5, -0.6).normalize(),
  By = 0.7226,
  Qt = Si,
  Cu = 12345,
  ct = () => ((Cu = (Cu * 16807) % 2147483647), (Cu - 1) / 2147483646),
  je = (s, e) => s + (e - s) * ct();
function Nc(s, e) {
  let t = Math.sin(s * 127.1 + e * 311.7) * 43758.5453;
  return t - Math.floor(t);
}
function zy(s, e) {
  let t = Math.floor(s),
    n = Math.floor(e),
    i = s - t,
    r = e - n,
    o = i * i * (3 - 2 * i),
    a = r * r * (3 - 2 * r);
  return (
    (Nc(t, n) * (1 - o) + Nc(t + 1, n) * o) * (1 - a) +
    (Nc(t, n + 1) * (1 - o) + Nc(t + 1, n + 1) * o) * a
  );
}
function ba(s, e) {
  let t = 0,
    n = 0.5,
    i = 1;
  for (let r = 0; r < 4; r++)
    ((t += zy(s * i, e * i) * n), (i *= 2.03), (n *= 0.5));
  return t;
}

export {
  Ot, Zp, bt, er, Oy, Pn, bi, Au, Uc, Ei, Kp, Jp, Ru, Sa, oi, Ht, In, Dn, eo, to, $p, tr, Nc, zy, ba,
  By, Qt, ct, je
};