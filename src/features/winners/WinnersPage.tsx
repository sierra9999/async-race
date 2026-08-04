import WinnersTable from './WinnersTable/WinnersTable';
import type { Car, Winner } from '@/api/types';
import styles from './WinnersPage.module.css';

const WINNERS: Winner[] = [
  { id: 1, wins: 3, time: 4.37 },
  { id: 2, wins: 1, time: 10 },
  { id: 99, wins: 1, time: 7.5 },
];

const CARS_BY_ID: Record<number, Car> = {
  1: { id: 1, name: 'Tesla', color: '#e11d48' },
  2: { id: 2, name: 'BMW', color: '#2563eb' },
};

function WinnersPage() {
  const total = WINNERS.length;

  return (
    <div className={styles.page}>
      <h1>Winners ({total})</h1>
      {total === 0 ? (
        <p className={styles.empty}>No winners yet — win a race!</p>
      ) : (
        <WinnersTable winners={WINNERS} carsById={CARS_BY_ID} />
      )}
    </div>
  );
}

export default WinnersPage;
