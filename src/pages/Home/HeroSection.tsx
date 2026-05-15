import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 min-h-[400px] sm:min-h-[500px]'>

      {/* Chap qism — qora fon */}
      <div className='bg-[#111] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 sm:py-20'>

        {/* Tag */}
        <div className='inline-block border border-[#444] text-[#999] text-[10px] px-3 py-1.5 mb-5 tracking-[2px] uppercase w-fit'>
          Yangi kolleksiya 2025
        </div>

        {/* Sarlavha */}
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight tracking-tight mb-4'>
          Zamonaviy<br />
          <span className='italic font-normal text-[#ccc]'>uslub siz uchun</span>
        </h1>

        {/* Tavsif */}
        <p className='text-sm text-[#777] leading-relaxed mb-8 max-w-xs'>
          Premium kiyimlar, eng qulay narxlarda. O'zingizni yangilang va yangi mavsum ruhi bilan to'lining.
        </p>

        {/* Tugmalar */}
        <div className='flex gap-3 flex-wrap'>
          <Link
            to='/products'
            className='bg-white text-black text-[11px] font-medium px-6 py-3 tracking-[1.5px] uppercase hover:bg-gray-100 transition-colors'
          >
            Xarid qilish
          </Link>
          <Link
            to='/products'
            className='bg-transparent text-[#777] text-[11px] border border-[#333] px-6 py-3 tracking-[1.5px] uppercase hover:border-[#666] hover:text-[#aaa] transition-colors'
          >
            Ko'proq bilish
          </Link>
        </div>

      </div>

      {/* O'ng qism — qoramtir fon */}
      <div className='bg-[#1a1a1a] flex items-center justify-center relative min-h-[300px] md:min-h-auto'>

        {/* Placeholder rasm */}
        <div className='text-[120px] sm:text-[160px] text-[#333] select-none'>
          👗
        </div>

        {/* Yangi badge */}
        <div className='absolute top-4 right-4 bg-white text-black text-[9px] font-bold px-3 py-1.5 tracking-[2px] uppercase'>
          Yangi
        </div>

        {/* Narx */}
        <div className='absolute bottom-4 left-4 border border-[#444] text-[#aaa] text-[10px] px-3 py-1.5 tracking-[1px]'>
          89 000 so'mdan
        </div>

      </div>
    </div>
  )
}

export default HeroSection