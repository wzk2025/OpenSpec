## 1. 核心路径替换

- [x] 1.1 将 `src/core/config.ts` 中 `OPENSPEC_DIR_NAME` 从 `'openspec'` 改为 `'.harness/spec'`
- [x] 1.2 全局搜索所有源码文件中硬编码的 `'openspec'` 字符串（排除注释和文档），替换为引用 `OPENSPEC_DIR_NAME` 常量或直接改为 `.harness/spec`
- [x] 1.3 确保 `mkdir` 调用均为递归模式（`{ recursive: true }`），因为 `.harness/spec` 包含两级目录

## 2. 命令前缀替换

- [x] 2.1 更新 `src/core/command-generation/adapters/claude.ts`，将 `opsx` 替换为 `rd`
- [x] 2.2 更新 `src/utils/command-references.ts` 中 `transformToHyphenCommands` 的正则，从 `/opsx:/` 改为 `/rd:/`
- [x] 2.3 更新 `src/core/templates/` 下所有模板中的 `/opsx:` 和 `/opsx-` 引用为 `/rd:` 和 `/rd-`

## 3. 移除非 Claude Code 适配器

- [x] 3.1 更新 `src/core/command-generation/registry.ts`，仅注册 `claude` 适配器，注释掉其余适配器的注册行
- [x] 3.2 更新 `src/core/shared/tool-detection.ts` 中的 `AI_TOOLS` 或 `SKILL_NAMES`，仅保留 Claude Code 相关条目
- [x] 3.3 更新 `src/core/init.ts` 中的工具选择逻辑，硬编码为 Claude Code（或标记 init 为不可用）

## 4. 测试更新

- [x] 4.1 全局更新测试文件中所有 `'openspec'` 路径断言为 `.harness/spec`（使用 `path.join()`）
- [x] 4.2 更新 `test/commands/init.test.ts` 中的路径断言
- [x] 4.3 更新命令前缀相关测试中的 `opsx` 引用
- [x] 4.4 运行 `pnpm test` 确认全部通过
- [x] 4.5 修复 init/update/artifact-workflow/config-profile 测试中的多工具场景（4 个文件，27 个测试）
- [x] 4.6 验证 `pnpm run lint` 无报错
