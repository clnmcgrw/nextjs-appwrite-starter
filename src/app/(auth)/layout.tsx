'use client';
import { usePathname } from 'next/navigation';
import { Section, Flex } from '@radix-ui/themes';
import AuthRedirect from '@/components/auth/auth-redirect';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log('auth layout render...', pathname);
  return (
    <Section size="3">
      <Flex px="4" align="center" justify="center">
        <AuthRedirect to="/dashboard" logout={pathname === '/logout'}>
          {children}
        </AuthRedirect>
      </Flex>
    </Section>
  );
};

export default AuthLayout;