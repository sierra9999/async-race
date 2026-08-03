import type { Car } from '@/api/types';
import RaceControlPanel from './RaceControlPanel/RaceControlPanel';
import CarRow from './CarRow/CarRow';
import styles from './GaragePage.module.css';
import CreateCarForm from './CreateCarForm/CreateCarForm';
import UpdateCarForm from './UpdateCarForm/UpdateCarForm';
import Pagination from '@/ui/Pagination/Pagination';

const CARS: Car[] = [
  { id: 1, name: 'Tesla', color: '#e11d48' },
  { id: 2, name: 'BMW', color: '#2563eb' },
  { id: 3, name: 'Mersedes', color: '#14a34a' },
];

function GaragePage() {
  return (
    <div className={styles.page}>
      <h1>Garage ({CARS.length})</h1>
      <div className={styles.controlRow}>
        <RaceControlPanel />
        <CreateCarForm />
        <UpdateCarForm />
      </div>
      <ul className={styles.list}>
        {CARS.map((car) => (
          <CarRow key={car.id} car={car} />
        ))}
      </ul>
      <div className={styles.footer}>
        <Pagination page={1} totalPages={3} onPageChange={() => {}} />
      </div>
    </div>
  );
}

export default GaragePage;
