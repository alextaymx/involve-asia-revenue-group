import toast, { ToastOptions } from 'react-hot-toast';

export const triggerToast = (
  message: string,
  type?: 'success' | 'error' | null,
  options?: Partial<ToastOptions>
) => {
  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  } else {
    toast(message, options);
  }
};
