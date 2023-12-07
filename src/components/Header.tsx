import styles from './Header.module.css'

import igniteLogo from '../assets/ignite-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <img src={igniteLogo} alt="Logo"/>
        <strong>Social Feed</strong>
      </div>
    </header>
  )
}