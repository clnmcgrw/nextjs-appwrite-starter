'use client';
import { redirect } from 'next/navigation';
import { TextField, Box, Card, Heading, Text, Button } from '@radix-ui/themes';
import { MailIcon, KeyRound } from 'lucide-react';
import { Form, Field } from '@/components/shared/forms';
import AuthHelpLinks from '@/components/auth/help-links';
import { getFormFieldData } from '@/lib/utils/utils';
import { useAuthStore } from '@/lib/hooks/use-auth-store';
import style from '@/styles/modules/auth.module.css';

const SignUp = () => {
  const { user, session, loading, errors, signUpViaEmail } = useAuthStore();
  
  const onFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const fields = getFormFieldData(event);
    signUpViaEmail(fields.email, fields.password, fields.verify);
  };

  return (
    <Card className={style.authForm} size="4">
      <Box pb="4">
        <Heading size="7">Sign Up</Heading>
        <Text color="gray" size="2" as="p">Create your account to get started</Text>
      </Box>
      <Form onSubmit={onFormSubmit} error={errors.signup}>
        <Field>
          <Text as="label" htmlFor="signup-email" size="1" weight="medium">Email Address</Text>
          <TextField.Root id="signup-email" placeholder="Email Address" type="email" name="email">
            <TextField.Slot>
              <MailIcon size={14} />
            </TextField.Slot>
          </TextField.Root>
        </Field>
        <Field>
          <Text as="label" htmlFor="signup-password" size="1" weight="medium">Password</Text>
          <TextField.Root id="signup-password" placeholder="Create Password" type="password" name="password">
            <TextField.Slot>
              <KeyRound size={14} />
            </TextField.Slot>
          </TextField.Root>
        </Field>
        <Field>
          <Text as="label" htmlFor="signup-verify" size="1" weight="medium">Verify Password</Text>
          <TextField.Root id="signup-verify" placeholder="Verify Password" type="password" name="verify">
            <TextField.Slot>
              <KeyRound size={14} />
            </TextField.Slot>
          </TextField.Root>
        </Field>
        <Box pt="4" pb="1" style={{ textAlign: 'right' }}>
          <Button type="submit" size="2" loading={loading}>Create Account</Button>
        </Box>
      </Form>

      <AuthHelpLinks login />
    </Card>
  )
};

export default SignUp;
