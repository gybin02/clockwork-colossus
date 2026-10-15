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
const xi = THREE.NoBlending;
const sn = THREE.HalfFloatType;

var no = {
  name: "CopyShader",
  uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`,
};
var Ti = class {
    constructor() {
      ((this.isPass = !0),
        (this.enabled = !0),
        (this.needsSwap = !0),
        (this.clear = !1),
        (this.renderToScreen = !1));
    }
    setSize() {}
    render() {
      console.error(
        "THREE.Pass: .render() must be implemented in derived pass.",
      );
    }
    dispose() {}
  },
  Hy = new ns(-1, 1, 1, -1, 0, 1),
  Pu = class extends xt {
    constructor() {
      (super(),
        this.setAttribute(
          "position",
          new it([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3),
        ),
        this.setAttribute("uv", new it([0, 2, 0, 0, 2, 0], 2)));
    }
  },
  ky = new Pu(),
  io = class {
    constructor(e) {
      this._mesh = new Ae(ky, e);
    }
    dispose() {
      this._mesh.geometry.dispose();
    }
    render(e) {
      e.render(this._mesh, Hy);
    }
    get material() {
      return this._mesh.material;
    }
    set material(e) {
      this._mesh.material = e;
    }
  };
var Ms = class extends Ti {
  constructor(e, t = "tDiffuse") {
    (super(),
      (this.textureID = t),
      (this.uniforms = null),
      (this.material = null),
      e instanceof Mt
        ? ((this.uniforms = e.uniforms), (this.material = e))
        : e &&
          ((this.uniforms = Ks.clone(e.uniforms)),
          (this.material = new Mt({
            name: e.name !== void 0 ? e.name : "unspecified",
            defines: Object.assign({}, e.defines),
            uniforms: this.uniforms,
            vertexShader: e.vertexShader,
            fragmentShader: e.fragmentShader,
          }))),
      (this._fsQuad = new io(this.material)));
  }
  render(e, t, n) {
    (this.uniforms[this.textureID] &&
      (this.uniforms[this.textureID].value = n.texture),
      (this._fsQuad.material = this.material),
      this.renderToScreen
        ? (e.setRenderTarget(null), this._fsQuad.render(e))
        : (e.setRenderTarget(t),
          this.clear &&
            e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
          this._fsQuad.render(e)));
  }
  dispose() {
    (this.material.dispose(), this._fsQuad.dispose());
  }
};
var Ea = class extends Ti {
    constructor(e, t) {
      (super(),
        (this.scene = e),
        (this.camera = t),
        (this.clear = !0),
        (this.needsSwap = !1),
        (this.inverse = !1));
    }
    render(e, t, n) {
      let i = e.getContext(),
        r = e.state;
      (r.buffers.color.setMask(!1),
        r.buffers.depth.setMask(!1),
        r.buffers.color.setLocked(!0),
        r.buffers.depth.setLocked(!0));
      let o, a;
      (this.inverse ? ((o = 0), (a = 1)) : ((o = 1), (a = 0)),
        r.buffers.stencil.setTest(!0),
        r.buffers.stencil.setOp(i.REPLACE, i.REPLACE, i.REPLACE),
        r.buffers.stencil.setFunc(i.ALWAYS, o, 4294967295),
        r.buffers.stencil.setClear(a),
        r.buffers.stencil.setLocked(!0),
        e.setRenderTarget(n),
        this.clear && e.clear(),
        e.render(this.scene, this.camera),
        e.setRenderTarget(t),
        this.clear && e.clear(),
        e.render(this.scene, this.camera),
        r.buffers.color.setLocked(!1),
        r.buffers.depth.setLocked(!1),
        r.buffers.color.setMask(!0),
        r.buffers.depth.setMask(!0),
        r.buffers.stencil.setLocked(!1),
        r.buffers.stencil.setFunc(i.EQUAL, 1, 4294967295),
        r.buffers.stencil.setOp(i.KEEP, i.KEEP, i.KEEP),
        r.buffers.stencil.setLocked(!0));
    }
  },
  Fc = class extends Ti {
    constructor() {
      (super(), (this.needsSwap = !1));
    }
    render(e) {
      (e.state.buffers.stencil.setLocked(!1),
        e.state.buffers.stencil.setTest(!1));
    }
  };
var Oc = class {
  constructor(e, t) {
    if (
      ((this.renderer = e),
      (this._pixelRatio = e.getPixelRatio()),
      t === void 0)
    ) {
      let n = e.getSize(new ae());
      ((this._width = n.width),
        (this._height = n.height),
        (t = new ln(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
          { type: sn },
        )),
        (t.texture.name = "EffectComposer.rt1"));
    } else ((this._width = t.width), (this._height = t.height));
    ((this.renderTarget1 = t),
      (this.renderTarget2 = t.clone()),
      (this.renderTarget2.texture.name = "EffectComposer.rt2"),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      (this.copyPass = new Ms(no)),
      (this.copyPass.material.blending = xi),
      (this.clock = new ha()));
  }
  swapBuffers() {
    let e = this.readBuffer;
    ((this.readBuffer = this.writeBuffer), (this.writeBuffer = e));
  }
  addPass(e) {
    (this.passes.push(e),
      e.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  insertPass(e, t) {
    (this.passes.splice(t, 0, e),
      e.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  removePass(e) {
    let t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled) return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    let t = this.renderer.getRenderTarget(),
      n = !1;
    for (let i = 0, r = this.passes.length; i < r; i++) {
      let o = this.passes[i];
      if (o.enabled !== !1) {
        if (
          ((o.renderToScreen =
            this.renderToScreen && this.isLastEnabledPass(i)),
          o.render(this.renderer, this.writeBuffer, this.readBuffer, e, n),
          o.needsSwap)
        ) {
          if (n) {
            let a = this.renderer.getContext(),
              c = this.renderer.state.buffers.stencil;
            (c.setFunc(a.NOTEQUAL, 1, 4294967295),
              this.copyPass.render(
                this.renderer,
                this.writeBuffer,
                this.readBuffer,
                e,
              ),
              c.setFunc(a.EQUAL, 1, 4294967295));
          }
          this.swapBuffers();
        }
        Ea !== void 0 &&
          (o instanceof Ea ? (n = !0) : o instanceof Fc && (n = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(e) {
    if (e === void 0) {
      let t = this.renderer.getSize(new ae());
      ((this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = t.width),
        (this._height = t.height),
        (e = this.renderTarget1.clone()),
        e.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
        ));
    }
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = e),
      (this.renderTarget2 = e.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2));
  }
  setSize(e, t) {
    ((this._width = e), (this._height = t));
    let n = this._width * this._pixelRatio,
      i = this._height * this._pixelRatio;
    (this.renderTarget1.setSize(n, i), this.renderTarget2.setSize(n, i));
    for (let r = 0; r < this.passes.length; r++) this.passes[r].setSize(n, i);
  }
  setPixelRatio(e) {
    ((this._pixelRatio = e), this.setSize(this._width, this._height));
  }
  dispose() {
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      this.copyPass.dispose());
  }
};
var Bc = class extends Ti {
  constructor(e, t, n = null, i = null, r = null) {
    (super(),
      (this.scene = e),
      (this.camera = t),
      (this.overrideMaterial = n),
      (this.clearColor = i),
      (this.clearAlpha = r),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this._oldClearColor = new _e()));
  }
  render(e, t, n) {
    let i = e.autoClear;
    e.autoClear = !1;
    let r, o;
    (this.overrideMaterial !== null &&
      ((o = this.scene.overrideMaterial),
      (this.scene.overrideMaterial = this.overrideMaterial)),
      this.clearColor !== null &&
        (e.getClearColor(this._oldClearColor),
        e.setClearColor(this.clearColor, e.getClearAlpha())),
      this.clearAlpha !== null &&
        ((r = e.getClearAlpha()), e.setClearAlpha(this.clearAlpha)),
      this.clearDepth == !0 && e.clearDepth(),
      e.setRenderTarget(this.renderToScreen ? null : n),
      this.clear === !0 &&
        e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
      e.render(this.scene, this.camera),
      this.clearColor !== null && e.setClearColor(this._oldClearColor),
      this.clearAlpha !== null && e.setClearAlpha(r),
      this.overrideMaterial !== null && (this.scene.overrideMaterial = o),
      (e.autoClear = i));
  }
};
var tm = {
  name: "LuminosityHighPassShader",
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new _e(0) },
    defaultOpacity: { value: 0 },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`,
};
var so = class s extends Ti {
  constructor(e, t = 1, n, i) {
    (super(),
      (this.strength = t),
      (this.radius = n),
      (this.threshold = i),
      (this.resolution = e !== void 0 ? new ae(e.x, e.y) : new ae(256, 256)),
      (this.clearColor = new _e(0, 0, 0)),
      (this.needsSwap = !1),
      (this.renderTargetsHorizontal = []),
      (this.renderTargetsVertical = []),
      (this.nMips = 5));
    let r = Math.round(this.resolution.x / 2),
      o = Math.round(this.resolution.y / 2);
    ((this.renderTargetBright = new ln(r, o, { type: sn })),
      (this.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
      (this.renderTargetBright.texture.generateMipmaps = !1));
    for (let h = 0; h < this.nMips; h++) {
      let d = new ln(r, o, { type: sn });
      ((d.texture.name = "UnrealBloomPass.h" + h),
        (d.texture.generateMipmaps = !1),
        this.renderTargetsHorizontal.push(d));
      let u = new ln(r, o, { type: sn });
      ((u.texture.name = "UnrealBloomPass.v" + h),
        (u.texture.generateMipmaps = !1),
        this.renderTargetsVertical.push(u),
        (r = Math.round(r / 2)),
        (o = Math.round(o / 2)));
    }
    let a = tm;
    ((this.highPassUniforms = Ks.clone(a.uniforms)),
      (this.highPassUniforms.luminosityThreshold.value = i),
      (this.highPassUniforms.smoothWidth.value = 0.01),
      (this.materialHighPassFilter = new Mt({
        uniforms: this.highPassUniforms,
        vertexShader: a.vertexShader,
        fragmentShader: a.fragmentShader,
      })),
      (this.separableBlurMaterials = []));
    let c = [3, 5, 7, 9, 11];
    ((r = Math.round(this.resolution.x / 2)),
      (o = Math.round(this.resolution.y / 2)));
    for (let h = 0; h < this.nMips; h++)
      (this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),
        (this.separableBlurMaterials[h].uniforms.invSize.value = new ae(
          1 / r,
          1 / o,
        )),
        (r = Math.round(r / 2)),
        (o = Math.round(o / 2)));
    ((this.compositeMaterial = this._getCompositeMaterial(this.nMips)),
      (this.compositeMaterial.uniforms.blurTexture1.value =
        this.renderTargetsVertical[0].texture),
      (this.compositeMaterial.uniforms.blurTexture2.value =
        this.renderTargetsVertical[1].texture),
      (this.compositeMaterial.uniforms.blurTexture3.value =
        this.renderTargetsVertical[2].texture),
      (this.compositeMaterial.uniforms.blurTexture4.value =
        this.renderTargetsVertical[3].texture),
      (this.compositeMaterial.uniforms.blurTexture5.value =
        this.renderTargetsVertical[4].texture),
      (this.compositeMaterial.uniforms.bloomStrength.value = t),
      (this.compositeMaterial.uniforms.bloomRadius.value = 0.1));
    let l = [1, 0.8, 0.6, 0.4, 0.2];
    ((this.compositeMaterial.uniforms.bloomFactors.value = l),
      (this.bloomTintColors = [
        new R(1, 1, 1),
        new R(1, 1, 1),
        new R(1, 1, 1),
        new R(1, 1, 1),
        new R(1, 1, 1),
      ]),
      (this.compositeMaterial.uniforms.bloomTintColors.value =
        this.bloomTintColors),
      (this.copyUniforms = Ks.clone(no.uniforms)),
      (this.blendMaterial = new Mt({
        uniforms: this.copyUniforms,
        vertexShader: no.vertexShader,
        fragmentShader: no.fragmentShader,
        blending: $t,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
      })),
      (this._oldClearColor = new _e()),
      (this._oldClearAlpha = 1),
      (this._basic = new yt()),
      (this._fsQuad = new io(null)));
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++)
      this.separableBlurMaterials[e].dispose();
    (this.compositeMaterial.dispose(),
      this.blendMaterial.dispose(),
      this._basic.dispose(),
      this._fsQuad.dispose());
  }
  setSize(e, t) {
    let n = Math.round(e / 2),
      i = Math.round(t / 2);
    this.renderTargetBright.setSize(n, i);
    for (let r = 0; r < this.nMips; r++)
      (this.renderTargetsHorizontal[r].setSize(n, i),
        this.renderTargetsVertical[r].setSize(n, i),
        (this.separableBlurMaterials[r].uniforms.invSize.value = new ae(
          1 / n,
          1 / i,
        )),
        (n = Math.round(n / 2)),
        (i = Math.round(i / 2)));
  }
  render(e, t, n, i, r) {
    (e.getClearColor(this._oldClearColor),
      (this._oldClearAlpha = e.getClearAlpha()));
    let o = e.autoClear;
    ((e.autoClear = !1),
      e.setClearColor(this.clearColor, 0),
      r && e.state.buffers.stencil.setTest(!1),
      this.renderToScreen &&
        ((this._fsQuad.material = this._basic),
        (this._basic.map = n.texture),
        e.setRenderTarget(null),
        e.clear(),
        this._fsQuad.render(e)),
      (this.highPassUniforms.tDiffuse.value = n.texture),
      (this.highPassUniforms.luminosityThreshold.value = this.threshold),
      (this._fsQuad.material = this.materialHighPassFilter),
      e.setRenderTarget(this.renderTargetBright),
      e.clear(),
      this._fsQuad.render(e));
    let a = this.renderTargetBright;
    for (let c = 0; c < this.nMips; c++)
      ((this._fsQuad.material = this.separableBlurMaterials[c]),
        (this.separableBlurMaterials[c].uniforms.colorTexture.value =
          a.texture),
        (this.separableBlurMaterials[c].uniforms.direction.value =
          s.BlurDirectionX),
        e.setRenderTarget(this.renderTargetsHorizontal[c]),
        e.clear(),
        this._fsQuad.render(e),
        (this.separableBlurMaterials[c].uniforms.colorTexture.value =
          this.renderTargetsHorizontal[c].texture),
        (this.separableBlurMaterials[c].uniforms.direction.value =
          s.BlurDirectionY),
        e.setRenderTarget(this.renderTargetsVertical[c]),
        e.clear(),
        this._fsQuad.render(e),
        (a = this.renderTargetsVertical[c]));
    ((this._fsQuad.material = this.compositeMaterial),
      (this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
      (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
      (this.compositeMaterial.uniforms.bloomTintColors.value =
        this.bloomTintColors),
      e.setRenderTarget(this.renderTargetsHorizontal[0]),
      e.clear(),
      this._fsQuad.render(e),
      (this._fsQuad.material = this.blendMaterial),
      (this.copyUniforms.tDiffuse.value =
        this.renderTargetsHorizontal[0].texture),
      r && e.state.buffers.stencil.setTest(!0),
      this.renderToScreen
        ? (e.setRenderTarget(null), this._fsQuad.render(e))
        : (e.setRenderTarget(n), this._fsQuad.render(e)),
      e.setClearColor(this._oldClearColor, this._oldClearAlpha),
      (e.autoClear = o));
  }
  _getSeparableBlurMaterial(e) {
    let t = [];
    for (let n = 0; n < e; n++)
      t.push((0.39894 * Math.exp((-0.5 * n * n) / (e * e))) / e);
    return new Mt({
      defines: { KERNEL_RADIUS: e },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new ae(0.5, 0.5) },
        direction: { value: new ae(0.5, 0.5) },
        gaussianCoefficients: { value: t },
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`,
    });
  }
  _getCompositeMaterial(e) {
    return new Mt({
      defines: { NUM_MIPS: e },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 },
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`,
    });
  }
};
so.BlurDirectionX = new ae(1, 0);
so.BlurDirectionY = new ae(0, 1);
var Vy = {
  uniforms: {
    tDiffuse: { value: null },
    tDistort: { value: null },
    uRes: { value: new ae(1, 1) },
    uTime: { value: 0 },
    toneMappingExposure: { value: 1 },
    uCA: { value: 0.0015 },
    uVig: { value: 0.32 },
    uGrain: { value: 0.035 },
    uSat: { value: 1.18 },
    uContrast: { value: 1.12 },
    uLift: { value: new R(0, 0, 0.018) },
    uGain: { value: new R(1.04, 1, 0.95) },
    uImpact: { value: 0 },
    uImpactCenter: { value: new ae(0.5, 0.5) },
    uFlash: { value: 0 },
    uFlashCol: { value: new _e(1, 0.9, 0.7) },
    uSpeed: { value: 0 },
    uHeat: { value: 0 },
    uDistAmt: { value: 1 },
    uLetterbox: { value: 0 },
  },
  vertexShader:
    "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: `
    #include <tonemapping_pars_fragment>
    uniform sampler2D tDiffuse; uniform sampler2D tDistort; uniform vec2 uRes; uniform float uTime;
    uniform float uCA; uniform float uVig; uniform float uGrain; uniform float uSat; uniform float uContrast;
    uniform vec3 uLift; uniform vec3 uGain; uniform float uImpact; uniform vec2 uImpactCenter; uniform float uFlash; uniform vec3 uFlashCol;
    uniform float uSpeed; uniform float uHeat; uniform float uDistAmt; uniform float uLetterbox;
    varying vec2 vUv;
    float h12(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    vec3 toSRGB(vec3 c){ c = max(c, 0.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c)); }
    void main(){
      vec2 uv = vUv;
      vec2 off = texture2D(tDistort, uv).rg * uDistAmt;
      uv += off;
      vec2 dc = uv - 0.5;
      float r2 = dot(dc, dc);
      vec2 ca = dc * (uCA * (0.35 + r2 * 2.5));
      vec3 col;
      col.r = texture2D(tDiffuse, uv + ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - ca).b;
      col = ACESFilmicToneMapping(col);
      col = toSRGB(col);
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat);
      col = (col - 0.5) * uContrast + 0.5;
      col = col * uGain + uLift * (1.0 - col);
      vec3 warm = vec3(1.04, 0.99, 0.92), cool = vec3(0.94, 0.98, 1.05);
      col *= mix(cool, warm, smoothstep(0.2, 0.8, l));
      col = mix(col, col * vec3(1.06, 0.95, 0.9), uHeat * 0.2);
      vec2 vv = (vUv - 0.5) * vec2(1.0, 0.82);
      col *= 1.0 - uVig * smoothstep(0.18, 0.75, dot(vv, vv) * 2.2);
      if (uSpeed > 0.001) {
        vec2 d = vUv - uImpactCenter + vec2(1e-4, 2e-4); d.x *= uRes.x / uRes.y;
        float ang = atan(d.y, d.x);
        float rad = length(d);
        float s = h12(vec2(floor(ang * 70.0), floor(uTime * 24.0)));
        float line = step(0.82, s) * smoothstep(0.25, 0.75, rad);
        col = mix(col, vec3(1.0), line * uSpeed * 0.55);
      }
      if (uImpact > 0.001) {
        vec2 d = vUv - uImpactCenter + vec2(1e-4, 2e-4); d.x *= uRes.x / uRes.y;
        float ang = atan(d.y, d.x);
        float rays = step(0.6, h12(vec2(floor(ang * 48.0), 3.0))) * smoothstep(0.08, 0.7, length(d));
        vec3 inv = 1.0 - col;
        float li = dot(inv, vec3(0.299, 0.587, 0.114));
        inv = mix(vec3(li), inv, 0.55);
        inv = clamp((inv - 0.5) * 1.8 + 0.5, 0.0, 1.0);
        inv = mix(inv, vec3(1.0), rays * 0.35);
        col = mix(col, inv, uImpact);
      }
      col = mix(col, uFlashCol, uFlash);
      float g = h12(vUv * uRes + fract(uTime * 7.31) * 100.0) - 0.5;
      col += g * uGrain;
      float lb = uLetterbox * 0.11;
      if (vUv.y < lb || vUv.y > 1.0 - lb) col = vec3(0.0);
      gl_FragColor = vec4(col, 1.0);
    }`,
};
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


export { nm, nm as createPostProcessing };