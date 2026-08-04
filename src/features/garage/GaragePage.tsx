import Pagination from '@/ui/Pagination/Pagination';
import { useAppDispatch } from '@/store/hooks';
import { setPage } from '@/store/garageUiSlice';
import RaceControlPanel from './RaceControlPanel/RaceControlPanel';
import CreateCarForm from './CreateCarForm/CreateCarForm';
import UpdateCarForm from './UpdateCarForm/UpdateCarForm';
import CarList from './CarList/CarList';
import useGaragePage from './useGaragePage';
import styles from './GaragePage.module.css';

function GaragePage() {
  const { cars, total, page, totalPages, isLoading, isError } = useGaragePage();
  const dispatch = useAppDispatch();

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
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(nextPage) => dispatch(setPage(nextPage))}
        />
      </div>
    </div>
  );
}

export default GaragePage;
