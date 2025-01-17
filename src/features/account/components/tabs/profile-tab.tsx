import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ProfileProgress from '@/features/account/components/profile-progress';
import UpdateProfileForm from '@/features/account/components/forms/update-profile-form';

const ProfileTab = () => {
  const [progress, setProgress] = useState(0);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Профіль</h2>
      <ProfileProgress progress={progress} />
      <UpdateProfileForm setProgress={setProgress} />
    </Card>
  );
};

export default ProfileTab;
