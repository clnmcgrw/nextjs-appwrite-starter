import Link from 'next/link';
import { Flex, Box, Separator, Text, Link as TextLink } from '@radix-ui/themes';
import * as i18n from '@/lib/i18n';

type HelpLinksProps = {
  login?: boolean,
  signup?: boolean,
  recover?: boolean,
}

type HelpItemProps = {
  title: string
  label: string
  href: string
}

const t = i18n.EN.auth.help;

const HelpItem = ({ title, label, href }: HelpItemProps) => (
  <Flex align="center" gap="1" pb="1">
    <Text size="1" as="p" color="gray">{title}</Text>
    <TextLink asChild size="1" weight="bold">
      <Link href={href}>{label}</Link>
    </TextLink>
  </Flex>
);

const AuthHelpLinks = ({
  login = false,
  signup = false,
  recover = true,
}: HelpLinksProps) => {
  return (
    <Box pt="5">
      <Separator size="4" mb="5" />
      {login && <HelpItem title={t.login.text} label={t.login.linkText} href={t.login.href} />}
      {signup && <HelpItem title={t.signup.text} label={t.signup.linkText} href={t.signup.href} />}
      {recover && <HelpItem title={t.recover.text} label={t.recover.linkText} href={t.recover.href} />}
    </Box>
  );
};

export default AuthHelpLinks;
