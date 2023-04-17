import { useState } from 'react';
import Form from "./pages/Form"
import Summary from './pages/Summary';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

function App() {
  const [summary, setSummary] = useState("");
  const [original, setOriginal] = useState("");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Form setSummary={setSummary} setOriginal={setOriginal}/>}/>
          <Route exact path='/Summary' element={<Summary summary={summary} original={original}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
