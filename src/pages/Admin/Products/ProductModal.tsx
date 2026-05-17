import { useState, useEffect } from 'react'
import type { Product } from '../../../types'
import { uploadImageApi } from '../../../services/uploadService'
import toast from 'react-hot-toast'
import { TbX, TbPlus } from 'react-icons/tb'

interface Props {
  product: Product | null
  onClose: () => void
  onSave: (data: Partial<Product>) => void
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = ['Qora', 'Oq', 'Ko\'k', 'Yashil', 'Qizil', 'Sariq', 'Kulrang']
const categories = ['erkaklar', 'ayollar', 'bolalar', 'aksesuar']
const badges = ['', 'Yangi', 'Sale', 'Top']

const ProductModal = ({ product, onClose, onSave }: Props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [category, setCategory] = useState('erkaklar')
  const [countInStock, setCountInStock] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [badge, setBadge] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [imageLoading, setImageLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setDescription(product.description)
      setPrice(String(product.price))
      setOldPrice(String(product.oldPrice || ''))
      setCategory(product.category)
      setCountInStock(String(product.countInStock))
      setSelectedSizes(product.sizes)
      setSelectedColors(product.colors)
      setBadge(product.badge || '')
      setIsFeatured(product.isFeatured)
      setImages(product.images || [])
    }
  }, [product])

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageLoading(true)
    try {
      const url = await uploadImageApi(file)
      setImages(prev => [...prev, `http://localhost:5000${url}`])
      toast.success('Rasm yuklandi!')
    } catch (error) {
      toast.error('Rasm yuklanmadi!')
    }
    setImageLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    await onSave({
      name,
      description,
      price: Number(price),
      oldPrice: Number(oldPrice) || 0,
      category: category as Product['category'],
      countInStock: Number(countInStock),
      sizes: selectedSizes,
      colors: selectedColors,
      badge: (badge || null) as Product['badge'],
      isFeatured,
      images,
    })
    setLoading(false)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
      <div className='bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto'>

        {/* Header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10'>
          <h2 className='text-[11px] font-medium tracking-[2px] uppercase text-black'>
            {product ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}
          </h2>
          <button
            onClick={onClose}
            className='w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black transition-colors'
          >
            <TbX size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-5'>
          <div className='flex flex-col gap-4'>

            {/* Nom */}
            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                Mahsulot nomi *
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Klassik ko'ylak"
                required
                className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
              />
            </div>

            {/* Tavsif */}
            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                Tavsif
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Mahsulot tavsifi...'
                rows={3}
                className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors resize-none'
              />
            </div>

            {/* Narx va eski narx */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                  Narx (so'm) *
                </label>
                <input
                  type='number'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder='89000'
                  required
                  className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                />
              </div>
              <div>
                <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                  Eski narx
                </label>
                <input
                  type='number'
                  value={oldPrice}
                  onChange={e => setOldPrice(e.target.value)}
                  placeholder='120000'
                  className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                />
              </div>
            </div>

            {/* Kategoriya va ombor */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                  Kategoriya *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                  Ombor miqdori *
                </label>
                <input
                  type='number'
                  value={countInStock}
                  onChange={e => setCountInStock(e.target.value)}
                  placeholder='50'
                  required
                  className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                />
              </div>
            </div>

            {/* Badge va Featured */}
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                  Badge
                </label>
                <select
                  value={badge}
                  onChange={e => setBadge(e.target.value)}
                  className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
                >
                  {badges.map(b => (
                    <option key={b} value={b}>{b || "Yo'q"}</option>
                  ))}
                </select>
              </div>
              <div className='flex items-end pb-2.5'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={isFeatured}
                    onChange={e => setIsFeatured(e.target.checked)}
                    className='w-4 h-4 accent-black'
                  />
                  <span className='text-[11px] text-gray-600'>Bosh sahifada</span>
                </label>
              </div>
            </div>

            {/* O'lchamlar */}
            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-2'>
                O'lchamlar
              </label>
              <div className='flex gap-2 flex-wrap'>
                {sizes.map(size => (
                  <button
                    key={size}
                    type='button'
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 text-[11px] border transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Ranglar */}
            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-2'>
                Ranglar
              </label>
              <div className='flex gap-2 flex-wrap'>
                {colors.map(color => (
                  <button
                    key={color}
                    type='button'
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1.5 text-[10px] border transition-colors ${
                      selectedColors.includes(color)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Rasmlar */}
            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-2'>
                Rasmlar
              </label>
              <div className='flex gap-2 flex-wrap'>

                {/* Mavjud rasmlar */}
                {images.map((img, i) => (
                  <div key={i} className='relative w-16 h-16'>
                    <img
                      src={img}
                      alt='product'
                      className='w-full h-full object-cover border border-gray-100'
                    />
                    <button
                      type='button'
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className='absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold'
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* Yuklash tugmasi */}
                <label className={`w-16 h-16 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors ${imageLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <TbPlus size={16} className='text-gray-400' />
                  <span className='text-[9px] text-gray-400 mt-1'>
                    {imageLoading ? '...' : "Qo'sh"}
                  </span>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    disabled={imageLoading}
                    className='hidden'
                  />
                </label>

              </div>
            </div>

          </div>

          {/* Tugmalar */}
          <div className='flex gap-3 mt-6 pt-4 border-t border-gray-100'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-2.5 border border-gray-200 text-[10px] text-gray-500 uppercase tracking-[1px] hover:border-black hover:text-black transition-colors'
            >
              Bekor
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 py-2.5 bg-black text-white text-[10px] uppercase tracking-[1px] hover:bg-gray-900 transition-colors disabled:opacity-50'
            >
              {loading ? 'Saqlanmoqda...' : product ? 'Yangilash' : "Qo'shish"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductModal;