import { Progress } from '@/components/ui/progress';

interface ProfileProgressProps {
  progress: number;
}

const ProfileProgress = ({ progress }: ProfileProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Заповнення профілю</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
};

export default ProfileProgress;
