import React, { useState, useCallback } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Building2 } from 'lucide-react';
import { cn } from '@/utils/style-utils';

interface LogoUploadProps {
  initialLogo?: string;
  onLogoChange: (file: File | null) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  initialLogo,
  onLogoChange,
}) => {
  const [logo, setLogo] = useState(initialLogo);
  const [isDragging, setIsDragging] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: 'logo-dropzone',
  });

  const handleFileChange = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onLogoChange(file);
    },
    [onLogoChange],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        handleFileChange(file);
      }
    },
    [handleFileChange],
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    [],
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
    },
    [],
  );

  return (
    <div className="flex flex-col items-center">
      <div
        ref={setNodeRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'flex items-center justify-center w-32 h-32 rounded-lg cursor-pointer transition-all duration-200 ease-in-out',
          isDragging || isOver
            ? 'border-2 border-dashed border-primary'
            : 'border-2 border-dashed border-gray-300 hover:border-primary',
        )}
      >
        <label htmlFor="logo-input" className="w-full h-full cursor-pointer">
          <Avatar className="w-full h-full rounded-lg">
            <AvatarImage src={logo} alt="Логотип організації" />
            <AvatarFallback className="rounded-lg">
              <Building2
                size={32}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
            </AvatarFallback>
          </Avatar>
        </label>
        <input
          id="logo-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileChange(file);
            }
          }}
        />
      </div>
    </div>
  );
};

export default LogoUpload;
