import { useSession } from 'next-auth/react';

const useAuth = () => {
  const { data, update } = useSession();

  return { user: data?.user, update };
};

export default useAuth;
