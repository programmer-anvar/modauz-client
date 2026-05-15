import { Link } from 'react-router-dom'
import { TbShirt, TbJacket, TbShoe } from 'react-icons/tb'
import { PiGraphicsCardFill, PiPants } from 'react-icons/pi'

const categories = [
  { name: "Ko'ylaklar", count: 124, icon: <TbShirt size={24} />, slug: 'erkaklar' },
  { name: 'Shimlar', count: 86, icon: <PiPants size={24} />, slug: 'ayollar' },
  { name: 'Kurtkalar', count: 52, icon: <TbJacket size={24} />, slug: 'bolalar' },
  { name: 'Poyabzal', count: 93, icon: <TbShoe size={24} />, slug: 'aksesuar' },
  { name: 'Aksesuar', count: 67, icon: <PiGraphicsCardFill size={24} />, slug: 'aksesuar' },
]

const CategoriesSection = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14'>

      {/* Sarlavha */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-[11px] font-medium text-black tracking-[2px] uppercase'>
          Kategoriyalar
        </h2>
      </div>

      {/* Kategoriyalar */}
      <div className='grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3'>
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={`/products?category=${cat.slug}`}
            className='flex flex-col items-center gap-2 py-4 px-3 bg-gray-50 border border-gray-100 hover:border-black hover:bg-white transition-all group'
          >
            <span className='text-black group-hover:scale-110 transition-transform'>
              {cat.icon}
            </span>
            <span className='text-[11px] text-gray-600 tracking-wide text-center'>
              {cat.name}
            </span>
            <span className='text-[9px] text-gray-400'>
              {cat.count} ta
            </span>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default CategoriesSection