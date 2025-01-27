interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="grid gap-1 mb-2">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}
      <div className="w-full h-[1px] bg-muted" />
    </div>
  );
};
