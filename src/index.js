import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store'
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

const apolloClient = new ApolloClient({
  link: new HttpLink({
    // uri: 'http://localhost:4000'
    uri: 'https://netherenth.xyz/apps/memories/graphql'
  }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter basename="/apps/memories">
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
