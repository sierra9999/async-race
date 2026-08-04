import { useState } from 'react';
import Button from '@/ui/Button/Button';
import { useCreateCarMutation } from '@/api/garageApi';
import { useAppSelector } from '@/store/hooks';
import selectPageRaceStatus from '@/store/raceSelectors';
import useRace from '@/features/race/useRace';
import { RANDOM_CARS_COUNT } from '@/constants';
import { generateRandomCars } from '@/utils/randomCars';
import type { Car } from '@/api/types';
import styles from './RaceControlPanel.module.css';

interface RaceControlPanelProps {
  isGarageEmpty: boolean;
  cars: Car[];
}

function RaceControlPanel({ isGarageEmpty, cars }: RaceControlPanelProps) {
  const [createCar] = useCreateCarMutation();
  const [isGenerating, setIsGenerating] = useState(false);
  const { startRace, resetRace } = useRace();
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const carIds = cars.map((car) => car.id);
  const pageStatus = useAppSelector((state) => selectPageRaceStatus(state, carIds));

  const raceDisabled = isRacing || pageStatus !== 'idle' || isGarageEmpty;
  const resetDisabled = pageStatus === 'idle' && !isRacing;

  const handleGenerateCars = async () => {
    setIsGenerating(true);
    const randomCars = generateRandomCars(RANDOM_CARS_COUNT);
    await Promise.allSettled(randomCars.map((car) => createCar(car).unwrap()));
    setIsGenerating(false);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.raceGroup}>
        <Button variant="primary" disabled={raceDisabled} onClick={() => startRace(cars)}>
          Race
        </Button>
        <Button disabled={resetDisabled} onClick={() => resetRace(carIds)}>
          Reset
        </Button>
      </div>
      <Button onClick={handleGenerateCars} disabled={isGenerating || isRacing}>
        Generate Cars
      </Button>
    </div>
  );
}

export default RaceControlPanel;
