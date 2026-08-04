import { useState } from 'react';
import Button from '@/ui/Button/Button';
import { useCreateCarMutation } from '@/api/garageApi';
import { RANDOM_CARS_COUNT } from '@/constants';
import { generateRandomCars } from '@/utils/randomCars';
import styles from './RaceControlPanel.module.css';

function RaceControlPanel() {
  const [createCar] = useCreateCarMutation();
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerateCars = async () => {
    setIsGenerating(true);
    const randomCars = generateRandomCars(RANDOM_CARS_COUNT);
    await Promise.allSettled(randomCars.map((car) => createCar(car).unwrap()));
    setIsGenerating(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.raceGroup}>
        <Button variant="primary">Race</Button>
        <Button>Reset</Button>
      </div>
      <Button onClick={handleGenerateCars} disabled={isGenerating}>
        Generate Cars
      </Button>
    </div>
  );
}

export default RaceControlPanel;
