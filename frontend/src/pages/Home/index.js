import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './styles.css'

import api from '../../services/api'

export default function Home() {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('demand')
            
            setProducts([...response.data].reverse())
        }

        loadProducts()
    }, [])

    async function handleFinishDemand(id) {
        await api.delete(`demand/${id}`)

        window.location.reload()
    }

    return (
        <div className="App">
            <Header/>

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

                                <div className="buttons">
                                    <button onClick={() => handleFinishDemand(product.id)}>Finalizar</button>
                                    <button onClick={() => handleFinishDemand(product.id)}>Cancelar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}