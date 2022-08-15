import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './Pages/Home';
import './scss/app.scss';

const Cart = React.lazy(() => import('./Pages/Cart'));
const FullPizza = React.lazy(() => import('./Pages/FullPizza'));
const NotFound = React.lazy(() => import('./Pages/NotFound'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div className="container">Загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div className="container">Загрузка...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route path="*" element={
            <Suspense fallback={<div className="container">Загрузка...</div>}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
