import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../components/Navbar.module.css"

export default function Navbar() {

  const { locale: activeLocale, locales, asPath } = useRouter(); 
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a className={styles.home}>Home</a>
            </Link>
          </li>
       
        </ul>
        <ul>
          {locales.map((locale) => {
            return (
              <li key={locale}>
                <Link href={asPath} locale={locale}>
                  <a className={styles.toggle}>{locale.toUpperCase()}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}