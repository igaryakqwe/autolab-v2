import { cn } from '@/utils/style-utils';

interface LicencePlateProps {
  plateNumber: string;
  className?: string;
}

const LicencePlate = ({ plateNumber, className }: LicencePlateProps) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 w-fit border-2 border-gray-700 dark:border-gray-600 rounded px-3 py-1 flex items-center gap-2 shadow-sm dark:shadow-gray-900/20',
        className,
      )}
    >
      <div className="w-4 h-3 border border-gray-300 dark:border-gray-500 overflow-hidden">
        <div className="w-full h-1/2 bg-blue-500"></div>
        <div className="w-full h-1/2 bg-yellow-400"></div>
      </div>
      <span className="font-mono font-bold text-sm text-black dark:text-gray-100">
        {plateNumber}
      </span>
    </div>
  );
};

export default LicencePlate;
