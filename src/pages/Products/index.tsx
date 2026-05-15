import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { getProductsApi } from '../../services/productService'
import type { Product } from '../../types'
import ProductCard from './ProductCard'

const categories = [
  { label: 'Barchasi', value: '' },
  { label: 'Erkaklar', value: 'erkaklar' },
  { label: 'Ayollar', value: 'ayollar' },
  { label: 'Bolalar', value: 'bolalar' },
  { label: 'Aksesuar', value: 'aksesuar' },
]

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  // URL dan kategoriyani olamiz: /products?category=erkaklar

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, category, search])
  // products, category yoki search o'zgarganda filterlaydi

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getProductsApi()
      setProducts(data)
    } catch (error) {
      console.log('Xato:', error)
    }
    setLoading(false)
  }

  const filterProducts = () => {
    let result = [...products]

    // Kategoriya filteri
    if (category) {
      result = result.filter(p => p.category === category)
    }

    // Qidiruv filteri
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(result)
  }

  const handleCategory = (value: string) => {
    if (value) {
      setSearchParams({ category: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

          {/* Sarlavha */}
          <div className='mb-8'>
            <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black mb-1'>
              Mahsulotlar
            </h1>
            <p className='text-[11px] text-gray-400'>
              {filtered.length} ta mahsulot
            </p>
          </div>

          {/* Qidiruv va filter */}
          <div className='flex flex-col sm:flex-row gap-4 mb-8'>

            {/* Qidiruv */}
            <input
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Mahsulot qidirish...'
              className='flex-1 border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-black transition-colors'
            />

            {/* Kategoriya filterlari */}
            <div className='flex gap-2 flex-wrap'>
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleCategory(cat.value)}
                  className={`px-4 py-2.5 text-[10px] uppercase tracking-[1px] border transition-colors ${
                    category === cat.value
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

          {/* Loading */}
          {loading && (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100'>
              {[...Array(8)].map((_, i) => (
                <div key={i} className='bg-white'>
                  <div className='aspect-square bg-gray-100 animate-pulse' />
                  <div className='p-3'>
                    <div className='h-3 bg-gray-100 rounded animate-pulse mb-2' />
                    <div className='h-3 bg-gray-100 rounded animate-pulse w-1/2' />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mahsulotlar yo'q */}
          {!loading && filtered.length === 0 && (
            <div className='text-center py-20'>
              <p className='text-4xl mb-4'>🔍</p>
              <p className='text-sm text-gray-400'>Mahsulot topilmadi</p>
            </div>
          )}

          {/* Mahsulotlar grid */}
          {!loading && filtered.length > 0 && (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100'>
              {filtered.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Products