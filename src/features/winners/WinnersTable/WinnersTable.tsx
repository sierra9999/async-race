import CarIcon from '@/ui/CarIcon/CarIcon';
import Button from '@/ui/Button/Button';
import { DEFAULT_CAR_COLOR } from '@/constants';
import { formatSeconds } from '@/utils/formatTime';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy, setOrder, type WinnersSortBy } from '@/store/winnersUiSlice';
import type { Car, Winner } from '@/api/types';
import styles from './WinnersTable.module.css';

const UNKNOWN_CAR_NAME = 'Unknown';
const DEFAULT_SORT_ORDER: Record<WinnersSortBy, 'ASC' | 'DESC'> = { wins: 'DESC', time: 'ASC' };

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

function SortIndicator({ active, order }: { active: boolean; order: 'ASC' | 'DESC' }) {
  const classNames = [styles.sortArrow, active ? '' : styles.sortArrowIdle].filter(Boolean);
  return <span className={classNames.join(' ')}>{order === 'ASC' ? '▲' : '▼'}</span>;
}

function useSortToggle(): (field: WinnersSortBy) => void {
  const dispatch = useAppDispatch();
  const { sortBy, order } = useAppSelector((state) => state.winnersUi);

  return (field: WinnersSortBy) => {
    if (sortBy === field) {
      dispatch(setOrder(order === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      dispatch(setSortBy(field));
      dispatch(setOrder(DEFAULT_SORT_ORDER[field]));
    }
  };
}

function SortableHeader({ field, label }: { field: WinnersSortBy; label: string }) {
  const { sortBy, order } = useAppSelector((state) => state.winnersUi);
  const toggleSort = useSortToggle();

  return (
    <th scope="col">
      <Button className={styles.sortButton} onClick={() => toggleSort(field)}>
        {label}
        <SortIndicator
          active={sortBy === field}
          order={sortBy === field ? order : DEFAULT_SORT_ORDER[field]}
        />
      </Button>
    </th>
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
          <SortableHeader field="wins" label="Wins" />
          <SortableHeader field="time" label="Best time (s)" />
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
