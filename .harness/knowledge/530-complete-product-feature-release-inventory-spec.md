---
spec_id: SPEC-HARNESS-004
module: harness
feature: 530-complete-product-feature-release-inventory
status: draft
version: v1.3
author: AI·Architect
reviewer: AI·Reviewer
created_at: 2026-04-27
updated_at: 2026-04-28
change_dir: changes/530-complete-product-feature-release-inventory
---

# 530 完整产品功能发布清单 SPEC

## 1. 文档目的

本文档用于规划 530 版本完整产品功能发布清单。530 定位为**本体构建器成熟版 + OSDK 开发者工具链 + Workshop MVP + OAG 安全执行闭环**，采用增量口径，在 430 已交付能力基础上，以**对标 Palantir Ontology Builder 核心能力**为目标，补齐 Schema 安全演进、Interface 共享语义、OSDK 类型安全开发、Workshop MVP 应用构建，以及 OAG 确定性智能体执行闭环。530 不追求能力铺满，优先保证本体建模、应用构建和 AI 执行三条核心主链端到端可交付、可审计、可回归，工具链和治理两条使能链同步推进。

对标基线：[Palantir Ontology Manager / AIP / Workshop / OSDK](https://www.palantir.com/docs/foundry/ontology/overview) 公开文档，聚焦本体构建器（Ontology Builder）及其生态（语义建模、应用构建、AI Agent、开发者工具链）的完整能力。

## 2. 对标框架：Palantir 核心能力矩阵

### 2.1 Palantir Ontology 能力分层

```
┌──────────────────────────────────────────────────────────┐
│                   应用层 (Workshop / AIP Terminal)         │
│  拖拽式应用构建 / 自然语言→代码 / 交互式仪表盘           │
├──────────────────────────────────────────────────────────┤
│                   AI Agent 层 (AIP Logic / AIP Automate)  │
│  OAG / 多Agent编排 / 记忆=本体状态 / 确定性逻辑工具      │
├──────────────────────────────────────────────────────────┤
│                语义建模层 (Ontology Manager)              │
│  对象类型/链接/属性/接口/动作/函数/分类/版本/迁移        │
├──────────────────────────────────────────────────────────┤
│                 数据集成层 (Pipeline Builder)             │
│  多源接入/语义标准化/实时同步/双向写回/数据血统         │
├──────────────────────────────────────────────────────────┤
│              开发者工具链 (OSDK / MCP / Functions SDK)    │
│  TypeScript/Python SDK / 自定义Widget / CLI              │
├──────────────────────────────────────────────────────────┤
│              安全治理层 (Compass / ABAC / Audit)         │
│  基于项目的权限/属性级ACL/目的型控制/全链路审计        │
└──────────────────────────────────────────────────────────┘
```

### 2.2 430 已覆盖 vs Palantir 对标差距

| 能力域 | Palantir 能力 | 430 覆盖度 | 差距等级 |
|--------|-------------|-----------|---------|
| 本体对象类型管理 | Object Type CRUD + 向导式创建 | ✅ 已覆盖 | — |
| 属性管理 | Property CRUD + 类型校验 + 语义绑定 | ✅ 已覆盖 | — |
| 链接/关系建模 | Link Type + Cardinality + 双向关系 | ✅ 基础覆盖 | L1 |
| 动作与函数 | Action/Function CRUD + 编译发布 + 调用 | ✅ 已覆盖 | — |
| 对象浏览器 | Object Browser + 图谱展示 | ✅ 基础覆盖 | L1 |
| 本体发布 | Versioning + Publish + 导入导出 | 🟡 部分覆盖 | L1 |
| **接口与共享属性** | **Interface / Shared Property Types** | ❌ 缺失 | **L2** |
| **Schema 迁移框架** | **9+ 迁移类型 / 断变更处理** | ❌ 缺失 | **L2** |
| **类型分组与分类** | **Type Groups / 搜索式分类** | ❌ 缺失 | **L1** |
| **本体 SDK** | **OSDK (TypeScript/Python/Java)** | ❌ 缺失 | **L2** |
| **无码应用构建器** | **Workshop / 拖拽式 App Builder** | ❌ 缺失 | **L3** |
| **本体增强生成 OAG** | **Ontology-Augmented Generation** | ❌ 缺失 | **L3** |
| **场景与仿真** | **Scenario / What-if / 分支仿真** | ❌ 缺失 | **L3** |
| **AI Agent 记忆=本体状态** | **Operational State / 非会话记忆** | ❌ 缺失 | **L2** |
| **工作流血统** | **Workflow Lineage / 依赖关系图** | ❌ 缺失 | **L1** |
| **多模态属性** | **Media / Geospatial / Time Series** | ❌ 缺失 | **L2** |
| **属性级 ABAC** | **Attribute-Based Access Control** | 🟡 基础权限 | L1 |
| **双向数据同步** | **Ontology Sync / 写回源系统** | ❌ 缺失 | L2 |
| **自定义 Widget 插件** | **Custom Widget / iframe 桥接** | ❌ 缺失 | L2 |
| **本体评估/测试** | **AIP Evals / Ontology Test** | 🟡 Eval 骨架 | L1 |

> **差距等级定义**：L1=轻度（可在 530 版本补齐）、L2=中度（需要跨 Sprint 完成）、L3=重度（需多个版本或外部依赖）

## 3. 530 归类原则

### 3.1 架构归类原则

功能归属对齐 430 稳定架构边界：

1. AI中枢与编排
2. 数据底座与本体构建器 **(530 核心增强模块)**
3. 认知与记忆服务
4. 感知执行闭环
5. 安全合规与治理
6. 开发运营与部署基座

### 3.2 530 增量策略

```
530 = 430 完整能力 × (本体构建器成熟度提升 + 应用构建层补齐 + AI Agent 深度集成)
```

- 430 已交付的能力作为 530 基线，530 不做重新实现
- 530 聚焦**补齐对标差距**和**深化已有能力**
- 430 迁移而来的技术债（命名统一、测试覆盖、Spring Boot 升级）纳入平台工程线

### 3.3 交付优先级

```
P0 (530必达):  Schema迁移框架 / 接口与共享属性 / 本体SDK (Python) / 无码App构建器MVP
P1 (530力争):  OAG推理模式 / AI Agent本体状态记忆 / 类型分组 / OSDK TypeScript
P2 (530可降级至540): 场景仿真 / 多模态属性 / 自定义Widget插件 / 双向数据同步
```

### 3.4 530 工作流拆分

530 按 5 条主链组织交付，每条主链对应一个端到端价值流：

```
主链 A：本体建模成熟度（530 最重要的底座链路）
  Schema Diff → 迁移指令 → 迁移执行 → Interface → 类型分组 → 部署检查 → 本体血统
  没有这条链，Workshop、OSDK、OAG 都缺少稳定语义基础。

主链 B：开发者工具链
  Ontology Schema → SDK Generator → Python OSDK → TypeScript OSDK → 示例工程 → CI 回归
  Python 先行，TypeScript 紧随；Java SDK 不建议压进 530 必达。

主链 C：应用构建层
  应用元模型 → 基础画布 → 对象列表 → 表单 → Action 绑定 → 应用发布
  必须控制范围，不做复杂图表、不做自定义 Widget、不做市场。

主链 D：AI Agent 本体化
  本体上下文导出 → 确定性工具注册 → OAG Planner → Action 安全写回 → Decision Trace
  前置依赖：主链 A（本体建模成熟度）的 Schema 迁移和 Interface 必须先就位（§6.1 Sprint 2），OAG 推理模式和确定性工具注册在 Sprint 3 集成（§6.2 OAG 设计→确定性工具注册→AI Logic OAG 模式），否则 OAG 无法验收。

主链 E：治理与质量
  属性级 ABAC → 审批节点 → 审计增强 → Eval → Decision Trace → Release Gate
  用于保障 530 发布质量，尤其是涉及写回和 AI 自动执行的场景。
```

## 4. 530 完整功能发布清单

### 4.1 数据底座与本体构建器 (530 核心增强)

#### 4.1.1 本体构建器增强

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| 本体构建器 | **Schema 迁移框架** | 支持非破坏性和破坏性 Schema 变更管理：属性类型变更、主键变更、属性删除的迁移指令（Cast/Move/Drop），迁移历史追溯与回滚。对标 Palantir OSv2 的 9+ 迁移类型。 | Schema Migration | P0 |
| 本体构建器 | **接口与共享属性** | 支持 Interface 类型定义，允许多个对象类型共享同一组属性定义，实现对象类型多态。Interface 可作为查询和权限控制的统一边界。 | Interface / Shared Properties | P0 |
| 本体构建器 | **类型分组与分类** | 支持对对象类型按业务域分组的分类体系（Type Groups），可搜索、过滤、权限绑定。对标 Palantir Type Groups 第一类支持。 | Type Groups | P1 |
| 本体构建器 | **Schema 校验与部署检查** | 发布前自动执行 Schema 校验（循环链接检测、属性完整性、接口一致性），输出分类错误并链接到修复页面。对标 Palantir Deployability Checks。 | Deployability Checks | P0 |
| 本体构建器 | **本体血统图** | 可视化展示对象类型、链接、动作、函数之间的依赖关系，支持属性级血统追踪。对标 Palantir Workflow Lineage。 | Workflow Lineage | P1 |
| 本体构建器 | **跨本体迁移** | 支持对象类型/接口/动作在多个 Ontology 之间迁移，含资源配置和依赖校验。对标 Palantir Ontology Migration。 | Ontology Migration | P2 |
| 本体构建器 | **本体广场/市场** | 本体资源打包、版本化、目录发布与复用，支持跨项目/跨租户的本体模板市场。对标 Palantir Marketplace Packaging。 | Marketplace | P2 |

#### 4.1.2 多模态属性扩展

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| 本体构建器 | **媒体引用属性** | 支持对象属性存放图片、文档、视频等媒体引用，含上传/预览/缩略图/类型校验。对标 Palantir Media Reference。 | Media References | P1 |
| 本体构建器 | **地理空间属性** | 支持 GeoJSON 格式的地理位置/区域属性，地图可视化与空间查询。对标 Palantir Geospatial Property。 | Geospatial | P2 |
| 本体构建器 | **时序属性** | 支持传感器类时间序列数据作为对象属性，时序聚合与趋势展示。对标 Palantir Time Series Property。 | Time Series | P2 |

#### 4.1.3 数据管道增强

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| 数据管道 | **双向数据同步** | 支持本体变更写回源数据系统，配置写回映射、冲突策略、重试机制。对标 Palantir Ontology Sync。 | Bidirectional Sync | P2 |
| 数据管道 | **实时对象更新** | 支持流式数据的实时对象属性更新，Kafka 驱动的事件 → 对象变更管道。对标 Palantir Real-time Ontology。 | Real-time Updates | P1 |
| 数据管道 | **Pipeline Builder AI 辅助** | LLM 辅助的数据管道构建，自然语言描述 → 管道配置生成。对标 Palantir Pipeline Builder with LLM。 | AI-assisted Pipeline | P2 |

### 4.2 AI中枢与编排

#### 4.2.1 AI Logic 深化

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| AI Logic | **本体增强生成 (OAG) 推理** | LLM 推理时自动将自然语言查询映射到本体对象和关系，通过确定性逻辑工具（规则/函数/Action）执行，而非纯 LLM 文本生成。实现"推理源于本体"的 OAG 模式。对标 Palantir AIP OAG。 | Ontology-Augmented Generation | P0 |
| AI Logic | **AI Logic No-Code 模式** | 在 AI Logic 中提供 No-Code 编排模式，非开发者用户通过选择本体对象→选择 Action→设置条件→配置输出的可视化路径完成逻辑构建。对标 Palantir AIP Logic。 | AIP Logic No-Code | P1 |
| AI Logic | **确定性逻辑工具注册** | 将本体 Action、Function、规则引擎暴露为 LLM 可调用的确定性逻辑工具，LLM 规划器自动选择工具链而非自由生成。对标 Palantir Deterministic Tools。 | Deterministic Logic Tools | P1 |
| AI Logic | **编排实例学习与复用** | 记录人工编排的 Workflow 模式，自动学习并生成可复用的编排模板。基于 430 已实现的 FeedbackLearner 完善。对标 Palantir Instance Knowledge Base。 | Instance Learning | P2 |

#### 4.2.2 BPCE 深化

| 一级模块 | 二级模块 | 功能描述 | 对标 | 优先级 |
|---------|---------|---------|------|--------|
| BPCE | **多 Agent 自动编排** | 多 Agent 协作的自动 DAG 生成与透明调度，决策树可视化，支持 CEO 级别的可解释性。对标 Palantir AIP Automate。 | Multi-Agent Orchestration | P1 |
| BPCE | **Human-in-the-Loop 审批** | 关键决策节点的审批流程编排，支持人工确认/驳回 + 审批记录追溯。对标 Palantir Approval Workflow。 | Human-in-the-Loop | P0 |

### 4.3 认知与记忆服务

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| MUSE | **本体状态记忆** | 将记忆模型从"对话历史"迁移到"本体对象状态"——记忆 = `Order.status = "pending"` 而非聊天记录。Agent 通过查询本体状态恢复上下文。对标 Palantir Operational State Memory。 | Operational State Memory | P1 |
| MUSE | **记忆去重与因果关联** | 基于本体链接的自动去重和因果关联，记忆不再按时间线存储，而是按本体对象关系组织。对标 Palantir Causal Memory。 | Causal Memory | P2 |
| 模型网关 | **AIP Gateway 风格路由** | 模型无关路由策略：按任务类型（推理/分类/生成/函数调用）自动路由到最优模型，支持 Fallback 链。对标 Palantir AIP Gateway。 | Model-Agnostic Routing | P1 |
| 模型网关 | **LLM 成本与用量度量** | 按租户/应用/模型维度统计 Token 用量、调用次数、P95 延迟，提供 Dashboard。对标 Palantir Action Metrics Dashboard。 | Usage Metrics | P1 |

### 4.4 感知执行闭环

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| DICE | **确定性 Action 写回** | 定义预审批的写回操作，Agent/AI Logic 只能通过声明式 Action 写回数据，禁止直接数据库写入。对标 Palantir Safe Write-back。 | Safe Write-back | P0 |
| DICE | **Action 执行度量** | 每个 Action 的调用次数 / P95 持续时长 / 成功率 / 失败原因分类 Dashboard。对标 Palantir Action Metrics。 | Action Metrics | P1 |
| DTCE | **Workshop 风格应用构建器 MVP** | 提供拖拽式应用构建界面：从本体选择对象类型→配置列表/表单/图表 Widget→绑定 Action→发布为独立应用。对标 Palantir Workshop。 | Workshop MVP | P0 |
| DTCE | **自定义 Widget 插件机制** | 支持开发自定义 Widget 并通过 iframe/插件机制嵌入应用构建器，双向状态通信。对标 Palantir Custom Widget SDK。 | Custom Widget Plugin | P2 |

### 4.5 安全合规与治理

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| SACE | **属性级 ABAC** | 从当前的对象级权限升级到属性级权限：支持按属性敏感度分级、按用户角色/目的限制属性读写。对标 Palantir ABAC。 | Attribute-Based Access Control | P1 |
| SACE | **基于项目/工作区的权限模型** | 以项目/工作区为权限边界取代纯角色模型，支持 Compass 风格的基于项目的统一权限管理。对标 Palantir Compass Permissions。 | Project-Based Permissions | P1 |
| SACE | **目的型权限控制** | 权限约束增加"使用目的"维度：同一数据在"运维诊断"和"商业分析"场景下有不同的可访问性。对标 Palantir Purpose-Based Controls。 | Purpose-Based Access | P2 |

### 4.6 开发运营与部署基座

#### 4.6.1 开发者工具链

| 一级模块 | 二级模块 | 功能描述 | Palantir 对标 | 优先级 |
|---------|---------|---------|-------------|--------|
| 开发者工具链 | **本体 SDK (OSDK)** | 为 Python / TypeScript / Java 生成基于本体的 SDK，开发者通过类型安全的 SDK 读写本体对象、调用 Action 和 Function。对标 Palantir OSDK。Python P0，TypeScript P1，Java SDK 不建议压进 530 必达。 | Ontology SDK | **P0** (Python) / **P1** (TypeScript) |
| 开发者工具链 | **AIP Terminal 风格 NL→代码** | 在 DTCE 中集成自然语言→本体系列 API 调用生成，用户用中文描述需求，系统生成可执行的 OSDK 代码或 API 调用序列。对标 Palantir AIP Terminal。 | NL-to-Code | P1 |
| 开发者工具链 | **MCP 协议接入** | 对外暴露 MCP (Model Context Protocol) 接口，允许外部 AI IDE（如 Claude Code）直接连接到平台本体和 Action。对标 Palantir MCP Interface。 | MCP Integration | P1 |
| 开发者工具链 | **Functions SDK** | 提供函数 SDK，开发者可编写并注册自定义计算函数（属性推导、聚合、数据转换），函数自动纳入本体运行时。对标 Palantir Functions SDK。 | Functions SDK | P1 |

#### 4.6.2 技术债清理（平台工程线专项）

| 任务 | 说明 | 来源 | 优先级 |
|------|------|------|--------|
| Spring Boot 2.3 → 3.x 升级 (bpce-ds-server) | 已 EOL 版本升级，javax→jakarta 命名空间迁移 | 430 R-01 风险登记，R-01 推荐推迟至 540 | P1（建议推迟至 540，见 §6.3 R-01） |
| 存量测试方法命名统一 | `testXxx()` → `should_xxx_when_xxx()` 规范统一 | CLAUDE.md §4.2 过渡策略 | P1 |
| 存量类命名统一 | `DocumentDto`→`DocumentDTO` 等规范统一 | CLAUDE.md §2.1 过渡策略 | P1 |
| JaCoCo 覆盖率 ≥ 100% 存量模块追平 | | CLAUDE.md §4.2 过渡策略 | P1 |
| 9 仓 Nexus 私服地址统一 | 构建环境一致性 | 430 R-04 风险登记 | P1 |
| `runAgentLoop` 方法复杂度修复 | >80行重构 | Sprint 1 发现 | P1 |
| 前端 legacy 双份代码清理 | 127 入库后的遗留清理 | Sprint 1 发现 | P2 |
| Evidence 表达式引擎 CEL 替换 | 可维护性与安全性 | 430 R-06 风险登记 | P2 |

#### 4.6.3 可观测性增强

| 一级模块 | 二级模块 | 功能描述 | 对标 | 优先级 |
|---------|---------|---------|------|--------|
| 可观测性 | **本体级监控仪表盘** | 按本体维度的运行时指标（对象查询量、Action 调用量、错误率），关联 SACE 审计日志。 | Ontology Observability | P1 |
| 可观测性 | **Eval 引擎完整版** | 在 430 Eval 骨架基础上补充：本体模型评估、编排质量评估、灰度对比、防退化校验。 | AIP Evals | P1 |
| 可观测性 | **AI Decision Trace** | 记录 AI Agent 的决策路径（规划→执行→聚合），可回溯每一步的 Input/Output、调用的本体对象、使用的 Action。 | AI Decision Lineage | P1 |

## 5. 530 增量 vs 430 存量关系矩阵

| 430 已交付能力 | 530 增强方向 | 增量说明 |
|--------------|------------|---------|
| 本体构建器 - 对象/属性/链接管理 | Schema 迁移 + 接口 + 类型分组 | 补齐 Palantir OMA 核心建模能力 |
| 本体发布（基础版） | 部署检查 + 跨本体迁移 + 市场 | 从"可发布"到"可靠发布、可复用" |
| AI Logic 双模式编排 | OAG 推理 + No-Code 模式 + 确定性工具 | 从"开发者编排"到"AI + 人协同编排" |
| MUSE 四类记忆 | 本体状态记忆 + 因果关联 | 从"会话记忆"到"运营状态记忆" |
| SACE 基础权限 | ABAC + 项目权限 + 目的型控制 | 从"角色权限"到"多维细粒度权限" |
| DTCE 生成式交互 | Workshop 应用构建器 | 从"动态界面"到"应用平台" |
| 数据管道（单向） | 双向同步 + 实时更新 | 从"数据入"到"数据入+数据出" |
| Eval 骨架 | 完整 Eval 引擎 + AI Decision Trace | 从"可评测"到"可靠评测+可追溯" |
| GraphQL 端点（仅 bpce） | OSDK 多语言 SDK | 从"API 端点"到"开发者工具链" |
| 模型网关基础接入 | AIP Gateway 路由 + 用量度量 | 从"模型接入"到"模型运营" |

## 6. 530 里程碑与关键交付

### 6.1 版本节奏与团队分工

```
主链 A — 本体建模成熟度（数据组：ZCW + 后端B）
主链 B — 开发者工具链（驾驭工程线：WZK + SQ / 核心智能组：后端A）
主链 C — 应用构建层（交互与安全组：LJ + 前端）
主链 D — AI Agent 本体化（核心智能组：架构A + 后端A / 数据组：ZCW）
主链 E — 治理与质量（驾驭工程线 + 数据组）
```

> **分工说明**：主链 A（数据组主责）是底座链路，必须在 Sprint 2 完成核心实现以满足主链 D 的依赖。主链 B（驾驭工程线 + 核心智能组）和主链 C（交互与安全组）可并行推进。主链 D 依赖主链 A 的 Schema 迁移和 Interface 就位后方可进入集成（Sprint 3）。主链 E 作为治理线贯穿全周期。

```
Sprint 1 (5/6 - 5/10): 基建 & 核心设计
  ├── [A] Schema 迁移框架设计 + 接口规范定稿
  ├── [B] OSDK 架构设计 + 类型生成方案
  ├── [D] OAG 推理模式 Design Doc
  └── [C] Workshop MVP 设计方案

Sprint 2 (5/13 - 5/17): 核心开发
  ├── [A] Schema 迁移框架实现
  ├── [A] 接口与共享属性实现
  ├── [B] OSDK Python 版本 MVP
  └── [C] Workshop 基础画布 + 对象列表 Widget

Sprint 3 (5/20 - 5/24): 集成与深化
  ├── [D] OAG 推理模式实现 + AI Logic 集成
  ├── [B] OSDK TypeScript 版本（P1，不阻塞其他链验收）
  ├── [C] Workshop Action 绑定 + 应用发布
  ├── [E] ABAC 属性级权限
  └── [A] 跨链 Schema 兼容性基线验证（E2E-06 前置子任务）

Sprint 4 (5/27 - 5/30): 收尾 & 发布
  ├── 全链路集成测试
  ├── 技术债清理收尾
  ├── [E] E2E 场景全面验收（含 E2E-06 专项 1 天验证）
  └── 530 Release
```

> **注**：Sprint 4 的 E2E-06 完整验收降低至 1 天专项验证，关键子任务（Schema 兼容性基线验证）已前移至 Sprint 3 末尾，确保跨链质量有独立的验证时间窗口。

### 6.2 关键交付依赖

```
P0 链：
  OSDK 设计 → OSDK Python MVP → Workshop 集成
  Schema 迁移框架 → 接口与共享属性 → 类型分组
  OAG 设计 → 确定性工具注册 → AI Logic OAG 模式
  Workshop 画布 → Widget 库 → Action 绑定 → 应用发布

P1 链：
  本体状态记忆设计 → MUSE 重构 → BPCE 集成
  OSDK TypeScript（不阻塞其他链主流程）
  AIP Gateway 扩展 → 用量度量 Dashboard
  Eval 引擎完整版 → AI Decision Trace
```

#### 跨链依赖矩阵

下表结构化建模链间依赖关系，标注关键里程碑和 blocked 触发条件：

| # | 上游链 | 下游链 | 依赖内容 | 依赖类型 | 关键里程碑 | Blocked 触发条件 |
|---|--------|--------|----------|----------|-----------|----------------|
| CD-01 | 主链 A（本体建模） | 主链 D（AI Agent） | Schema 迁移框架 + Interface 必须先就位，否则 OAG 无稳定语义基础 | 硬依赖（P0→P0） | Sprint 2 末：Schema 迁移框架基本功能可运行 | Sprint 3 开始时若主链 A 未交付，主链 D 集成暂停 |
| CD-02 | 主链 A（本体建模） | 主链 B（开发工具链） | Schema 发布是 OSDK 代码生成的前置条件 | 硬依赖（P0→P0） | Sprint 2 末：本体 Schema 发布接口可用 | 若 Schema 发布接口未就位，OSDK 生成器无法验证 |
| CD-03 | 主链 B（开发工具链） | 主链 C（应用构建） | OSDK 基础查询功能是 Workshop 集成测试的前置条件 | 软依赖（P0→P0） | Sprint 3 初：OSDK Python 基本 CRUD 可调用 | Python OSDK 基本查询不可用时 Workshop 集成测试无法执行 |
| CD-04 | 主链 D（AI Agent） | 主链 E（治理） | Action 安全写回需要通过 SACE 权限校验和审计 | 硬依赖（P0→P1） | Sprint 3 末：Action 写回权限校验就位 | ABAC 未就位时 OAG 写回无权限校验。<br>**Spring Boot 依赖边界**：ABAC 属性级权限控制的最小依赖为 Spring Security 5.x + 自定义方法安全注解，不强制要求 Spring Boot 3.x。若 540 完成 Spring Boot 升级，ABAC 可无缝迁移至 `jakarta.security` 命名空间。Sprint 3 末的 ABAC 里程碑基于当前 bpce-ds-server（Spring Boot 2.3.12）版本设计，不依赖 Spring Boot 升级。 |
| CD-05 | 主链 A（本体建模） | 主链 C（应用构建） | Schema 迁移框架和 Interface 是 Workshop Action 绑定的语义基础 | 软依赖（P0→P0） | Sprint 2 末：接口与共享属性可用 | Workshop Action 绑定依赖 Interface 多态能力 |
| CD-06 | 主链 A（本体建模） | 主链 E（治理） | 本体血统图依赖 Schema 迁移历史 | 软依赖（P0→P1） | Sprint 3 末：迁移历史 API 可用 | 迁移历史 API 未就位时触发警告日志，本体血统图功能可降级为静态 Schema 分析模式，不完全阻塞主链 E 其他任务推进 |

> **隔离执行说明**：Spring Boot 2.3 → 3.x 升级（bpce-ds-server）建议推迟至 540，避免 javax→jakarta breaking change 阻塞 530 功能开发。若坚持 530 执行，需额外 2 天全量回归窗口（在 Sprint 3 安排）并明确影响模块清单。推荐方案：**推迟至 540**（见 R-01 应对更新）。

### 6.3 风险登记

| # | 风险 | 影响 | 应对 |
|---|------|------|------|
| R-01 | Spring Boot 2.3→3.x 升级工期超出预期 | 占用核心开发时间 | **推荐方案**：推迟至 540。javax→jakarta 命名空间迁移是 API 级 breaking change，在 GraphQL 端点共用的前提下无法真正做到完全隔离并行执行。**备选方案**：若坚持 530 执行，需 Sprint 3 额外安排 2 天全量回归窗口，并发布影响模块清单。 |
| R-02 | Workshop MVP 范围过大 | 530 延期 | 严格 MVP 边界：仅支持对象列表 + 表单 + Action 绑定，图表/自定义Widget 降级至 540 |
| R-03 | OSDK 多语言维护成本 | 团队负担 | 530 Python P0 必达，TypeScript P1（力争）；Java 版视团队能力 540 补充 |
| R-04 | OAG 推理效果不达预期 | 产品价值打折 | 设定最小可接受标准（确定性工具调用准确率 ≥ 90%），达标前不发布 |
| R-05 | 本体构建器继续阻塞（430 遗留） | 530 增量无处附着 | 430 UAT 阶段必须完成 D-01a 交付，否则 530 本体增强无基线 |

---

## 7. 530 E2E 验收场景

530 的验收不建议只按"功能是否开发完成"，应按 6 个端到端场景验收（E2E-01 到 E2E-05 对应规划意见的 5 条主链，E2E-06 为跨链集成补充场景）：

### 7.1 E2E-01：本体 Schema 演进

| 维度 | 内容 |
|------|------|
| 验收目标 | 修改对象属性类型、重命名属性、删除属性，生成迁移计划，dry-run，执行，回滚 |
| 涉及功能 | Schema 迁移框架、部署检查、迁移历史追溯 |
| 前置条件 | 本体构建器已发布至少一个对象类型 |
| 验收步骤 | ① 修改现有属性类型（如 `count: Int → Long`）→ ② 系统生成迁移指令 → ③ dry-run 验证兼容性 → ④ 执行迁移 → ⑤ 验证对象浏览器数据正确 → ⑥ 回滚迁移 → ⑦ 验证回滚后状态 |
| 通过标准 | 迁移可执行、可回滚、迁移历史完整可追溯，数据无丢失 |
| **异常路径** | **迁移冲突场景**：当 Schema 存在循环依赖或属性引用冲突时，系统应生成冲突报告并阻止执行，不允许进入迁移批准阶段。dry-run 阶段必须输出冲突明细（冲突类型、涉及属性、建议操作）。

### 7.2 E2E-02：Interface 统一建模

| 维度 | 内容 |
|------|------|
| 验收目标 | 定义 Asset Interface，让 Server、Router 实现，并按 Interface 查询 |
| 涉及功能 | Interface 定义、对象类型多态、Interface 级查询 |
| 前置条件 | 本体构建器支持 Interface 类型定义 |
| 验收步骤 | ① 定义 `Asset` Interface（含 `status: String`、`name: String`）→ ② 创建 `Server` 对象类型实现 `Asset` → ③ 创建 `Router` 对象类型实现 `Asset` → ④ 按 Interface 查询所有 `Asset` 类型对象 → ⑤ 验证权限继承 |
| 通过标准 | Interface 定义可复用、按 Interface 查询返回所有实现类型的对象、权限规则从 Interface 继承到实现类型 |
| **异常路径** | **Interface 不兼容场景**：修改已有 Interface 的属性定义（如删除 `status: String`）时，已实现的 Object Type 应被标记为不兼容，Schema 校验输出具体的不兼容项列表和修复建议，阻止发布直至所有实现类型对齐。 |

### 7.3 E2E-03：OSDK 调用本体

| 维度 | 内容 |
|------|------|
| 验收目标 | Python / TypeScript SDK 查询对象、调用 Action、处理权限失败 |
| 涉及功能 | OSDK Python、OSDK TypeScript、SDK Generator |
| 前置条件 | 本体构建器已发布至少一个含 Action 的对象类型 |
| 验收步骤 | ① 从 Schema 生成 Python SDK → ② `client.orders.get(id)` 查询对象 → ③ `client.orders.approve(id)` 调用 Action → ④ 模拟权限不足场景 → ⑤ SDK 抛出结构化权限错误 → ⑥ **TypeScript SDK（P1，Sprint 3-4 视资源情况决定验证范围，若跳过则记录原因）** 重复上述步骤 |
| 通过标准 | SDK 类型安全（IDE 自动补全）、Action 调用经过后端权限校验、权限失败返回结构化错误码而非 HTTP 500 |
| **异常路径** | **SDK 版本不匹配场景**：本体 Schema 发布新版本后，使用旧版本生成的 SDK 调用新 Schema 时应返回明确的版本不兼容错误（含预期版本、实际版本、迁移指引）。**越权调用场景**：使用有效但无权限的 Token 调用 Action 时，SDK 应抛出 `PermissionDeniedError` 结构化异常，包含缺失的权限名称和建议的审批路径，不得暴露敏感数据。**生成失败场景**：Schema 存在未闭合的 Interface 实现时，SDK 生成器应输出语义化的生成失败报告而非泛化 500 错误。 |

### 7.4 E2E-04：Workshop 应用发布

| 维度 | 内容 |
|------|------|
| 验收目标 | 基于对象类型生成列表 + 表单 + Action 按钮，并发布为应用 |
| 涉及功能 | Workshop MVP、对象列表 Widget、表单 Widget、Action 绑定、应用发布 |
| 前置条件 | 本体构建器已发布至少一个含 Action 的对象类型 |
| 验收步骤 | ① 从本体选择对象类型 → ② 自动生成默认列表页 → ③ 配置详情表单 → ④ 绑定 Action 按钮（如"审批"）→ ⑤ 预览应用 → ⑥ 一键发布 → ⑦ 访问已发布应用 |
| 通过标准 | 不写代码完成应用搭建、应用可独立访问、Action 调用经后端权限校验、应用发布后可更新配置 |
| **异常路径** | **配置不完整场景**：应用配置存在 Missing Action 绑定或 Schema 引用断裂时，发布按钮应置灰并提示具体缺失项（如"Action 'approveOrder' 已被删除，请重新绑定"）。**权限不足场景**：无应用发布权限的用户尝试发布时，系统应阻止操作并返回权限错误提示，不得允许部分发布。 |

### 7.5 E2E-05：OAG + 人工审批 + 安全写回

| 维度 | 内容 |
|------|------|
| 验收目标 | 用户自然语言触发 OAG，系统选择 Action，进入审批，审批后执行，生成 Decision Trace |
| 涉及功能 | OAG 推理、确定性工具注册、Human-in-the-Loop 审批、Action 安全写回、Decision Trace |
| 前置条件 | AI Logic 已配置 OAG 模式、SACE 已配置审批流 |
| 验收步骤 | ① 用户输入自然语言请求（如"审批所有待处理的订单"）→ ② OAG 将请求映射到本体对象和 Action → ③ 系统生成执行计划并展示 → ④ 用户确认/审批执行计划 → ⑤ 系统批量执行 Action → ⑥ 查看 Decision Trace 完整记录 |
| 通过标准 | LLM 不能直接写数据库、每步操作有审批记录、Decision Trace 包含每步 Input/Output/Ontology 对象、可追溯、可审计 |
| **异常路径** | **审批驳回场景**：用户驳回 OAG 执行计划后，系统应记录驳回原因、终止 Action 执行，并提供"调整计划后重新提交"入口，不允许在驳回状态下继续执行。**ABAC 权限拦截场景**：无属性级权限的用户通过 OAG 触发涉密属性写回时，OAG 应在规划阶段识别权限边界并提示"您无权修改属性 X，请申请 Y 权限或联系管理员"，不允许在无权限时生成执行计划。**TOCTOU 竞态场景**：OAG 执行计划生成后，计划中的 Action 被管理员删除或修改——系统应在执行前重新校验所有 Action 的有效性，发现已删除的 Action 时终止执行并提示用户"计划中包含已删除的 Action：xxx，请重新生成计划"。 |

### 7.6 E2E-06：跨链集成 — Schema 演进对 OSDK 兼容性影响

| 维度 | 内容 |
|------|------|
| 验收目标 | 验证主链 A（本体建模）变更后主链 B（OSDK）的适应性：Schema 演进不破坏已有 OSDK 消费者的兼容性 |
| 涉及功能 | Schema 迁移框架、SDK Generator、OSDK Python、OSDK TypeScript |
| 前置条件 | Schema 迁移框架基本功能可运行 + OSDK Python 基本查询可运行（对应 Sprint 3 末尾的跨链基线验证子任务，不要求 E2E-01 和 E2E-03 全部通过） |
| 验收步骤 | ① 发布 v1 Schema 并生成 OSDK → ② 基于 v1 OSDK 编写消费者代码（查询 + Action 调用）→ ③ 对 Schema 做非破坏性变更（新增属性、新增接口）→ ④ 执行迁移 → ⑤ 验证 v1 OSDK 消费者代码无需修改仍可正常运行 → ⑥ 对 Schema 做破坏性变更（重命名属性，Cast 类型）→ ⑦ 重新生成 OSDK → ⑧ 验证消费者代码需对应调整，编译器/IDE 提示类型错误位置 |
| 通过标准 | 非破坏性变更向后兼容（v1 消费者不报错），破坏性变更触发编译时类型错误而非运行时崩溃 |
| **异常路径** | **跨链回归场景**：Schema 迁移（主链 A）后 OSDK 生成（主链 B）失败时，系统应输出本次迁移影响的 OSDK 包列表和具体断裂位置，回滚迁移后 OSDK 生成自动恢复。**并发迁移冲突场景**：两个用户在同一个 Schema 上同时发起迁移时，后提交的迁移应检测到冲突并输出冲突报告（涉及属性、冲突类型），阻止执行直至用户确认。**OSDK 生成时 Schema 变更场景**：SDK Generator 生成过程中 Schema 发生变更，生成器应检测 Schema 版本偏移并终止当前生成，输出"Schema 版本已变更，请重新生成"提示。 |

### 7.7 E2E 场景覆盖率矩阵

下表映射 §7 各 E2E 场景与 §4 功能清单的覆盖关系，识别是否有 P0 功能未被任何场景覆盖：

| P0 功能 | §4 位置 | E2E-01 | E2E-02 | E2E-03 | E2E-04 | E2E-05 | E2E-06 |
|---------|---------|--------|--------|--------|--------|--------|--------|
| Schema 迁移框架 | §4.1.1 | ✅ | — | — | — | — | ✅ |
| 接口与共享属性 | §4.1.1 | — | ✅ | — | — | — | — |
| Schema 校验与部署检查 | §4.1.1 | ✅ | ✅ | — | — | — | ✅ |
| 本体 SDK (OSDK Python) | §4.6.1 | — | — | ✅ | — | — | ✅ |
| Workshop 应用构建器 MVP | §4.4 | — | — | — | ✅ | — | — |
| OAG 推理 | §4.2.1 | — | — | — | — | ✅ | — |
| Human-in-the-Loop 审批 | §4.2.2 | — | — | — | — | ✅ | — |
| 确定性 Action 写回 | §4.4 | — | — | ✅ | ✅ | ✅ | — |

| P1 功能 | §4 位置 | E2E-01 | E2E-02 | E2E-03 | E2E-04 | E2E-05 | E2E-06 |
|---------|---------|--------|--------|--------|--------|--------|--------|
| 类型分组与分类 | §4.1.1 | — | ✅ | — | — | — | — |
| 本体 SDK (OSDK TypeScript) | §4.6.1 | — | — | ✅ | — | — | ✅ |
| 本体血统图 | §4.1.1 | ✅ | — | — | — | — | — |
| 本体状态记忆 | §4.3 | — | — | — | — | ✅ | — |
| 属性级 ABAC | §4.5 | — | — | ✅ | ✅ | ✅ | — |
| 确定性逻辑工具注册 | §4.2.1 | — | — | — | — | ✅ | — |
| Eval 引擎完整版 | §4.6.3 | — | — | — | — | ✅ | — |
| AI Decision Trace | §4.6.3 | — | — | — | — | ✅ | — |

> **覆盖率结论**：所有 8 项 P0 功能均被至少一个 E2E 场景覆盖，无 P0 遗漏。P0 中 Schema 迁移框架和 OSDK Python 各有 2 个场景覆盖（含跨链 E2E-06）。P1 功能中，OSDK TypeScript 由 E2E-03 和 E2E-06 覆盖；媒体引用属性、实时对象更新、AI Logic No-Code、多 Agent 编排、AIP Gateway 路由、用量度量、项目权限、NL→代码、MCP 协议、Functions SDK 等当前未纳入 E2E 场景，建议 Sprint 4 前根据实际交付情况决定是否补充场景或接受 P1 非 E2E 覆盖。

---

## 附录 A：对标信息来源

- [Palantir Foundry Ontology 官方文档](https://www.palantir.com/docs/foundry/ontology/overview)
- [Palantir AIP Architecture](https://www.palantir.com/docs/foundry/architecture-center/aip-architecture)
- [Palantir AIP Features](https://www.palantir.com/docs/foundry/aip/aip-features)
- [Palantir Ontology Manager AMA](https://community.palantir.com/t/ama-learn-from-the-ontology-manager-team-about-the-applications-history-and-help-us-shape-its-future/5100/1)
- [Palantir Schema Migration](https://www.palantir.com/docs/foundry/object-edits/schema-migrations)
- [Palantir Workshop & App Building](https://palantirfoundation.org/docs/foundry/app-building/overview)
- [Palantir Ontology SDK](https://build.palantir.com/platform/961cd7bb-f451-477b-8ded-4d55e96a9153)
- [Palantir Build with AIP for OSDK](https://community.palantir.com/t/introducing-build-with-aip-for-ontology-sdk/509/)

## 附录 B：对标差距详细说明

### B.1 Schema 迁移框架（P0）

**Palantir 现状**：OSv2 提供 9+ 迁移指令类型（Cast/Move/Drop），支持非破坏性和破坏性变更的统一管理，迁移历史可追溯、可回滚。

**当前 AIOS 差距**：本体 Schema 变更需要手动操作数据库或重新导入 DSL，无结构化的迁移指令、无版本对比、无回滚机制。

**实现要点**：
1. 迁移指令集：属性类型 Cast、属性 Move（重命名+数据迁移）、属性 Drop（清理编辑记录）、主键变更
2. 迁移执行引擎：OSv2 风格，支持批处理（≤500 条/批）和回滚
3. 迁移历史：记录每次迁移的时间、操作人、变更内容，支持回滚
4. 部署检查：发布前自动检查 Schema 一致性

### B.2 Interface / 共享属性（P0）

**Palantir 现状**：Interface 提供对象类型多态，不同对象类型可实现同一 Interface，实现统一属性和行为的复用。Interface 可作为查询边界和权限控制边界。

**当前 AIOS 差距**：每个对象类型的属性独立定义，无法跨类型共享属性定义。

**实现要点**：
1. Interface 定义语言：声明一组共享属性（名称、类型、约束）
2. Object Type 实现 Interface：声明式 `implements` 或 UI 绑定
3. 以 Interface 为边界的查询：`search interface InventoryItem where status = "active"`
4. Interface 级权限：权限规则继承到所有实现该 Interface 的对象类型

### B.3 OAG 推理模式（P0）

**Palantir 现状**：OAG 的核心是 LLM 不直接访问原始数据，而是通过本体对象和关系进行推理。每一个推理步骤都基于具体的本体对象和确定性逻辑工具。

**当前 AIOS 差距**：AI Logic 的 Tool-Calling Agent Loop 基本是自由推理，LLM 直接处理数据，没有强制经过本体语义层。

**实现要点**：
1. 本体对象作为推理原子：LLM 规划器只能看到本体对象类型和链接关系（表/字段被隐藏）
2. 确定性工具注册：Action/Function/规则引擎暴露为 LLM 可调用的工具，禁止 LLM 直接写 SQL/API
3. 推理链可追溯：每步推理记录调用哪个本体对象、哪个 Action，形成透明决策树
4. 缓存策略：本体查询结果进入 LLM 缓存，相同查询不重复调用模型

### B.4 本体 SDK - OSDK（Python P0 / TypeScript P1）

**Palantir 现状**：OSDK 自动生成基于本体的类型安全的 Python/TypeScript SDK，开发者通过 `client.orders.get(id)` 等类型安全的方式操作本体。

**当前 AIOS 差距**：仅通过 GraphQL/REST 端点操作本体，无类型安全的 SDK。

**实现要点**：
1. 代码生成器：基于当前 Ontology Schema 定义生成 SDK 代码
2. **Python SDK（P0）**：`pip install aios-ontology`，支持本体 CRUD + Action 调用 + Function 执行，Sprint 2 完成 MVP
3. **TypeScript SDK（P1）**：`npm install @aios/ontology-sdk`，支持前端/Node.js 使用，Sprint 3-4 开发，不阻塞 Workshop 和 OAG 主流程
4. SDK 与 API 层的关系：SDK 是对 GraphQL/REST 端点的类型安全封装，不绕过后端安全控制

### B.5 Workshop 风格应用构建器（P0）

**Palantir 现状**：Workshop 是拖拽式应用构建工具，非技术人员通过选择对象类型→配置 Widget→绑定 Action 即可创建交互式应用。

**当前 AIOS 差距**：无此能力，应用开发依赖前端工程师编码。

**实现要点**：
1. MVP 边界：对象列表 Widget + 详情表单 Widget + Action 按钮 Widget + 简单布局
2. 应用模板：基于 Ontology 自动生成默认 CRUD 应用
3. 应用发布：配置完成→一键发布为独立可访问应用
4. 自定义 Widget 接口预留：iframe 桥接和双向状态通信（P2）

### B.6 本体状态记忆（P1）

**Palantir 现状**：AI Agent 的记忆 = 实时本体对象状态（如 `Order.status = "pending_approval"`），而非会话历史。更精准、更 Token 高效。

**当前 AIOS 差距**：MUSE 的四类记忆（工作/情景/语义/程序）本质仍围绕"会话"，未与本体状态打通。

**实现要点**：
1. Agent 执行上下文优先从本体对象状态恢复，而非聊天记录
2. 本体变更自动触发 Agent 状态更新（Kafka 事件驱动）
3. 记忆裁剪：基于本体关系而非时间窗口的 Token 裁剪策略

### B.7 Human-in-the-Loop 审批（P0）

**Palantir 现状**：AIP 的关键决策节点支持审批流程编排，包含人工确认/驳回 + 审批记录追溯。审批流程作为 OAG 安全写回的必要网关。

**当前 AIOS 差距**：目前 Action 调用无审批环节，Agent/AI Logic 生成执行计划后直接执行，缺少人工审核关卡。

**实现要点**：
1. **审批状态机**：定义标准审批状态流转 `Pending → Approved / Rejected → Executed / Cancelled`，每个审批实例关联一个执行计划或单条 Action 调用
2. **审批节点定义接口**：`POST /api/v1/sace/approval-nodes` 用于创建审批节点（关联 OAG 执行计划或单 Action），含参数：`executionPlanId`、`requestor`、`requiredApprover`、`policyRef`
3. **审批执行接口**：`POST /api/v1/sace/approval-nodes/{id}/approve` 和 `POST /api/v1/sace/approval-nodes/{id}/reject`，驳回需携带原因
4. **审批策略配置**：支持按 Action 类型、涉及属性敏感度、修改数据量等条件自动触发审批（如涉及金额 > 10000 的 Action 必须双人审批）
5. **审批记录追溯**：所有审批操作写入审计日志，与 Decision Trace 关联，格式同 §3.3 Kafka 事件规范
6. **Sprint 归属**：Sprint 2 开发基础审批节点 API 和状态机，Sprint 3 集成到 OAG 执行流（E2E-05）

---

*最后更新：2026-04-28 by AI·Architect*
