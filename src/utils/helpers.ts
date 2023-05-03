export const getIconPath = (iconName: string) => `/static/icons/${iconName}`;

export const toSnakeCase = (str: string): string =>
  (str || "").replace(/\s/g, "-").toLowerCase();
