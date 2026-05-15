import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { getProductByIdApi } from '../../services/productService'
import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types'
import toast from 'react-hot-toast'
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { TbTruckDelivery, TbRefresh, TbShieldCheck } from 'react-icons/tb'

const ProductDetail = () => {
  const { id } = useParams()
  // useParams = URL dagi :id ni oladi
  // masalan: /products/64abc123 → id = "64abc123"

  const navigate = useNavigate()
  const { addItem } = useCartStore()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  // activeImage = hozir ko'rsatilayotgan rasm indeksi

  useEffect(() => {
    if (id) fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const data = await getProductByIdApi(id!)
      setProduct(data)
      // Birinchi o'lcham va rangni avtomatik tanlash
      if (data.sizes.length > 0) setSelectedSize(data.sizes[0])
      if (data.colors.length > 0) setSelectedColor(data.colors[0])
    } catch (error) {
      console.log('Xato:', error)
      navigate('/products')
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    if (!product) return

    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('O\'lcham tanlang!')
      return
    }

    if (product.colors.length > 0 && !selectedColor) {
      toast.error('Rang tanlang!')
      return
    }

    if (product.countInStock === 0) {
      toast.error('Mahsulot tugagan!')
      return
    }

    addItem(product, quantity, selectedSize, selectedColor)
    toast.success('Savatga qo\'shildi!')
  }

  // Loading
  if (loading) {
    return (
      <div className='min-h-screen bg-white'>
        <Navbar />
        <div className='pt-14 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='aspect-square bg-gray-100 animate-pulse' />
            <div className='flex flex-col gap-4'>
              <div className='h-6 bg-gray-100 animate-pulse rounded' />
              <div className='h-4 bg-gray-100 animate-pulse rounded w-1/2' />
              <div className='h-8 bg-gray-100 animate-pulse rounded w-1/3' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16'>

            {/* Chap — rasmlar */}
            <div className='flex flex-col gap-3'>

              {/* Asosiy rasm */}
              <div className='aspect-square bg-gray-50 flex items-center justify-center overflow-hidden'>
                {product.images.length > 0 ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <span className='text-[100px] text-gray-200'>👕</span>
                )}
              </div>

              {/* Kichik rasmlar */}
              {product.images.length > 1 && (
                <div className='flex gap-2'>
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-16 h-16 bg-gray-50 overflow-hidden border-2 transition-colors ${
                        activeImage === index
                          ? 'border-black'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* O'ng — ma'lumot */}
            <div className='flex flex-col'>

              {/* Mavjud badge */}
              <div className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 mb-3 w-fit uppercase tracking-[1px] ${
                product.countInStock > 0
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-600'
              }`}>
                {product.countInStock > 0 ? 'Mavjud' : 'Tugagan'}
              </div>

              {/* Nom */}
              <h1 className='text-xl sm:text-2xl font-medium text-black mb-2 leading-tight tracking-tight'>
                {product.name}
              </h1>

              {/* Kategoriya */}
              <p className='text-[10px] text-gray-400 uppercase tracking-[1.5px] mb-4'>
                {product.category}
              </p>

              {/* Narx */}
              <div className='flex items-baseline gap-3 mb-6'>
                <span className='text-2xl font-medium text-black'>
                  {product.price.toLocaleString()} so'm
                </span>
                {product.oldPrice && product.oldPrice > 0 && (
                  <>
                    <span className='text-sm text-gray-400 line-through'>
                      {product.oldPrice.toLocaleString()}
                    </span>
                    <span className='text-[9px] bg-black text-white px-2 py-1 font-bold tracking-[1px]'>
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Rang tanlash */}
              {product.colors.length > 0 && (
                <div className='mb-5'>
                  <p className='text-[9px] text-gray-400 uppercase tracking-[2px] mb-2.5'>
                    Rang: <span className='text-black font-medium'>{selectedColor}</span>
                  </p>
                  <div className='flex gap-2'>
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-[10px] border transition-colors tracking-wide ${
                          selectedColor === color
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* O'lcham tanlash */}
              {product.sizes.length > 0 && (
                <div className='mb-6'>
                  <p className='text-[9px] text-gray-400 uppercase tracking-[2px] mb-2.5'>
                    O'lcham: <span className='text-black font-medium'>{selectedSize}</span>
                  </p>
                  <div className='flex gap-2 flex-wrap'>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-[11px] border transition-colors tracking-wide ${
                          selectedSize === size
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Miqdor */}
              <div className='mb-6'>
                <p className='text-[9px] text-gray-400 uppercase tracking-[2px] mb-2.5'>
                  Miqdor
                </p>
                <div className='flex items-center border border-gray-200 w-fit'>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className='w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors'
                  >
                    <AiOutlineMinus size={14} />
                  </button>
                  <span className='w-10 h-10 flex items-center justify-center text-sm font-medium'>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.countInStock, q + 1))}
                    className='w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors'
                  >
                    <AiOutlinePlus size={14} />
                  </button>
                </div>
              </div>

              {/* Tugmalar */}
              <div className='flex gap-3 mb-8'>
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className='flex-1 bg-black text-white py-3 text-[11px] font-medium tracking-[1.5px] uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Savatga qo'sh
                </button>
                <button className='w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-black transition-colors'>
                  <AiOutlineHeart size={18} className='text-black' />
                </button>
              </div>

              {/* Xususiyatlar */}
              <div className='flex flex-col gap-3 border-t border-gray-100 pt-6'>
                <div className='flex items-center gap-3 text-[11px] text-gray-500'>
                  <TbTruckDelivery size={16} className='text-black' />
                  Bepul yetkazib berish
                </div>
                <div className='flex items-center gap-3 text-[11px] text-gray-500'>
                  <TbRefresh size={16} className='text-black' />
                  30 kun ichida qaytarish
                </div>
                <div className='flex items-center gap-3 text-[11px] text-gray-500'>
                  <TbShieldCheck size={16} className='text-black' />
                  Original mahsulot kafolati
                </div>
              </div>

              {/* Tavsif */}
              {product.description && (
                <div className='mt-6 border-t border-gray-100 pt-6'>
                  <p className='text-[9px] text-gray-400 uppercase tracking-[2px] mb-3'>
                    Tavsif
                  </p>
                  <p className='text-[12px] text-gray-600 leading-relaxed'>
                    {product.description}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ProductDetail