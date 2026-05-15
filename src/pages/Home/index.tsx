import Navbar from '../../components/layout/Navbar'
import HeroSection from './HeroSection'
import StripSection from './StripSection'
import CategoriesSection from './CategoriesSection'
import ProductsSection from './ProductsSection'
import Footer from '../../components/layout/Footer'

const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='pt-14 sm:pt-16'>
        <HeroSection />
        <StripSection />
        <CategoriesSection />
        <ProductsSection />
        <Footer/>
      </div>
    </div>
  )
}

export default Home