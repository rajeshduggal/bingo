import type { AccessibilityPreferences } from '../types';
import { LandingHero } from './LandingHero';
import { Features } from './Features';
import { AccessibilitySettings } from './AccessibilitySettings';

interface StartScreenProps {
  onStart: () => void;
  accessibilityPreferences: AccessibilityPreferences;
  onPreferencesChange: (preferences: Partial<AccessibilityPreferences>) => void;
}

export function StartScreen({ onStart, accessibilityPreferences, onPreferencesChange }: StartScreenProps) {
  return (
    <div className="flex flex-col min-h-full">
      <LandingHero onStart={onStart} />
      <Features />
      <AccessibilitySettings 
        preferences={accessibilityPreferences} 
        onPreferencesChange={onPreferencesChange} 
      />
    </div>
  );
}
