'use client';
import { useSearchParams, redirect } from 'next/navigation';
import { Card, Box, Heading, Text, TextField, Button } from '@radix-ui/themes';
import { KeyRound } from 'lucide-react';
import { Form, Field } from '@/components/shared/forms';
import { useAuthStore } from '@/lib/hooks/use-auth-store';
import { getFormFieldData } from '@/lib/utils/utils';
import style from '@/styles/modules/auth.module.css';

const ResetAuth = () => {
  const { loading, errors, confirmRecovery } = useAuthStore();
  const searchParams = useSearchParams();

  if (!searchParams.has('userId') || !searchParams.has('secret')) {
    redirect('/login');
  }
  
  const onFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = getFormFieldData(e);

    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    if (userId && secret) {
      confirmRecovery(userId, secret, fields.password, fields.verify);
    }
  };

  return (
    <Card className={style.authForm} size="4">
      <Box pb="4">
        <Heading size="7">Change Password</Heading>
        <Text color="gray" size="2" as="p">Enter a new password below</Text>
      </Box>
      <Form onSubmit={onFormSubmit} error={errors.recovery}>
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
          <Button type="submit" size="2" loading={loading}>Change Password</Button>
        </Box>
      </Form>
    </Card>
  );
};

export default ResetAuth;
