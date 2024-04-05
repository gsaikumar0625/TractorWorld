import Link from "next/link";
import { useRouter } from "next/router"; 
import { useTranslation } from 'next-i18next';

export default function Navbar() {

  const { locale: activeLocale, locales, asPath } = useRouter();
  const { i18n } = useTranslation();

  const handleLocaleChange = (locale) => {
    i18n.changeLanguage(locale);
  };
  return ( 
      <div className="navbar bg-primaryColor text-white">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Tractor World</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
        
            <li>
              <details>
                <summary>
                  Language
                </summary>
                <ul className="p-2 bg-primaryColor text-white rounded-t-none">
                    {locales.map((locale) => {
                    return (
                    <li key={locale}> 
                    <Link href={asPath} locale={locale}>
                    <a className="text-white" onClick={() => handleLocaleChange(locale)}>{locale.toUpperCase()}</a>
                    </Link>
                    </li>
                    );
                    })}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div> 
  );
}