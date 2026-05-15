import { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { getAllOrdersApi } from '../../../services/orderService'
import { getProductsApi } from '../../../services/productService'
import type { Order, Product } from '../../../types'
import { TbShoppingCart, TbCurrencyDollar, TbUsers, TbPackage, TbTrendingUp, TbTrendingDown } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [ordersData, productsData] = await Promise.all([
        getAllOrdersApi(),
        getProductsApi()
      ])
      // Promise.all = ikkalasini bir vaqtda yuboradi — tezroq!
      setOrders(ordersData)
      setProducts(productsData)
    } catch (error) {
      console.log('Xato:', error)
    }
    setLoading(false)
  }

  // Statistikalar
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0)
  const newOrders = orders.filter(o => o.status === 'yangi').length
  const deliveredOrders = orders.filter(o => o.status === 'yetkazildi').length

  // So'nggi 5 ta buyurtma
  const recentOrders = orders.slice(0, 5)

  // Top 5 mahsulot
  const topProducts = products.slice(0, 5)

  // Oylik chart uchun — so'nggi 8 oy
  const months = ['May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
  const chartData = [32, 45, 38, 61, 55, 70, 65, 88]
  const maxVal = Math.max(...chartData)

  const stats = [
    {
      label: 'Buyurtmalar',
      value: orders.length,
      change: '+12.5%',
      up: true,
      icon: <TbShoppingCart size={16} />
    },
    {
      label: 'Daromad',
      value: `${(totalRevenue / 1000000).toFixed(1)}M`,
      change: '+8.3%',
      up: true,
      icon: <TbCurrencyDollar size={16} />
    },
    {
      label: 'Yangi buyurtmalar',
      value: newOrders,
      change: '+5.1%',
      up: true,
      icon: <TbUsers size={16} />
    },
    {
      label: 'Mahsulotlar',
      value: products.length,
      change: '-2.4%',
      up: false,
      icon: <TbPackage size={16} />
    },
  ]

  const statusColors: Record<string, string> = {
    'yangi': 'bg-black text-white',
    'tasdiklandi': 'bg-blue-50 text-blue-700',
    "yo'lda": 'bg-amber-50 text-amber-700',
    'yetkazildi': 'bg-green-50 text-green-700',
    'bekor': 'bg-gray-100 text-gray-500',
  }

  return (
    <AdminLayout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black'>
              Dashboard
            </h1>
            <p className='text-[11px] text-gray-400 mt-1'>
              {new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Statistika kartalar */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          {stats.map((stat, i) => (
            <div key={i} className='bg-white border border-gray-100 p-4 border-l-2 border-l-black'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-gray-400'>{stat.icon}</span>
                <span className='text-[9px] text-gray-400 uppercase tracking-[1px]'>
                  {stat.label}
                </span>
              </div>
              <div className='text-xl font-medium text-black mb-1'>
                {loading ? '—' : stat.value}
              </div>
              <div className={`flex items-center gap-1 text-[9px] font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <TbTrendingUp size={12} /> : <TbTrendingDown size={12} />}
                {stat.change} bu oy
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Top mahsulotlar */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>

          {/* Bar chart */}
          <div className='lg:col-span-2 bg-white border border-gray-100 p-5'>
            <h2 className='text-[10px] font-medium tracking-[1.5px] uppercase text-black mb-5'>
              Oylik daromad
            </h2>
            <div className='flex items-flex-end gap-2 h-32 border-b border-gray-100 mb-3'>
              {chartData.map((val, i) => (
                <div key={i} className='flex-1 flex flex-col justify-end'>
                  <div
                    className={`w-full rounded-sm transition-all ${
                      i === chartData.length - 1 ? 'bg-black' : 'bg-gray-100'
                    }`}
                    style={{ height: `${(val / maxVal) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className='flex gap-2'>
              {months.map((m, i) => (
                <div key={i} className='flex-1 text-center text-[8px] text-gray-400'>
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* Top mahsulotlar */}
          <div className='bg-white border border-gray-100 p-5'>
            <h2 className='text-[10px] font-medium tracking-[1.5px] uppercase text-black mb-5'>
              Top mahsulotlar
            </h2>
            <div className='flex flex-col gap-4'>
              {topProducts.map((p, i) => (
                <div key={p._id} className='flex items-center gap-3'>
                  <span className='text-[9px] text-gray-300 w-3'>{i + 1}</span>
                  <div className='flex-1'>
                    <p className='text-[11px] font-medium text-black truncate'>{p.name}</p>
                    <div className='h-1.5 bg-gray-100 mt-1'>
                      <div
                        className='h-full bg-black'
                        style={{ width: `${100 - i * 15}%` }}
                      />
                    </div>
                  </div>
                  <span className='text-[10px] text-gray-400'>
                    {p.price.toLocaleString()}
                  </span>
                </div>
              ))}
              {topProducts.length === 0 && (
                <p className='text-[11px] text-gray-400'>Mahsulot yo'q</p>
              )}
            </div>
          </div>

        </div>

        {/* So'nggi buyurtmalar */}
        <div className='bg-white border border-gray-100 p-5'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-[10px] font-medium tracking-[1.5px] uppercase text-black'>
              So'nggi buyurtmalar
            </h2>
            
              <Link to='/admin/orders'
              className='text-[10px] text-gray-400 uppercase tracking-[.5px] border-b border-gray-200 hover:text-black hover:border-black transition-colors'
            >
              Barchasi →
            </Link>
          </div>

          {loading ? (
            <div className='flex flex-col gap-3'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='h-10 bg-gray-50 animate-pulse' />
              ))}
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-gray-100'>
                    <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] pb-3 font-medium'>ID</th>
                    <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] pb-3 font-medium'>Mijoz</th>
                    <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] pb-3 font-medium'>Narx</th>
                    <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] pb-3 font-medium'>To'lov</th>
                    <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] pb-3 font-medium'>Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id} className='border-b border-gray-50'>
                      <td className='py-3 text-[10px] text-gray-400 font-mono'>
                        #{order._id.slice(-6)}
                      </td>
                      <td className='py-3 text-[11px] text-black'>
                        {typeof order.user === 'object' ? order.user.name : '—'}
                      </td>
                      <td className='py-3 text-[11px] text-black font-medium'>
                        {order.totalPrice.toLocaleString()} so'm
                      </td>
                      <td className='py-3 text-[10px] text-gray-500 uppercase tracking-[.5px]'>
                        {order.paymentMethod}
                      </td>
                      <td className='py-3'>
                        <span className={`text-[8px] font-bold px-2 py-1 uppercase tracking-[.5px] ${statusColors[order.status] || 'bg-gray-100 text-gray-500'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className='py-8 text-center text-[11px] text-gray-400'>
                        Buyurtma yo'q
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  )
}

export default Dashboard