export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Products</h1>
      <p className="mt-2 text-sm text-neutral-500">Scaffold ready — the product grid lands here.</p>

      {/* 2 / 3 / 4 列断点，分别对应手机、平板、桌面 */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="aspect-3/4 animate-pulse rounded-2xl bg-neutral-100" />
        ))}
      </div>
    </section>
  )
}
