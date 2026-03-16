import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { COURSE_CATEGORIES, COURSES_BY_CATEGORY, COURSES } from '../constants';
import type { TNAFormData } from '../constants';
import {
    Download, Briefcase, Utensils, Hammer, Settings,
    Palette, HeartPulse, Leaf, ChevronRight, ChevronLeft,
    CheckCircle2, Info
} from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface TNAFormProps {
    onDataUpdate: (data: TNAFormData) => void;
}

const iconMap: Record<string, any> = {
    Briefcase: <Briefcase size={24} />,
    Utensils: <Utensils size={24} />,
    Hammer: <Hammer size={24} />,
    Settings: <Settings size={24} />,
    Palette: <Palette size={24} />,
    HeartPulse: <HeartPulse size={24} />,
    Leaf: <Leaf size={24} />,
};

const TNAForm: React.FC<TNAFormProps> = ({ onDataUpdate }) => {
    const [step, setStep] = useState(1);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<TNAFormData>({
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            age: 18,
            village: '',
            district: '',
            nextOfKinName: '',
            nextOfKinContact: '',
            cellPhone: '',
            selectedCourse: '',
            category: 'business'
        },
    });

    const watchedValues = watch();

    React.useEffect(() => {
        onDataUpdate(watchedValues);
    }, [watchedValues, onDataUpdate]);

    const onSubmit = async (data: TNAFormData) => {
        const courseNumber = COURSES.indexOf(data.selectedCourse) + 1;
        await generatePDF('form-preview', data.fullName, courseNumber);
    };

    const nextStep = async () => {
        let fieldsToValidate: (keyof TNAFormData)[] = [];
        if (step === 1) {
            fieldsToValidate = ['fullName', 'age', 'village', 'district', 'nextOfKinName', 'nextOfKinContact', 'cellPhone'];
        } else if (step === 2) {
            fieldsToValidate = ['selectedCourse'];
        }

        const result = await trigger(fieldsToValidate);
        if (result) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const InputField = ({ name, label, type = 'text', options = {} }: any) => (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-bold text-navy mb-2 ml-1">
                {label}
            </label>
            <input
                id={name}
                type={type}
                {...register(name, options)}
                className={`w-full bg-white border-2 p-4 rounded-xl focus:outline-none transition-all duration-300 ${errors[name as keyof TNAFormData] ? 'border-red-400 bg-red-50' : 'border-soft-blue focus:border-primary-blue shadow-sm focus:shadow-lg'
                    }`}
                placeholder={`Enter your ${label.toLowerCase()}...`}
            />
            {errors[name as keyof TNAFormData] && <span className="text-red-500 text-xs mt-1 ml-1 font-bold">{String(errors[name as keyof TNAFormData]?.message)}</span>}
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar - Aao Milo Style */}
            <div className="flex items-center justify-between mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-soft-blue -translate-y-1/2 z-0"></div>
                {[1, 2, 3].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-primary-blue text-white shadow-lg' : 'bg-white text-navy/30 border-2 border-soft-blue'
                            }`}>
                            {step > s ? <CheckCircle2 size={20} /> : s}
                        </div>
                        <span className={`absolute -bottom-7 text-[10px] uppercase tracking-wider font-black whitespace-nowrap ${step >= s ? 'text-primary-blue' : 'text-navy/20'
                            }`}>
                            {s === 1 ? 'General Info' : s === 2 ? 'Program Selection' : 'Review'}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-[32px] shadow-2xl border border-soft-blue">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-soft-blue p-2 rounded-lg text-primary-blue">
                                <Info size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">General Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <div className="md:col-span-2">
                                <InputField name="fullName" label="Full Name" options={{ required: 'Full Name is required' }} />
                            </div>
                            <InputField name="age" label="Age" type="number" options={{ required: 'Age is required', min: 15, max: 80 }} />
                            <InputField name="cellPhone" label="Cell Phone" type="tel" options={{ required: 'Required' }} />
                            <InputField name="village" label="Village / Kooro" options={{ required: 'Required' }} />
                            <InputField name="district" label="District / Tikina" options={{ required: 'Required' }} />
                            <InputField name="nextOfKinName" label="Next of Kin Name" options={{ required: 'Required' }} />
                            <InputField name="nextOfKinContact" label="Next of Kin Contact" type="tel" options={{ required: 'Required' }} />
                        </div>

                        <button
                            type="button"
                            onClick={nextStep}
                            className="w-full mt-6 py-4 bg-primary-blue text-white rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-all hover:shadow-xl active:scale-95"
                        >
                            Next: Select Course <ChevronRight />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-xl font-black text-navy text-center mb-8 flex items-center justify-center gap-2">
                            <div className="w-8 h-8 rounded-full border-2 border-primary-blue flex items-center justify-center text-primary-blue text-sm">?</div>
                            What is the Category of your Course?
                        </h2>

                        {/* Category Icons */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                            {COURSE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => {
                                        setValue('category', cat.id);
                                        setValue('selectedCourse', '');
                                    }}
                                    className="flex flex-col items-center group"
                                >
                                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${watchedValues.category === cat.id
                                        ? 'bg-primary-blue text-white border-primary-blue shadow-xl scale-110'
                                        : 'bg-white text-navy/40 border-soft-blue hover:border-primary-blue/30'
                                        }`}>
                                        {iconMap[cat.icon]}
                                    </div>
                                    <span className={`mt-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors ${watchedValues.category === cat.id ? 'text-primary-blue' : 'text-navy/30'
                                        }`}>
                                        {cat.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <h3 className="text-sm font-black text-navy/40 uppercase tracking-[0.2em] text-center mb-6">Select a Specific Program</h3>

                        {/* Subcategory Buttons */}
                        <div className="flex flex-wrap justify-center gap-3 mb-10 min-h-[120px]">
                            {COURSES_BY_CATEGORY[watchedValues.category]?.map((course) => (
                                <button
                                    key={course}
                                    type="button"
                                    onClick={() => setValue('selectedCourse', course, { shouldValidate: true })}
                                    className={`px-6 py-3 rounded-full border-2 text-sm font-bold transition-all duration-300 ${watchedValues.selectedCourse === course
                                        ? 'bg-primary-blue text-white border-primary-blue shadow-lg scale-105'
                                        : 'bg-soft-blue text-navy/60 border-transparent hover:border-primary-blue/20'
                                        }`}
                                >
                                    {course}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="w-1/3 py-4 border-2 border-soft-blue text-navy/60 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-soft-blue transition-all"
                            >
                                <ChevronLeft /> Back
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!watchedValues.selectedCourse}
                                className={`w-2/3 py-4 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${watchedValues.selectedCourse
                                    ? 'bg-primary-blue text-white shadow-lg hover:bg-blue-600'
                                    : 'bg-soft-blue text-navy/20 cursor-not-allowed'
                                    }`}
                            >
                                Next <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                        <div className="w-20 h-20 bg-teal-glow/20 text-teal-glow rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-navy mb-2 lowercase tracking-tighter">Ready to download?</h2>
                        <p className="text-navy/60 mb-10">Review your information on the right, then click the button below to generate your official TNA PDF.</p>

                        <div className="bg-soft-blue/50 p-6 rounded-[24px] mb-8 text-left border border-primary-blue/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-blue font-bold shadow-sm">3</div>
                                <div className="font-black text-navy uppercase tracking-widest text-sm">Final Confirmation</div>
                            </div>
                            <p className="text-xs text-navy/40 font-bold leading-relaxed">
                                By downloading, you confirm that all personal details provided are accurate for the FNU RRMTVET enrollment process.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="w-1/3 py-4 border-2 border-soft-blue text-navy/60 rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-soft-blue transition-all"
                            >
                                <ChevronLeft /> Edit
                            </button>
                            <button
                                type="submit"
                                className="w-2/3 py-4 bg-navy text-warm-white rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-navy/90 shadow-xl transition-all"
                            >
                                <Download /> Get Official PDF
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default TNAForm;
