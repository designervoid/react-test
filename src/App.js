import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paths: this.setPaths(),
      activeLink: this.setActiveLinkBeforeMount()
    }
  }

  setPaths() {
    return [{
      id: 1,
      name: "Articles Information",
      to: "/articles/:id",
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
    }]
  }

  setActiveLinkBeforeMount() {
    const currentPath = window.location.pathname;
    const paths = this.setPaths()
    for (let element in paths) {
      if (paths[element].to === currentPath) {
        return paths[element].id
      }
    }
  }

  setActiveLinkOnUpdate() {
    const currentPath = window.location.pathname;
    const paths = this.setPaths()
    for (let element in paths) {
      if (paths[element].to === currentPath) {
        this.handleClick(paths[element].id)
      }
    }
  }

  componentDidUpdate() {
    history.listen((location, action) => {
      this.setActiveLinkOnUpdate();
    });
  }

  handleClick = id => {
    this.setState({activeLink: id});
  };

  render() {
    const {paths, activeLink} = this.state;

    return (
      <div>
        <Router>
          <div>
            <ul>
              {paths.map(path => {
                return (
                  <li
                    key={path.id}
                    onClick={() => this.handleClick(path.id)}
                    className={
                      path.className +
                      (path.id === activeLink ? " active_item" : "")
                    }
                  >
                    <Link
                      to={`${
                        path.to === "/articles/:id"
                          ? (path.to = "/articles/1")
                          : path.to
                      }`}
                    >
                      {path.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Switch>
            <Route path="/articles/:id" component={ArticlesInformation}></Route>
            <Route path="/articles" component={Articles}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

class ArticlesInformation extends Component {
  constructor(props) {
    super(props);
    this.routeParam = props.match.params.id;
  }

  render() {
    return <h2>Articles Information Props {this.routeParam}</h2>;
  }
}

class Articles extends Component {
  render() {
    return <h2>Articles</h2>;
  }
}

class Home extends Component {
  render() {
    return <h2>Home</h2>;
  }
}

export default App;
