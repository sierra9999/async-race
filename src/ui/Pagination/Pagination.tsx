import Button from '../Button/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({ page, totalPages, onPageChange, disabled = false }: PaginationProps) {
  const atFirst = disabled || page <= 1;
  const atLast = disabled || page >= totalPages;

  return (
    <div className={styles.pagination}>
      <Button disabled={atFirst} onClick={() => onPageChange(1)}>
        {'<<'}
      </Button>
      <Button disabled={atFirst} onClick={() => onPageChange(page - 1)}>
        {'<'}
      </Button>
      <span className={styles.label}>
        Page {page}/{totalPages}
      </span>
      <Button disabled={atLast} onClick={() => onPageChange(page + 1)}>
        {'>'}
      </Button>
      <Button disabled={atLast} onClick={() => onPageChange(totalPages)}>
        {'>>'}
      </Button>
    </div>
  );
}

export default Pagination;
