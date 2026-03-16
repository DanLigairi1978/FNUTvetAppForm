export const COURSE_CATEGORIES = [
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'hospitality', name: 'Hospitality', icon: 'Utensils' },
    { id: 'construction', name: 'Construction', icon: 'Hammer' },
    { id: 'technical', name: 'Technical', icon: 'Settings' },
    { id: 'arts', name: 'Creative Arts', icon: 'Palette' },
    { id: 'healthcare', name: 'Healthcare', icon: 'HeartPulse' },
    { id: 'land', name: 'Agriculture', icon: 'Leaf' },
];

export const COURSES_BY_CATEGORY: Record<string, string[]> = {
    business: ["Basics of Business and Computing Skills", "Front Office Management"],
    hospitality: ["Basics of Cookery", "Fundamentals of Baking and Patisserie", "Basics of Food and Beverage"],
    construction: ["Basics of Block Laying", "Basics of Domestic Electrical Installation", "Basics of Wooden House Construction", "Basics of Household and Sanitary Plumbing"],
    technical: ["Basics of Fiberglass Boat Repair Procedures", "Solar Installation and Maintenance", "Small Engine Repair"],
    arts: ["Basics of Floristry Designs and Techniques", "Basic Garment Construction Techniques and Procedures", "Basic Screenprinting Artwork and Design"],
    healthcare: ["Basic Sustainable Healthcare, Leadership and Management"],
    land: ["Sustainable Land Use Management"],
};

export const COURSES = Object.values(COURSES_BY_CATEGORY).flat();

export interface TNAFormData {
    fullName: string;
    age: number;
    village: string;
    district: string;
    nextOfKinName: string;
    nextOfKinContact: string;
    landline?: string;
    cellPhone: string;
    selectedCourse: string;
    category: string;
}
