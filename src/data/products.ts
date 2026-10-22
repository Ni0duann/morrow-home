import type { Localized } from '@/i18n/types'

export type CategoryId = 'tableware' | 'textiles' | 'lighting' | 'decor'
export type Badge = 'new' | 'bestseller' | 'sale'
export type SortOption = 'featured' | 'price-asc' | 'price-desc'

export type Category = {
  id: CategoryId
  name: Localized
}

export type Colorway = {
  id: string
  name: Localized
  hex: string
  available: boolean
}

export type Product = {
  id: string
  slug: string
  name: Localized
  description: Localized
  priceCents: number
  compareAtPriceCents?: number
  category: CategoryId
  colors: Colorway[]
  images: [string, string]
  badge?: Badge
  featuredRank: number
}

export const categories: Category[] = [
  { id: 'tableware', name: { en: 'Tableware', zh: '餐具' } },
  { id: 'textiles', name: { en: 'Textiles', zh: '织物' } },
  { id: 'lighting', name: { en: 'Lighting', zh: '灯具' } },
  { id: 'decor', name: { en: 'Decor', zh: '饰品' } },
]

const color = (
  id: string,
  en: string,
  zhName: string,
  hex: string,
  available = true,
): Colorway => ({ id, name: { en, zh: zhName }, hex, available })

// 图片路径跟随部署子路径，GitHub Pages 下仍能正确加载
const image = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export const products: Product[] = [
  {
    id: 'p-01',
    slug: 'ridge-stoneware-mug',
    name: { en: 'Ridge Stoneware Mug', zh: '棱纹陶土杯' },
    description: {
      en: 'A hand-thrown mug with a ridged body and a warm, speckled glaze. Holds 12 oz.',
      zh: '手工拉坯的棱纹杯身，暖调斑点釉面，容量约 355ml。',
    },
    priceCents: 2800,
    category: 'tableware',
    colors: [color('oat', 'Oat', '燕麦色', '#C9B99A'), color('charcoal', 'Charcoal', '炭灰', '#4A4741')],
    images: [image('mug.webp'), image('dining-room.webp')],
    badge: 'new',
    featuredRank: 1,
  },
  {
    id: 'p-02',
    slug: 'sand-dinner-plates',
    name: { en: 'Sand Dinner Plates, Set of 4', zh: '砂岩釉餐盘（四只装）' },
    description: {
      en: 'Four stoneware plates with a soft sand glaze, made for everyday meals.',
      zh: '四只砂岩釉面陶盘，适合日常餐桌。',
    },
    priceCents: 6400,
    compareAtPriceCents: 8000,
    category: 'tableware',
    colors: [color('sand', 'Sand', '沙色', '#D8C9B4'), color('chalk', 'Chalk', '米白', '#EFE9DF')],
    images: [image('plates.webp'), image('kitchen-living.webp')],
    badge: 'sale',
    featuredRank: 2,
  },
  {
    id: 'p-03',
    slug: 'olive-serving-bowl',
    name: { en: 'Olive Serving Bowl', zh: '橄榄釉分享碗' },
    description: {
      en: 'A wide, low serving bowl glazed in deep olive. Generous enough for salads and shared sides.',
      zh: '宽口浅腹的深橄榄釉陶碗，适合沙拉与分享配菜。',
    },
    priceCents: 4800,
    category: 'tableware',
    colors: [color('olive', 'Olive', '橄榄绿', '#6B6B4A'), color('oat', 'Oat', '燕麦色', '#C9B99A')],
    images: [image('bowl.webp'), image('open-plan.webp')],
    featuredRank: 3,
  },
  {
    id: 'p-04',
    slug: 'cloud-linen-bedding',
    name: { en: 'Cloud Linen Bedding Set', zh: '云感亚麻床品套装' },
    description: {
      en: 'Stone-washed European flax that softens with every sleep. Duvet cover and two shams.',
      zh: '石洗欧洲亚麻，愈用愈柔软。含被套与两只枕套。',
    },
    priceCents: 16800,
    category: 'textiles',
    colors: [color('oat', 'Oat', '燕麦色', '#C9B99A'), color('fog', 'Fog', '雾灰', '#B9B7B0')],
    images: [image('bedroom-linen.webp'), image('bedroom-rattan.webp')],
    badge: 'bestseller',
    featuredRank: 4,
  },
  {
    id: 'p-05',
    slug: 'woven-cushion-pair',
    name: { en: 'Woven Cushion Pair', zh: '粗编抱枕套（两只装）' },
    description: {
      en: 'Two textured cushion covers in a chunky basket weave, with hidden zips.',
      zh: '两只粗编纹理抱枕套，隐藏式拉链。',
    },
    priceCents: 7200,
    compareAtPriceCents: 8800,
    category: 'textiles',
    colors: [
      color('clay', 'Clay', '陶土色', '#B4553B'),
      color('moss', 'Moss', '苔绿', '#5E6653', false),
    ],
    images: [image('sofa-cushions.webp'), image('bedroom-lamp.webp')],
    badge: 'sale',
    featuredRank: 5,
  },
  {
    id: 'p-06',
    slug: 'washed-linen-throw',
    name: { en: 'Washed Linen Throw', zh: '水洗亚麻盖毯' },
    description: {
      en: 'A light, breathable throw with a fringed edge, finished in a soft wash.',
      zh: '轻盈透气的亚麻盖毯，流苏收边，柔软水洗处理。',
    },
    priceCents: 9600,
    category: 'textiles',
    colors: [color('sand', 'Sand', '沙色', '#D8C9B4'), color('charcoal', 'Charcoal', '炭灰', '#4A4741')],
    images: [image('bedroom-rattan.webp'), image('living-neutral.webp')],
    featuredRank: 6,
  },
  {
    id: 'p-07',
    slug: 'arc-desk-lamp',
    name: { en: 'Arc Desk Lamp', zh: '弧线工作灯' },
    description: {
      en: 'A slim steel task lamp with a tilting shade and warm, focused light.',
      zh: '纤细钢制工作灯，可调节灯罩，暖光聚焦。',
    },
    priceCents: 12400,
    category: 'lighting',
    colors: [color('ink', 'Ink', '墨黑', '#1C1A17'), color('bone', 'Bone', '骨白', '#E7DFD2')],
    images: [image('desk-lamp.webp'), image('living-red-chair.webp')],
    featuredRank: 7,
  },
  {
    id: 'p-08',
    slug: 'dome-pendant-light',
    name: { en: 'Dome Pendant Light', zh: '圆顶吊灯' },
    description: {
      en: 'A spun-metal dome pendant that casts a clean pool of light over a table.',
      zh: '旋压金属圆顶吊灯，为餐桌投下一片干净的光。',
    },
    priceCents: 14800,
    category: 'lighting',
    colors: [color('ink', 'Ink', '墨黑', '#1C1A17'), color('sand', 'Sand', '沙色', '#D8C9B4')],
    images: [image('pendant-lamp.webp'), image('living-gallery.webp')],
    featuredRank: 8,
  },
  {
    id: 'p-09',
    slug: 'column-floor-lamp',
    name: { en: 'Column Floor Lamp', zh: '立柱落地灯' },
    description: {
      en: 'A tall linen-shaded floor lamp with a weighted base and foot switch.',
      zh: '高挑亚麻灯罩落地灯，配重底座与脚踏开关。',
    },
    priceCents: 18600,
    category: 'lighting',
    colors: [
      color('ink', 'Ink', '墨黑', '#1C1A17'),
      color('oat', 'Oat', '燕麦色', '#C9B99A', false),
    ],
    images: [image('floor-lamp.webp'), image('hero.webp')],
    featuredRank: 9,
  },
  {
    id: 'p-10',
    slug: 'blossom-vase-duo',
    name: { en: 'Blossom Vase Duo', zh: '花枝双瓶' },
    description: {
      en: 'Two sculptural ceramic vases, designed to be grouped or shown alone.',
      zh: '两只雕塑感陶瓷花瓶，可组合或单独陈列。',
    },
    priceCents: 5800,
    category: 'decor',
    colors: [color('chalk', 'Chalk', '米白', '#EFE9DF'), color('terracotta', 'Terracotta', '赤陶', '#B4553B')],
    images: [image('vases.webp'), image('open-plan.webp')],
    featuredRank: 10,
  },
  {
    id: 'p-11',
    slug: 'saddle-leather-chair',
    name: { en: 'Saddle Leather Chair', zh: '鞍革休闲椅' },
    description: {
      en: 'A low lounge chair in full-grain saddle leather, with a solid oak frame.',
      zh: '整张鞍革包覆的低座休闲椅，实木橡木框架。',
    },
    priceCents: 42000,
    category: 'decor',
    colors: [color('saddle', 'Saddle', '鞍棕', '#8B5A3C'), color('olive', 'Olive', '橄榄绿', '#6B6B4A')],
    images: [image('orange-chair.webp'), image('yellow-chair.webp')],
    featuredRank: 11,
  },
  {
    id: 'p-12',
    slug: 'moss-velvet-sofa',
    name: { en: 'Moss Velvet Sofa', zh: '苔绿丝绒沙发' },
    description: {
      en: 'A deep three-seat sofa in cotton velvet, with feather-wrapped cushions.',
      zh: '三人位深座沙发，棉绒面料，羽绒包裹坐垫。',
    },
    priceCents: 98000,
    category: 'decor',
    colors: [color('moss', 'Moss', '苔绿', '#5E6653'), color('ink', 'Ink', '墨黑', '#1C1A17')],
    images: [image('green-sofa.webp'), image('hero.webp')],
    featuredRank: 12,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getCategory(id: CategoryId): Category {
  return categories.find((category) => category.id === id) ?? categories[0]
}

export function isCategoryId(value: string | null): value is CategoryId {
  return categories.some((category) => category.id === value)
}

export function isSortOption(value: string | null): value is SortOption {
  return value === 'featured' || value === 'price-asc' || value === 'price-desc'
}

type FilterOptions = {
  query: string
  category: CategoryId | 'all'
  sort: SortOption
}

export function filterProducts({ query, category, sort }: FilterOptions): Product[] {
  const needle = query.trim().toLowerCase()

  const filtered = products.filter((product) => {
    if (category !== 'all' && product.category !== category) return false
    if (!needle) return true
    return [product.name.en, product.name.zh, product.slug].some((value) =>
      value.toLowerCase().includes(needle),
    )
  })

  if (sort === 'price-asc') return filtered.sort((a, b) => a.priceCents - b.priceCents)
  if (sort === 'price-desc') return filtered.sort((a, b) => b.priceCents - a.priceCents)
  return filtered.sort((a, b) => a.featuredRank - b.featuredRank)
}
