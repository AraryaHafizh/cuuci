interface SectionProps {
  title: string;
  description: string;
  className?: string;
}

const SectionInfo = ({ title, description, className = "" }: SectionProps) => {
  return (
    <div className={`space-y-5 ${className}`}>
      <h2 className="text-5xl font-bold">{title}</h2>
      <p className="text-lg font-light opacity-50">{description}</p>
    </div>
  );
};

export default SectionInfo;
