export const COURSES = [
    "Basics of Business and Computing Skills",
    "Basics of Cookery",
    "Basics of Block Laying",
    "Basics of Floristry Designs and Techniques",
    "Basics of Domestic Electrical Installation",
    "Basics of Fiberglass Boat Repair Procedures",
    "Basic Garment Construction Techniques and Procedures",
    "Basics of Wooden House Construction",
    "Fundamentals of Baking and Patisserie",
    "Basics of Household and Sanitary Plumbing",
    "Basics of Food and Beverage",
    "Basic Sustainable Healthcare, Leadership and Management",
    "Front Office Management",
    "Solar Installation and Maintenance",
    "Basic Screenprinting Artwork and Design",
    "Small Engine Repair",
    "Sustainable Land Use Management"
];

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
}
