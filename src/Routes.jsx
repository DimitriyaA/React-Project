import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
{/* import CatalogList from './components/Catalog/CatalogList';
import MapView from './components/Map/MapView';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';*/}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    {/*  <Route path="catalog" element={<CatalogList />} />
                    <Route path="map" element={<MapView />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
