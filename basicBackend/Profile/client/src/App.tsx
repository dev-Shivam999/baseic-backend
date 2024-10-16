import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Sign = React.lazy(() => import('./pages/Sign'))

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={"Loading..."} >
            <Home />
          </Suspense>
        } />
        <Route path='/Login' element={
          <Suspense fallback={"Loading..."} >
            <Login />
          </Suspense>
        } />
        <Route path='/Sign' element={
          <Suspense fallback={"Loading..."} >
            <Sign />
          </Suspense>
        } />
      </Routes>

    </div>
  );
};

export default App;