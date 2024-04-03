import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";

export default function Home({ page, posts }) {
  const { title, description,url  } = page;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => {

          return (
        <div className="card w-96 glass">
          <figure><img src={url} alt="car!" /></figure>
          <div className="card-body">
             <h2 className="card-title" dangerouslySetInnerHTML={{__html: post.title}}></h2>  
          </div>
        </div>
          );
        })}

      {!posts ||
        (posts.length === 0 && (
          <li>
            <p>Oops, no posts found!</p>
          </li>
        ))} 
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const apolloClient = getApolloClient();

  const language = locale.toUpperCase();

  const data = await apolloClient.query({
    query: gql`
      query posts($language: LanguageCodeFilterEnum!) {
        posts(where: { language: $language }) {
          edges {
            node {
              id
              excerpt
              title
              slug
              language {
                code
                locale
              }
            }
          }
        }
        generalSettings {
          title
          description
          url
        }
      }
    `,
    variables: {
      language,
    },
  });

  let posts = data?.data.posts.edges

    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
        language,
        path: `/posts/${post.slug}`,
      };
    });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      posts,
    },
  };
}
