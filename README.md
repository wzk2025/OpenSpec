# rd

基于 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 的 AI 驱动规格化开发工具，专为 Claude Code 优化。

## 快速开始

**需要 Node.js >= 20.19.0**

```bash
# 安装
npm install -g @fission-ai/openspec@latest

# 在项目中初始化
cd your-project
rd init
```

## 工作流

```text
你: /rd:propose add-dark-mode
AI:  创建了 .harness/spec/changes/add-dark-mode/
     ✓ proposal.md — 做什么、为什么
     ✓ specs/       — 需求与场景
     ✓ design.md    — 技术方案
     ✓ tasks.md     — 实施清单
     准备实施！

你: /rd:apply
AI:  正在实施任务...
     ✓ 1.1 添加主题上下文
     ✓ 1.2 创建切换组件
     ✓ 2.1 添加 CSS 变量
     ✓ 2.2 接入 localStorage
     所有任务完成！

你: /rd:archive
AI:  已归档至 .harness/spec/changes/archive/2025-01-23-add-dark-mode/
     规格已更新。准备下一个功能。
```

## 斜杠命令

| 命令 | 说明 |
|------|------|
| `/rd:propose` | 创建新变更并生成所有制品 |
| `/rd:apply` | 实施当前变更的任务 |
| `/rd:archive` | 归档已完成的变更 |
| `/rd:explore` | 浏览项目规格和变更 |
| `/rd:new` | 创建新变更（逐步） |
| `/rd:continue` | 推进下一个制品 |
| `/rd:ff` | 快速跳过剩余制品 |
| `/rd:verify` | 验证变更实施结果 |
| `/rd:sync` | 同步主线规格 |
| `/rd:bulk-archive` | 批量归档变更 |
| `/rd:onboard` | 引导新成员了解项目 |

## CLI 命令

```bash
rd init [path]          # 初始化项目
rd update [path]        # 更新指令文件
rd list                 # 列出变更
rd list --specs         # 列出规格
rd view                 # 交互式面板
rd change show <name>   # 查看变更详情
rd change validate      # 验证变更
rd change archive       # 归档变更
rd config profile       # 配置档案
rd schema               # 管理工作流 schema
```

## 目录结构

初始化后在项目中创建 `.harness/spec/` 目录：

```
.harness/spec/
  config.yaml            # 项目配置
  specs/                 # 主线规格文件
  changes/               # 活跃变更
    my-feature/
      proposal.md        # 提案
      specs/             # 规格需求
      design.md          # 设计文档
      tasks.md           # 实施任务
    archive/             # 归档变更
```

## 更新

```bash
npm install -g @fission-ai/openspec@latest
rd update
```

## 开发

```bash
pnpm install            # 安装依赖
pnpm run build          # 构建
pnpm test               # 运行测试
pnpm run dev            # 监听模式开发
pnpm run dev:cli        # 构建并运行 CLI
```

## 遥测

默认收集匿名使用统计（仅命令名和版本号，不收集参数、路径、内容或个人信息）。CI 环境自动禁用。

关闭方式：`export OPENSPEC_TELEMETRY=0`

## License

MIT
