export type navItem = {
   title: string;
   icon?: string;
   to?: string;
   subtitle?: string;
   subitems?: navItem[];
   grand?: navItem[];
   permission?: string;
};
