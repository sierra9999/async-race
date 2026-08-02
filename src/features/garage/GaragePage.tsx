import RaceControlPanel from './RaceControlPanel/RaceControlPanel';
import styles from './GaragePage.module.css';

function GaragePage() {
  return (
    <div className={styles.page}>
      <h1>Garage</h1>
      <div className={styles.controlRow}>
        <RaceControlPanel />
      </div>
    </div>
  );
}

export default GaragePage;
