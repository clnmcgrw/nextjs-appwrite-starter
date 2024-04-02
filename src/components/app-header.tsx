'use client';
import Link from 'next/link';
import { ArrowRight, CircleUser, LogOut, GaugeCircle } from 'lucide-react';
import { Box, Heading, Button, Link as TextLink, Popover, Avatar, Separator } from '@radix-ui/themes';
import { useAuthStore } from '@/lib/hooks/use-auth-store';
import style from '@/styles/modules/header.module.css';

const LoggedOutNav = () => (
  <ul className={style.navList}>
    <li>
      <TextLink asChild size="2" weight="bold" color="gray">
        <Link href="/login">Log in</Link>
      </TextLink>
    </li>
    <li>
      <Button asChild>
        <Link href="/signup">
          Sign Up
          <ArrowRight size={16} />
        </Link>
      </Button>
    </li>
  </ul>
);

const LoggedInNav = () => {
  const { user } = useAuthStore();

  return (
    <ul className={style.navList}>
      <li>
        <TextLink asChild size="2" weight="bold" color="gray">
          <Link href="/dashboard">Dashboard</Link>
        </TextLink>
      </li>
      <li>
        <Popover.Root>
          <Popover.Trigger>
            <button className={style.avatarBtn}>
              <Avatar fallback={<CircleUser />} />
            </button>
          </Popover.Trigger>
          <Popover.Content width="220px">
            <Box>
              <Heading size="2">
                <span>{user?.email}</span>
              </Heading>
            </Box>
            <Separator mt="2" mb="2" size="4" />
            <nav>
              <ul>
                <li>
                  <TextLink asChild weight="bold" size="2">
                    <Link href="/account">My Account</Link>
                  </TextLink>
                </li>
                <li>
                  <TextLink asChild weight="bold" size="2">
                    <Link href="/account">Settings</Link>
                  </TextLink>
                </li>
              </ul>
            </nav>
            <Separator mt="2" mb="3" size="4" />
            <Box>
              <Button asChild>
                <Link href="/logout">Log Out <LogOut size={16} /></Link>
              </Button>
            </Box>
          </Popover.Content>
        </Popover.Root>
      </li>
    </ul>
  );
};

const AppHeader = ({}) => {
  const { isLoggedIn } = useAuthStore();
  const loggedIn = isLoggedIn();
 
  return (
    <header className={style.header}>
      <TextLink asChild weight="bold" size="3">
        <Link href="/" rel="home">
          NextJS & Appwrite
        </Link>
      </TextLink>

      <nav role="navigation">
        {loggedIn ? (
          <LoggedInNav />
        ) : (
          <LoggedOutNav />
        )}
      </nav>
    </header>
  );
};

export default AppHeader
