## 代理技能

### 问题跟踪器

issues 和 spec 以 markdown 文件存放在 `.scratch/<feature>/` 下，每个 ticket 一个文件。详见 `docs/agents/issue-tracker.md`。

### 分诊标签

使用五个默认标签：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`。详见 `docs/agents/triage-labels.md`。

### 领域文档

单上下文：根目录 `CONTEXT.md` + `docs/adr/`，文件不存在时静默继续。详见 `docs/agents/domain.md`。
