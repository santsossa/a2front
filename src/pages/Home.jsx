import Navbar       from '../components/Navbar/Navbar'
import Hero         from '../components/Hero/Hero'
import Categories   from '../components/Categories/Categories'
import Partners     from '../components/Partners/Partners'
import HowItWorks  from '../components/HowItWorks/HowItWorks'
import Plans        from '../components/Plans/Plans'
import Testimonials from '../components/Testimonials/Testimonials'
import FAQ          from '../components/FAQ/FAQ'
import Footer       from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Partners />
        <HowItWorks />
        <Plans />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
