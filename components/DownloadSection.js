import Reveal from './ui/Reveal';

export default function DownloadSection() {
  return (
    <section id="download">
      {/* now uses .container-x (max-w-1440 + fluid clamp padding) instead of its own
          hand-rolled max-w-[1440px]/px-6/sm:px-10/lg:px-[100px] combo, so this section's
          left/right edges line up exactly with Hero, Discovery, Footer, etc. at every width */}
      <div className="container-x relative grid items-center gap-8 overflow-hidden rounded-b-[40px] bg-gradient-to-br from-[#eaf4ff] via-white to-[#f7effe] py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-[16px]">
        <Reveal><div>
          <h2 className="font-display text-[30px] font-bold text-brand sm:text-[34px]">Download App Now</h2>
          <p className="mt-6 max-w-[560px] text-[15px] leading-[22px] text-slate-600">Elevate your academic journey with Campuspe, the all-in-one digital ecosystem designed to bridge the gap between education and industry. Whether you’re a student seeking your next big internship, a college looking to empower your cohort, or a company scouting for top-tier talent, Campuspe streamlines the connection.Your career doesn't start at graduation—it starts here.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" className="rounded-lg transition duration-200 hover:-translate-y-1 hover:drop-shadow-lg active:scale-95"><img src="/images/google-play.png" alt="Get it on Google Play" className="h-[44px] w-[148px] object-contain" /></a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" className="rounded-lg transition duration-200 hover:-translate-y-1 hover:drop-shadow-lg active:scale-95"><img src="/images/app-store.png" alt="Download on the App Store" className="h-[42px] w-[145px] object-contain" /></a>
          </div>
        </div></Reveal>
        <Reveal delay={150}><img src="/images/download-phones.png" alt="CampusPe app on two smartphones" className="mx-auto w-full max-w-[720px] transition-transform duration-500 hover:scale-[1.03] lg:-mr-16 lg:-mt-4" />
        </Reveal>
      </div>
    </section>
  );
}