import Button from '@/ui/Button/Button';
import styles from './RaceControlPanel.module.css';

function RaceControlPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.raceGroup}>
        <Button variant="primary">Race</Button>
        <Button>Reset</Button>
      </div>
      <Button>Generate Cars</Button>
    </div>
  );
}

export default RaceControlPanel;
