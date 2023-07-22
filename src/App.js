import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobForm from './pages/Jobs/JobForm/JobForm';
import JobList from './pages/Jobs/JobList/JobList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<JobList/>} />
          <Route path='/create-job/:id?' element={<JobForm />} />
        </Routes>
      </BrowserRouter>
      {/* <JobForm/>
      <JobList/> */}
    </div>
  );
}

export default App;
