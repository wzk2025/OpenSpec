## MODIFIED Requirements

### Requirement: Project Structure
Define the canonical directory tree. 目录名从 `openspec` 改为 `.harness/spec`。

#### Scenario: Directory structure with new path
- **WHEN** 系统创建或读取项目制品目录
- **THEN** 目录结构 SHALL 为 `.harness/spec/` 下包含 `specs/`、`changes/`、`config.yaml`

#### Scenario: Nested directory creation
- **WHEN** 系统在项目根目录下创建制品目录
- **THEN** SHALL 使用递归创建（`mkdir -p` 语义）确保 `.harness/` 和 `.harness/spec/` 均存在
