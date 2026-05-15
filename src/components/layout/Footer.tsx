import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-[#111] text-white mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12'>

          {/* Logo va tavsif */}
          <div className='col-span-2 md:col-span-1'>
            <h3 className='text-base font-medium tracking-[3px] uppercase mb-4'>
              ModaUZ
            </h3>
            <p className='text-[11px] text-[#777] leading-relaxed'>
              Premium kiyimlar do'koni. Zamonaviy uslub, qulay narxlar.
            </p>
          </div>

          {/* Havolalar */}
          <div>
            <h4 className='text-[10px] font-medium tracking-[2px] uppercase mb-4 text-[#aaa]'>
              Do'kon
            </h4>
            <ul className='flex flex-col gap-2.5'>
              {['Erkaklar', 'Ayollar', 'Bolalar', 'Aksesuar', 'Sale'].map(item => (
                <li key={item}>
                  <Link
                    to='/products'
                    className='text-[11px] text-[#666] hover:text-white transition-colors tracking-wide'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yordam */}
          <div>
            <h4 className='text-[10px] font-medium tracking-[2px] uppercase mb-4 text-[#aaa]'>
              Yordam
            </h4>
            <ul className='flex flex-col gap-2.5'>
              {['Yetkazib berish', 'Qaytarish', 'O\'lcham jadvali', 'Bog\'lanish'].map(item => (
                <li key={item}>
                  <span className='text-[11px] text-[#666] hover:text-white transition-colors tracking-wide cursor-pointer'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aloqa */}
          <div>
            <h4 className='text-[10px] font-medium tracking-[2px] uppercase mb-4 text-[#aaa]'>
              Aloqa
            </h4>
            <ul className='flex flex-col gap-2.5'>
              <li className='text-[11px] text-[#666] tracking-wide'>
                +998 90 123 45 67
              </li>
              <li className='text-[11px] text-[#666] tracking-wide'>
                info@modauz.uz
              </li>
              <li className='text-[11px] text-[#666] tracking-wide'>
                Toshkent, O'zbekiston
              </li>
            </ul>
          </div>

        </div>

        {/* Pastki qism */}
        <div className='border-t border-[#222] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-[10px] text-[#555] tracking-wide'>
            © 2025 ModaUZ. Barcha huquqlar himoyalangan.
          </p>
          <div className='flex gap-6'>
            {['Instagram', 'Telegram', 'Facebook'].map(item => (
              <span
                key={item}
                className='text-[10px] text-[#555] hover:text-white transition-colors tracking-wide cursor-pointer'
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer