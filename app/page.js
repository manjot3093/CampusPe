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
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(186,230,253,.55),transparent_38%),radial-gradient(circle_at_88%_12%,rgba(233,213,255,.6),transparent_36%),radial-gradient(circle_at_50%_55%,rgba(251,207,232,.28),transparent_42%),linear-gradient(180deg,#fbfdff_0%,#ffffff_75%,#ffffff_100%)]"
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