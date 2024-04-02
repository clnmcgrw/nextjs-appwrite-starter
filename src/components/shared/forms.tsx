import { Box, Text, Callout } from '@radix-ui/themes';
import { CircleAlert } from 'lucide-react';
import style from '@/styles/modules/forms.module.css';

type ErrorType = string | false

type FieldProps = {
  error?: ErrorType
  children: React.ReactNode
}

interface FormProps extends React.ComponentProps<'form'> {
  error?: ErrorType
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
}

export const Field = ({ children, error }: FieldProps) => (
  <fieldset className={style.field}>
    {children}
    {Boolean(error) && (
      <Box pt="1">
        <Text size="1" color="red">{error}</Text>
      </Box>
    )}
  </fieldset>
);

export const Form = ({ children, onSubmit, error = false, ...rest }: FormProps) => {
  const onFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form {...rest} onSubmit={onFormSubmit}>
      {Boolean(error) && (
        <Box pb="2">
          <Callout.Root color="red">
            <Callout.Icon>
              <CircleAlert size={18} />
            </Callout.Icon>
            <Callout.Text size="1">{error}</Callout.Text>
          </Callout.Root>
        </Box>
      )}
      {children}
    </form>
  );
};
