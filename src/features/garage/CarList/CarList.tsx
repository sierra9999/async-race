import type { Car } from '@/api/types';
import CarRow from '../CarRow/CarRow';
import styles from './CarList.module.css';

interface CarListProps {
  cars: Car[];
  total: number;
  isLoading: boolean;
  isError: boolean;
}

function CarList({ cars, total, isLoading, isError }: CarListProps) {
  if (isLoading) return <p>Loading cars...</p>;
  if (isError) return <p>Failed to load cars.</p>;
  if (total === 0) return <p className={styles.empty}>No cars in the garage — create one!</p>;
  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <CarRow key={car.id} car={car} />
      ))}
    </ul>
  );
}

export default CarList;
