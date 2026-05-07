## Why

OpenSpec 当前将制品放在 `openspec/` 目录，skill 命令使用 `opsx:` 前缀，支持 25+ 工具适配器。对于 rd_harness 内置场景，需要：将目录改为 `.harness/spec`、去掉 `opsx:` 前缀、仅保留 Claude Code 适配器。rd_harness 安装时直接内置目录结构和 skill 文件，无需 `openspec init` 交互流程。

## What Changes

- **BREAKING**: 项目级制品目录从 `openspec/` 改为 `.harness/spec`
- **BREAKING**: 去掉 `opsx:` 前缀，改为 `rd:` 前缀（如 `/rd:explore`、`/rd:apply`）
- 移除 `openspec init` 交互流程，rd_harness 安装时直接内置
- 仅保留 Claude Code 适配器，屏蔽其余 24+ 工具适配器

## Capabilities

### New Capabilities

（无新增能力，均为修改）

### Modified Capabilities
- `command-generation`: 仅保留 Claude Code 适配器，前缀改为可配置
- `openspec-conventions`: 目录约定更新为 `.harness/spec`

## Impact

- `src/core/config.ts` — `OPENSPEC_DIR_NAME` 改为 `.harness/spec`
- `src/core/command-generation/adapters/` — 仅保留 `claude.ts`
- `src/core/command-generation/registry.ts` — 仅注册 Claude Code
- `src/commands/` — 所有硬编码 `'openspec'` 路径替换为 `.harness/spec`
- `src/utils/command-references.ts` — 前缀转换逻辑更新
- `src/core/templates/` — 模板中 `/opsx:` 引用更新
- `src/core/init.ts` — 移除或标记为不可用
- 测试文件 — 路径断言更新
