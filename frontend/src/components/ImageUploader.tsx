import { useCallback, useMemo } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function ImageUploader({ onUpload }: { onUpload: (image: File) => void }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/*': [] },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div {...getRootProps({ style } as DropzoneRootProps)}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image file here...</p>
      ) : (
        <p>Drag and drop image, or click to select</p>
      )}
    </div>
  );
}

export default ImageUploader;
