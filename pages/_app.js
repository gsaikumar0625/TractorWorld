import "../styles/globals.css";
import Navbar from "../components/Navbar"
import { getApolloClient } from "../lib/apollo-client";
import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from '../public/locales/en.json';
import hiTranslation from '../public/locales/hi.json';
import mrTranslation from '../public/locales/mr.json';

// Initialize i18next instance
i18n
  .use(initReactI18next) // Pass initReactI18next to use next-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      mr: { translation: mrTranslation }
    },
    fallbackLng: 'en',
    debug: false, // Enable debug mode to see more information in the console
    interpolation: {
      escapeValue: false // React already handles escaping
    }
  });

function MyApp({ Component, pageProps }) {

  const client = getApolloClient();

  return (
    <>
      <Navbar />
      <ApolloProvider client={client}>
      <Component {...pageProps} />
      </ApolloProvider> 
      </>
  );
}

export default appWithTranslation(MyApp);