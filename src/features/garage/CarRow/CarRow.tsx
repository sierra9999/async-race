import Button from '@/ui/Button/Button';
import type { Car } from '@/api/types';
import CarTrack from '@/features/garage/CarTrack/CarTrack';
import styles from './CarRow.module.css';

interface CarRowProps {
  car: Car;
}

function CarRow({ car }: CarRowProps) {
  return (
    <li className={styles.row}>
      <div className={styles.stack}>
        <Button>Select</Button>
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
