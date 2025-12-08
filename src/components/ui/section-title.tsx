export const SectionTitle = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  return <p className={`text-sm lg:text-base ${className}`}>{title}</p>;
};
