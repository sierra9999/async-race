import CarIcon from '@/ui/CarIcon/CarIcon';
import styles from './CarTrack.module.css';

interface CarTrackProps {
  color: string;
}

function CarTrack({ color }: CarTrackProps) {
  return (
    <div className={styles.track}>
      <span className={styles.marker}>START</span>
      <div className={styles.lane}>
        <div className={styles.car}>
          <CarIcon color={color} />
        </div>
      </div>
      <span className={styles.marker}>FINISH</span>
    </div>
  );
}

export default CarTrack;
