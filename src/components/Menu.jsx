import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';

function Menu() {
  return (
    <aside className={styles.aside}>
      <img className={styles.logo} src="./assets/icons/logo.png" alt="Logo" />
      <div className={styles.list}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.icon}>
          <img src="./assets/icons/main.svg" alt="Main" />
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? styles.active : styles.icon}>
          <img src="./assets/icons/add.svg" alt="Add" />
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => isActive ? styles.active : styles.icon}>
          <img src="./assets/icons/saved.svg" alt="Saved" />
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : styles.icon}>
          <img src="./assets/icons/profile.svg" alt="Profile" />
        </NavLink>
      </div>
    </aside>
  );
}

export default Menu;
