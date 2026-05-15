import { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { getProductsApi, createProductApi, updateProductApi, deleteProductApi } from '../../../services/productService'
import type { Product } from '../../../types'
import toast from 'react-hot-toast'
import { TbPlus, TbEdit, TbTrash, TbSearch } from 'react-icons/tb'
import ProductModal from './ProductModal'

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  // editProduct = null → yangi qo'shish, Product → tahrirlash

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (search) {
      setFiltered(products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ))
    } else {
      setFiltered(products)
    }
  }, [search, products])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getProductsApi()
      setProducts(data)
      setFiltered(data)
    } catch (error) {
      console.log('Xato:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Mahsulotni o\'chirishni tasdiqlaysizmi?')) return
    try {
      await deleteProductApi(id)
      toast.success('Mahsulot o\'chirildi!')
      fetchProducts()
    } catch (error) {
      toast.error('Xato yuz berdi!')
    }
  }

  const handleEdit = (product: Product) => {
    setEditProduct(product)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditProduct(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditProduct(null)
  }

  const handleSave = async (productData: Partial<Product>) => {
    try {
      if (editProduct) {
        await updateProductApi(editProduct._id, productData)
        toast.success('Mahsulot yangilandi!')
      } else {
        await createProductApi(productData as Omit<Product, '_id' | 'rating' | 'numReviews' | 'createdAt'>)
        toast.success('Mahsulot qo\'shildi!')
      }
      handleModalClose()
      fetchProducts()
    } catch (error) {
      toast.error('Xato yuz berdi!')
    }
  }

  const stockColor = (count: number) => {
    if (count === 0) return 'text-red-500'
    if (count < 10) return 'text-amber-600'
    return 'text-green-600'
  }

  return (
    <AdminLayout>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>

        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black'>
              Mahsulotlar
            </h1>
            <p className='text-[11px] text-gray-400 mt-1'>
              {filtered.length} ta mahsulot
            </p>
          </div>
          <button
            onClick={handleAdd}
            className='flex items-center gap-2 bg-black text-white px-4 py-2.5 text-[10px] font-medium uppercase tracking-[1px] hover:bg-gray-900 transition-colors'
          >
            <TbPlus size={14} />
            Yangi mahsulot
          </button>
        </div>

        {/* Qidiruv */}
        <div className='relative mb-6'>
          <TbSearch size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Mahsulot qidirish...'
            className='w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm outline-none focus:border-black transition-colors'
          />
        </div>

        {/* Table */}
        <div className='bg-white border border-gray-100'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-100'>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Mahsulot</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Kategoriya</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Narx</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Badge</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Ombor</th>
                  <th className='text-left text-[9px] text-gray-400 uppercase tracking-[1px] px-4 py-3 font-medium'>Amallar</th>
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
                      Mahsulot topilmadi
                    </td>
                  </tr>
                ) : (
                  filtered.map(product => (
                    <tr key={product._id} className='border-b border-gray-50 hover:bg-gray-50 transition-colors'>

                      {/* Mahsulot */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 bg-gray-100 flex items-center justify-center flex-shrink-0 text-sm'>
                            {product.images.length > 0 ? (
                              <img src={product.images[0]} alt={product.name} className='w-full h-full object-cover' />
                            ) : '👕'}
                          </div>
                          <span className='text-[12px] font-medium text-black truncate max-w-[150px]'>
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* Kategoriya */}
                      <td className='px-4 py-3 text-[10px] text-gray-500 uppercase tracking-[.5px]'>
                        {product.category}
                      </td>

                      {/* Narx */}
                      <td className='px-4 py-3 text-[12px] font-medium text-black'>
                        {product.price.toLocaleString()} so'm
                      </td>

                      {/* Badge */}
                      <td className='px-4 py-3'>
                        {product.badge ? (
                          <span className='text-[8px] font-bold px-2 py-1 bg-black text-white uppercase tracking-[.5px]'>
                            {product.badge}
                          </span>
                        ) : (
                          <span className='text-gray-300'>—</span>
                        )}
                      </td>

                      {/* Ombor */}
                      <td className={`px-4 py-3 text-[12px] font-medium ${stockColor(product.countInStock)}`}>
                        {product.countInStock} ta
                      </td>

                      {/* Amallar */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => handleEdit(product)}
                            className='w-7 h-7 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors'
                          >
                            <TbEdit size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className='w-7 h-7 flex items-center justify-center border border-red-100 text-red-400 hover:text-red-600 hover:border-red-300 transition-colors'
                          >
                            <TbTrash size={13} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          product={editProduct}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}

    </AdminLayout>
  )
}

export default AdminProducts