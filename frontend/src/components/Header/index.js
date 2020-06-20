import React from 'react'
import './styles.css'

import logo from '../../assets/logo.png'

export default function Header() {
    let showMenuToggle = false

    function toggleMenu() {
        const containerHeader = document.querySelector('.container-header')
        const menuToggle = containerHeader.querySelector('.menu-toggle')
        const menuToggleSection = document.querySelector('.menu-toggle-section')

        showMenuToggle = !showMenuToggle

        menuToggle.classList.toggle('on', showMenuToggle)
        menuToggleSection.classList.toggle('off', !showMenuToggle)
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const containerHeader = document.querySelector('.container-header')
        const menuToggle = containerHeader.querySelector('.menu-toggle')

        menuToggle.addEventListener('click', toggleMenu)
    })

    return (
        <>
            <div className="menu-toggle-section off">
                <nav className="menu-toogle-nav">
                    <ul className="list-menu-toggle">
                        <li><a onClick={toggleMenu} href="/">Meus pedidos</a></li>
                        <li><a onClick={toggleMenu} href="/new">Novo pedido</a></li>
                    </ul>
                </nav>
            </div>

            <header className="app-header">
                <div className="container-header">
                    <span className="brand">
                        <img src={logo} alt="Lanchonete Cupú"/>
                        <h2>Lanchonete Cupú</h2>
                    </span>

                    <ul className="menu">
                        <li><a href="/">Meus pedidos</a></li>
                        <li><a href="/new">Novo pedido</a></li>
                    </ul>

                    <div className="menu-toggle">
                        <span className="one"></span>
                        <span className="two"></span>
                        <span className="three"></span>
                    </div>
                </div>
            </header>
        </>
    )
}