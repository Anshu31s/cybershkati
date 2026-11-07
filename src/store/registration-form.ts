import { create } from 'zustand';

export type RegistrationFormData = {
  fullName: string;
  email: string;
  phone: string;
  altPhone: string;
  gender: string;
  dob: string;
  experienceLevel: string;
  hasPriorInternship: string;
  priorInternshipDetails: string;
  currentRole: string;
  college: string;
  preferredTrack: string;
  attendanceReason: string;
  hearAboutEvent: string;
  agreeTerms: boolean;
};

const initialFormData: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  altPhone: '',
  gender: '',
  dob: '',
  experienceLevel: '',
  hasPriorInternship: 'No',
  priorInternshipDetails: '',
  currentRole: 'Student (B.Tech / BCA / MCA / M.Sc)',
  college: '',
  preferredTrack: 'All 7 Tracks (Complete Curriculum)',
  attendanceReason: '',
  hearAboutEvent: 'LinkedIn',
  agreeTerms: true,
};

type RegistrationFormStore = {
  formData: RegistrationFormData;
  updateFormData: (name: keyof RegistrationFormData, value: string | boolean) => void;
  resetFormData: () => void;
};

export const useRegistrationFormStore = create<RegistrationFormStore>()((set) => ({
  formData: { ...initialFormData },
  updateFormData: (name, value) => set((state) => ({
    formData: { ...state.formData, [name]: value },
  })),
  resetFormData: () => set({ formData: { ...initialFormData } }),
}));
