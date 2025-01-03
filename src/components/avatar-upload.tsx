import React, { useState, useCallback } from 'react';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';
import { cn } from '@/utils/style-utils';

interface AvatarUploadProps {
  initialAvatar?: string;
  onAvatarChange: (file: File | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  initialAvatar,
  onAvatarChange,
}) => {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [isDragging, setIsDragging] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: 'avatar-dropzone',
  });

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  });

  const handleFileChange = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onAvatarChange(file);
    },
    [onAvatarChange],
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
    <div
      ref={setNodeRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'flex items-center justify-center w-32 h-32 rounded-full cursor-pointer transition-all duration-200 ease-in-out',
        isDragging || isOver
          ? 'border-2 border-dashed border-primary '
          : 'border-2 border-dashed border-gray-300 hover:border-primary',
      )}
    >
      <label htmlFor="avatar-input" className="w-full h-full cursor-pointer">
        <Avatar className="w-full h-full">
          <AvatarImage src={avatar} alt="Avatar" />
          <AvatarFallback>
            <UserRound
              size={32}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
          </AvatarFallback>
        </Avatar>
      </label>
      <input
        id="avatar-input"
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
  );
};

export default AvatarUpload;
