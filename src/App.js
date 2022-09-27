import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

import Context from "./Context";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

export default function App() {


  const [fotos, setFotos] = useState([]);

  const endpoint = "/fotos.json";


  const getFotosNaturales = async () =>{

    const res = await fetch(endpoint);

    let data = await res.json();

    let dataFiltrando = data.photos.map((elem) => ({

      id: elem.id, src: elem.src.tiny, desc:elem.alt, favorito: false

    }));

    setFotos(dataFiltrando);

  };

  useEffect(() => {

  getFotosNaturales();

  }, []);

  return (
    <div className="App">
      <Context.Provider value={{ fotos, setFotos}}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}