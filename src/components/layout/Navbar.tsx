import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'
import toast from 'react-hot-toast'
import { AiOutlineShopping, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import { useState } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const { isAuth, user, logout } = useAuthStore()
  const { totalItems } = useCartStore()
  const [menuOpen, setMenuOpen] = useState(false)
  // menuOpen = mobil menyu ochiqmi?

  const handleLogout = () => {
    logout()
    toast.success('Chiqildi!')
    navigate('/login')
  }

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14 sm:h-16'>

          {/* Logo */}
          <Link
            to='/'
            className='text-base sm:text-lg font-medium tracking-widest uppercase text-black'
          >
            ModaUZ
          </Link>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-8'>
            <Link to='/' className='text-xs text-gray-500 hover:text-black uppercase tracking-widest transition-colors'>
              Bosh sahifa
            </Link>
            <Link to='/products' className='text-xs text-gray-500 hover:text-black uppercase tracking-widest transition-colors'>
              Mahsulotlar
            </Link>
            {user?.role === 'admin' && (
              <Link to='/admin' className='text-xs text-gray-500 hover:text-black uppercase tracking-widest transition-colors'>
                Admin
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className='flex items-center gap-4 sm:gap-5'>

            {/* Wishlist */}
            <button className='text-gray-500 hover:text-black transition-colors hidden sm:block'>
              <AiOutlineHeart size={20} />
            </button>

            {/* Cart */}
            <Link to='/cart' className='relative text-gray-500 hover:text-black transition-colors'>
              <AiOutlineShopping size={20} />
              {totalItems() > 0 && (
                <span className='absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-xs flex items-center justify-center rounded-full'>
                  {totalItems()}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuth ? (
              <div className='relative group hidden sm:block'>
                <button className='text-gray-500 hover:text-black transition-colors'>
                  <AiOutlineUser size={20} />
                </button>
                {/* Dropdown */}
                <div className='absolute right-0 top-8 w-40 bg-white border border-gray-100 shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
                  <Link
                    to='/profile'
                    className='block px-4 py-2.5 text-xs text-gray-600 hover:text-black uppercase tracking-wider border-b border-gray-50'
                  >
                    Profil
                  </Link>
                  <Link
                    to='/orders'
                    className='block px-4 py-2.5 text-xs text-gray-600 hover:text-black uppercase tracking-wider border-b border-gray-50'
                  >
                    Buyurtmalar
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2.5 text-xs text-gray-600 hover:text-black uppercase tracking-wider'
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='hidden sm:block text-xs text-gray-500 hover:text-black uppercase tracking-widest transition-colors'
              >
                Kirish
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className='md:hidden text-gray-500 hover:text-black transition-colors'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX size={20} /> : <HiOutlineMenuAlt3 size={20} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4'>
          <Link
            to='/'
            onClick={() => setMenuOpen(false)}
            className='text-xs text-gray-600 hover:text-black uppercase tracking-widest'
          >
            Bosh sahifa
          </Link>
          <Link
            to='/products'
            onClick={() => setMenuOpen(false)}
            className='text-xs text-gray-600 hover:text-black uppercase tracking-widest'
          >
            Mahsulotlar
          </Link>
          {user?.role === 'admin' && (
            <Link
              to='/admin'
              onClick={() => setMenuOpen(false)}
              className='text-xs text-gray-600 hover:text-black uppercase tracking-widest'
            >
              Admin
            </Link>
          )}
          {isAuth ? (
            <>
              <Link
                to='/profile'
                onClick={() => setMenuOpen(false)}
                className='text-xs text-gray-600 hover:text-black uppercase tracking-widest'
              >
                Profil
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className='text-left text-xs text-gray-600 hover:text-black uppercase tracking-widest'
              >
                Chiqish
              </button>
            </>
          ) : (
            <Link
              to='/login'
              onClick={() => setMenuOpen(false)}
              className='text-xs text-gray-600 hover:text-black uppercase tracking-widest'
            >
              Kirish
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar