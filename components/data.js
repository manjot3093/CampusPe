export const NAV_LINKS = [
  { label: 'Colleges', href: '#colleges' },
  { label: 'Employers', href: '#employers' },
  { label: 'Jobs', href: '#discovery' },
  { label: 'Blogs', href: '#footer' },
];

export const STATS = [
  { value: '800+', label: 'Students', tone: 'bg-violet-100 text-violet-600', icon: 'users' },
  { value: '130+', label: 'colleges', tone: 'bg-blue-100 text-brand', icon: 'building' },
  { value: '100+', label: 'jobs & internships', tone: 'bg-emerald-100 text-emerald-600', icon: 'briefcase' },
  { value: '100%', label: 'Safe & Trusted', tone: 'bg-orange-100 text-orange-500', icon: 'shield' },
];

export const PARTNERS = [
  { name: 'Ginserv', src: '/images/ginserv.png', w: 240 },
  { name: 'Startup Karnataka', src: '/images/startup-karnataka.png', w: 350 },
  { name: 'VTU', src: '/images/vtu.png', w: 120 },
  { name: 'TalentSpotify', src: '/images/talentspotify.png', w: 120 },
  { name: 'Radiant Info', src: '/images/radiant.png', w: 100 },
  { name: 'DPIIT Startup India', src: '/images/dpiit.png', w: 260 },
];

export const FEED = [
  { id: 1, cat: 'Colleges', title: 'IIM Bangalore', tag: 'Top College', tagTone: 'purple', meta: ['MBA', 'Bengaluru', '₹ 3L+'], desc: "India's premier management institute with global exposer...", cta: 'View Details', logo: 'iim' },
  { id: 2, cat: 'Internships', title: 'Product Intern', tag: 'Internship', tagTone: 'blueSoft', meta: ['Bengaluru', 'Hybrid', '₹ 35K/mo'], desc: 'Work on real products, learn from top engineers and build...', cta: 'Apply Now', logo: 'google' },
  { id: 3, cat: 'Freelance', title: 'Marketing Gig', tag: 'Freelance', tagTone: 'green', meta: ['Remote', 'Freelance', '₹ 10K - ₹ 25K'], desc: 'Create content and help with social media campaigns for...', cta: 'View Details', logo: 'notion' },
  { id: 4, cat: 'Jobs', title: 'Frontend Developer', tag: 'Full-time', tagTone: 'blueSoft', meta: ['Bengaluru', 'On-site', '₹ 8L - ₹ 12L'], desc: 'Build fast, accessible interfaces for millions of students...', cta: 'Apply Now', logo: 'google' },
  { id: 5, cat: 'Part-time', title: 'Campus Ambassador', tag: 'Part-time', tagTone: 'green', meta: ['Remote', 'Part-time', '₹ 8K/mo'], desc: 'Represent CampusPe at your college and grow the community...', cta: 'View Details', logo: 'notion' },
];
export const FEED_TABS = ['All', 'Colleges', 'Jobs', 'Internships', 'Freelance', 'Part-time'];

export const PREF_STEPS = [
  { n: '01', title: 'Set your preferences', tag: 'Smart Profile', tone: 'bg-indigo-50 text-indigo-600', desc: "Tell us what you're looking for, from colleges and courses to jobs, internships and gigs." },
  { n: '02', title: 'Discover relevant opportunities', tag: 'AI Ranked', tone: 'bg-slate-100 text-slate-500', desc: 'Explore colleges and career opportunities matched to your profile, interests and goals' },
  { n: '03', title: 'Get notified when something fits', tag: 'Instant Alerts', tone: 'bg-emerald-50 text-emerald-600', desc: 'Get notified when a relevant college or new opportunity is found, so you can act early.' },
];

export const PIPELINE = [
  { title: 'Resume analyzed', sub: 'Ready in 4s', subTone: 'text-emerald-600', icon: 'green' },
  { title: 'Skills matched', sub: 'Deep taxonomy', subTone: 'text-indigo-600', icon: 'indigo' },
  { title: 'Experience matched', sub: 'Contextual seniority', subTone: 'text-violet-600', icon: 'violet' },
  { title: '1,000+ sources searched', sub: 'Real-time aggregators', subTone: 'text-brand', icon: 'blue' },
];

export const COLLEGE_STEPS = [
  { n: '01', kicker: 'VERIFIED PROFILE', title: 'Build your college profile', desc: 'Showcase your college, courses, fees, campus, placements and achievements in one structured profile that students and recruiters can discover.', tags: [{ t: 'greenOutline', label: 'NAAC A++ Ready', icon: 'check' }, { t: 'outline', label: '98% Match' }] },
  { n: '02', kicker: 'DIRECT ENROLL', title: 'Students discover and connect', desc: 'Students searching for colleges can discover your profile, explore your courses and fees, and connect directly with your admission team.', tags: [{ t: 'blueSoft', label: 'Direct Enquiries', icon: 'chat' }, { t: 'gray', label: 'WHATSAPP / CHAT', dot: true }], foot: 'Avg. response: <15 min' },
  { n: '03', kicker: 'CAMPUS RECRUITING', title: 'Recruiters discover your College', desc: 'Companies hiring fresh talent can discover your college, explore your talent and connect with your placement team.', tags: [{ t: 'purple', label: '500+ Hiring Partners', icon: 'building' }, { t: 'blueSoft', label: 'Connect Directly', icon: 'scale' }] },
  { n: '04', kicker: 'LIVE HUD', title: 'Track placements in real time', desc: 'Track students, interviews, offers and placements from one centralized dashboard.', tags: [{ t: 'red', label: 'LIVE PLACEMENTS', dot: 'red' }, { t: 'blue', label: 'Students · Interviews · Offers' }] },
];

export const EMPLOYER_STEPS = [
  { n: '01', title: 'Post a role in minutes', desc: 'Define your skills, location and hiring requirements. Reach relevant candidates across the CampusPe network.', tags: [{ t: 'green', label: '5 Min Deployment', icon: 'bolt' }, { t: 'gray', label: '500+ Campus Network' }] },
  { n: '02', title: 'Receive a matched shortlist', desc: 'Get candidates matched to your role by skills, experience, location and hiring requirements.', tags: [{ t: 'purple', label: 'Zero CV Clutter', icon: 'circle' }, { t: 'gray', label: 'Tier 1–Tier 3 Parity' }] },
  { n: '03', title: 'Connect with candidates directly', desc: 'Message, schedule interviews, and move candidates through your pipeline — all in one place.', tags: [{ t: 'blueSoft', label: 'In-App Scheduling', icon: 'chat' }, { t: 'gray', label: '1-Click Video / Chat' }] },
  { n: '04', title: 'Reduce your time-to-hire', desc: 'Find matched candidates, connect with them and move from shortlist to offer in one streamlined workflow.', tags: [{ t: 'blue', label: '<2 DAYS' }, { t: 'green', label: '57% Faster Hiring' }] },
];

export const PHONES = ['/images/phone-1.png', '/images/phone-2.png', '/images/phone-3.png', '/images/phone-4.png', '/images/phone-5.png'];

export const FOOTER_COLS = [
  { title: 'For Students', links: ['Explore Colleges', 'Find Opportunities', 'Internships', 'Full-time Jobs', 'Part-time & Gig', 'Application Tracker'] },
  { title: 'For Colleges', links: ['List Your College', 'Admissions', 'Fee Collection', 'Placements'] },
  { title: 'For Employers', links: ['Post a Job', 'Find Talent', 'Campus Hiring'] },
  { title: 'Company', links: ['About Us', 'Contact Us', 'Blogs', 'Careers'] },
];
export const LEGAL = ['Privacy Policy', 'Terms & Conditions', 'Refund & Cancellation Policy', 'Cookie Policy', 'Grievance Redressal', 'Job & Internship Disclaimer'];
