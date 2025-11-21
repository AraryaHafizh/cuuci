interface SectionProps {
  title: string;
  description: string;
  className?: string;
  role?: string;
}

const SectionInfo = ({
  title,
  description,
  className = "",
  role = "",
}: SectionProps) => {
  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex items-center gap-5">
        <h2 className="text-5xl font-bold">{title}</h2>
        {role != "" && (
          <p className="bg-primary/20 text-primary rounded-2xl px-4 py-1 text-xl">
            {role}
          </p>
        )}
      </div>
      <p className="text-lg font-light opacity-50">{description}</p>
    </div>
  );
};

export default SectionInfo;
