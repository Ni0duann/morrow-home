# Issue tracker：本地 Markdown

本仓库的 issue 和 spec 以 `.scratch/` 中的 markdown 文件形式存放。

## 约定

- 每个功能一个目录：`.scratch/<feature-slug>/`
- spec 是 `.scratch/<feature-slug>/spec.md`
- 实现 issues 是每个 ticket 一个文件，位于 `.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 开始编号，永远不是单个合并的 tickets 文件
- Triage 状态记录为每个 issue 文件顶部附近的 `Status:` 行（角色字符串见 `triage-labels.md`）
- 评论和对话历史追加到文件底部的 `## Comments` 标题下

## 当技能说「发布到 issue tracker」

在 `.scratch/<feature-slug>/` 下创建新文件（如需要则创建目录）。

## 当技能说「获取相关 ticket」

阅读引用路径处的文件。用户通常会直接传递路径或 issue 编号。

## Wayfinding 操作

由 `/wayfinder` 使用。**地图** 是一个文件，每个 ticket 一个 **子** 文件。

- **地图**：`.scratch/<effort>/map.md`（Notes / Decisions-so-far / Fog body）。
- **子 ticket**：`.scratch/<effort>/issues/NN-<slug>.md`，从 `01` 开始编号，body 中包含问题。`Type:` 行记录 ticket 类型（`research`/`prototype`/`grilling`/`task`）；`Status:` 行记录 `claimed`/`resolved`。
- **阻塞**：顶部附近的 `Blocked by: NN, NN` 行。当它列出的每个文件都是 `resolved` 时，ticket 解除阻塞。
- **前沿**：扫描 `.scratch/<effort>/issues/` 寻找开放、未阻塞、未认领的文件；按编号第一个的获胜。
- **认领**：在任何工作之前设置 `Status: claimed` 并保存。
- **解决**：在 `## Answer` 标题下追加答案，设置 `Status: resolved`，然后将上下文指针（gist + 链接）追加到 `map.md` 中地图的 Decisions-so-far。
