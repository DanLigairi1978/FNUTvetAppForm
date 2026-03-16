import React from 'react';
import { COURSES } from '../constants';
import type { TNAFormData } from '../constants';

interface FormPreviewProps {
    data: TNAFormData;
}

const FormPreview: React.FC<FormPreviewProps> = ({ data }) => {
    const courseNumber = COURSES.indexOf(data.selectedCourse) + 1;

    const InfoRow = ({ label, value }: { label: string; value?: string | number }) => (
        <div className="flex border-b border-navy/5 py-3">
            <span className="w-1/3 font-black text-navy/30 uppercase text-[9px] tracking-[0.2em]">{label}</span>
            <span className="w-2/3 text-navy font-bold text-sm tracking-tight">{value || '—'}</span>
        </div>
    );

    return (
        <div
            id="form-preview"
            className="w-full max-w-[210mm] min-h-[297mm] bg-white p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] mx-auto border border-soft-blue relative overflow-hidden rounded-[8px]"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
            {/* Background Texture Placeholder */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#CBD5E1 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>

            {/* Header */}
            <div className="mb-12 flex justify-between items-start relative z-10">
                <div>
                    <div className="text-3xl font-display font-black text-navy mb-0.5 tracking-tighter">FNU</div>
                    <div className="text-[10px] font-black text-navy/40 uppercase tracking-[0.3em]">Fiji National University</div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-black text-primary-blue uppercase tracking-widest mb-1">Official Form</div>
                    <div className="text-[10px] text-navy/30 font-bold">RRMTVET-TNA-2024-V2</div>
                </div>
            </div>

            <div className="bg-navy text-white py-4 px-8 mb-12 rounded-[4px] relative z-10">
                <h1 className="text-xl font-display font-black uppercase tracking-widest text-center">
                    Rural Remote Maritime TVET — TNA Form
                </h1>
            </div>

            {/* Personal Details Section */}
            <div className="mb-12 relative z-10">
                <h3 className="text-xs font-black text-primary-blue mb-6 uppercase tracking-[0.4em] flex items-center gap-3">
                    Part 1: Personal Details
                    <div className="h-px bg-soft-blue flex-grow"></div>
                </h3>
                <div className="grid grid-cols-1 gap-1">
                    <InfoRow label="Full Name" value={data.fullName} />
                    <InfoRow label="Age" value={data.age} />
                    <InfoRow label="Village / Kooro" value={data.village} />
                    <InfoRow label="District / Tikina" value={data.district} />
                    <InfoRow label="Next of Kin Name" value={data.nextOfKinName} />
                    <InfoRow label="Next of Kin Contact" value={data.nextOfKinContact} />
                    <InfoRow label="Landline Number" value={data.landline} />
                    <InfoRow label="Cell Phone Number" value={data.cellPhone} />
                </div>
            </div>

            {/* Course Selection Section */}
            <div className="mb-12 relative z-10">
                <h3 className="text-xs font-black text-primary-blue mb-6 uppercase tracking-[0.4em] flex items-center gap-3">
                    Part 2: Program of Interest
                    <div className="h-px bg-soft-blue flex-grow"></div>
                </h3>
                <div className="bg-soft-blue/30 p-8 rounded-xl border border-soft-blue min-h-[120px] flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shadow-inner transition-all duration-500 ${data.selectedCourse ? 'bg-primary-blue text-white' : 'bg-white text-navy/10'
                        }`}>
                        {data.selectedCourse ? courseNumber : '?'}
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-navy/30 uppercase tracking-widest mb-1">Selected Course</div>
                        <div className="text-xl font-display font-black text-navy lowercase tracking-tight">
                            {data.selectedCourse || <span className="text-navy/10 italic">no Selection yet</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Contact */}
            <div className="mt-auto pt-16 border-t border-navy/5 relative z-10">
                <div className="grid grid-cols-3 gap-8 text-[9px] font-bold text-navy/40 uppercase tracking-widest">
                    <div>
                        <div className="text-navy/60 mb-2">Location</div>
                        TVET Pasifika Centre<br />Suva, Fiji
                    </div>
                    <div>
                        <div className="text-navy/60 mb-2">Contact</div>
                        Setareki.valenitabua@fnu.ac.fj<br />Mob: 9080290
                    </div>
                    <div className="text-right">
                        <div className="text-navy/60 mb-2">Signature</div>
                        ____________________
                    </div>
                </div>
            </div>

            {/* Aesthetic Border Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-glow/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
};

export default FormPreview;
