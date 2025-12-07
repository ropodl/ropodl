export const required = (value: string, name: string) =>
   !!value || `${name.trim()} field is required`;
export const maxLength = (value: string, length: number, name: string) =>
   value.length <= length ||
   `${name} must not be greater than ${length} characters`;
export const minLength = (value: string, length: number, name: string) =>
   value.length >= length ||
   `${name} must not be less than ${length} characters`;
