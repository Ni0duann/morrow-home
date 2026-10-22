import { Link, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <section>
      <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Product {id}</h1>
      <p className="mt-2 text-sm text-neutral-500">Detail layout lands here.</p>
    </section>
  )
}
