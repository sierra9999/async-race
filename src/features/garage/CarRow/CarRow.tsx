import Button from '@/ui/Button/Button';
import { useAppDispatch } from '@/store/hooks';
import { setEditForm } from '@/store/garageUiSlice';
import type { Car } from '@/api/types';
import CarTrack from '../CarTrack/CarTrack';
import styles from './CarRow.module.css';

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  const dispatch = useAppDispatch();
  const handleSelect = () => {
    dispatch(setEditForm({ carId: car.id, name: car.name, color: car.color }));
  };

  return (
    <li className={styles.row}>
      <div className={styles.stack}>
        <Button onClick={handleSelect}>Select</Button>
        <Button variant="danger">Remove</Button>
      </div>
      <div className={styles.stack}>
        <Button variant="primary">A</Button>
        <Button>B</Button>
      </div>
      <span className={styles.name}>{car.name}</span>
      <CarTrack color={car.color} />
    </li>
  );
}

export default CarRow;
