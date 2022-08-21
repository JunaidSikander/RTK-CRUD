import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddEdit, Home, Info} from "pages";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/addContact' element={<AddEdit/>}/>
                    <Route path='/editContact/:id' element={<AddEdit/>}/>
                    <Route path='/info/:id' element={<Info/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer theme="colored"/>
        </main>
    );
}

export default App;
