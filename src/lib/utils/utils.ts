

// Get field values from form event
export const getFormFieldData = (
  event: React.SyntheticEvent<HTMLFormElement>
): { [key: string]: string } => {
  const formData = new FormData(event.target as HTMLFormElement)
  const fields = Array.from(formData.entries());
  const formFieldData = fields.reduce((result, field) => {
    Object.assign(result, { [field[0]]: field[1] })
    return result
  }, {});
  return formFieldData;
};
