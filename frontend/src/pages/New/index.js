import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'

import api from '../../services/api'

import logo from '../../assets/logo.png'

const productsList = [
    { name: "Hambúrger", price: 20 },
    { name: "Batata Frita", price: 8 },
    { name: "Panqueca", price: 12 },
    { name: "Milk Shake", price: 10 },
    { name: "Suco", price: 7 },
    { name: "Refrigerante", price: 10 },
]

let totalPrice = 0

export default function New() {
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState([])
    const [amount, setAmount] = useState('')

    const history = useHistory()

    function handleAdd(productSelected, amount) {
        const currentProduct = { name: productSelected, amount }

        setProducts([...products, currentProduct])

        let productSpan = document.createElement('span')
        productSpan.innerHTML = `Produto: ${productSelected} / Quantidade: ${amount}`

        document.querySelector('.preview').appendChild(productSpan)

        productsList.forEach(item => {
            if(item.name === productSelected) {
                totalPrice += (Number(item.price) * amount)
            }
        })
    }

    async function handleNew(e) {
        e.preventDefault()

        await api.post('demand', {
            items: products,
            total: totalPrice
        })

        history.push('/')
    }

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
                    <h1>Novo Pedido</h1>

                    <div className="form">
                        <div className="input-container">
                            <select onChange={e => setProductSelected(e.target.value)}>
                                <option value="Selcione">Selecione um produto</option>
                                {productsList.map(product => (
                                    <option value={product.name}>
                                        {`${product.name} / R$${product.price}`}
                                    </option>
                                ))}
                            </select>

                            <input 
                                placeholder="Quantidade"
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="buttons-container">
                            <button className="button" onClick={() => handleAdd(productSelected, amount)}>Adicionar Produto</button>
                            <button className="button" onClick={handleNew}>Fazer Pedido</button>
                        </div>
                    </div>

                    <div className="preview"></div>
                </div>
            </main>
        </div>
    )
}