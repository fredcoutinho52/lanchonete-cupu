import React, { useState, useEffect } from 'react'
import './styles.css'

import api from '../../services/api'

import logo from '../../assets/logo.png'

export default function Home() {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('demand')
            
            setProducts([...response.data].reverse())
        }

        loadProducts()
    }, [])

    return (
        <div className="App">
            <header className="app-header">
                <div className="container-header">
                    <span className="brand">
                        <img src={logo} alt="Lanchonete Cupú"/>
                        <h2>Lanchonete Cupú</h2>
                    </span>

                    <ul>
                        <li><a href="/">Meus pedidos</a></li>
                        <li><a href="/new">Novo pedido</a></li>
                    </ul>
                </div>
            </header>

            <main className="app-main">
                <div className="container-main">
                    <h1>Meus Pedidos</h1>

                    <div className="cards-container">
                        {products.map(product => (
                            <div key={product.id} className="card">
                                {product.items.map(item => (
                                    <div className="product">
                                        <span className="product-name">{item.name}</span>
                                        <span className="product-price">{`${item.amount} unidades`}</span>
                                    </div>
                                ))}

                                <span className="total">{`Total: R$${product.total}`}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}