
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DeveloperOnboardingForm from './components/DeveloperOnboardingForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/onboarding' element={<DeveloperOnboardingForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
