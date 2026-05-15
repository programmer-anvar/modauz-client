import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  // showPassword = parol ko'rinadimi yoki yo'q

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await loginApi(email, password)
      setAuth(
        {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          createdAt: ''
        },
        data.token
      )
      toast.success('Muvaffaqiyatli kirdingiz!')
      navigate('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Xato yuz berdi!')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm sm:max-w-md'>

        {/* Logo */}
        <div className='text-center mb-8 sm:mb-10'>
          <h1 className='text-xl sm:text-2xl font-medium tracking-widest text-black uppercase'>
            ModaUZ
          </h1>
          <p className='text-xs sm:text-sm text-gray-400 mt-2 tracking-wide'>
            Hisobingizga kiring
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:gap-4'>
          <div>
            <label className='text-xs text-gray-500 uppercase tracking-widest block mb-1.5 sm:mb-2'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='email@gmail.com'
              required
              className='w-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors'
            />
          </div>

          {/* Parol input */}
          <div>
            <label className='text-xs text-gray-500 uppercase tracking-widest block mb-1.5 sm:mb-2'>
              Parol
            </label>
            <div className='relative'>
              {/* relative = ichidagi absolute element shu div ga nisbatan joylashadi */}
              <input
                type={showPassword ? 'text' : 'password'}
                // showPassword true → text (ko'rinadi)
                // showPassword false → password (yashirin)
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='••••••'
                required
                className='w-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors pr-10'
                // pr-10 = o'ng tomonda joy — ko'z ikonkasi uchun
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                // !showPassword = teskarisi
                // true → false, false → true
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors'
                // absolute right-3 = o'ng tomonga
                // top-1/2 -translate-y-1/2 = vertikal markaz
              >
                {showPassword
                  ? <AiOutlineEyeInvisible size={18} />
                  : <AiOutlineEye size={18} />
                }
                {/* Ko'rinayotgan bo'lsa → yashirish ikonkasi */}
                {/* Yashirin bo'lsa → ko'rsatish ikonkasi */}
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-widest uppercase mt-2 hover:bg-gray-900 active:scale-95 transition-all disabled:opacity-50'
          >
            {loading ? 'Kirish...' : 'Kirish'}
          </button>
        </form>

        {/* Register link */}
        <p className='text-center text-xs sm:text-sm text-gray-400 mt-5 sm:mt-6'>
          Hisobingiz yo'qmi?{' '}
          <Link
            to='/register'
            className='text-black border-b border-black hover:text-gray-600 transition-colors'
          >
            Ro'yxatdan o'ting
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login