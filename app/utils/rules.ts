export const required = (value: string, name: string) =>
  !!value || `${name.trim()} field is required`;
