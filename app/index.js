import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { ThemeProvider } from "./contexts/Theme";
import ThemeContext from "./contexts/ThemeContext";
import Nav from "./shared/Nav";
import Loading from "./shared/Loading";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Popular = React.lazy(() => import("./popular/components/Popular"));
const Battle = React.lazy(() => import("./battle/components/Battle"));
const Result = React.lazy(() => import("./battle/components/Result"));
const NotFound = React.lazy(() => import("./shared/NotFound"));

function App() {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    setTheme(theme => {
      return theme === "light" ? "dark" : "light";
    });
  };

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular}></Route>
                <Route exact path="/battle" component={Battle}></Route>
                <Route path="/battle/results" component={Result}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

// class App extends React.Component {
//   state = {
//     theme: "light",
//     toggleTheme: () => {
//       this.setState(({ theme }) => ({
//         theme: theme === "light" ? "dark" : "light"
//       }));
//     }
//   };

//   render() {

//   }
// }

ReactDOM.render(<App />, document.getElementById("app"));
