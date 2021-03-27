import { BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Forum from './components/Forum'
import ForumLabel from './components/ForumLabel'
import NavBar from './components/NavBar'
import Logout from "./components/Logout";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddRestricted from "./components/AddRestricted"

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <header className="App-header">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/forums' component={Forum} />
              <Route exact path='/forum/:label' component={ForumLabel} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/restricted' component={AddRestricted} />
            </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
