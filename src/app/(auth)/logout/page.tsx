'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@radix-ui/themes';
import { useAuthStore } from '@/lib/hooks/use-auth-store';

const Logout = () => {
  const { push } = useRouter();
  const { logOut } = useAuthStore();

  useEffect(() => {
    logOut().then(() => {
      console.log('logging out...');
      push('/login');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Heading align="center">✌️ Logging Out...</Heading>
  );
};

export default Logout;
