'use client';
import { Section, Box, Text, Heading } from '@radix-ui/themes';
import AuthRedirect from '@/components/auth/auth-redirect';
import { useAuthStore } from '@/lib/hooks/use-auth-store';

const Dashboard = () => {
  const user = useAuthStore(store => store.user);

  return (
    <Section size="4">
      <Box px="4">
        <Heading>Dashboard Page</Heading>
        <Text>Logged in as {user?.email}</Text>
      </Box>
    </Section>
  );
};

export default Dashboard;
