import CarIcon from '@/ui/CarIcon/CarIcon';
import { DEFAULT_CAR_COLOR } from '@/constants';
import { formatSeconds } from '@/utils/formatTime';
import type { Car, Winner } from '@/api/types';
import styles from './WinnersTable.module.css';

const UNKNOWN_CAR_NAME = 'Unknown';
interface WinnerRowProps {
  winner: Winner;
  car?: Car;
}

function WinnerRow({ winner, car = undefined }: WinnerRowProps) {
  return (
    <tr>
      <td>{winner.id}</td>
      <td>
        <CarIcon color={car?.color ?? DEFAULT_CAR_COLOR} />
      </td>
      <td>{car?.name ?? UNKNOWN_CAR_NAME}</td>
      <td>{winner.wins}</td>
      <td>{formatSeconds(winner.time)}</td>
    </tr>
  );
}

interface WinnersTableProps {
  winners: Winner[];
  carsById: Record<number, Car>;
}

function WinnersTable({ winners, carsById }: WinnersTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Car</th>
          <th scope="col">Name</th>
          <th scope="col">Wins</th>
          <th scope="col">Best time (s)</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => (
          <WinnerRow key={winner.id} winner={winner} car={carsById[winner.id]} />
        ))}
      </tbody>
    </table>
  );
}

export default WinnersTable;
