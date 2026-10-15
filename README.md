# Clockwork Colossus (钟表巨神)

> 🌐 **原站在线体验地址**：[https://clockwork-colossus.vercel.app/](https://clockwork-colossus.vercel.app/)  
> 💡 **原项目作者/来源**：[@ammaar (Ammaar Reshi)](https://x.com/ammaar)

基于 WebGL / Three.js 打造的高表现力 3D 动作 Boss 战网页游戏。玩家操控骑士挑战身形庞大的发条机械巨神（Clockwork Colossus），通过翻滚无敌帧、精准跳跃躲避冲击波和滚动齿轮，伺机反击并在巨神过热虚弱时打出爆发伤害。

---

## 🎮 操作指南

| 动作 | 按键映射 | 描述 |
| :--- | :--- | :--- |
| **移动** | `W` `A` `S` `D` 或 `方向键` | 控制骑士全向移动 |
| **轻/重攻击** | `鼠标左键` / `J` / `Enter` | 挥剑连击，命中 Boss 会积攒虚弱硬直 |
| **翻滚闪避** | `Space (空格)` | 快速翻滚位移，附带短时间无敌帧 (iframe) |
| **跳跃** | `K` | 垂直起跳，用于跳跃规避地面的环形冲击波 |
| **疾冲** | `Left Shift` / `Right Shift` / `L` | 快速冲刺切入或远离攻击范围 |

---

## 🏗️ 核心架构与系统设计

游戏逻辑由纯 JavaScript 配合 Three.js 模块化实现，分层清晰，主要包含以下核心子系统：

### 1. 仿真与世界状态机 (`Simulation / World State - Dc`)
* **确定性与种子随机**：支持输入随机种子 (`seed`)，保证攻击模式及齿轮弹跳轨迹可复现。
* **物理与碰撞**：
  * 基于圆环碰撞模型检测 Boss 踩踏震荡波 (`spawnRing`)。
  * 抛物线运动与地面物理反弹检测 (`spawnCog`)。
* **打击反馈机制**：
  * **顿帧 (HitStop)**：强力击中与受击时的微小时间暂停。
  * **子弹时间 (SlowMo)**：特定大招或极限闪避时的时间膨胀特效。
  * **极限躲避判定 (NearMiss)**：贴脸闪避环形冲击波时提供视觉反馈并累加评价。

### 2. 实体状态机 (Entities)
* **Knight (玩家)**：包含生命值、无敌帧 (iframe)、动作连招状态机、受击硬直及位移计算。
* **Boss (钟表巨神)**：
  * **多阶段姿态与骨骼系统 (`Ac Rig`)**：由大量发条齿轮、钟面核心与装甲外壳驱动。
  * **过热槽 (`overheat`)**：释放高强度攻击或受创后热量增加，过热时进入发热发红的易伤虚弱状态。
  * **攻击组合技能**：地脉重砸 (Slam)、发条横扫 (Sweep)、齿轮弹幕 (Cog Launch)、连续震荡波 (Shockwave Rings)。

### 3. 渲染管线与着色器 (Render Pipeline)
* **PBR 材质系统**：全面应用法线贴图 (Normal GL)、粗糙度/金属度/环境遮罩 (ARM 贴图) 以及 8K 天空球与 512 HDR 环境反射探针。
* **自定义着色器 Uniforms**：
  * `uHeat`：动态控制 Boss 材质的发光与发热灼烧效果。
  * `uRimDir`：基于摄像机视角的动态边缘高光。
  * `uSun` / `uVis`：体积光 God Rays 与太阳遮挡探针。
* **后处理管线**：径向冲击波畸变 (Radial Distortion)、屏幕暗角与渐隐效果。

---

## 📂 项目工程结构

```text
├── index.html                   # 游戏入口、HUD 界面、字体定义与全屏加载器
├── vite.config.js               # Vite 构建配置
├── package.json                 # 工程依赖（Three.js 等）与脚本
├── src/
│   ├── core/                    # 核心仿真、状态机与输入控制
│   │   ├── math.js              # 数学工具、缓动函数与反向动力学 (IK)
│   │   ├── simulation.js        # 仿真世界状态机、物理判定与事件流
│   │   ├── camera.js            # 智能跟随摄像机与震屏反馈
│   │   └── input.js             # 键鼠输入监听系统
│   ├── entities/                # 骨骼姿态与招式系统
│   │   ├── boss-rig.js          # Boss 发条巨神骨骼层级与姿态驱动
│   │   ├── boss-attacks.js      # Boss 攻击招式关键帧 (重砸/横扫/齿轮散射/咆哮)
│   │   └── knight-rig.js        # 玩家骑士骨骼层级与连招姿态机
│   ├── graphics/                # 渲染表现与着色器
│   │   ├── shaders.js           # 动态边缘高光与过热 Uniform 着色器注入
│   │   ├── environment.js       # 悬崖八角形竞技场与全景天空球
│   │   ├── boss-view.js         # Boss 3D 机甲外观与核心发条装配
│   │   ├── knight-view.js       # 骑士 3D 外观与布料模拟披风
│   │   ├── particles.js         # 剑气残影、火花粒子与冲击波环
│   │   ├── postprocessing.js    # 全屏径向畸变扭曲与体积光 (God Rays)
│   │   └── models.js            # GLTF 模型加载与程序化顶点处理
│   └── main.js                  # 游戏主入口与渲染循环
├── public/assets/               # 静态资源 (GLB 模型、HDR、PBR 贴图、字体)
└── README.md
```

---

## 🚀 启动与部署

本项目已重构为标准的 Vite 模块化现代工程：

```bash
# 安装依赖
npm install

# 本地热重载开发服务器
npm run dev

# 生产环境打包构建
npm run build

# 本地预览生产构建产物
npm run preview
```

启动后在现代浏览器（Chrome / Edge / Safari / Firefox）中访问 `http://localhost:8000` 即可开始游玩。
