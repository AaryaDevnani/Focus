import { BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import LoginRegister from './components/LoginRegister'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/login' component={LoginRegister} />
            <Route exact path='/register' component={LoginRegister} />
          </Switch>

        </Router>
      </header>
    </div>
  );
}

export default App;
