import './App.css'
import './theme.css'
import Layout from './layouts/layout'
import Header from './layouts/header'
import RelaxMode from './components/RelaxMode/RelaxModeGame'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <Header />
            <Layout />
          </>
        }
      />

      <Route path="/relax/*" element={<RelaxMode />} />
    </Routes>
  );
}

export default App
