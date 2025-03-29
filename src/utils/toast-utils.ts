import { toast as sonnerToast } from 'sonner';

export const toast = (message: string, description?: string) => {
  return {
    success: () => sonnerToast.success(message, { description }),
    error: () => sonnerToast.error(message, { description }),
    info: () => sonnerToast.info(message, { description }),
    warning: () => sonnerToast.warning(message, { description }),
  };
};
