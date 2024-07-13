import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toggleDarkMode = () => {
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle('dark');
};

// Optional: Persist dark mode preference in localStorage
export const applyInitialDarkMode = () => {
  const prefersDarkMode = localStorage.getItem('dark-mode') === 'true';
  if (prefersDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const setDarkModePreference = (isDarkMode: boolean) => {
  localStorage.setItem('dark-mode', isDarkMode.toString());
};
