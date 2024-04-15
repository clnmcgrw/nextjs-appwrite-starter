'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { Flex, Spinner } from '@radix-ui/themes';
import { useAuthStore } from '@/lib/hooks/use-auth-store';

type AuthGaurdProps = {
  to?: string
  condition?: boolean
  logout?: boolean
  children: React.ReactNode
}

// TODO - 
// implement server-side (might need to cookie JWT)
// and/or, persist zustand account store for quicker check

const Loading = () => (
  <Flex align="center" justify="center" py="8" px="4">
    <Spinner />
  </Flex>
);

export const useRequireAuth = (to: string) => {
  const { ready, getCurrentAuth, isLoggedIn } = useAuthStore();
  if (ready && !isLoggedIn()) {
    redirect(to);
  }
  useEffect(() => {
    getCurrentAuth();
  }, [getCurrentAuth]);
};

const AuthRedirect = ({
  to = '/dashboard',
  condition = true,
  logout = false,
  children,
}: AuthGaurdProps) => {
  const { ready, getCurrentAuth, isLoggedIn } = useAuthStore();

  if (ready && isLoggedIn() === condition && !logout) {
    redirect(to);
  }

  useEffect(() => {
    if (!logout) {
      getCurrentAuth();
    }
  }, [getCurrentAuth, logout]);

  return ready ? children : <Loading />;
};

export default AuthRedirect;
