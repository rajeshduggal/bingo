import { FeatureCard } from './FeatureCard';
import { BoardPreview } from './BoardPreview';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center min-h-full p-6 overflow-y-auto">
      {/* Hero Section */}
      <div className="text-center max-w-4xl w-full mb-8 hero-fade-in">
        <img 
          src="/src/assets/branding/coffee-logo.svg" 
          alt="Cozy Coffee" 
          className="mx-auto mb-6 w-32 h-32 hero-logo-bounce" 
        />
        <h1 className="text-5xl md:text-6xl font-bold text-coffee-brown mb-3 hero-title-slide">
          Cozy Coffee Bingo
        </h1>
        <p className="text-xl text-coffee-brown/80 mb-8 hero-subtitle-slide">
          A warm social bingo experience
        </p>
      </div>

      {/* Feature Cards */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold text-coffee-brown text-center mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 feature-cards-stagger">
          <div className="feature-card-1">
            <FeatureCard
              icon="🎯"
              title="Find Matches"
              description="Mingle and find people who match the questions on your board"
            />
          </div>
          <div className="feature-card-2">
            <FeatureCard
              icon="✓"
              title="Mark Squares"
              description="Tap a square when you find someone who matches the prompt"
            />
          </div>
          <div className="feature-card-3">
            <FeatureCard
              icon="🎉"
              title="Get Bingo!"
              description="Complete 5 in a row - horizontally, vertically, or diagonally"
            />
          </div>
        </div>
      </div>

      {/* Board Preview */}
      <div className="w-full max-w-4xl mb-10 board-preview-fade">
        <h2 className="text-2xl font-semibold text-coffee-brown text-center mb-6">
          Your Bingo Board Preview
        </h2>
        <BoardPreview />
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-sm cta-fade-in">
        <button
          onClick={onStart}
          className="w-full bg-accent text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-accent-light transition-all hover:scale-105 hover:shadow-xl"
        >
          Start Game
        </button>
      </div>

      <div className="h-12"></div>
    </div>
  );
}
