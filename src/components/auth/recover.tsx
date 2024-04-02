'use client';
import { useState } from 'react';
import { Card, Box, Heading, Text, TextField, Button, Callout } from '@radix-ui/themes';
import { MailIcon } from 'lucide-react';
import { Form, Field } from '@/components/shared/forms';
import { useAuthStore } from '@/lib/hooks/use-auth-store';
import { getFormFieldData } from '@/lib/utils/utils';
import style from '@/styles/modules/auth.module.css';

const RecoverAuth = () => {
  const [email, setEmail] = useState('');
  const { loading, errors, recovering, createRecovery } = useAuthStore();

  const onFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = getFormFieldData(e);
    createRecovery(fields.email);
    setEmail(fields.email);
  };

  return (
    <Card className={style.authForm} size="4">
      <Box pb="4">
        <Heading size="7">Reset Password</Heading>
        <Text color="gray" size="2" as="p">
          {recovering
            ? 'Check your mail for a link to reset your password'
            : 'Enter your email below to recover your account'}
        </Text>
      </Box>
      {recovering ? (
        <Box py="3">
          <Callout.Root>
            <Callout.Icon><MailIcon /></Callout.Icon>
            <Callout.Text>
              Check your <strong>{email}</strong> mail account for a link to reset your password
            </Callout.Text>
          </Callout.Root>
        </Box>
      ) : (
        <Form onSubmit={onFormSubmit} error={errors.recovery}>
          <Field>
            <Text as="label" htmlFor="recover-email" size="1" weight="medium">Email Address</Text>
            <TextField.Root id="recover-email" placeholder="Email Address" type="email" name="email">
              <TextField.Slot>
                <MailIcon size={14} />
              </TextField.Slot>
            </TextField.Root>
          </Field>
          <Box pt="4" pb="1" style={{ textAlign: 'right' }}>
            <Button type="submit" size="2" loading={loading}>Reset Password</Button>
          </Box>
        </Form>
      )}
    </Card>
  );
};

export default RecoverAuth;
