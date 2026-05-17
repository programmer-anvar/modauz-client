import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useCartStore } from '../../store/cartStore'
import { createOrderApi } from '../../services/orderService'
import type { ShippingAddress } from '../../types'
import toast from 'react-hot-toast'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCartStore()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'naqd' | 'karta'>('naqd')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  const shippingPrice = totalPrice() > 200000 ? 0 : 15000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast.error('Savat bo\'sh!')
      return
    }

    setLoading(true)
    try {
      const shippingAddress: ShippingAddress = {
        fullName,
        phone,
        address,
        city
      }

      const orderItems = items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images[0] || '',
        price: item.product.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity
      }))

      await createOrderApi(orderItems, shippingAddress, paymentMethod)

      clearCart()
      toast.success('Buyurtma qabul qilindi!')
      navigate('/orders')

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Xato yuz berdi!')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

          {/* Sarlavha */}
          <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black mb-8'>
            Buyurtma rasmiylashtirish
          </h1>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

            {/* Chap — forma */}
            <div className='lg:col-span-2'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

                {/* Yetkazib berish manzili */}
                <div>
                  <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black mb-4 pb-2 border-b border-gray-100'>
                    Yetkazib berish manzili
                  </h2>
                  <div className='flex flex-col gap-3'>

                    <div>
                      <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                        To'liq ism *
                      </label>
                      <input
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder='Aziz Toshmatov'
                        required
                        className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                      />
                    </div>

                    <div>
                      <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                        Telefon *
                      </label>
                      <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder='+998901234567'
                        required
                        className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                      />
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <div>
                        <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                          Shahar *
                        </label>
                        <input
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          placeholder='Toshkent'
                          required
                          className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                        />
                      </div>
                      <div>
                        <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                          Manzil *
                        </label>
                        <input
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          placeholder="Ko\'cha, uy raqami"
                          required
                          className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* To'lov usuli */}
                <div>
                  <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black mb-4 pb-2 border-b border-gray-100'>
                    To'lov usuli
                  </h2>
                  <div className='flex flex-col gap-2'>
                    <label className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${paymentMethod === 'naqd' ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
                      <input
                        type='radio'
                        value='naqd'
                        checked={paymentMethod === 'naqd'}
                        onChange={() => setPaymentMethod('naqd')}
                        className='accent-black'
                      />
                      <div>
                        <p className='text-[12px] font-medium text-black'>Naqd pul</p>
                        <p className='text-[10px] text-gray-400'>Yetkazib berganda to'lanadi</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${paymentMethod === 'karta' ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}>
                      <input
                        type='radio'
                        value='karta'
                        checked={paymentMethod === 'karta'}
                        onChange={() => setPaymentMethod('karta')}
                        className='accent-black'
                      />
                      <div>
                        <p className='text-[12px] font-medium text-black'>Karta</p>
                        <p className='text-[10px] text-gray-400'>Click yoki Payme orqali</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Izoh */}
                <div>
                  <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black mb-4 pb-2 border-b border-gray-100'>
                    Izoh (ixtiyoriy)
                  </h2>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder='Kuryer uchun izoh...'
                    rows={3}
                    className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors resize-none'
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-black text-white py-3 text-[11px] font-medium tracking-[1.5px] uppercase hover:bg-gray-900 transition-colors disabled:opacity-50'
                >
                  {loading ? 'Yuborilmoqda...' : 'Buyurtmani tasdiqlash'}
                </button>

              </form>
            </div>

            {/* O'ng — xulosa */}
            <div className='lg:col-span-1'>
              <div className='bg-gray-50 p-5 sticky top-20'>

                <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black mb-4'>
                  Buyurtma ({items.length} ta)
                </h2>

                {/* Mahsulotlar */}
                <div className='flex flex-col gap-3 mb-4'>
                  {items.map((item, i) => (
                    <div key={i} className='flex gap-3'>
                      <div className='w-12 h-12 bg-white flex items-center justify-center flex-shrink-0 border border-gray-100'>
                        {item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <span className='text-xl'>👕</span>
                        )}
                      </div>
                      <div className='flex-1'>
                        <p className='text-[11px] font-medium text-black truncate'>
                          {item.product.name}
                        </p>
                        <p className='text-[9px] text-gray-400 mt-0.5'>
                          {item.size && `${item.size} · `}{item.color} · {item.quantity} ta
                        </p>
                        <p className='text-[11px] font-medium text-black mt-1'>
                          {(item.product.price * item.quantity).toLocaleString()} so'm
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='border-t border-gray-200 pt-3 flex flex-col gap-2 mb-4'>
                  <div className='flex justify-between'>
                    <span className='text-[11px] text-gray-500'>Mahsulotlar</span>
                    <span className='text-[11px] text-black font-medium'>{totalPrice().toLocaleString()} so'm</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-[11px] text-gray-500'>Yetkazib berish</span>
                    <span className={`text-[11px] font-medium ${shippingPrice === 0 ? 'text-green-600' : 'text-black'}`}>
                      {shippingPrice === 0 ? 'Bepul' : `${shippingPrice.toLocaleString()} so'm`}
                    </span>
                  </div>
                </div>

                <div className='border-t border-gray-200 pt-3'>
                  <div className='flex justify-between'>
                    <span className='text-[12px] font-medium text-black'>Jami</span>
                    <span className='text-[16px] font-medium text-black'>
                      {(totalPrice() + shippingPrice).toLocaleString()} so'm
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Checkout