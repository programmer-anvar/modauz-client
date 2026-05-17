import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { getMyOrdersApi } from '../../services/orderService'
import type { Order } from '../../types'

const statusColors: Record<string, string> = {
  'yangi': 'bg-black text-white',
  'tasdiklandi': 'bg-blue-50 text-blue-700',
  "yo'lda": 'bg-amber-50 text-amber-700',
  'yetkazildi': 'bg-green-50 text-green-700',
  'bekor': 'bg-gray-100 text-gray-500',
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await getMyOrdersApi()
      setOrders(data)
    } catch (error) {
      console.log('Xato:', error)
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

          {/* Sarlavha */}
          <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black mb-8'>
            Mening buyurtmalarim
          </h1>

          {/* Loading */}
          {loading && (
            <div className='flex flex-col gap-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-24 bg-gray-50 animate-pulse' />
              ))}
            </div>
          )}

          {/* Bo'sh holat */}
          {!loading && orders.length === 0 && (
            <div className='text-center py-20'>
              <p className='text-5xl mb-4'>📦</p>
              <p className='text-sm text-gray-400 mb-6'>
                Hali buyurtma yo'q
              </p>
              <Link
                to='/products'
                className='bg-black text-white text-[10px] font-medium px-6 py-3 tracking-[1.5px] uppercase hover:bg-gray-900 transition-colors'
              >
                Xarid qilish
              </Link>
            </div>
          )}

          {/* Buyurtmalar */}
          <div className='flex flex-col gap-4'>
            {orders.map(order => (
              <div
                key={order._id}
                className='border border-gray-100 hover:border-gray-300 transition-colors'
              >
                {/* Header */}
                <div className='flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50'>
                  <div className='flex items-center gap-4'>
                    <span className='text-[10px] text-gray-400 font-mono'>
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <span className='text-[10px] text-gray-400'>
                      {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                    </span>
                  </div>
                  <span className={`text-[8px] font-bold px-2 py-1 uppercase tracking-[.5px] ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                {/* Mahsulotlar */}
                <div className='px-5 py-4'>
                  <div className='flex flex-col gap-3'>
                    {order.items.map((item, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-gray-50 flex items-center justify-center flex-shrink-0'>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <span className='text-lg'>👕</span>
                          )}
                        </div>
                        <div className='flex-1'>
                          <p className='text-[12px] font-medium text-black'>{item.name}</p>
                          <p className='text-[10px] text-gray-400'>
                            {item.size && `${item.size} · `}
                            {item.color && `${item.color} · `}
                            {item.quantity} ta
                          </p>
                        </div>
                        <span className='text-[12px] font-medium text-black'>
                          {(item.price * item.quantity).toLocaleString()} so'm
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between px-5 py-3 border-t border-gray-100'>
                  <div className='flex items-center gap-4'>
                    <span className='text-[10px] text-gray-400 uppercase tracking-[.5px]'>
                      {order.paymentMethod}
                    </span>
                    {order.shippingPrice === 0 && (
                      <span className='text-[10px] text-green-600'>
                        Bepul yetkazish
                      </span>
                    )}
                  </div>
                  <div className='text-right'>
                    <p className='text-[9px] text-gray-400 uppercase tracking-[1px] mb-0.5'>Jami</p>
                    <p className='text-[14px] font-medium text-black'>
                      {order.totalPrice.toLocaleString()} so'm
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Orders