# Context — Morrow

Morrow 是面向美国消费者的家居生活演示商店。本文件只定义领域词汇，不记录技术实现。

## Product（商品）

一件在售的家居用品。属于恰好一个 Category，拥有一个或多个 Colorway、一个 USD 价格和一段简短描述。Product 是目录数据，不是购物车里的条目。

## Colorway（配色）

Product 的一种可选颜色，由名称和色值标识，可能处于不可售状态（Sold out）。同一 Product 的所有 Colorway 共用价格，且不单独配图。

## Category（分类）

四个编辑性分组之一：Tableware、Textiles、Lighting、Decor。每个 Product 恰好属于一个 Category。

## Cart（购物车）

消费者当前选中的 Product 集合，可随时增删改。包含零个或多个 Cart Line。

## Cart Line（购物车行）

一个 Product 与一个 Colorway 的组合，外加 1–10 的数量。同一 Product 的两个 Colorway 是两条 Cart Line；再次加入已存在的 Product + Colorway 只增加该行数量。

## Subtotal（小计）

所有 Cart Line 的单价 × 数量之和，以 USD 计。运费与税费不在模型内。

## Sale（促销）

当前价格低于 compare-at 价格的 Product。

## Badge（徽标）

编辑性标记，仅限 New、Bestseller、Sale。不代表评分或评论。

## Locale（界面语言）

界面语言：English（默认）或简体中文。Locale 只改变文案，价格始终以 USD 展示。

## Demo store（演示商店）

没有账号、支付与库存服务，Checkout 明确不在范围内。
