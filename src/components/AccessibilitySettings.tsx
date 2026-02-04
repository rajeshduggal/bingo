import type { AccessibilityPreferences } from '../types';

interface AccessibilitySettingsProps {
  preferences: AccessibilityPreferences;
  onPreferencesChange: (preferences: Partial<AccessibilityPreferences>) => void;
}

export function AccessibilitySettings({ preferences, onPreferencesChange }: AccessibilitySettingsProps) {
  const fontSizeOptions: Array<{ value: AccessibilityPreferences['fontSize']; label: string }> = [
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' },
  ];

  return (
    <section 
      className="py-12 px-6 bg-coffee-brown/5" 
      role="region" 
      aria-label="Accessibility settings"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-coffee-brown mb-6 text-center">
          Accessibility Settings
        </h2>
        <div className="card">
          <div className="space-y-6">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label 
                htmlFor="high-contrast-toggle" 
                className="font-semibold text-coffee-brown flex-1"
              >
                <span className="block mb-1">High Contrast Mode</span>
                <span className="text-sm font-normal text-coffee-brown/70">
                  Increases contrast for better visibility
                </span>
              </label>
              <button
                id="high-contrast-toggle"
                role="switch"
                aria-checked={preferences.highContrast}
                onClick={() => onPreferencesChange({ highContrast: !preferences.highContrast })}
                className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-syrup focus:ring-offset-2 ${
                  preferences.highContrast ? 'bg-amber-syrup' : 'bg-coffee-brown/20'
                }`}
              >
                <span className="sr-only">
                  {preferences.highContrast ? 'Disable' : 'Enable'} high contrast mode
                </span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.highContrast ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Font Size Selection */}
            <fieldset>
              <legend className="font-semibold text-coffee-brown mb-3">
                Font Size
              </legend>
              <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Font size selection">
                {fontSizeOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all focus-within:ring-2 focus-within:ring-amber-syrup focus-within:ring-offset-2 ${
                      preferences.fontSize === option.value
                        ? 'border-amber-syrup bg-amber-syrup/10 font-semibold text-coffee-brown'
                        : 'border-coffee-brown/20 bg-white text-coffee-brown/70 hover:border-amber-syrup/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fontSize"
                      value={option.value}
                      checked={preferences.fontSize === option.value}
                      onChange={() => onPreferencesChange({ fontSize: option.value })}
                      className="sr-only"
                      aria-label={`Set font size to ${option.label}`}
                    />
                    <span className="block text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="text-xs text-coffee-brown/60 text-center pt-2">
              Your preferences are saved automatically and will persist across sessions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
