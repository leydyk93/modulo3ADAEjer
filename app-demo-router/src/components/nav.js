import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";

function Nav() {
    const location = useLocation();
    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        console.log(location, "localización");
    });
    
    return (
        <>
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Makeup</h3>
            <nav className="nav nav-masthead justify-content-center float-md-end">
                <NavLink exact className="nav-link" to="/">Home</NavLink>
                <NavLink to="/products" className="nav-link" activeClassName="active">
                    Productos</NavLink>
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                Contacto</NavLink>
            </nav>
          </div>
        </header>
        <main className="p-5">
          <h1>ABOUT {location.pathname}</h1>
          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan lobortis nunc, non iaculis orci aliquet a</p>
        </main>
        </>
    );
  }
  
export default Nav;