import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Register } from './Register'
import { SignIn } from './SignIn'
import { Home } from './Home'
import { JobScreen } from './JobScreen';
import { Apply } from './Apply';
import { ApplyLanding } from './ApplyLanding';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Route path='/register' exact component={Register}/>
        <Route path='/signin' exact component={SignIn}/>
        <Route path='/job/:id' exact component={JobScreen}/>
        <Route path='/apply/:id' exact component={Apply}/>
        <Route path='/applied/:id' exact component={ApplyLanding}/>
        <Route path='/' exact component={Home}/>
      </Router>
    </div>
  );
}

export default App;
