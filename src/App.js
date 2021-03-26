import logo from './logo.svg';
import { BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
