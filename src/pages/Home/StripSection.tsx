import { TbTruckDelivery, TbRefresh, TbShieldCheck, TbHeadset } from 'react-icons/tb'

const strips = [
  { icon: <TbTruckDelivery size={16} />, text: 'Bepul yetkazib berish' },
  { icon: <TbRefresh size={16} />, text: '30 kun qaytarish' },
  { icon: <TbShieldCheck size={16} />, text: 'Sifat kafolati' },
  { icon: <TbHeadset size={16} />, text: '24/7 yordam' },
]

const StripSection = () => {
  return (
    <div className='border-y border-gray-100 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4'>
          {strips.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-center gap-2 py-3 px-4 border-r border-gray-100 last:border-r-0 text-[11px] text-gray-500 tracking-wide'
            >
              <span className='text-black'>{item.icon}</span>
              <span className='hidden sm:block'>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StripSection