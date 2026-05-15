import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import {
  TbLayoutDashboard,
  TbShoppingBag,
  TbHanger,
  TbUsers,
  TbSettings,
  TbLogout
} from 'react-icons/tb'

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: <TbLayoutDashboard size={16} /> },
  { label: 'Buyurtmalar', path: '/admin/orders', icon: <TbShoppingBag size={16} /> },
  { label: 'Mahsulotlar', path: '/admin/products', icon: <TbHanger size={16} /> },
  { label: 'Foydalanuvchilar', path: '/admin/users', icon: <TbUsers size={16} /> },
  { label: 'Sozlamalar', path: '/admin/settings', icon: <TbSettings size={16} /> },
]

interface Props {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('Chiqildi!')
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-white'>

      {/* Top Navbar */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-14'>
        <div className='flex items-center justify-between h-full px-6'>

          {/* Logo */}
          <Link
            to='/'
            className='text-sm font-medium tracking-[3px] uppercase text-black'
          >
            ModaUZ
          </Link>

          {/* Nav links */}
          <div className='hidden md:flex items-center gap-1'>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[.5px] transition-colors ${
                  location.pathname === item.path
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* User + logout */}
          <div className='flex items-center gap-4'>
            <span className='text-[11px] text-gray-400 hidden sm:block'>
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className='flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-black uppercase tracking-[.5px] transition-colors'
            >
              <TbLogout size={16} />
              Chiqish
            </button>
          </div>

        </div>
      </nav>

      {/* Content */}
      <div className='pt-14'>
        {children}
      </div>

    </div>
  )
}

export default AdminLayout