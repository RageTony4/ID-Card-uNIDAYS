
export interface StudentInfo {
  universityName: string;
  studentName: string;
  dob: string;
  studentId: string;
  phone: string;
  address: string;
  location: string; // New field for "City, Country" display
  academicYear: string;
  photo: string | null;
  logo: string | null;
  bloodGroup: string;
  emergencyContact: string;
}

export type ToastType = 'info' | 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

export type IdCardTemplate = 'classic' | 'modern' | 'elegant' | 'official';
