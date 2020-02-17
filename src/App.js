import React from "react";
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

class App extends React.Component {
  state = {
    paths: [
      {
        id: 1,
        name: "Articles Information",
        to: '/articles/:id',
        className: "nav_item"
      },
      {
        id: 2,
        name: "Articles",
        to: "/articles",
        className: "nav_item"
      },
      {
        id: 3,
        name: "Home",
        to: "/",
        className: "nav_item"
      }
    ],
    activeLink: null
  };

  handleClick = id => {
    this.setState({ activeLink: id });
  };

  render() {
    const { paths, activeLink } = this.state;

    return (
      <div>
      <Router>
      <div>
      <ul>
        {paths.map(path => {
          return (
                <li key={path.id}
                  onClick={() => this.handleClick(path.id)}
                  className={
                    path.className +
                    (path.id === activeLink ? " active_item" : "")
                  }
                >
                <Link to={`${path.to === '/articles/:id' ? path.to = '/articles/5' : path.to}`}>{path.name}</Link>
                </li>
          );
        })}
        </ul>
        </div>

        <Switch>
          <Route path="/articles/:id">
            <ArticleInformation />
          </Route>
          <Route path="/articles">
            <Articles />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </Router>
      </div>
    );
  }
}

function ArticleInformation(props) {
  return <h2>And this is Article Information {props.id}</h2>;
}

function Articles() {
  return <h2>Articles</h2>;
}

function Home() {
  return <h2>Home</h2>;
}


export default App;
