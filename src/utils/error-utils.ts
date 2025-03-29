export const tryCatch = async <T>(fn: () => Promise<T>) => {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Невідома помилка';
};
