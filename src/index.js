import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/home/App';
import {FilmInfoRender} from './components/filmInfo/filmInfoRender.jsx'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WatchList } from './pages/watchList/WatchList';

//window.localStorage.removeItem('prev-search')
// window.localStorage.removeItem('is-watch-list')
if(!window.localStorage.getItem('is-watch-list')){
  window.localStorage.setItem('is-watch-list', JSON.stringify(false))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<App />}></Route>
          <Route path=":id" element={<FilmInfoRender />}></Route>
          <Route path="my+watch+list" element={<WatchList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
