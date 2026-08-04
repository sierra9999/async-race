import Pagination from '@/ui/Pagination/Pagination';
import { useGetCarsQuery } from '@/api/garageApi';
import RaceControlPanel from './RaceControlPanel/RaceControlPanel';
import CreateCarForm from './CreateCarForm/CreateCarForm';
import UpdateCarForm from './UpdateCarForm/UpdateCarForm';
import CarList from './CarList/CarList';
import styles from './GaragePage.module.css';

function GaragePage() {
  const { data, isLoading, isError } = useGetCarsQuery(1);
  const cars = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className={styles.page}>
      <h1>Garage ({total})</h1>
      <div className={styles.controlRow}>
        <RaceControlPanel />
        <CreateCarForm />
        <UpdateCarForm />
      </div>
      <CarList cars={cars} total={total} isLoading={isLoading} isError={isError} />
      <div className={styles.footer}>
        <Pagination page={1} totalPages={3} onPageChange={() => {}} />
      </div>
    </div>
  );
}

export default GaragePage;
