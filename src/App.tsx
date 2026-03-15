import { useState } from 'react';
import TNAForm from './components/TNAForm';
import FormPreview from './components/FormPreview';
import type { TNAFormData } from './constants';
import { Eye, ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState<TNAFormData>({
    fullName: '',
    age: 18,
    village: '',
    district: '',
    nextOfKinName: '',
    nextOfKinContact: '',
    cellPhone: '',
    selectedCourse: '',
  });

  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-warm-white selection:bg-fnu-gold selection:text-navy">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(45deg, #1B2E4B 25%, transparent 25%, transparent 50%, #1B2E4B 50%, #1B2E4B 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}></div>

      <header className="bg-navy py-8 px-6 shadow-xl relative z-10 border-b-4 border-fnu-gold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-display font-black text-warm-white tracking-tighter mb-1 uppercase">
              RRMTVET <span className="text-fnu-gold">TNA</span>
            </h1>
            <p className="text-warm-white/60 text-sm font-bold uppercase tracking-[0.2em]">Training Needs Analysis Portal</p>
          </div>
          <div className="flex flex-col items-center md:items-end text-sm text-warm-white/80 border-t md:border-t-0 md:border-l border-warm-white/10 pt-4 md:pt-0 md:pl-6">
            <span className="font-bold text-fnu-gold uppercase">Fiji National University</span>
            <span className="italic">Pasifika Centre for TVET</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">

          {/* Form Side */}
          <div className="lg:col-span-6 bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-lg border border-white/20">
            <TNAForm onDataUpdate={setFormData} />
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            {/* Desktop Preview Label */}
            <div className="hidden lg:flex items-center gap-2 mb-4 text-navy/40 uppercase font-black tracking-widest text-xs">
              <Eye size={16} />
              <span>Real-time Form Preview</span>
            </div>

            {/* Mobile Preview Toggle */}
            <button
              onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              className="lg:hidden w-full bg-navy text-warm-white p-4 rounded-2xl flex justify-between items-center shadow-lg mb-4"
            >
              <div className="flex items-center gap-3">
                <Eye size={20} className="text-fnu-gold" />
                <span className="font-bold uppercase tracking-wider">Show Form Preview</span>
              </div>
              {isPreviewExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>

            <div className={`transition-all duration-500 overflow-hidden lg:overflow-visible lg:block ${isPreviewExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 lg:max-h-none opacity-0 lg:opacity-100'}`}>
              <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 -mt-[15%] lg:mt-0">
                <FormPreview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-navy text-warm-white/40 py-12 px-6 relative z-10 text-center text-xs uppercase tracking-[0.3em] font-bold">
        <div className="max-w-7xl mx-auto">
          <p className="mb-4 text-warm-white/60 tracking-normal normal-case italic">© {new Date().getFullYear()} Fiji National University. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
            <span className="hover:text-fnu-gold transition-colors">TVET Pasifika Centre</span>
            <span className="hover:text-fnu-gold transition-colors">Robertson Rd, Suva</span>
            <span className="hover:text-fnu-gold transition-colors">Mob: 9080290</span>
          </div>
          <div className="w-12 h-1 bg-fnu-gold/30 mx-auto rounded-full"></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
