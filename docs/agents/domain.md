# 领域文档

工程技能在探索代码库时如何消费本仓库的领域文档。

## 探索前先阅读这些

- **`CONTEXT.md`** 位于仓库根目录，或
- **`CONTEXT-MAP.md`** 位于仓库根目录（如果存在）：它指向每个上下文的 `CONTEXT.md`。阅读与当前主题相关的每一个。
- **`docs/adr/`**：阅读与你即将工作的领域相关的 ADR。在多上下文仓库中，还要检查 `src/<context>/docs/adr/` 获取上下文特定的决策。

如果这些文件不存在，**静默继续**。不要标记它们的缺失；不要建议预先创建它们。`/domain-modeling` 技能（通过 `/grill-with-docs` 和 `/improve-codebase-architecture` 到达）会在术语或决策真正被解决时惰性创建它们。

## 文件结构

单上下文仓库（大多数仓库）：

```text
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

多上下文仓库（根目录存在 `CONTEXT-MAP.md`）：

```text
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← 系统级决策
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← 上下文特定决策
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## 使用术语表的词汇

当你的输出命名一个领域概念（在 issue 标题、重构提案、假设、测试名称中），使用 `CONTEXT.md` 中定义的术语。不要漂移到术语表明确避免的同义词。

如果你需要的概念还不在术语表中，这是一个信号：要么你在发明项目不使用的语言（重新考虑），要么存在真正的空白（记录下来留给 `/domain-modeling`）。

## 标记 ADR 冲突

如果你的输出与现有 ADR 矛盾，明确指出而不是静默覆盖：

> _与 ADR-0007（事件源订单）矛盾，但值得重新打开因为……_
