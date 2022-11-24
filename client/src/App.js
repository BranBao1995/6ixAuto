import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import DreamList from "./pages/DreamList";
import MyListings from "./pages/MyListings";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="entire-page">
          <Nav />
          <>
            <div className="container">
              <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/dreamlist" element={<DreamList />} />
                <Route path="/mylistings" element={<MyListings />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/post" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route
                  render={() => <h1 className="display-2">Wrong page!</h1>}
                />
              </Switch>
            </div>
          </>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
