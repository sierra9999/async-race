import { useCallback, useRef } from 'react';
import CarIcon from '@/ui/CarIcon/CarIcon';
import { registerCarTrack, unregisterCarTrack } from '@/features/race/animation';
import styles from './CarTrack.module.css';

interface CarTrackProps {
  carId: number;
  color: string;
}

function CarTrack({ carId, color }: CarTrackProps) {
  const laneElRef = useRef<HTMLDivElement | null>(null);
  const carElRef = useRef<HTMLDivElement | null>(null);
  const tryRegister = useCallback(() => {
    if (carElRef.current && laneElRef.current) {
      registerCarTrack(carId, carElRef.current, laneElRef.current);
    }
  }, [carId]);

  const laneRef = useCallback(
    (el: HTMLDivElement | null) => {
      laneElRef.current = el;
      if (el) {
        tryRegister();
      }
    },
    [tryRegister],
  );

  const carRef = useCallback(
    (el: HTMLDivElement | null) => {
      carElRef.current = el;
      if (el) {
        tryRegister();
      } else {
        unregisterCarTrack(carId);
      }
    },
    [carId, tryRegister],
  );

  return (
    <div className={styles.track}>
      <span className={styles.marker}>START</span>
      <div ref={laneRef} className={styles.lane}>
        <div ref={carRef} className={styles.car}>
          <CarIcon color={color} />
        </div>
      </div>
      <span className={styles.marker}>FINISH</span>
    </div>
  );
}

export default CarTrack;
