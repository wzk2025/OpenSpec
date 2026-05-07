## MODIFIED Requirements

### Requirement: ToolCommandAdapter interface
Define a per-tool adapter interface with `toolId`, `getFilePath()`, and `formatFile()`. 仅注册 Claude Code 适配器，使用新前缀替代 `opsx`。

#### Scenario: Claude adapter uses new prefix
- **WHEN** Claude adapter 的 `getFilePath()` 生成命令文件路径
- **THEN** 路径 SHALL 为 `.claude/commands/rd/<id>.md`

#### Scenario: No other adapters registered
- **WHEN** `CommandAdapterRegistry` 初始化
- **THEN** 仅 SHALL 注册 `claude` 适配器，其他工具的适配器不注册

### Requirement: Shared command body content
Command body content 中引用其他命令时使用新前缀。

#### Scenario: Cross-references use new prefix
- **WHEN** 命令模板 body 中包含对其他命令的引用
- **THEN** 所有引用 SHALL 使用 `rd:` 前缀（如 `/rd:apply` 而非 `/opsx:apply`）
