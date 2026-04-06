import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, X, ArrowUpRight, Phone, Mail, MapPin, Maximize2 } from 'lucide-react';

const projects = [
  {
    title: "Cinematic Vlog Edit",
    category: "Youtube Videos",
    tags: ["Documentary", "Color Grading"],
    img: "https://img.youtube.com/vi/6bQJIzYndmc/maxresdefault.jpg",
    url: "https://youtu.be/6bQJIzYndmc?si=tq5tjzSmHILV4uck",
    featured: true,
  },
  {
    title: "Cinematic Narrative Edit",
    category: "Short films",
    tags: ["Narrative", "Storytelling"],
    img: "https://img.youtube.com/vi/ve8vEoTaKPg/maxresdefault.jpg",
    url: "https://youtu.be/ve8vEoTaKPg",
    featured: false,
  },
  {
    title: "Documentary style Edit",
    category: "Youtube Videos",
    tags: ["Color", "VFX"],
    img: "https://img.youtube.com/vi/B0788bzsoRU/maxresdefault.jpg",
    url: "https://youtu.be/B0788bzsoRU?si=c1ME-ahKjfV9pRLj",
    featured: false,
  },
  {
    title: "Open Box Films - Trailer",
    category: "Short films",
    tags: ["Film", "Editing"],
    img: "https://img.youtube.com/vi/ve8vEoTaKPg/maxresdefault.jpg",
    url: "https://youtu.be/ve8vEoTaKPg?si=o5Vdli4cTWiOhl5w",
    featured: false,
  },
  {
    title: "Docwise SaaS Explainer",
    category: "Motion graphics",
    tags: ["Motion Design", "AI Video"],
    img: "https://img.youtube.com/vi/hYN2yegZgn4/maxresdefault.jpg",
    url: "https://youtu.be/hYN2yegZgn4?si=ClOom0MfXz1edHs_",
    featured: false,
  },
  {
    title: "Cinematic Commercial",
    category: "Short films",
    tags: ["Commercial", "Editing"],
    img: "https://img.youtube.com/vi/tfN2bBVah_c/maxresdefault.jpg",
    url: "https://youtu.be/tfN2bBVah_c",
    featured: false,
  },
  {
    title: "Visual Breakdown",
    category: "Short films",
    tags: ["Motion", "VFX"],
    img: "https://img.youtube.com/vi/sDmlbheeE8w/maxresdefault.jpg",
    url: "https://youtu.be/sDmlbheeE8w?si=MbdERLOJtkxPS5Bz",
    featured: false,
  },
  // Reels
  { title: "Tech Mastery", category: "Reels", tags: ["Tech", "Viral"], img: "https://img.youtube.com/vi/xGKSfE6Jwk4/maxresdefault.jpg", url: "https://youtube.com/shorts/xGKSfE6Jwk4" },
  { title: "Cinematic Cut", category: "Reels", tags: ["Cuts", "Motion"], img: "https://img.youtube.com/vi/GRYAj8oBOdc/maxresdefault.jpg", url: "https://youtube.com/shorts/GRYAj8oBOdc" },
  { title: "Fast Pacing", category: "Reels", tags: ["Pacing", "Hooks"], img: "https://img.youtube.com/vi/hGq_sNB1JrM/maxresdefault.jpg", url: "https://youtube.com/shorts/hGq_sNB1JrM" },
  { title: "Visual Story", category: "Reels", tags: ["Story", "Visuals"], img: "https://img.youtube.com/vi/7vPcQGzz42Y/maxresdefault.jpg", url: "https://youtube.com/shorts/7vPcQGzz42Y" },
  { title: "Brand Identity", category: "Reels", tags: ["Brand", "Style"], img: "https://img.youtube.com/vi/iRHiEUS5JqI/maxresdefault.jpg", url: "https://youtube.com/shorts/iRHiEUS5JqI" },
  { title: "Social Hook", category: "Reels", tags: ["Social", "Hook"], img: "https://img.youtube.com/vi/2svGsEEL9eo/maxresdefault.jpg", url: "https://youtube.com/shorts/2svGsEEL9eo" },
  { title: "Editing Flow", category: "Reels", tags: ["Flow", "Edit"], img: "https://img.youtube.com/vi/u-bPyxzzdMA/maxresdefault.jpg", url: "https://youtube.com/shorts/u-bPyxzzdMA" },
  // Graphics and Designs
  {
    title: "Japanese House Concept",
    category: "Graphics and Designs",
    tags: ["3D", "Architecture"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/japnese_house.jpg_q3dkrt.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/japnese_house.jpg_q3dkrt.jpg",
  },
  {
    title: "Modern Interior Visual",
    category: "Graphics and Designs",
    tags: ["Design", "3D"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/1.3.jpg_naxs6o.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/1.3.jpg_naxs6o.jpg",
  },
  {
    title: "Abstract Art Study",
    category: "Graphics and Designs",
    tags: ["Art", "Abstract"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482119/3.jpg_rp88di.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482119/3.jpg_rp88di.jpg",
  },
  {
    title: "Creative Visual",
    category: "Graphics and Designs",
    tags: ["Graphics", "Creative"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/2.2.jpg_oitzxj.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/2.2.jpg_oitzxj.jpg",
  },
  {
    title: "Premium Envelopes Mockup",
    category: "Graphics and Designs",
    tags: ["Branding", "Mockup"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/Envelopes_Mockup_1.jpg_ulelzm.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/Envelopes_Mockup_1.jpg_ulelzm.jpg",
  },
  {
    title: "Hoodie 3D Render",
    category: "Graphics and Designs",
    tags: ["3D", "Apparel"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482121/Hoodie_3d_render.jpg_m8hqdg.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482121/Hoodie_3d_render.jpg_m8hqdg.jpg",
  },
  {
    title: "P-Cap Mockup Design",
    category: "Graphics and Designs",
    tags: ["Branding", "Style"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482121/Free_P-Cap_Mockup_PSD.jpg_llvimf.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482121/Free_P-Cap_Mockup_PSD.jpg_llvimf.jpg",
  },
  {
    title: "Edhytronix Identity",
    category: "Graphics and Designs",
    tags: ["Logo", "Design"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/Edhytronix.jpg_yalt6s.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482120/Edhytronix.jpg_yalt6s.jpg",
  },
  {
    title: "Stationary Brand Mockup",
    category: "Graphics and Designs",
    tags: ["Branding", "Corporate"],
    img: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482123/stationary_mockup.jpg_qiptiq.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/image/upload/q_auto/f_auto/v1775482123/stationary_mockup.jpg_qiptiq.jpg",
  },
  {
    title: "Background Animation",
    category: "Graphics and Designs",
    tags: ["Animation", "Background"],
    img: "https://res.cloudinary.com/dkwkqeklk/video/upload/q_auto/f_auto/v1775482122/Background_Animation_zxg0jp.jpg",
    url: "https://res.cloudinary.com/dkwkqeklk/video/upload/q_auto/f_auto/v1775482122/Background_Animation_zxg0jp.mp4",
  },
];

const categories = ["All", "Youtube Videos", "Reels", "Short films", "Motion graphics", "Graphics and Designs"];

const getProjectInfo = (project: { category: string, url: string }) => {
  if (project.url === "#") return null;

  const ytMatch = project.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (ytMatch) {
    return { type: 'youtube', id: ytMatch[1], isShort: project.url.includes('shorts/') };
  }

  if (project.url.endsWith('.mp4')) {
    return { type: 'video', url: project.url };
  }

  if (project.category === "Graphics and Designs") {
    return { type: 'image', url: project.url };
  }

  return null;
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<{ type: string, id?: string, url?: string, isShort?: boolean } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = activeCategory === "All"
    ? projects.filter(p => p.category !== "Reels")
    : projects.filter(p => p.category === activeCategory);

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
          <Link to="/" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">Back to Home</Link>
          <a href="/#services" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">Services</a>
          <a href="/#about" className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200">About</a>
        </div>
        <a href="/#contact" className="ml-2 md:ml-4 px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-bold bg-white text-black rounded-full hover:bg-gray-200 transition-all flex items-center gap-1 md:gap-2 group shrink-0">
          Contact
          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </nav>

      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 md:mb-6 rounded-full border border-white/10 text-white/60 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
              Our Work
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-4 md:mb-6">
              Full <span className="text-brand-accent">Portfolio.</span>
            </h1>
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Every frame crafted with intention. Every story told with precision.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activeCategory === cat
                  ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_20px_rgba(252,110,32,0.3)]'
                  : 'bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCategory === "All" && (
            <div
              className="group relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-8 cursor-pointer border border-white/5 hover:border-brand-accent/20 transition-all duration-500"
              onClick={() => {
                const info = getProjectInfo(projects[0]);
                if (info) setSelectedItem(info);
              }}
            >
              <img
                src={projects[0].img}
                alt={projects[0].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 rounded-full bg-brand-accent/90 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500">
                  <Play className="w-8 h-8 ml-1.5 fill-current text-white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 z-10 w-[90%] pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3 py-1 mb-2 sm:mb-4 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest pointer-events-auto">
                  ★ Featured
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight pointer-events-auto truncate">{projects[0].title}</h2>
                <p className="text-white/50 text-xs sm:text-sm mt-1 sm:mt-2 font-medium pointer-events-auto">{projects[0].category}</p>
              </div>
            </div>
          )}

          <div className={`grid gap-6 ${activeCategory === "Reels" ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {(activeCategory === "All" ? filtered.slice(1) : filtered).map((project, i) => (
              <div
                key={i}
                className="group cursor-pointer flex flex-col"
                onClick={() => {
                  const info = getProjectInfo(project);
                  if (info) setSelectedItem(info);
                }}
              >
                <div className={`relative rounded-2xl overflow-hidden ${project.category === "Reels" ? 'aspect-[9/16]' : 'aspect-video'} bg-[#111111] border border-white/5 mb-4 shadow-lg group-hover:shadow-[0_20px_50px_rgba(252,110,32,0.12)] group-hover:border-brand-accent/20 transition-all duration-500`}>

                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className={`${project.category === "Reels" ? 'w-12 h-12' : 'w-14 h-14'} rounded-full bg-brand-accent/90 flex items-center justify-center text-white shadow-2xl transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm border border-white/20`}>
                      {project.url.endsWith('.mp4') || project.url.includes('youtu') ? (
                        <Play className={`${project.category === "Reels" ? 'w-4 h-4' : 'w-5 h-5'} ml-1 fill-current`} />
                      ) : (
                        <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 z-20 flex gap-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {project.tags?.map((tag: string) => (
                      <span key={tag} className="bg-black/70 backdrop-blur-md text-[9px] text-white px-2 py-1 rounded-full border border-white/10 font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className={`${project.category === "Reels" ? 'text-base' : 'text-lg'} font-bold text-white mb-0.5 group-hover:text-brand-accent transition-colors duration-300`}>{project.title}</h3>
                <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">{project.category}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <p className="text-white/30 text-lg font-medium">No projects in this category yet.</p>
              <button onClick={() => setActiveCategory("All")} className="mt-6 text-brand-accent text-sm font-bold underline">
                View all projects
              </button>
            </div>
          )}
        </div>
      </main>

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

          </div>
        </div>
      </footer>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-8 py-10 md:py-12">
          <div
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl"
            onClick={() => setSelectedItem(null)}
          />
          <div className={`relative w-full ${selectedItem?.isShort ? 'max-w-sm aspect-[9/16] rounded-3xl' : 'max-w-6xl aspect-video rounded-[2rem]'} bg-black overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(252,110,32,0.15)] animate-in zoom-in-95 fade-in duration-500`}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 group"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>
            {selectedItem.type === 'youtube' && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedItem.id}?autoplay=1&rel=0`}
                title="Video Player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {selectedItem.type === 'video' && (
              <video
                src={selectedItem.url}
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            )}
            {selectedItem.type === 'image' && (
              <img
                src={selectedItem.url}
                alt="Graphic project"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
