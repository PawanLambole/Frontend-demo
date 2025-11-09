import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, MessageCircle, Map } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (data: { learningGoal: string; experience: string[]; timeCommitment: string }) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [learningGoal, setLearningGoal] = useState('');
  const [experience, setExperience] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState('');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ learningGoal, experience, timeCommitment });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) return learningGoal.trim().length > 0;
    if (step === 2) return experience.length > 0;
    if (step === 3) return timeCommitment.length > 0;
    return false;
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/Sahayak%20AI%20logo.png" alt="Sahayak AI" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to PathWise</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-accent' : 'text-gray-500'}`}>
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Goal</span>
            </div>
            <div className="h-1 w-24 bg-dark-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-accent' : 'text-gray-500'}`}>
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Questions</span>
            </div>
            <div className="h-1 w-24 bg-dark-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: step >= 3 ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-accent' : 'text-gray-500'}`}>
              <Map className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Roadmap</span>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400">
            Progress: {step}/3 <span className="text-accent">• {Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          key={step}
          className="bg-dark-secondary rounded-2xl p-8 border border-gray-800"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Learning Goal */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-accent/20 rounded-full">
                  <Target className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Question 1 of 3</h2>
              <p className="text-gray-400 text-center mb-8">Help us personalize your learning experience</p>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  What is your learning goal?
                </label>
                <input
                  type="text"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  placeholder="e.g., I want to become a Software Developer"
                  className="w-full px-4 py-3 bg-dark-tertiary border border-gray-700 rounded-lg focus:outline-none focus:border-accent transition-colors text-white"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 2: Programming Languages */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-accent/20 rounded-full">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Question 2 of 3</h2>
              <p className="text-gray-400 text-center mb-8">Help us personalize your learning experience</p>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  Which programming languages are you already familiar with?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Ruby', 'Go', 'None'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        if (lang === 'None') {
                          setExperience(['None']);
                        } else {
                          setExperience((prev) =>
                            prev.includes(lang)
                              ? prev.filter((l) => l !== lang && l !== 'None')
                              : prev.filter((l) => l !== 'None').concat(lang)
                          );
                        }
                      }}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        experience.includes(lang)
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-dark-tertiary border-gray-700 text-gray-300 hover:border-accent/50'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Time Commitment */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-accent/20 rounded-full">
                  <Map className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Question 3 of 3</h2>
              <p className="text-gray-400 text-center mb-8">Help us personalize your learning experience</p>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  How much time can you dedicate to learning per week?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: '1-5', label: '1-5 hours/week' },
                    { value: '5-10', label: '5-10 hours/week' },
                    { value: '10-20', label: '10-20 hours/week' },
                    { value: '20+', label: '20+ hours/week' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTimeCommitment(option.value)}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        timeCommitment === option.value
                          ? 'bg-accent/20 border-accent text-accent'
                          : 'bg-dark-tertiary border-gray-700 text-gray-300 hover:border-accent/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="flex-1 px-6 py-3 bg-dark-tertiary text-gray-300 border border-gray-700 rounded-lg font-medium hover:bg-dark-primary transition-all"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                isStepValid()
                  ? 'bg-gradient-to-r from-accent to-accent-light text-dark-primary hover:shadow-lg hover:shadow-accent/30'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {step === 3 ? 'Create Roadmap' : 'Next'}
            </button>
          </div>
        </motion.div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Progress: {step}/3 • {Math.round(progress)}% complete</p>
        </div>
      </motion.div>
    </div>
  );
}
