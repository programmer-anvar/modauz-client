import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast';
import { registerApi } from '../../services/authService';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(password !== confirmPassword){
        toast.error("parollar mos kelmadi!")
        return
    }

    if(password.length < 6){
        toast.error("Parol kamida 6 ta belgi bo'lishi kerak!")
        return
    }
    setLoading(true);

    try {
        const data = await registerApi(name, email, password);
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
        toast.success("muvafaqyatli ro'yxatdan o'tdingiz!")
        navigate('/')
    } catch (error) {
        toast.error(error.response?.data?.message || 'Xato yuz berdi!')
    }
    setLoading(false);
  }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-sm sm:max-w-md'>
            <div className='text-center mb-8 sm:mb-10'>
                <h1 className='text-xl sm:text-2xl font-medium tracking-widest text-black uppercase'>
                    ModaUZ
                </h1>
                <p className='text-xs sm:text-sm text-gray-400 mt-2 tracking-wide'>
                    Yangi hisob yarating
                </p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:gap-4'>
                <div>
                  <label className='text-xs text-gray-500 uppercase tracking-widest block mb-1.5 sm:mb-2'>
                    Ism
                  </label>
                  <input
                   type="text"
                   value={name}
                   onChange={e => setName(e.target.value)}
                   placeholder='Ismingiz'
                   required 
                   className='w-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors'/>
                </div>

                <div>
                      <label className='text-xs text-gray-500 uppercase tracking-widest block mb-1.5 sm:mb-2'>
              Email
            </label>
            <input type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='email@gmail.com'
            required 
            className='w-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors'/>
                </div>

                 <div>
            <label className='text-xs text-gray-500 uppercase tracking-widest block mb-1.5 sm:mb-2'>
              Parol
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='••••••'
                required
                className='w-full border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-black transition-colors pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors'
              >
                {showPassword
                  ? <AiOutlineEyeInvisible size={18} />
                  : <AiOutlineEye size={18} />
                }
              </button>
            </div>
          </div>

          <div>
             <label className='text-xs text-gray-500 uppercase tracking-widest block mb-1.5 sm:mb-2'>
              Parolni tasdiqlang
            </label>

            <div className='relative'>
                <input type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='*****' 
                required
                className={`w-full border px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition-colors pr-10 ${
                  confirmPassword && password !== confirmPassword
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-gray-200 focus:border-black'
                }`}/>

                <button
                type='button'
                onClick={() => setShowConfirm(!showConfirm)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors'
              >
                {showConfirm
                  ? <AiOutlineEyeInvisible size={18} />
                  : <AiOutlineEye size={18} />
                }
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
                <p className='text-xs text-red-400 mt-1'>Parol mos kelmadi!</p>
            )}
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-widest uppercase mt-2 hover:bg-gray-900 active:scale-95 transition-all disabled:opacity-50'
          >
            {loading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
          </button>
            </form>
            <p className='text-center text-xs sm:text-sm text-gray-400 mt-5 sm:mt-6'>
                Hisobingiz bormi?{' '}
                <Link to={'/'}
                 className='text-black border-b border-black hover:text-gray-600 transition-colors'>
                    Kiring
                 </Link>
            </p>
        </div>
    </div>
  )
  return (
    <div>
      
    </div>
  )
}

export default Register
