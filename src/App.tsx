import { useState } from 'react';
import TNAForm from './components/TNAForm';
import FormPreview from './components/FormPreview';
import type { TNAFormData } from './constants';
import { Eye, ChevronDown, ChevronUp, Bell, Search, Menu, Plus } from 'lucide-react';

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
    category: 'business'
  });

  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F5FA] font-body text-navy overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none -z-10"></div>
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-primary-blue/5 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed top-1/2 -right-24 w-80 h-80 bg-teal-glow/5 rounded-full blur-[100px] -z-10"></div>

      {/* Aao Milo Styled Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 py-4 flex items-center justify-between shadow-sm border-b border-soft-blue">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg rotate-12">F</div>
            <div>
              <div className="text-xl font-black tracking-tighter text-navy flex items-baseline">
                RRMTVET TNA
              </div>
              <div className="text-[10px] font-bold text-primary-blue uppercase tracking-widest leading-none">Powered by FNU</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-soft-blue/50 rounded-full px-5 py-2.5 w-96 group focus-within:bg-white transition-all border border-transparent focus-within:border-primary-blue/20">
            <input
              type="text"
              placeholder="Search programs, documentation..."
              className="bg-transparent outline-none w-full text-sm font-medium placeholder:text-navy/30"
            />
            <Search size={18} className="text-navy/20 group-focus-within:text-primary-blue" />
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex items-center gap-4 text-navy/40">
            <Bell size={20} className="hover:text-primary-blue cursor-pointer transition-colors" />
            <div className="w-10 h-10 bg-soft-blue rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              <Plus size={20} className="text-primary-blue" />
            </div>
          </div>
          <button className="bg-primary-blue text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest shadow-lg shadow-primary-blue/20 hover:scale-105 active:scale-95 transition-all">
            + Quick Apply
          </button>
          <Menu size={24} className="lg:hidden text-navy/60" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Form Area */}
          <div className="lg:col-span-12 xl:col-span-8">
            <TNAForm onDataUpdate={setFormData} />
          </div>

          {/* Sticky Preview - Feedback Form style floating widget */}
          <div className="hidden xl:block xl:col-span-4 sticky top-32">
            <div className="flex items-center gap-2 mb-6 text-navy/40 uppercase font-black tracking-widest text-xs ml-4">
              <Eye size={16} />
              <span>Live Document Summary</span>
            </div>

            <div className="group perspective-1000">
              <div className="relative transition-all duration-500 group-hover:rotate-y-2 group-hover:scale-[1.02]">
                {/* Decorative background shadow for the "card stack" feel */}
                <div className="absolute inset-0 bg-navy/5 rounded-[40px] translate-x-4 translate-y-4 -z-10"></div>
                <div className="scale-[0.85] origin-top shrink-0">
                  <FormPreview data={formData} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Preview Toggle */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              className="w-full bg-navy text-warm-white p-5 rounded-[24px] flex justify-between items-center shadow-2xl mb-4 mt-8 sticky bottom-6 z-50 transition-all border-b-4 border-primary-blue active:translate-y-1 active:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary-blue p-2 rounded-lg">
                  <Eye size={20} className="text-white" />
                </div>
                <span className="font-black uppercase tracking-widest text-sm text-warm-white">Review Registration</span>
              </div>
              {isPreviewExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>

            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isPreviewExpanded ? 'max-h-[2500px] opacity-100 mb-20' : 'max-h-0 opacity-0'}`}>
              <div className="scale-[0.95] md:scale-100 origin-top shadow-inner rounded-[40px] overflow-hidden bg-white/50 backdrop-blur-sm self-start">
                <FormPreview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-soft-blue bg-white/50 backdrop-blur-sm py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center text-white font-black">F</div>
            <div className="text-sm font-black uppercase tracking-[0.3em]">Fiji National University</div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-10 text-[10px] font-black uppercase tracking-widest text-navy/30">
            <span className="hover:text-primary-blue cursor-help transition-colors">TVET Pasifika</span>
            <span className="hover:text-primary-blue cursor-help transition-colors">Robertson Rd, Suva</span>
            <span className="hover:text-primary-blue cursor-help transition-colors">Tel: 9080290</span>
            <span className="hover:text-primary-blue cursor-help transition-colors">Privacy Policy</span>
          </div>

          <div className="w-16 h-1 bg-soft-blue rounded-full mb-8"></div>

          <p className="text-[10px] text-navy/20 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} RRMTVET TNA System. Designed for Pacific Digital Excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
