import Button from '@/ui/Button/Button';
import { useDeleteCarMutation } from '@/api/garageApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEditForm, resetEditForm } from '@/store/garageUiSlice';
import { startCarAnimation, resetCarPosition } from '@/features/race/animation';
import type { Car } from '@/api/types';
import CarTrack from '../CarTrack/CarTrack';
import styles from './CarRow.module.css';

const TEMP_DURATION_MS = 3000;

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const selectedCarId = useAppSelector((state) => state.garageUi.editForm.carId);
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
      // Delete errors surface in mutation state
    }
  };

  return (
    <li className={styles.row}>
      <div className={styles.stack}>
        <Button onClick={handleSelect}>Select</Button>
        <Button variant="danger" onClick={handleRemove}>
          Remove
        </Button>
      </div>
      <div className={styles.stack}>
        <Button
          variant="primary"
          onClick={() => startCarAnimation(car.id, TEMP_DURATION_MS, () => {})}
        >
          A
        </Button>
        <Button onClick={() => resetCarPosition(car.id)}>B</Button>
      </div>
      <span className={styles.name}>{car.name}</span>
      <CarTrack carId={car.id} color={car.color} />
    </li>
  );
}

export default CarRow;
