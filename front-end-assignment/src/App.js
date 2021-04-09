import './styles/HomeComp.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import ViewCard from './components/Viewcard'
import Home from './components/HomeComp'

function App(){
    return (
      <Router>
          <div className="app">
            <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/view/:country/:cityName/:weather/:temp/:minTemp/:maxTemp/:humidity/:preasure/:visibility/:speed/:degree/:sunrise/:sunset">
                  <ViewCard />
                </Route>
            </Switch>
          </div>
      </Router>
    );
  }

export default App;

