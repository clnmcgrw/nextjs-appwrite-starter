

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


export function getFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  };
  const kilobytes = Math.log(bytes) / Math.log(1024);
  const index = Math.min(kilobytes, sizes.length - 1);
  const suffix = sizes[index];
  if (index === 0) {
    return `${bytes} ${suffix}`;
  }
  return `${(bytes / (1024 ** index)).toFixed(1)} ${suffix}`;
};
