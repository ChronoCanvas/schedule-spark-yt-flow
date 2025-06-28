
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  accept: string;
  onUpload: (files: File[]) => void;
  label: string;
  description?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  onUpload,
  label,
  description
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onUpload(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        onClick={handleClick}
        className="w-full border-gray-700 text-white hover:bg-gray-800 border-dashed"
      >
        <Upload className="w-4 h-4 mr-2" />
        {label}
      </Button>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
