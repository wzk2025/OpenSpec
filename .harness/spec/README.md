# 规范驱动开发（SDD）文档库

> 本目录存放所有模块的 L1 架构文档和详细 SPEC 规格文档。

## SPEC 生命周期

```
              ┌──────────────────────────┐
              │        主会话          │
              ▼                          │
  ┌──────┐              ┌───────┐  rd:* 评审    ┌─────────┐
  │draft │ ──────────→ │review │ ──────────→ │approved │
  └──────┘              └──┬──┬─┘              └────┬────┘
     ▲                     │  │                      │
     │                不通过  │ 75≤s<80               │ rd:apply
     │                     │  │                      │
     │                     │  ▼                      ▼
     │                     │┌───────┐         ┌───────────┐
     └─────────────────────┘│debate │         │implemented│
          评审返回修改       └───┬───┘         └─────┬─────┘
                               │                     │ rd:archive
                         ┌─────┴──────┐              ▼
                         │通过→approved│        ┌────────┐
                         │返工→draft   │        │archived│
                         └────────────┘        └────────┘
```

| 状态 | 含义 | 可编辑角色 | 不可逆操作 |
|------|------|-----------|---------|
| `draft` | 初稿，待评审 | 作者（Architect/Developer） | - |
| `review` | 评审中 | Reviewer + 主会话（评审意见） | - |
| `debate` | 对抗审计中 | Defender → Attacker → 主会话 裁决 | - |
| `approved` | 已审批，锁定 | 不可编辑 | 变更须新建版本 |
| `implemented` | 已实现，代码已合入 | 不可编辑 | - |
| `archived` | 已归档，历史参考 | 不可编辑 | - |

### 状态转换规则

| 转换 | 触发者 | 前置条件 |
|------|--------|---------|
| → draft | Architect | 主会话 委派任务 |
| draft → review | Architect | proposal + design 非空，tasks ≥ 1 |
| review → approved | Architect | 综合得分 ≥ 80，P0 = 0 |
| review → debate | Architect | 75 ≤ 得分 < 80 且 P0 = 0（触发 Debate） |
| review → draft | Architect | 得分 < 75 或 P0 > 0 |
| debate → approved | Architect | Debate 裁决通过 |
| debate → draft | Architect | Debate 裁决返工 |
| approved → implemented | Architect | tasks 全完成，代码合入主干 |
| implemented → archived | Architect | PM 审批通过 |

> **职责分工**：状态转换由 Architect 角色统一管理，主会话 在关键节点（评审通过/不通过、PM 审批等）委派任务给 Architect 执行。

### rd:* 命令与质量保障流程

| 阶段 | rd:* 命令 | 质量保障环节 | 评分卡 |
|------|----------|-------------|--------|
| 需求探索 | rd:explore | — | — |
| 创建变更 | rd:propose | SPEC 评审（draft → approved） | spec-review-flow.md |
| 执行任务 | rd:apply | 测试 + 代码评审（approved → implemented） | code-review-flow.md |
| 归档 | rd:archive | PM 审批（implemented → archived） | — |

> rd:* 命令由 RD CLI 提供，质量保障环节由框架的评分卡体系和角色调度机制执行。两者配合确保 SPEC 从创建到归档的全流程质量。

---

## 文档类型

| 类型 | 前缀 | 说明 |
|------|------|------|
| L1 架构 | `L1-{module}-architecture.md` | 模块级设计文档，Sprint 0 内锁定 |
| 详细规格 | `{feature}-spec.md` | 具体功能/组件规格说明 |

---

## 目录结构

按模块组织，每个模块目录包含：

```
{module}/
├── _meta.md                 # 模块 spec 注册表（所有 spec 的状态总览）
├── L1-{module}-architecture.md      # L1 架构文档（Sprint 0 锁定）
├── {feature}-spec.md       # 正式 spec（生命周期状态在 frontmatter 中）
├── changes/                # 过程文档（按功能隔离）
│   └── {feature}/
│       ├── .spec-meta.yaml  # 变更元数据（状态/角色/时间线）
│       ├── proposal.md     # 需求提案（rd:propose 产出）
│       ├── design.md       # 技术设计（rd:propose 产出）
│       ├── tasks.md        # 任务分解（rd:propose 产出）
│       └── review.md      # 评审记录（rd:* 生命周期评审）
└── archive/                # 归档目录
    └── {feature}/
        ├── {feature}-spec.md
        └── summary.md     # 归档摘要（rd:archive 产出）
```

### 文件说明

| 文件 | 生命周期阶段 | 说明 |
|------|-------------|------|
| `changes/{feature}/.spec-meta.yaml` | 全阶段 | 变更元数据（状态、角色、时间线），Architect 维护 |
| `changes/{feature}/proposal.md` | draft | 需求提案 |
| `changes/{feature}/design.md` | draft | 技术设计 |
| `changes/{feature}/tasks.md` | draft → implemented | 任务分解清单 |
| `changes/{feature}/review.md` | review | 评审记录 |
| `{feature}-spec.md` | 全阶段 | 正式 spec（approved 后锁定） |
| `_meta.md` | 全阶段 | 模块 spec 注册表 |

---

## Frontmatter 格式

所有 spec 文件使用 YAML frontmatter 标注生命周期元数据：

```yaml
---
spec_id: SPEC-{序号}
module: {模块名}
feature: {功能名}
status: draft               # draft | review | debate | approved | implemented | archived
version: v1.0
author: {作者}
reviewer: {评审人}
created_at: {YYYY-MM-DD}
updated_at: {YYYY-MM-DD}
change_dir: changes/{功能名}
---
```

---

## 模块注册表 `_meta.md`

每个模块目录下维护一份注册表，由 Architect 在每次状态转换时更新：

```yaml
---
module: {模块名}
team: {所属团队}
last_updated: {YYYY-MM-DD}
---

## Active Specs

| Spec File | SPEC ID | Status | Version | Updated |
|-----------|---------|--------|---------|---------|

## Active Changes

| Change | Status | Started |
|--------|--------|---------|
```

---

## CI 自动生成

`index.md` 由 CI 自动生成，展示全仓 SPEC 状态总览，禁止手动编辑。

---

## 兼容性

现有 spec 文件（无 YAML frontmatter）视为 `status: draft, version: v1.0`，无需迁移。
