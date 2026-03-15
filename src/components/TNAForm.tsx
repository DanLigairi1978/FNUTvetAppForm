import React from 'react';
import { useForm } from 'react-hook-form';
import { COURSES } from '../constants';
import type { TNAFormData } from '../constants';
import { Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface TNAFormProps {
    onDataUpdate: (data: TNAFormData) => void;
}

const TNAForm: React.FC<TNAFormProps> = ({ onDataUpdate }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
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

    const InputField = ({ name, label, type = 'text', options = {} }: any) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-xs font-bold text-navy/60 uppercase tracking-widest mb-1 ml-1">
                {label}
            </label>
            <input
                id={name}
                type={type}
                {...register(name, options)}
                className={`w-full bg-white border-2 p-3 rounded-lg focus:outline-none transition-all duration-300 ${errors[name as keyof TNAFormData] ? 'border-red-500 bg-red-50' : 'border-navy/10 focus:border-fnu-gold shadow-sm focus:shadow-md'
                    }`}
                placeholder={`Enter ${label.toLowerCase()}...`}
            />
            {errors[name as keyof TNAFormData] && <span className="text-red-500 text-xs mt-1 ml-1 font-bold">{String(errors[name as keyof TNAFormData]?.message)}</span>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
            {/* Section 1: Personal Details */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-navy text-warm-white w-10 h-10 flex items-center justify-center rounded-full font-bold">1</div>
                    <h2 className="text-2xl font-display font-bold text-navy tracking-tight">Personal Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <div className="md:col-span-2">
                        <InputField
                            name="fullName"
                            label="Full Name"
                            options={{ required: 'Full Name is required' }}
                        />
                    </div>
                    <InputField
                        name="age"
                        label="Age"
                        type="number"
                        options={{
                            required: 'Age is required',
                            min: { value: 15, message: 'Minimum age is 15' },
                            max: { value: 80, message: 'Maximum age is 80' }
                        }}
                    />
                    <InputField
                        name="cellPhone"
                        label="Cell Phone Number"
                        type="tel"
                        options={{ required: 'Cell phone is required' }}
                    />
                    <InputField
                        name="village"
                        label="Village / Kooro"
                        options={{ required: 'Village is required' }}
                    />
                    <InputField
                        name="district"
                        label="District / Tikina"
                        options={{ required: 'District is required' }}
                    />
                    <InputField
                        name="nextOfKinName"
                        label="Next of Kin Name"
                        options={{ required: 'Next of kin name is required' }}
                    />
                    <InputField
                        name="nextOfKinContact"
                        label="Next of Kin Contact"
                        type="tel"
                        options={{ required: 'Next of kin contact is required' }}
                    />
                    <div className="md:col-span-2">
                        <InputField
                            name="landline"
                            label="Landline Number (Optional)"
                            type="tel"
                        />
                    </div>
                </div>
            </section>

            {/* Section 2: Course Selection */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-navy text-warm-white w-10 h-10 flex items-center justify-center rounded-full font-bold">2</div>
                    <h2 className="text-2xl font-display font-bold text-navy tracking-tight">Course Selection</h2>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {COURSES.map((course, index) => {
                        const isSelected = watchedValues.selectedCourse === course;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setValue('selectedCourse', course, { shouldValidate: true })}
                                className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 group ${isSelected
                                    ? 'border-fnu-gold bg-fnu-gold/10'
                                    : 'border-navy/5 bg-white hover:border-navy/20 hover:shadow-md'
                                    }`}
                            >
                                <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg font-black text-lg transition-colors duration-300 ${isSelected ? 'bg-fnu-gold text-navy' : 'bg-navy/5 text-navy/40 group-hover:bg-navy/10'
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className={`font-bold transition-colors duration-300 mt-1.5 ${isSelected ? 'text-navy' : 'text-navy/70'}`}>
                                    {course}
                                </span>
                                {isSelected && (
                                    <div className="ml-auto mt-2 w-5 h-5 bg-fnu-gold rounded-full flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-navy rounded-full"></div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
                {errors.selectedCourse && <p className="text-red-500 text-sm mt-3 font-bold">Please select a course</p>}
                {/* Hidden field for validation */}
                <input type="hidden" {...register('selectedCourse', { required: 'Please select a course' })} />
            </section>

            <button
                type="submit"
                disabled={!isValid}
                className={`w-full py-4 px-6 rounded-xl font-display font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-500 shadow-lg ${isValid
                    ? 'bg-navy text-warm-white hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-navy/20 text-navy/40 cursor-not-allowed shadow-none'
                    }`}
            >
                <Download className={isValid ? 'animate-bounce' : ''} />
                Download PDF Form
            </button>
        </form>
    );
};

export default TNAForm;
