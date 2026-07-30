import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import styles from './NavTabs.module.css';

function linkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

function NavTabs() {
  return (
    <nav className={styles.nav}>
      <NavLink to={ROUTES.GARAGE} end className={linkClassName}>
        Garage
      </NavLink>
      <NavLink to={ROUTES.WINNERS} className={linkClassName}>
        Winners
      </NavLink>
    </nav>
  );
}

export default NavTabs;
