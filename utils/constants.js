import { gql } from '@apollo/client';

export const HOME_SLIDERS = gql`
  query HomePageSlider($lang: LanguageCodeFilterEnum!) {
    homeSliders(where: { orderby: { field: DATE, order: ASC }, language: $lang }) {
      nodes {
        homeSliders {
          price
          tittle
          year
          sliderimage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;