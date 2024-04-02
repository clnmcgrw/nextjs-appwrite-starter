'use client';
import { TextField, Box, Card, Heading, Text, Button } from '@radix-ui/themes';
import { MailIcon, KeyRound } from 'lucide-react';
import { Form, Field } from '@/components/shared/forms';
import AuthHelpLinks from '@/components/auth/help-links';
import { getFormFieldData } from '@/lib/utils/utils';
import { useAuthStore } from '@/lib/hooks/use-auth-store';
import style from '@/styles/modules/auth.module.css';

const LogIn = () => {
  const { user, session, loading, errors, logInViaEmail } = useAuthStore();

  const onFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const fields = getFormFieldData(event);
    logInViaEmail(fields.email, fields.password);
  };

  return (
    <Card className={style.authForm} size="4">
      <Box pb="4">
        <Heading size="7">Log In</Heading>
        <Text color="gray" size="2" as="p">Access your existing account</Text>
      </Box>
      <Form onSubmit={onFormSubmit} error={errors.login}>
        <Field>
          <Text as="label" htmlFor="signin-email" size="1" weight="medium">Email Address</Text>
          <TextField.Root id="signin-email" placeholder="Email Address" type="email" name="email">
            <TextField.Slot>
              <MailIcon size={14} />
            </TextField.Slot>
          </TextField.Root>
        </Field>
        <Field>
          <Text as="label" htmlFor="signup-password" size="1" weight="medium">Password</Text>
          <TextField.Root id="signup-password" placeholder="Password" type="password" name="password">
            <TextField.Slot>
              <KeyRound size={14} />
            </TextField.Slot>
          </TextField.Root>
        </Field>
        <Box pt="4" pb="1" style={{ textAlign: 'right' }}>
          <Button type="submit" size="2" loading={loading}>Log In</Button>
        </Box>
      </Form>

      <AuthHelpLinks signup />
    </Card>
  )
};

export default LogIn;
