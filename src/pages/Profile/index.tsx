import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')

  const handleLogout = () => {
    logout()
    toast.success('Chiqildi!')
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>

          {/* Sarlavha */}
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-[11px] font-medium tracking-[3px] uppercase text-black'>
              Profil
            </h1>
            <button
              onClick={handleLogout}
              className='text-[10px] text-gray-400 uppercase tracking-[1px] hover:text-black transition-colors border-b border-gray-200 hover:border-black'
            >
              Chiqish
            </button>
          </div>

          {/* User info */}
          <div className='flex items-center gap-4 mb-8 p-5 bg-gray-50 border border-gray-100'>
            <div className='w-12 h-12 bg-black text-white flex items-center justify-center text-lg font-medium flex-shrink-0'>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className='text-sm font-medium text-black'>{user?.name}</p>
              <p className='text-[11px] text-gray-400'>{user?.email}</p>
              {user?.role === 'admin' && (
                <span className='text-[9px] bg-black text-white px-2 py-0.5 uppercase tracking-[.5px] mt-1 inline-block'>
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* Form */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black pb-2 border-b border-gray-100'>
              Ma'lumotlarni tahrirlash
            </h2>

            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                Ism
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
              />
            </div>

            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                Email
              </label>
              <input
                value={user?.email || ''}
                disabled
                className='w-full border border-gray-100 px-3 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed'
              />
              <p className='text-[9px] text-gray-400 mt-1'>Email o'zgartirilmaydi</p>
            </div>

            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                Telefon
              </label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder='+998901234567'
                className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
              />
            </div>

            <div>
              <label className='text-[9px] text-gray-400 uppercase tracking-[1.5px] block mb-1.5'>
                Manzil
              </label>
              <input
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Shahar, ko\'cha, uy"
                className='w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'
              />
            </div>

            <button
              onClick={() => toast.success('Saqlandi!')}
              className='w-full bg-black text-white py-3 text-[11px] font-medium tracking-[1.5px] uppercase hover:bg-gray-900 transition-colors mt-2'
            >
              Saqlash
            </button>
          </div>

          {/* Quick links */}
          <div className='mt-8 pt-6 border-t border-gray-100'>
            <h2 className='text-[10px] font-medium tracking-[2px] uppercase text-black mb-4'>
              Tezkor havolalar
            </h2>
            <div className='flex flex-col gap-2'>
              
                <Link to='/orders'
                className='flex items-center justify-between py-3 border-b border-gray-100 hover:text-black transition-colors group'
              >
                <span className='text-[12px] text-gray-600 group-hover:text-black'>
                  Mening buyurtmalarim
                </span>
                <span className='text-gray-400'>→</span>
              </Link>
              {user?.role === 'admin' && (
                
                  <Link to='/admin'
                  className='flex items-center justify-between py-3 border-b border-gray-100 hover:text-black transition-colors group'
                >
                  <span className='text-[12px] text-gray-600 group-hover:text-black'>
                    Admin panel
                  </span>
                  <span className='text-gray-400'>→</span>
                </Link>
              )}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Profile