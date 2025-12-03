export type navItem = {
   title: string;
   icon?: string; // Optional
   to?: string; // Optional
   subtitle?: string; // Optional
   subitems?: navItem[]; // Recursive: array of navItem
   grand?: navItem[]; // Recursive: array of navItem
};
