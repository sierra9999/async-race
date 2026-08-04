import Button from '@/ui/Button/Button';
import { useDeleteCarMutation } from '@/api/garageApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEditForm, resetEditForm } from '@/store/garageUiSlice';
import { setCarState, type CarRaceStatus } from '@/store/raceSlice';
import { startCarAnimation, resetCarPosition } from '@/features/race/animation';
import type { Car } from '@/api/types';
import CarTrack from '../CarTrack/CarTrack';
import styles from './CarRow.module.css';

const DURATION_MS = 3000;

const STOP_DISABLED_STATES: readonly CarRaceStatus[] = ['idle', 'starting', 'stopping'];
interface SelectRemoveStackProps {
  disabled: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

function SelectRemoveStack({ disabled, onSelect, onRemove }: SelectRemoveStackProps) {
  return (
    <div className={styles.stack}>
      <Button disabled={disabled} onClick={onSelect}>
        Select
      </Button>
      <Button variant="danger" disabled={disabled} onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}

interface EngineStackProps {
  carState: CarRaceStatus;
  onStart: () => void;
  onStop: () => void;
}

function EngineStack({ carState, onStart, onStop }: EngineStackProps) {
  return (
    <div className={styles.stack}>
      <Button variant="primary" disabled={carState !== 'idle'} onClick={onStart}>
        A
      </Button>
      <Button disabled={STOP_DISABLED_STATES.includes(carState)} onClick={onStop}>
        B
      </Button>
    </div>
  );
}
interface CarRowProps {
  car: Car;
}
function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const selectedCarId = useAppSelector((state) => state.garageUi.editForm.carId);
  const carState = useAppSelector((state) => state.race.carStates[car.id] ?? 'idle');
  const rowLocked = carState !== 'idle';
  const handleSelect = () => {
    dispatch(setEditForm({ carId: car.id, name: car.name, color: car.color }));
  };
  const handleRemove = async () => {
    try {
      await deleteCar(car.id).unwrap();
      if (selectedCarId === car.id) {
        dispatch(resetEditForm());
      }
    } catch {
      // mutation's error state reports the failure
    }
  };

  const handleStart = () => {
    dispatch(setCarState({ id: car.id, status: 'driving' }));
    startCarAnimation(car.id, DURATION_MS, () => {
      dispatch(setCarState({ id: car.id, status: 'finished' }));
    });
  };
  const handleStop = () => {
    resetCarPosition(car.id);
    dispatch(setCarState({ id: car.id, status: 'idle' }));
  };
  return (
    <li className={styles.row}>
      <SelectRemoveStack disabled={rowLocked} onSelect={handleSelect} onRemove={handleRemove} />
      <EngineStack carState={carState} onStart={handleStart} onStop={handleStop} />
      <span className={styles.name}>{car.name}</span>
      <CarTrack carId={car.id} color={car.color} />
    </li>
  );
}

export default CarRow;
