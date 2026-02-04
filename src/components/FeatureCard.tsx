interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="card flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-coffee-brown mb-2">{title}</h3>
      <p className="text-sm text-coffee-brown/80">{description}</p>
    </div>
  );
}
