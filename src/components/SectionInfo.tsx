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
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-bold lg:text-3xl 2xl:text-5xl">{title}</h2>
        {role != "" && (
          <p className="bg-primary/20 text-primary rounded-2xl px-4 py-1 text-xl">
            {role}
          </p>
        )}
      </div>
      <p className="font-light opacity-50 lg:text-lg">{description}</p>
    </div>
  );
};

export default SectionInfo;
