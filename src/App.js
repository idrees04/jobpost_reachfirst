import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataTable1 from './Components/DataTable1';
//import DataTable2 from './Components/DataTable2';
//import DataTable from './Components/JobTable';
//import Page2 from './Page2';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/DataTable2" element={<DataTable2 />} /> */}
        <Route path="/" element={<DataTable1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
