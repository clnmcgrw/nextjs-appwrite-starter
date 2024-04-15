import { useState } from 'react';
import { Text, Box, Button } from '@radix-ui/themes';
import { CloudUpload } from 'lucide-react';
import { getFileSize } from '@/lib/utils/utils';
import style from '@/styles/modules/file-input.module.css';

type FileInputProps = {
  id: string
  name: string
  label: string
  button: string | false
  accept: string
  multiple: boolean
  onError: () => void
}

interface FileItem {
  name: string
  size: number
  type: string
}


const FileInput = ({
  id,
  name = 'file',
  label = 'Drop Files Here',
  button = 'Open Dialog',
  accept = '*',
  multiple = true,
  onError = () => {},
}: FileInputProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (!inputFiles) return;

    const filesArray = Array.from(inputFiles);
    console.log('files: ', filesArray);
    setFiles(filesArray);
  };

  const removeFile = (name: string) => {}

  return (
    <div className={style.root}>

      <div className={style.dropzone} tabIndex={0}>
        <label className={style.label} htmlFor={id}>
          <div className={style.content}>
            <div className={style.icon}>
              <CloudUpload size={32} strokeWidth={1.65} />
            </div>
            <Text as="p" size="2" weight="medium" color="gray" mb="2">{label}</Text>
            {Boolean(button) && (
              <Button>{button}</Button>
            )}
          </div>
        </label>
        
        <div className={style.input}>
          <input
            type="file"
            id={id}
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
          />
        </div>
      </div>

      {files && files.length > 0 && (
        <ul className={style.preview}>
          {files.map((file: FileItem, index: number) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default FileInput;
