import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/signin" />} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
        <ProtectedRoute exact path="/contacts" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
