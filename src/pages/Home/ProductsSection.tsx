import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductsApi } from '../../services/productService'
import type { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'
import { AiOutlineHeart } from 'react-icons/ai'

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getProductsApi()
      setProducts(data.slice(0, 8))
      // Faqat 8 ta mahsulot ko'rsatamiz
    } catch (error) {
      console.log('Products xatosi:', error)
    }
    setLoading(false)
  }

  const handleAddToCart = (product: Product) => {
    if (product.sizes.length > 0 || product.colors.length > 0) {
      // O'lcham yoki rang tanlash kerak bo'lsa — detail sahifaga yuboramiz
      toast('O\'lcham tanlash uchun mahsulotga kiring!', { icon: '👆' })
      return
    }
    addItem(product, 1, '', '')
    toast.success('Savatga qo\'shildi!')
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='bg-white'>
              <div className='h-48 bg-gray-100 animate-pulse' />
              <div className='p-3'>
                <div className='h-3 bg-gray-100 rounded animate-pulse mb-2' />
                <div className='h-3 bg-gray-100 rounded animate-pulse w-1/2' />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14'>

      {/* Sarlavha */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-[11px] font-medium text-black tracking-[2px] uppercase'>
          Mashhur mahsulotlar
        </h2>
        <Link
          to='/products'
          className='text-[10px] text-black uppercase tracking-[1px] border-b border-black hover:text-gray-500 hover:border-gray-500 transition-colors'
        >
          Barchasi →
        </Link>
      </div>

      {/* Mahsulotlar grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100'>
        {products.map(product => (
          <div key={product._id} className='bg-white group'>

            {/* Rasm qismi */}
            <div className='relative overflow-hidden bg-gray-50 aspect-square'>

              {/* Rasm */}
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-6xl text-gray-200'>
                  👕
                </div>
              )}

              {/* Badge */}
              {product.badge && (
                <div className='absolute top-2 left-2 bg-black text-white text-[8px] font-bold px-2 py-1 tracking-[1px] uppercase'>
                  {product.badge}
                </div>
              )}

              {/* Wishlist */}
              <button className='absolute top-2 right-2 w-7 h-7 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                <AiOutlineHeart size={14} className='text-black' />
              </button>

              {/* Savatga qo'shish — hover da chiqadi */}
              <button
                onClick={() => handleAddToCart(product)}
                className='absolute bottom-0 left-0 right-0 bg-black text-white text-[10px] font-medium py-2.5 tracking-[1.5px] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300'
              >
                Savatga qo'sh
              </button>

            </div>

            {/* Ma'lumot qismi */}
            <Link to={`/products/${product._id}`} className='block p-3'>
              <p className='text-[12px] font-medium text-black mb-1 truncate'>
                {product.name}
              </p>
              <p className='text-[9px] text-gray-400 uppercase tracking-[1px] mb-2'>
                {product.category}
              </p>
              <div className='flex items-center gap-2'>
                <span className='text-[13px] font-medium text-black'>
                  {product.price.toLocaleString()} so'm
                </span>
                {product.oldPrice && product.oldPrice > 0 && (
                  <span className='text-[10px] text-gray-400 line-through'>
                    {product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </Link>

          </div>
        ))}
      </div>

    </div>
  )
}

export default ProductsSection