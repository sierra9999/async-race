import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearWinner } from '@/store/raceSlice';
import Button from '@/ui/Button/Button';
import styles from './WinnerModal.module.css';

function WinnerModal() {
  const dispatch = useAppDispatch();
  const winner = useAppSelector((state) => state.race.winner);
  const isOpen = winner !== null;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(clearWinner());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  if (winner === null) {
    return null;
  }

  return createPortal(
    <div className={styles.layer}>
      <div className={styles.card}>
        <p className={styles.heading}>🏁 Winner</p>
        <p className={styles.name}>{winner.name}</p>
        <p className={styles.time}>Time: {winner.timeSec}s</p>
        <Button onClick={() => dispatch(clearWinner())}>Close</Button>
      </div>
    </div>,
    document.body,
  );
}

export default WinnerModal;
