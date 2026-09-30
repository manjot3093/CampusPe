import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Partners from '@/components/Partners';
import Discovery from '@/components/Discovery';
import ResumeUpload from '@/components/ResumeUpload';
import { CollegesSection, EmployersSection } from '@/components/AudienceSection';
import AppShowcase from '@/components/AppShowcase';
import DownloadSection from '@/components/DownloadSection';
import SupportCta from '@/components/SupportCta';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative isolate overflow-hidden">
          <div
            aria-hidden
            // Opacities cut to roughly a quarter of the original
            // (.55→.14, .6→.15, .28→.07) so this reads as a faint tint behind
            // Hero/Stats/Partners rather than a visible blue/violet/pink wash —
            // same treatment as the .bg-aurora* utilities in globals.css.
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(186,230,253,.14),transparent_38%),radial-gradient(circle_at_88%_12%,rgba(233,213,255,.15),transparent_36%),radial-gradient(circle_at_50%_55%,rgba(251,207,232,.07),transparent_42%),linear-gradient(180deg,#fcfdff_0%,#ffffff_75%,#ffffff_100%)]"
          />
          <Hero />
          <Stats />
          <Partners />
        </div>
        <Discovery />
        <ResumeUpload />
        <CollegesSection />
        <EmployersSection />
        <AppShowcase />
        <DownloadSection />
        <SupportCta />
      </main>
      <Footer />
      <Modal />
    </>
  );
}