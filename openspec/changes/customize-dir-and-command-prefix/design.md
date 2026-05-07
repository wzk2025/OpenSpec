## Context

rd_harness 安装时会直接内置制品目录和 Claude Code skill 文件，不需要 OpenSpec 自己的 init 流程。核心引擎仍需知道制品在 `.harness/spec` 而非 `openspec/`，命令生成只需支持 Claude Code 一个工具。

## Goals / Non-Goals

**Goals:**
- 将 `OPENSPEC_DIR_NAME` 从 `openspec` 改为 `.harness/spec`
- 将命令前缀从 `opsx` 改为 `rd`
- 仅保留 Claude Code 适配器

**Non-Goals:**
- 不做可配置目录——直接硬编码 `.harness/spec`
- 不做可配置前缀——选定一个前缀后硬编码
- 不保留 init 交互流程
- 不支持其他 AI 工具

## Decisions

### Decision 1: 目录路径直接硬编码

将 `OPENSPEC_DIR_NAME` 改为 `.harness/spec`，不做配置化。所有引用该常量的地方自动生效。

### Decision 2: 前缀为 `rd`

选定方案 D，硬编码 `rd` 前缀。命令文件位于 `.claude/commands/rd/<id>.md`，斜杠命令为 `/rd:explore`、`/rd:apply` 等。

### Decision 3: 移除非 Claude Code 适配器

从 `registry.ts` 中移除除 `claude` 外的所有适配器注册。适配器文件本身可保留但不再注册，避免删文件过多。

## Risks / Trade-offs

- 回归上游 OpenSpec 时需重新引入多适配器 → 保留适配器文件，仅从注册表移除
- `.harness/spec` 包含两级目录，所有 `mkdir` 调用需确保递归创建
