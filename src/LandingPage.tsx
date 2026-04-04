import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, LineChart, Video, ArrowRight, ArrowUpRight, X, Phone, Mail, MapPin } from 'lucide-react';
import _CountUp from 'react-countup';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const CountUp = (_CountUp as any).default || _CountUp;

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{id: string, isShort: boolean} | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    company: '',
    services: [] as string[],
    description: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name.toLowerCase().replace(/ \/ | /g, '')]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLWVHr9gsSTrfqUjEK47_gKpuxkXsjKePIeTd7HYqDVymSBEnkvbho_Rx1ZxSUa6kmtA/exec';

    const params = new URLSearchParams();
    params.append('name', formData.name);
    params.append('email', formData.email);
    params.append('contact', formData.contact);
    params.append('company', formData.company);
    params.append('services', formData.services.join(', '));
    params.append('description', formData.description);
    params.append('budget', formData.budget);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params
      });
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', contact: '', company: '',
        services: [], description: '', budget: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const getVideoInfo = (url: string) => {
    if (url === "#") return null;
    const isShort = url.includes('shorts/');
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? { id: match[1], isShort } : null;
  };

  useEffect(() => {
    const handleScroll = () => {

      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#080808] font-sans">
      
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-60 mix-blend-screen" />

      <nav className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between rounded-full backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ease-out ${isScrolled
        ? 'top-2 md:top-4 w-[95%] sm:w-[85%] md:w-[75%] max-w-3xl px-1.5 py-1.5 bg-[#080808]/90'
        : 'top-4 md:top-6 w-[95%] sm:w-[90%] md:w-[85%] max-w-4xl px-2 py-2 md:px-2 md:py-2 bg-[#121212]/80 shadow-none'
        }`}>
        <Link to="/" className="pl-3 md:pl-5 flex items-center justify-center hover:opacity-80 transition-opacity">
          <img src="/logo/koco_logo.png" alt="KOCO Logo" className="h-6 sm:h-8 md:h-10 w-auto object-contain transition-all duration-300" />
        </Link>
        <div className="hidden md:flex items-center gap-8 px-8">
          <a href="#recent-work" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">Work</a>
          <a href="#services" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">Services</a>
          <a href="#about" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">About</a>
        </div>
        <a href="#contact" className="ml-2 md:ml-4 px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold bg-white text-black rounded-full hover:bg-gray-200 transition-all flex items-center gap-1 md:gap-2 group shrink-0">
          Contact
          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </nav>

      <main className="relative z-10">
        
        <section className="min-h-[100dvh] flex items-center pt-28 md:pt-24 pb-12 px-4 sm:px-6 relative">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center z-10 relative">

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 relative mt-8 lg:mt-0">
              <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4rem] font-bold mb-4 md:mb-6 tracking-tight leading-[1.1] text-white">
                Make Every Frame <br className="hidden lg:block" />
                <span className="text-brand-accent">Impossible To Ignore.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/50 mb-8 md:mb-10 max-w-[280px] sm:max-w-md lg:max-w-lg font-normal leading-relaxed mx-auto lg:mx-0">
                We transform raw footage into high-retention viral masterpieces. Purpose-built for top-tier creators and elite brands.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a href="#contact" className="w-full sm:w-auto justify-center px-8 py-3.5 rounded-full bg-brand-accent hover:bg-[#E55A00] text-white font-bold text-sm tracking-wide transition-colors flex items-center gap-3 group shadow-[0_0_20px_rgba(252,110,32,0.3)]">
                  Work With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#recent-work" className="w-full sm:w-auto justify-center px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold text-sm tracking-wide transition-colors flex items-center gap-2 group hover:bg-white/5">
                  View Showreel
                  <Play className="w-4 h-4 fill-current opacity-80" />
                </a>
              </div>
            </div>

            <div className="relative w-full h-full flex flex-col items-center justify-center pt-8 lg:pt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-brand-accent/20 blur-[100px] rounded-full pointer-events-none -z-10" />
              <div className="w-full max-w-[600px] scale-110 md:scale-125 lg:scale-110 relative z-10 hover:scale-[1.15] lg:hover:scale-[1.15] transition-transform duration-700">
                <DotLottieReact
                  src="/animations/hero-animation.lottie"
                  loop
                  autoplay
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(252,110,32,0.15)]"
                />
              </div>
            </div>

          </div>
        </section>

        <section className="py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { end: 150, suffix: "+", label: "Videos Delivered" },
                { end: 20, suffix: "+", label: "Creators Served" },
                { end: 20, suffix: "M+", label: "Total Views" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center py-4 md:py-2">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-1 md:mb-2 tracking-tight">
                    <CountUp end={stat.end} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                  </h3>
                  <p className="text-sm text-brand-accent font-semibold tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="recent-work" className="py-20 md:py-32 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                Recent Projects
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Recent Work</h2>
            </div>

            {(() => {
              const projects = [
                {
                  title: "Cinematic Tech Review",
                  category: "Editing & Sound Design",
                  desc: "A high-octane visual breakdown featuring seamless transitions, raw color grading, and an immersive soundscape built specifically to maximize viewer retention for enthusiasts.",
                  img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
                  url: "#"
                },
                {
                  title: "Documentary Vlog",
                  category: "Storytelling & Grading",
                  img: "https://img.youtube.com/vi/6bQJIzYndmc/maxresdefault.jpg",
                  url: "https://youtu.be/6bQJIzYndmc?si=tq5tjzSmHILV4uck"
                },
                {
                  title: "Short Film",
                  category: "Pacing & Styling",
                  img: "https://img.youtube.com/vi/ve8vEoTaKPg/maxresdefault.jpg",
                  url: "https://youtu.be/ve8vEoTaKPg?si=o5Vdli4cTWiOhl5w"
                },
                {
                  title: "Confidence Built",
                  category: "Color & VFX",
                  img: "https://img.youtube.com/vi/B0788bzsoRU/maxresdefault.jpg",
                  url: "https://youtu.be/B0788bzsoRU?si=c1ME-ahKjfV9pRLj"
                },

              ];

              const ProjectCard = ({ item }: { item: any }) => (
                <div
                  className="group cursor-pointer flex flex-col h-full"
                  onClick={() => {
                    const info = getVideoInfo(item.url);
                    if (info) setSelectedVideo(info);
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#111111] border border-white/10 mb-4 shadow-lg group-hover:shadow-[0_20px_50px_rgba(252,110,32,0.15)] group-hover:border-brand-accent/30 transition-all duration-500">
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100 mix-blend-normal" />

                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-brand-accent/90 flex items-center justify-center text-white shadow-2xl transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm border border-white/20">
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="bg-black/80 backdrop-blur-md text-[10px] text-white px-3 py-1 rounded-full border border-white/10 font-bold uppercase tracking-widest">Preview Edit</span>
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors duration-300">{item.title}</h3>
                </div>
              );

              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6">
                  
                  <div className="col-span-1">
                    <ProjectCard item={projects[0]} />
                  </div>

                  <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-start md:pl-10 lg:pl-16 mb-4 md:mb-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 md:mb-4 rounded-full border border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                      Featured Edit
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6 hover:text-brand-accent transition-colors cursor-pointer">{projects[0].title}</h3>
                    <p className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
                      {projects[0].desc}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <ProjectCard item={projects[1]} />
                  </div>
                  <div className="col-span-1">
                    <ProjectCard item={projects[2]} />
                  </div>
                  <div className="col-span-1">
                    <ProjectCard item={projects[3]} />
                  </div>
                </div>
              );
            })()}

            <div className="mt-12 md:mt-16 flex justify-center">
              <Link to="/projects" className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold text-sm tracking-wide transition-colors flex items-center gap-2 group hover:bg-white/5">
                View Full Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 px-4 sm:px-6 border-y border-white/5 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
              Short Form
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Viral Vertical Edits</h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mb-8 md:mb-12">Hook-driven, fast-paced editing optimized for TikTok, Reels, and Shorts.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item} 
                  className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-[#111111] border border-white/10 cursor-pointer"
                  onClick={() => {
                    const info = getVideoInfo("https://www.youtube.com/shorts/2iLEARE6LvM");
                    if (info) setSelectedVideo(info);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90" />
                  <img
                    src="https://img.youtube.com/vi/2iLEARE6LvM/maxresdefault.jpg"
                    alt="Short Form Vertical"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-100"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                      <Play className="w-5 h-5 ml-1 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 z-20">
                    <p className="text-brand-accent text-xs font-bold mb-1">1.2M Views</p>
                    <h3 className="text-lg font-bold text-white leading-tight">Hook Breakdown</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="services" className="py-20 md:py-24 px-4 sm:px-6 border-b border-white/5 bg-[#080808]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                Start to Finish
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6">End-to-End Content Service</h2>
              <p className="text-white/50 text-sm md:text-base max-w-2xl leading-relaxed">
                From concept to final delivery, we handle scripting, shooting, editing, and publishing — ensuring your content performs across every platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "3D, VFX & Animations",
                  desc: "High-impact visuals, motion graphics, and cinematic VFX that elevate your story beyond the ordinary.",
                  iconWhite: "/work_icons/vfx_white.png",
                  iconBlack: "/work_icons/vfx_black.png"
                },
                {
                  title: "Shoots & Films",
                  tag: "Indore & Hyderabad",
                  desc: "Professional production services including commercial shoots, brand films, and cinematic storytelling — executed on-ground.",
                  iconWhite: "/work_icons/Flims_white.png",
                  iconBlack: "/work_icons/Films_black.png"
                },
                {
                  title: "Website Design",
                  desc: "Strategic, high-converting websites built to reflect your brand and turn visitors into customers.",
                  iconWhite: "/work_icons/website_white.png",
                  iconBlack: "/work_icons/website_black.png"
                }
              ].map((service, i) => (
                <div key={i} className="group relative flex flex-col bg-[#111111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden cursor-default hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute -bottom-8 -right-4 text-[14rem] font-bold text-white/[0.035] group-hover:text-brand-accent/[0.08] group-hover:-translate-y-6 group-hover:-rotate-3 transition-all duration-700 leading-none pointer-events-none select-none font-mono z-0">
                    {i + 1}
                  </div>

                  <div className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-white/70 font-bold text-xl mb-10 group-hover:from-brand-accent group-hover:to-[#cc5210] group-hover:text-black group-hover:shadow-[0_10px_30px_rgba(252,110,32,0.4)] group-hover:border-brand-accent/50 transition-all duration-500 relative z-10">
                    {(service as any).iconWhite ? (
                      <div className="relative w-8 h-8">
                        <img
                          src={(service as any).iconWhite}
                          alt="icon"
                          className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-300"
                        />
                        <img
                          src={(service as any).iconBlack}
                          alt="icon"
                          className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    ) : (
                      <span className="opacity-80 group-hover:opacity-100">0{i + 1}</span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 z-10 relative">
                    {service.title}
                  </h3>

                  {service.tag && (
                    <div className="mb-6 z-10 relative">
                      <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white/60 tracking-widest uppercase shadow-inner group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors duration-500">
                        {service.tag}
                      </span>
                    </div>
                  )}

                  <p className="text-white/50 text-base leading-relaxed z-10 relative flex-grow group-hover:text-white/70 transition-colors duration-500">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="why-us" className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-accent/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto z-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 md:mb-6 rounded-full border border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
              The Edge
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Why Top Brands <br className="hidden md:block" />
                <span className="text-brand-accent">Choose KOCO.</span>
              </h2>
              <p className="text-white/50 text-sm md:text-lg max-w-sm">
                We blend data-driven psychology with cinematic storytelling to create content that dominates feeds.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

              <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                  <div className="md:col-span-5 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                        <LineChart className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Algorithm-First Editing</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      We study retention graphs and CTR metrics. Every cut, zoom, and sound effect is mathematically engineered to maximize watch time.
                    </p>
                  </div>

                  <div className="md:col-span-7 relative flex items-center z-0 min-h-[220px] md:min-h-0 mt-6 md:mt-0">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 w-full md:w-[130%] bg-[#141414] rounded-2xl border border-white/5 p-4 shadow-2xl flex gap-4 transition-transform duration-500 group-hover:-translate-x-2">
                      <div className="w-2/3 aspect-video bg-[#080808] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors">
                          <Play className="w-5 h-5 ml-1 text-white" />
                        </div>
                      </div>
                      <div className="w-1/3 flex flex-col gap-3">
                        <div className="flex-1 bg-[#1A1A1A] rounded-lg w-full flex items-center px-3 gap-2">
                          <div className="w-8 h-5 bg-[#222] rounded shrink-0"></div>
                          <div className="flex-1 space-y-1.5"><div className="h-1 bg-[#333] rounded w-full"></div><div className="h-1 bg-[#222] rounded w-1/2"></div></div>
                        </div>
                        <div className="flex-1 bg-[#1A1A1A] rounded-lg w-full flex items-center px-3 gap-2">
                          <div className="w-8 h-5 bg-[#222] rounded shrink-0"></div>
                          <div className="flex-1 space-y-1.5"><div className="h-1 bg-[#333] rounded w-3/4"></div><div className="h-1 bg-[#222] rounded w-1/3"></div></div>
                        </div>
                        <div className="flex-1 bg-[#1A1A1A] rounded-lg w-full flex items-center px-3 gap-2">
                          <div className="w-8 h-5 bg-[#222] rounded shrink-0"></div>
                          <div className="flex-1 space-y-1.5"><div className="h-1 bg-[#333] rounded w-5/6"></div><div className="h-1 bg-[#222] rounded w-1/2"></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Cinematic Quality</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8 relative z-10">
                  Hollywood-grade color grading and spatial audio mixing.
                </p>

                <div className="mt-auto flex flex-col gap-4 relative z-10 group-hover:scale-[1.02] transition-transform duration-500">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-[#141414] border border-white/5 p-3.5 rounded-xl flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full ${i === 1 ? 'bg-purple-500' : i === 2 ? 'bg-[#FC6E20]' : 'bg-[#fff]/20'} flex-shrink-0 flex items-center justify-center`}>
                        <div className="w-2 h-2 rounded-full bg-black/50"></div>
                      </div>
                      <div className="h-2 bg-[#222] rounded-full w-full relative overflow-hidden">
                        <div className={`absolute top-0 left-0 h-full rounded-full ${i === 1 ? 'bg-purple-500' : i === 2 ? 'bg-[#FC6E20]' : 'bg-[#fff]/40'}`} style={{ width: i === 1 ? '40%' : i === 2 ? '75%' : '20%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Visual Progress</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8 relative z-10">
                  Track completion rates across all your campaigns and analyze audience retention automatically.
                </p>

                <div className="mt-auto bg-[#141414] border border-white/5 rounded-xl p-5 relative z-10 flex flex-col">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-3xl font-black text-white leading-none">12.5 <span className="text-sm font-bold text-white/50">M</span></span>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-green-400 mt-2 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 shadow-[0_0_8px_#4ade80]"></span> THIS WEEK
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-[#FC6E20]">↗ 85%</span>
                      <p className="text-[9px] uppercase font-bold tracking-wider text-white/50">CONSISTENCY</p>
                    </div>
                  </div>
                  <div className="flex items-end h-16 gap-2 w-full">
                    {[20, 35, 25, 45, 60, 40, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#222] rounded-t relative group-hover:bg-[#2A2A2A] transition-colors h-full flex items-end">
                        <div className={`w-full rounded-t transition-all duration-700 delay-100 ${i === 6 ? 'bg-brand-accent' : 'bg-white/10 group-hover:bg-brand-accent/40'}`} style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                  <div className="md:col-span-5 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 shrink-0">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Zero Friction</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Leave time-coded feedback directly on your drafts. We integrate perfectly into your workflow so you can review and approve seamlessly.
                    </p>
                  </div>

                  <div className="md:col-span-7 relative flex items-center z-0 min-h-[260px] md:min-h-0 mt-6 md:mt-0">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-4 w-[110%] md:w-[130%] bg-[#141414] rounded-xl border border-white/5 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-x-2">
                      <div className="bg-[#1A1A1A] px-4 py-3 border-b border-white/5 flex justify-between items-center">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <p className="text-[10px] text-white/30 font-mono flex items-center gap-1.5">
                          <Video className="w-3 h-3" /> KOCO_Portal.app
                        </p>
                      </div>
                      <div className="p-6 font-sans text-xs sm:text-sm">
                        <p className="mb-4 font-bold text-white/90 flex items-center gap-2 text-base">
                          V2_Brand_Commercial.mp4
                        </p>

                        <div className="mb-5 pl-3 border-l-2 border-brand-accent/50">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded bg-brand-accent/20 text-brand-accent text-[10px] flex items-center gap-1 font-bold">
                              <Play className="w-2.5 h-2.5 fill-current" /> 00:45
                            </span>
                            <span className="text-white/70 font-semibold text-[13px]">Client Feedback:</span>
                          </div>
                          <p className="text-white/50 text-[13px] leading-relaxed pr-4">
                            "Love the transition here. Can we make the sound design just a bit punchier when the logo drops?"
                          </p>
                        </div>

                        <div className="bg-[#1A1A1A] p-4 rounded-lg flex items-center gap-3 border border-white/5 mr-4">
                          <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center text-[10px] font-bold text-white shrink-0">KO</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/80 text-[11px] truncate">Added Sub-bass impact sfx. Looks good!</p>
                          </div>
                          <span className="text-[9px] text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded shrink-0">RESOLVED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-24 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                About
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-white">The Kontent Company</h2>
              <div className="space-y-6 text-base text-white/50 font-medium leading-relaxed">
                <p>
                  We started with a simple belief: <strong className="text-white">great stories deserve to be seen.</strong> In a sea of endless scrolling, mediocrity doesn't cut it. You need content that hooks immediately and holds attention until the very last frame.
                </p>
                <p>
                  Our team isn't just made of software technicians. We are digital native storytellers who understand platform algorithms, viewer psychology, and the undeniable power of pacing.
                </p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#111111] border border-white/10">
              <DotLottieReact
                src="/animations/about-animation.lottie"
                loop
                autoplay
                className="w-full h-full object-cover opacity-80 scale-125"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#111111] p-6 sm:p-8 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />

              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight text-white leading-tight">
                  Project <span className="text-brand-accent">Inquiry Form</span>
                </h2>
                <p className="text-white/40 text-xs md:text-base max-w-xl mx-auto leading-relaxed">
                  Please fill out the details below so we can understand your requirements and respond with a tailored proposal.
                </p>
              </div>

              <form className="space-y-8 md:space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 md:gap-10">
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-1">
                      Name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20 text-white text-base"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-1">
                      Email Address <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20 text-white text-base"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-1">
                      Contact Number <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleInputChange}
                      type="number"
                      min="0"
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20 text-white text-base"
                      placeholder="e.g. 9876543210"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2">
                      Company / Brand Name <span className="text-white/30 lowercase font-normal">(If applicable)</span>
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      type="text"
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20 text-white text-base"
                      placeholder="Your company or brand"
                    />
                  </div>

                  <div className="space-y-6">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-1 mb-4">
                      Services Required <span className="text-brand-accent">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "End to End Content Production",
                        "Video Editing & Post Production",
                        "3D VFX & Motion Graphics",
                        "Shoot and Film Production",
                        "Website Design",
                        "Graphic Design",
                        "Social Media Management",
                        "Other"
                      ].map((service) => (
                        <label key={service} className="flex items-center gap-3 group cursor-pointer">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={formData.services.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                              className="peer appearance-none w-5 h-5 rounded-full border border-white/20 checked:border-brand-accent checked:bg-brand-accent/10 transition-all cursor-pointer"
                            />
                            <div className="absolute w-2 h-2 rounded-full bg-brand-accent scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                          </div>
                          <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors cursor-pointer">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest">Project Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={1}
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors resize-none placeholder:text-white/20 text-white text-base"
                      placeholder="Brief about your project, goals, and timeline..."
                    ></textarea>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/70 uppercase tracking-widest">Estimated Budget</label>
                    <input
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      type="number"
                      min="0"
                      className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-accent transition-colors placeholder:text-white/20 text-white text-base"
                      placeholder="e.g. 5000"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-transparent border border-brand-accent text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : isSubmitted ? (
                      'Submitted! ✓'
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer className="py-8 md:py-12 px-6 border-t border-white/5 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 mb-6 md:mb-10">

              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                <Link to="/" className="flex items-center justify-center md:justify-start hover:opacity-80 transition-opacity mb-3">
                  <img src="/logo/koco_logo.png" alt="KOCO Logo" className="h-8 w-auto object-contain" />
                </Link>
                <h3 className="text-xl font-black text-white/90 mb-1 md:mb-2 tracking-tighter">KoCo.</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-xs font-medium">
                  Crafting stories that connect, resonate, and leave an impact.
                </p>
              </div>

              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 w-full max-w-sm mx-auto md:max-w-none">

                <div className="flex flex-row items-center sm:flex-col sm:items-start gap-4 sm:gap-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-0.5 md:mb-1">Contact</h4>
                    <p className="text-white hover:text-brand-accent transition-colors cursor-pointer text-xs font-bold tracking-tight">
                      +91 79743 85755
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center sm:flex-col sm:items-start gap-4 sm:gap-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-0.5 md:mb-1">Email</h4>
                    <p className="text-white hover:text-brand-accent transition-colors cursor-pointer text-xs font-bold tracking-tight break-all">
                      info@kontentcompany.in
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center sm:flex-col sm:items-start gap-4 sm:gap-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-0.5 md:mb-1">Address</h4>
                    <div className="space-y-0.5">
                      <p className="text-white/70 text-xs font-bold tracking-tight">Indore, MP</p>
                      <p className="text-white/70 text-xs font-bold tracking-tight">Hyderabad, Telangana</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-white/30 text-[10px] font-semibold tracking-wider">
                © {new Date().getFullYear()} Kontent Company. All rights reserved.
              </p>
              <div className="flex gap-6 justify-center">
                <span className="text-white/20 text-[9px] uppercase font-bold tracking-[0.3em] hover:text-white transition-colors cursor-pointer">Privacy</span>
                <span className="text-white/20 text-[9px] uppercase font-bold tracking-[0.3em] hover:text-white transition-colors cursor-pointer">Terms</span>
              </div>
            </div>
          </div>
        </footer>
        
        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-8 py-10 md:py-12">
            <div
              className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"
              onClick={() => setSelectedVideo(null)}
            />
            <div className={`relative w-full ${selectedVideo.isShort ? 'max-w-sm aspect-[9/16] rounded-3xl' : 'max-w-6xl aspect-video rounded-[2rem]'} bg-black overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(252,110,32,0.15)] animate-in zoom-in-95 fade-in duration-500`}>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 group"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </button>

              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title="Video Player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
