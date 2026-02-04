interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="max-w-2xl">
        <img 
          src="/src/assets/branding/coffee-logo.svg" 
          alt="Cozy Coffee" 
          className="mx-auto mb-6 w-32 h-32 drop-shadow-lg"
        />
        <h1 className="text-5xl font-bold text-coffee-brown mb-3 leading-tight">
          Cozy Coffee Bingo
        </h1>
        <p className="text-xl text-coffee-brown/70 mb-8 font-light">
          Break the ice with a warm, social bingo experience
        </p>
        <button
          onClick={onStart}
          className="bg-accent text-white font-semibold py-4 px-10 rounded-lg text-lg active:bg-accent-light transition-all hover:shadow-lg inline-block"
          aria-label="Start playing Cozy Coffee Bingo"
        >
          Start Game
        </button>
      </div>
    </section>
  );
}
