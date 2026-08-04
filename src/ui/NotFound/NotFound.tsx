import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>Page not found</h1>
      <p>That address does not match any view in this app.</p>
      <Link className={styles.link} to={ROUTES.GARAGE}>
        Back to the Garage
      </Link>
    </div>
  );
}

export default NotFound;
