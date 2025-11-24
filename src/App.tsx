import { useState, useRef } from 'react';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { FeedbackBar } from './components/layout/FeedbackBar';
import { LevelCard } from './components/level/LevelCard';
import { InteractionCard } from './components/level/InteractionCard';
import { ExplanationCard } from './components/explanation/ExplanationCard';
import { useStore } from './store/useStore';
import confetti from 'canvas-confetti';
import { worlds } from './data/worlds';
import { type CodeBlock } from './types';

function App() {
  const { getCurrentLevel, setConsoleOutput, clearConsole, currentWorldId, currentLevelId, setCurrentLevel, consoleStatus } = useStore();
  const [isChecking, setIsChecking] = useState(false);

  // Store the current interaction state
  const interactionStateRef = useRef<{ blocks: CodeBlock[]; selectedOption: number | null }>({
    blocks: [],
    selectedOption: null
  });

  const level = getCurrentLevel();

  const handleStateChange = (state: { blocks: CodeBlock[]; selectedOption: number | null }) => {
    interactionStateRef.current = state;
  };

  const handleCheck = () => {
    if (!level) return;
    setIsChecking(true);

    const { blocks, selectedOption } = interactionStateRef.current;
    let isSuccess = false;

    if (level.type === 'parsons' && level.parsonsData) {
      const currentOrder = blocks.map((b) => b.id).join(',');
      const correctOrder = level.parsonsData.solutionIds.join(',');
      isSuccess = currentOrder === correctOrder;
    } else if (level.type === 'fill_in' && level.fillInData) {
      isSuccess = selectedOption === level.fillInData.correctOptionIndex;
    } else if (level.type === 'choice' && level.choiceData) {
      isSuccess = selectedOption === level.choiceData.correctOptionIndex;
    }

    if (isSuccess) {
      setConsoleOutput([level.successMessage], 'success');
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setConsoleOutput([level.failureMessage], 'error');
    }

    setIsChecking(false);
  };

  const handleContinue = () => {
    // Move to next level
    const world = worlds.find((w) => w.id === currentWorldId);
    if (!world) return;

    const currentIndex = world.levels.findIndex((l) => l.id === currentLevelId);
    if (currentIndex < world.levels.length - 1) {
      setCurrentLevel(currentWorldId, world.levels[currentIndex + 1].id);
    }
    clearConsole();
  };

  const handleRetry = () => {
    clearConsole();
  };

  return (
    <Layout
      header={<Header />}
      content={
        <>
          <LevelCard />
          <InteractionCard onStateChange={handleStateChange} />
          {consoleStatus === 'success' && <ExplanationCard />}
        </>
      }
      feedbackBar={
        <FeedbackBar
          onCheck={handleCheck}
          onContinue={handleContinue}
          onRetry={handleRetry}
          isChecking={isChecking}
        />
      }
    />
  );
}

export default App;
