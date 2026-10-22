import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Cart from '@/pages/Cart'
import Home from '@/pages/Home'
import ProductDetail from '@/pages/ProductDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
