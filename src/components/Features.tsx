export function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Simple Rules',
      description: 'Find people who match the questions on your board',
    },
    {
      icon: '👥',
      title: 'Social Fun',
      description: 'Connect with others in a relaxed, engaging way',
    },
    {
      icon: '🏆',
      title: 'Quick to Win',
      description: 'Get 5 in a row to celebrate your bingo!',
    },
  ];

  return (
    <section className="py-12 px-6" role="region" aria-label="Game features">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-coffee-brown mb-8 text-center">
          How to Play
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="card text-center"
            >
              <div className="text-4xl mb-3" role="img" aria-label={`${feature.title} icon`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-coffee-brown mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-coffee-brown/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="card mt-8 max-w-xl mx-auto">
          <h3 className="font-semibold text-coffee-brown mb-3 text-center">Game Rules</h3>
          <ul className="text-left text-coffee-brown/80 text-sm space-y-2 list-none">
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>Each square contains a question about someone you might meet</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>Tap a square when you find someone who matches that description</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>The center square is free - it starts marked for you</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>Get 5 marked squares in a row (horizontal, vertical, or diagonal) to win!</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
