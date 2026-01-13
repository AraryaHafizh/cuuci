interface SectionProps {
  title: string;
  description: string;
  className?: string;
  role?: string;
  loading?: boolean;
}

const SectionInfo = ({
  title,
  description,
  className = "",
  role = "",
  loading = false,
}: SectionProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:justify-start md:gap-5">
        {loading ? (
          <div className="bg-foreground/10 h-8 w-82 animate-pulse rounded-lg lg:h-10 2xl:h-14" />
        ) : (
          <h2 className="w-50 text-2xl font-bold md:w-auto lg:text-3xl 2xl:text-5xl">
            {title}
          </h2>
        )}

        {loading ? (
          <div className="bg-foreground/10 h-8 w-42 animate-pulse rounded-lg lg:h-10 2xl:h-14" />
        ) : (
          role && (
            <p className="bg-foreground/10 text-primary w-fit rounded-2xl px-3 py-1 text-sm lg:text-base 2xl:text-xl">
              {role}
            </p>
          )
        )}
      </div>

      <p className="font-light opacity-50 lg:text-lg">{description}</p>
    </div>
  );
};

export default SectionInfo;
