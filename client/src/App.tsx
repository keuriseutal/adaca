import {AppRoutes} from 'routes';
import {BrowserRouter as Router} from 'react-router-dom';

import {TaskProvider} from '@providers';

import './App.css';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
