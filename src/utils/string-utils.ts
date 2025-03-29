export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatName = (
  firstName: string | null,
  lastName: string | null,
  middleName: string | null,
) => {
  const fullName = `${lastName ?? ''} ${firstName ?? ''} ${middleName ?? ''}`;
  return fullName.trim() || 'Не вказано';
};
