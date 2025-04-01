import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'

const Shop = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3000/product');
    setProducts(res.data);
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="row">
      <Header title="Shop" description="this is shop page" />
      {products.map(product => {
        return <ProductCard key={product.id} products={product} />
      })}
    </div>
  )
}

export default Shop;
