import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './styless.css'

const Main = () => {

  const [state, setState] = useState({
    products: [],
    totalPages: {},
    page: 1
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async (page = 1) => {
    const res = await api.get(`/products?page=${page}`)
    const documents = res.data.docs
    const pages = res.data.pages
    setState({ products: documents, totalPages: pages, page })
    return (console.log(res.data.page))
  }

  const prevPage = () => {
    if (state.page === 1) return;
    const pageNumber = state.page - 1
    loadProducts(pageNumber)
  }

  const nextPage = () => {
    if (state.page === state.totalPages) return;
    const pageNumber = state.page + 1
    loadProducts(pageNumber)
  }

  return (
    <div id='firstDiv'>
      {state.products.map(product => {
        return (
          <div id='articleDiv' key={product._id}>
            <article>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <Link to={`/products/${product._id}`}>Informações</Link>
            </article>
          </div>
        )
      })}
      <div id='buttonDiv'>
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Próximo</button>
      </div>
    </div>
  )
}

export default Main