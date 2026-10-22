import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Cart from '@/pages/Cart'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ProductDetail from '@/pages/ProductDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
