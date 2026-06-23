export type UserRole = "teacher" | "parent" | "admin";

export type ModuleCard = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export type Student = {
  id: string;
  fullName: string;
  birthDate?: string;
  gradeLevel: string;
  schoolName: string;
  studentStatus: string;
  diagnosisInfo?: string;
  educationNeed: string;
  parentName?: string;
  parentPhone?: string;
  notes?: string;
};
