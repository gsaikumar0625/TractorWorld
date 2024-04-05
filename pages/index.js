import { getLocaleProps } from "../utils";
import { HOME_SLIDERS } from "../utils/constants"; 
import { useQuery } from "@apollo/client";
import { useTranslation } from 'next-i18next'; 
 
export default function Home({ locale }) {

  const { t, i18n } = useTranslation(); 
  const language = locale.toUpperCase();  
  const { loading, error, data } = useQuery(HOME_SLIDERS, {
    variables: { lang: language }
  });
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // If data is available, render it
  return (
    <div>
      <h1>Home Sliders</h1> 
      <p>Current Locale: {i18n.language}</p>
      <h1>{t('compareTractor')}</h1>
      <ul>
        {data.homeSliders.nodes.map((slider, index) => (
          <li key={index}>
            <h2>{slider.homeSliders.tittle}</h2>
            <p>Price: {slider.homeSliders.price}</p>
            <p>Year: {slider.homeSliders.year}</p>
            <img src={slider.homeSliders.sliderimage.node.mediaItemUrl} alt="Slider Image" />
          </li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}