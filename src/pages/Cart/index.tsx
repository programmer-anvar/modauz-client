import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useCartStore } from '../../store/cartStore'
import { useAuthStore } from '../../store/authStore'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'

const Cart = () => {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCartStore()
  const { isAuth } = useAuthStore()

  const shippingPrice = totalPrice() > 200000 ? 0 : 15000
  // 200 000 dan ko'p bo'lsa bepul

  const handleCheckout = () => {
    if (!isAuth) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  // Savat bo'sh
  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-white'>
        <Navbar />
        <div className='pt-14 sm:pt-16 flex flex-col items-center justify-center min-h-[60vh] gap-4'>
          <p className='text-6xl'>🛍️</p>
          <p className='text-sm text-gray-400 tracking-wide'>Savat bo'sh</p>
          <Link
            to='/products'
            className='bg-black text-white text-[10px] font-medium px-6 py-3 tracking-[1.5px] uppercase hover:bg-gray-900 transition-colors'
          >
            Xarid qilish
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

          {/* Sarlavha */}
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black mb-1'>
                Savat
              </h1>
              <p className='text-[11px] text-gray-400'>
                {totalItems()} ta mahsulot
              </p>
            </div>
            <button
              onClick={clearCart}
              className='text-[10px] text-gray-400 uppercase tracking-[1px] hover:text-black transition-colors border-b border-gray-200 hover:border-black'
            >
              Tozalash
            </button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

            {/* Chap — mahsulotlar */}
            <div className='lg:col-span-2'>
              <div className='flex flex-col divide-y divide-gray-100'>
                {items.map((item, index) => (
                  <div key={index} className='flex gap-4 py-5'>

                    {/* Rasm */}
                    <Link
                      to={`/products/${item.product._id}`}
                      className='w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden'
                    >
                      {item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <span className='text-3xl text-gray-200'>👕</span>
                      )}
                    </Link>

                    {/* Ma'lumot */}
                    <div className='flex-1 flex flex-col justify-between'>
                      <div>
                        <Link
                          to={`/products/${item.product._id}`}
                          className='text-[12px] font-medium text-black hover:text-gray-600 transition-colors'
                        >
                          {item.product.name}
                        </Link>
                        <div className='flex gap-3 mt-1'>
                          {item.size && (
                            <span className='text-[9px] text-gray-400 uppercase tracking-[1px]'>
                              O'lcham: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className='text-[9px] text-gray-400 uppercase tracking-[1px]'>
                              Rang: {item.color}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center justify-between mt-3'>
                        {/* Miqdor */}
                        <div className='flex items-center border border-gray-200'>
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                removeItem(item.product._id, item.size, item.color)
                              } else {
                                updateQuantity(item.product._id, item.size, item.color, item.quantity - 1)
                              }
                            }}
                            className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors'
                          >
                            <AiOutlineMinus size={12} />
                          </button>
                          <span className='w-8 h-8 flex items-center justify-center text-[12px] font-medium'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.size, item.color, item.quantity + 1)}
                            className='w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors'
                          >
                            <AiOutlinePlus size={12} />
                          </button>
                        </div>

                        <div className='flex items-center gap-4'>
                          {/* Narx */}
                          <span className='text-[13px] font-medium text-black'>
                            {(item.product.price * item.quantity).toLocaleString()} so'm
                          </span>

                          {/* O'chirish */}
                          <button
                            onClick={() => removeItem(item.product._id, item.size, item.color)}
                            className='text-gray-300 hover:text-black transition-colors'
                          >
                            <AiOutlineDelete size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* O'ng — xulosa */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 p-6'>

                <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black mb-5'>
                  Buyurtma xulosasi
                </h2>

                <div className='flex flex-col gap-3 mb-5'>
                  <div className='flex justify-between'>
                    <span className='text-[11px] text-gray-500'>
                      Mahsulotlar ({totalItems()} ta)
                    </span>
                    <span className='text-[11px] text-black font-medium'>
                      {totalPrice().toLocaleString()} so'm
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-[11px] text-gray-500'>
                      Yetkazib berish
                    </span>
                    <span className={`text-[11px] font-medium ${shippingPrice === 0 ? 'text-green-600' : 'text-black'}`}>
                      {shippingPrice === 0 ? 'Bepul' : `${shippingPrice.toLocaleString()} so'm`}
                    </span>
                  </div>

                  {/* Bepul yetkazish info */}
                  {shippingPrice > 0 && (
                    <div className='flex items-start gap-2 bg-white p-3 border border-gray-100'>
                      <TbTruckDelivery size={14} className='text-black mt-0.5 flex-shrink-0' />
                      <p className='text-[10px] text-gray-500 leading-relaxed'>
                        {(200000 - totalPrice()).toLocaleString()} so'm qo'shsangiz yetkazib berish bepul!
                      </p>
                    </div>
                  )}
                </div>

                <div className='border-t border-gray-200 pt-4 mb-5'>
                  <div className='flex justify-between'>
                    <span className='text-[12px] font-medium text-black'>Jami</span>
                    <span className='text-[16px] font-medium text-black'>
                      {(totalPrice() + shippingPrice).toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className='w-full bg-black text-white py-3 text-[11px] font-medium tracking-[1.5px] uppercase hover:bg-gray-900 transition-colors mb-3'
                >
                  To'lovga o'tish
                </button>

                <Link
                  to='/products'
                  className='block text-center text-[10px] text-gray-400 uppercase tracking-[1px] hover:text-black transition-colors'
                >
                  Xaridni davom ettirish
                </Link>

              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Cart