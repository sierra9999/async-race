import Pagination from '@/ui/Pagination/Pagination';
import { useAppDispatch } from '@/store/hooks';
import { setPage } from '@/store/winnersUiSlice';
import WinnersTable from './WinnersTable/WinnersTable';
import useWinnersPage from './useWinnersPage';
import styles from './WinnersPage.module.css';

function WinnersPage() {
  const { winners, carsById, total, page, totalPages, isLoading, isError } = useWinnersPage();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.page}>
      <h1>Winners ({total})</h1>

      {isLoading && <p>Loading winners...</p>}
      {isError && <p>Failed to load winners.</p>}
      {!isLoading && !isError && total === 0 && (
        <p className={styles.empty}>No winners yet — win a race!</p>
      )}
      {!isLoading && !isError && total > 0 && (
        <WinnersTable winners={winners} carsById={carsById} />
      )}

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

export default WinnersPage;
