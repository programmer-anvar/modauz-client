import { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { getAllOrdersApi, updateOrderStatusApi } from '../../../services/orderService'
import type { Order } from '../../../types'
import toast from 'react-hot-toast'
import { TbSearch } from 'react-icons/tb'

const statusOptions = ['yangi', 'tasdiklandi', "yo'lda", 'yetkazildi', 'bekor']

const statusColors: Record<string, string> = {
  'yangi': 'bg-black text-white',
  'tasdiklandi': 'bg-blue-50 text-blue-700',
  "yo'lda": 'bg-amber-50 text-amber-700',
  'yetkazildi': 'bg-green-50 text-green-700',
  'bekor': 'bg-gray-100 text-gray-500',
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filtered, setFiltered] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    let result = [...orders]
    if (search) {
      result = result.filter(o =>
        o._id.includes(search) ||
        (typeof o.user === 'object' && o.user.name.toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (statusFilter) {
      result = result.filter(o => o.status === statusFilter)
    }
    setFiltered(result)
  }, [search, statusFilter, orders])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await getAllOrdersApi()
      setOrders(data)
      setFiltered(data)
    } catch (error) {
      console.log('Xato:', error)
    }
    setLoading(false)
  }

  const handleStatusChange = async (id: string, status: Order['status']) => {
    try {
      await updateOrderStatusApi(id, status)
      toast.success('Holat yangilandi!')
      fetchOrders()
    } catch (error) {
      toast.error('Xato yuz berdi!')
    }
  }

  return (
    <AdminLayout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black'>
              Buyurtmalar
            </h1>
            <p className='text-[11px] text-gray-400 mt-1'>
              {filtered.length} ta buyurtma
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className='flex gap-3 mb-6'>
          <div className='relative flex-1'>
            <TbSearch size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='ID yoki mijoz nomi...'
              className='w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm outline-none focus:border-black transition-colors'
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className='border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
          >
            <option value=''>Barcha holat</option>
            {statusOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className='bg-white border border-gray-100'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-100'>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>ID</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Mijoz</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Manzil</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Narx</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>To'lov</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Holat</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className='border-b border-gray-50'>
                      <td colSpan={6} className='px-4 py-3'>
                        <div className='h-8 bg-gray-50 animate-pulse' />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className='px-4 py-12 text-center text-[11px] text-gray-400'>
                      Buyurtma topilmadi
                    </td>
                  </tr>
                ) : (
                  filtered.map(order => (
                    <tr key={order._id} className='border-b border-gray-50 hover:bg-gray-50 transition-colors'>

                      {/* ID */}
                      <td className='px-4 py-3 text-[10px] text-gray-400 font-mono'>
                        #{order._id.slice(-6)}
                      </td>

                      {/* Mijoz */}
                      <td className='px-4 py-3'>
                        <div className='text-[11px] font-medium text-black'>
                          {order.shippingAddress.fullName}
                        </div>
                        <div className='text-[10px] text-gray-400'>
                          {order.shippingAddress.phone}
                        </div>
                      </td>

                      {/* Manzil */}
                      <td className='px-4 py-3 text-[10px] text-gray-500'>
                        {order.shippingAddress.city}, {order.shippingAddress.address}
                      </td>

                      {/* Narx */}
                      <td className='px-4 py-3 text-[12px] font-medium text-black'>
                        {order.totalPrice.toLocaleString()} so'm
                      </td>

                      {/* To'lov */}
                      <td className='px-4 py-3 text-[10px] text-gray-500 uppercase tracking-[.5px]'>
                        {order.paymentMethod}
                      </td>

                      {/* Holat */}
                      <td className='px-4 py-3'>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order._id, e.target.value as Order['status'])}
                          className={`text-[9px] font-bold px-2 py-1 uppercase tracking-[.5px] border-none outline-none cursor-pointer ${statusColors[order.status]}`}
                        >
                          {statusOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default AdminOrders