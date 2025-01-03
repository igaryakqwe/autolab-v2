'use client';

import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import ProfileProgress from '@/features/account/components/profile-progress';
import UpdateProfileForm from '@/features/account/components/forms/update-profile-form';

const ProfileTab = () => {
  const [progress, setProgress] = useState(0);

  return (
    <DndContext
      sensors={useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
      )}
    >
      <Card className="p-6">
        <ProfileProgress progress={progress} />
        <UpdateProfileForm setProgress={setProgress} />
      </Card>
    </DndContext>
  );
};

export default ProfileTab;
