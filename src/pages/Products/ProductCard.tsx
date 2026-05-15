import { Link } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types'
import toast from 'react-hot-toast'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // e.preventDefault = Link ga o'tmaslik uchun

    if (product.sizes.length > 0 || product.colors.length > 0) {
      toast('O\'lcham tanlash uchun mahsulotga kiring!', { icon: '👆' })
      return
    }
    addItem(product, 1, '', '')
    toast.success('Savatga qo\'shildi!')
  }

  return (
    <div className='bg-white group'>

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

        {/* Savatga qo'shish */}
        <button
          onClick={handleAddToCart}
          className='absolute bottom-0 left-0 right-0 bg-black text-white text-[10px] font-medium py-2.5 tracking-[1.5px] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300'
        >
          Savatga qo'sh
        </button>

      </div>

      {/* Ma'lumot */}
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
  )
}

export default ProductCard