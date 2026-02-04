import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [isHowItWorksExpanded, setIsHowItWorksExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 animate-fade-in">
      <div className="text-center max-w-md">
        {/* Hero Section */}
        <div className="mb-8">
          <img 
            src="/src/assets/branding/coffee-logo.svg" 
            alt="Cozy Coffee Bingo logo" 
            className="mx-auto mb-6 w-32 h-32 md:w-40 md:h-40 animate-float" 
          />
          <h1 className="text-5xl md:text-6xl font-bold text-coffee-brown mb-3 leading-tight">
            Cozy Coffee Bingo
          </h1>
          <p className="text-xl text-coffee-brown/90 mb-2">
            Break the ice with bingo
          </p>
          <p className="text-sm text-coffee-brown/70 max-w-xs mx-auto">
            Find people who match the prompts and get five in a row to win
          </p>
        </div>

        {/* Compact How It Works Card */}
        <div className="card mb-8 text-left">
          <button
            onClick={() => setIsHowItWorksExpanded(!isHowItWorksExpanded)}
            className="w-full flex items-center justify-between font-semibold text-coffee-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee-brown"
            aria-expanded={isHowItWorksExpanded}
            aria-controls="how-it-works-content"
          >
            <h2 className="text-base">How it works</h2>
            <span className={`transition-transform duration-200 ${isHowItWorksExpanded ? 'rotate-180' : ''}`} aria-hidden="true">
              ▼
            </span>
          </button>
          
          <div
            id="how-it-works-content"
            className={`overflow-hidden transition-all duration-300 ${
              isHowItWorksExpanded ? 'max-h-48 mt-3' : 'max-h-0 md:max-h-48 md:mt-3'
            }`}
          >
            <ol className="text-coffee-brown/80 text-sm space-y-2 list-decimal list-inside">
              <li>Find people who match the prompts</li>
              <li>Tap a square when you find a match</li>
              <li>Get 5 in a row to win!</li>
            </ol>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={onStart}
          aria-label="Start playing Cozy Coffee Bingo"
          className="w-full bg-accent text-white font-bold py-5 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl active:scale-98 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee-brown animate-pulse-subtle"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
