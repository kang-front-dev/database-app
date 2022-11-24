import { Routes, Route} from 'react-router-dom';
import Regpage from './client/pages/Regpage';
import Logpage from './client/pages/Logpage';
import Tablepage from './client/pages/Tablepage';
import Formpage from './client/pages/Formpage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Formpage />} />
        <Route path="/reg" element={<Regpage />} />
        <Route path="/log" element={<Logpage />} />
        <Route path="/table" element={<Tablepage />} />
      </Routes>
    </div>
  );
}

export default App;
