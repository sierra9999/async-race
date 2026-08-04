import WinnersTable from './WinnersTable/WinnersTable';
import useWinnersPage from './useWinnersPage';
import styles from './WinnersPage.module.css';

function WinnersPage() {
  const { winners, carsById, total, isLoading, isError } = useWinnersPage();

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
    </div>
  );
}

export default WinnersPage;
