# AIOS 工程文档目录规范

> **版本**: v1.0
> **生效日期**: 2026-04-24
> **适用范围**: AIOS 全部 9 个代码仓

---

## 目录结构总览

```
.harness/
├── adr/                    # 架构决策记录
├── eval/                   # 模型评估
├── interfaces/             # 跨模块接口定义
├── knowledge/              # 知识库
├── reports/                # [新增] 测试与评估报告
├── sessions/               # 会话记录
├── spec/                   # 规范驱动开发文档
├── tasks/                  # 任务相关
└── templates/              # 模板文件
```

---

## 1. `.harness/spec/` — 设计文档

### 用途
存放所有模块的 L1 架构文档和详细 SPEC 规格文档。

### 目录结构

```
.harness/spec/
├── index.md                          # [CI自动生成] 全仓 SPEC 状态总览
├── L1_TEMPLATE.md                    # L1 架构文档模板
├── README.md                         # SPEC 生命周期说明
│
├── {module}/                         # 按模块组织（如 fusion-engine, ontology-builder）
│   ├── _meta.md                      # 模块 spec 注册表
│   ├── L1-{module}-architecture.md   # L1 架构文档（Sprint 0 锁定）
│   ├── {feature}-spec.md             # 正式 spec（approved 后锁定）
│   │
│   ├── changes/                      # 过程文档（按功能隔离）
│   │   └── {feature}/
│   │       ├── .spec-meta.yaml       # 变更元数据（状态/角色/时间线）
│   │       ├── proposal.md           # 需求提案（rd:propose 产出）
│   │       ├── design.md             # 技术设计（rd:propose 产出）
│   │       ├── tasks.md              # 任务分解（rd:propose 产出）
│   │       └── review.md             # 评审记录（rd:* 生命周期评审）
│   │
│   └── archive/                      # 归档目录
│       └── {feature}/
│           ├── {feature}-spec.md
│           └── summary.md            # 归档摘要（rd:archive 产出）
```

### 文件说明

| 文件 | 生命周期阶段 | 说明 |
|------|-------------|------|
| `L1-{module}-architecture.md` | Sprint 0 锁定 | 模块级架构设计 |
| `{feature}-spec.md` | approved 后锁定 | 功能规格说明 |
| `changes/{feature}/proposal.md` | draft | 需求提案 |
| `changes/{feature}/design.md` | draft | 技术设计 |
| `changes/{feature}/tasks.md` | draft → implemented | 任务分解 |
| `changes/{feature}/review.md` | review | 评审记录 |

### SPEC 生命周期

```
draft → review → approved → implemented → archived
              ↘ debate ↗
```

---

## 2. `.harness/adr/` — 架构决策记录

### 用途
记录项目中每个重要技术决策的背景、方案选择和理由。

### 目录结构

```
.harness/adr/
├── readme.txt                         # 目录说明
├── ADR-001-{decision-title}.md        # 决策记录
├── ADR-002-{decision-title}.md
└── ...
```

### ADR 文档模板

```markdown
# ADR-{序号}: {决策标题}

## 状态
提议 / 已接受 / 已废弃 / 已替代

## 背景
{描述导致此决策的背景和问题}

## 决策
{描述所做的决策}

## 理由
{解释为什么选择这个方案}

## 后果
{描述决策带来的影响}

## 替代方案
{列出考虑过的其他方案及放弃原因}
```

---

## 3. `.harness/interfaces/` — 跨模块接口定义

### 用途
存放跨模块接口定义文件，确保模块间契约的一致性。

### 目录结构

```
.harness/interfaces/
├── readme.txt                         # 目录说明
├── fusion-engine-api.json             # 数据融合引擎对外接口
├── ontology-builder-api.json          # 本体构建器对外接口
├── bpce-executor-api.json             # BPCE 执行器对外接口
├── model-gateway-api.json             # 模型网关对外接口
├── muse-api.json                      # 记忆引擎对外接口
├── dame-scheduler-api.json            # 调度框架对外接口
└── sace-api.json                      # SACE 安全访问控制对外接口
```

### 支持格式
- JSON Schema
- GraphQL SDL
- OpenAPI
- TypeScript Interface

### 变更通知规则
任何对 `.harness/interfaces/` 下文件的修改，CI 自动广播通知所有关联模块 Owner。

---

## 4. `.harness/reports/` — 测试与评估报告 [新增]

### 用途
存放各类测试报告、评估报告和基线报告。

### 目录结构

```
.harness/reports/
├── test/                              # 测试报告
│   ├── unit/                          # 单元测试报告
│   │   └── {module}/
│   │       └── {YYYY-MM-DD}-junit-report.html
│   ├── integration/                   # 集成测试报告
│   │   └── {module}/
│   │       └── {YYYY-MM-DD}-integration-report.html
│   └── regression/                    # 回归测试报告
│       └── {version}/
│           └── regression-report.md
│
├── eval/                              # 模型评估报告
│   ├── benchmark/                     # Benchmark 测试结果
│   │   └── {model-name}/
│   │       └── {YYYY-MM-DD}-benchmark.json
│   └── quality/                       # 质量评估报告
│       └── {feature}/
│           └── {YYYY-MM-DD}-quality-report.md
│
├── baseline/                          # 基线报告
│   ├── performance/                   # 性能基线
│   │   └── {module}-performance-baseline.md
│   └── coverage/                      # 覆盖率基线
│       └── {module}-coverage-baseline.md
│
└── security/                          # 安全报告
    └── {YYYY-MM-DD}-security-scan.md
```

### 报告命名规范

| 类型 | 命名格式 | 示例 |
|------|---------|------|
| 测试报告 | `{日期}-{类型}-report.{ext}` | `2026-04-24-junit-report.html` |
| 评估报告 | `{日期}-{评估项}-report.md` | `2026-04-24-quality-report.md` |
| 基线报告 | `{模块}-{基线类型}-baseline.md` | `fusion-engine-performance-baseline.md` |

---

## 5. `.harness/eval/` — 模型评估配置

### 用途
存放模型评估相关配置、数据集定义。

### 目录结构

```
.harness/eval/
├── readme.txt                         # 目录说明
├── configs/                           # 评估配置
│   └── {benchmark-name}.yaml
├── datasets/                          # 评估数据集
│   └── {dataset-name}.jsonl
└── results/                           # 评估结果（原始数据）
    └── {model-name}/
        └── {benchmark}-{date}.json
```

> 注：评估报告（人类可读）存放在 `.harness/reports/eval/`，原始数据存放在此处。

---

## 6. `.harness/knowledge/` — 知识库

### 用途
存放产品文档、团队名册、领域知识等长期知识资产。

### 目录结构

```
.harness/knowledge/
├── readme.txt                         # 目录说明
├── product-design.md                  # 产品设计文档
├── team-roster.md                     # 团队名册（角色映射）
├── domain/                            # 领域知识
│   ├── ontology-dsl.md               # 本体 DSL 规范
│   └── business-rules.md             # 业务规则
└── phase-orders/                      # 阶段性作战令归档
    └── 430-phase-orders.md
```

---

## 7. `.harness/sessions/` — 会话记录

### 用途
存放 AI Session 的执行记录和上下文。

### 目录结构

```
.harness/sessions/
├── readme.txt                         # 目录说明
└── {YYYY}/
    └── {MM}/
        └── {DD}/
            └── {session-id}.md
```

---

---

## 9. `.harness/templates/` — 模板文件

### 用途
存放各类文档模板。

### 目录结构

```
.harness/templates/
├── readme.txt                         # 目录说明
├── spec-template.md                   # SPEC 文档模板
├── adr-template.md                    # ADR 模板
└── test-report-template.md            # 测试报告模板
```

---

## 快速参考

| 文档类型 | 存放目录 | 说明 |
|---------|---------|------|
| 架构设计文档 | `.harness/spec/{module}/L1-{module}-architecture.md` | Sprint 0 锁定 |
| 功能规格文档 | `.harness/spec/{module}/{feature}-spec.md` | approved 后锁定 |
| 需求提案 | `.harness/spec/{module}/changes/{feature}/proposal.md` | 过程文档 |
| 技术设计 | `.harness/spec/{module}/changes/{feature}/design.md` | 过程文档 |
| 任务分解 | `.harness/spec/{module}/changes/{feature}/tasks.md` | 过程文档 |
| 评审记录 | `.harness/spec/{module}/changes/{feature}/review.md` | 过程文档 |
| 架构决策 | `.harness/adr/ADR-{id}-{title}.md` | 长期保留 |
| 接口定义 | `.harness/interfaces/{module}-api.json` | 变更需广播 |
| 测试报告 | `.harness/reports/test/{type}/{module}/` | 按日期归档 |
| 评估报告 | `.harness/reports/eval/{type}/{feature}/` | 按日期归档 |
| 性能基线 | `.harness/reports/baseline/performance/` | 版本化管理 |

---

## 变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| v1.0 | 2026-04-24 | 初始版本，新增 `.harness/reports/` 目录 | QHY |