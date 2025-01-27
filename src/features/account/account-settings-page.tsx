'use client';

import SettingsTabs from '@/features/account/components/settings-tabs';
import { Heading } from '@/components/heading';

const AccountSettingsPage = () => {
  return (
    <div className="relative h-full">
      <Heading
        title="Налаштування"
        description="Тут ви можете ввести інформацію про себе, змінити пароль, створити організацію і додати авто"
      />
      <SettingsTabs />
    </div>
  );
};

export default AccountSettingsPage;
