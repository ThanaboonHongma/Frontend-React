import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import Formpage from './Formpage';
import Layoutform from './layoutform';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        {/* <h2>App</h2>
        <Link to="/">Go to Main Page</Link> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Formpage" element={<Formpage />} />
          <Route path="/Layoutform" element={<Layoutform />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;

