
import './App.styles.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home.component';
import GameScreen from './components/game-screen/GameScreen.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='gamescreen' element={<GameScreen />} />
    </Routes>
  );
}

export default App;
