import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
 

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {

  const wordpressApiUrl = process.env.WORDPRESS_API_URL;
  const wordpressAuthRefreshToken = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;

  if (!wordpressApiUrl || !wordpressAuthRefreshToken) {
    throw new Error("Missing environment variables for Apollo Client configuration.");
  }

  const httpLink = new HttpLink({
    uri: wordpressApiUrl,
  });

  // Create a middleware function to add headers
  const authMiddleware = setContext((_, { headers }) => {
    // Retrieve the token from the environment variable
    const token = wordpressAuthRefreshToken;
    // Return the headers to be set
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '', // Add the authorization header if token exists
      },
    };
  });

  // Apply the middleware to the HTTP link
  const httpLinkWithMiddleware = authMiddleware.concat(httpLink);

  // Create the Apollo client with the modified HTTP link and cache
  return new ApolloClient({
    link: httpLinkWithMiddleware,
    cache: new InMemoryCache(),
  });
}

const cache = new InMemoryCache({
  typePolicies: {
    Language: {
      keyFields: ["en","hi","mr"],
    },
  },
});
