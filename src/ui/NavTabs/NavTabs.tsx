import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants/constants';
import styles from './NavTabs.module.css';

function NavTabs() {
  return (
    <nav className={styles.nav}>
      <NavLink to={ROUTES.GARAGE} end className={styles.link}>
        Garage
      </NavLink>
      <NavLink to={ROUTES.WINNERS} className={styles.link}>
        Winners
      </NavLink>
    </nav>
  );
}

export default NavTabs;
