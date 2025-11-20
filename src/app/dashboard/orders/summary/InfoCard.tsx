interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  title?: string;
  value: string;
}

export function InfoCard({ icon, label, title, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 font-light">
      {icon}
      <div>
        <p className="text-sm opacity-50">{label}</p>
        <p className="font-medium">{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}
