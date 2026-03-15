import React from 'react';
import { COURSES } from '../constants';
import type { TNAFormData } from '../constants';

interface FormPreviewProps {
    data: TNAFormData;
}

const FormPreview: React.FC<FormPreviewProps> = ({ data }) => {
    const courseNumber = COURSES.indexOf(data.selectedCourse) + 1;

    const InfoRow = ({ label, value }: { label: string; value?: string | number }) => (
        <div className="flex border-b border-navy/10 py-2">
            <span className="w-1/3 font-semibold text-navy/60 uppercase text-xs tracking-wider">{label}</span>
            <span className="w-2/3 text-navy font-medium">{value || '—'}</span>
        </div>
    );

    return (
        <div
            id="form-preview"
            className="w-full max-w-[210mm] min-h-[297mm] bg-warm-white p-8 shadow-2xl mx-auto border border-navy/10 relative overflow-hidden"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
            {/* Background Texture Placeholder */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1B2E4B 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>

            {/* Header */}
            <div className="border-b-4 border-fnu-gold pb-6 mb-8 flex flex-col items-center text-center relative z-10">
                <div className="text-4xl font-display font-black text-navy mb-1 tracking-tighter">FNU</div>
                <div className="text-sm font-bold text-navy/80 uppercase tracking-widest">Fiji National University</div>
                <div className="mt-4 py-2 px-4 bg-navy text-warm-white text-lg font-display font-bold uppercase tracking-wide">
                    Rural Remote Maritime TVET — TNA Form
                </div>
            </div>

            {/* Personal Details Section */}
            <div className="mb-10 relative z-10">
                <h3 className="text-xl font-display font-bold text-navy mb-4 border-l-4 border-fnu-gold pl-3">Personal Details</h3>
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
                <h3 className="text-xl font-display font-bold text-navy mb-4 border-l-4 border-fnu-gold pl-3">Course Selection</h3>
                <div className="bg-navy/5 p-6 rounded-lg border border-navy/10 min-h-[100px] flex flex-col justify-center">
                    {data.selectedCourse ? (
                        <div className="flex items-start gap-4">
                            <div className="bg-fnu-gold text-navy font-black text-2xl w-12 h-12 flex items-center justify-center rounded-sm shrink-0">
                                {courseNumber}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-1">Selected Program</div>
                                <div className="text-xl font-display font-bold text-navy">{data.selectedCourse}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-navy/30 italic text-center">No course selected yet</div>
                    )}
                </div>
            </div>

            {/* Footer / Contact */}
            <div className="mt-auto pt-10 border-t border-navy/10 text-center relative z-10">
                <p className="text-sm font-bold text-navy uppercase tracking-widest mb-2">TVET Pasifika Centre</p>
                <p className="text-xs text-navy/60">Robertson Rd, Suva | Email: Setareki.valenitabua@fnu.ac.fj | Mob: 9080290</p>
            </div>

            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-45deg] pointer-events-none whitespace-nowrap text-[120px] font-black text-navy uppercase">
                Official TNA
            </div>
        </div>
    );
};

export default FormPreview;
