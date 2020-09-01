import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import './styless.css'

const Product = ({ match }) => {

  const [state, setState] = useState({
    product: {}
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const id = match.params.id
    const res = await api.get(`/products/${id}`)
    const productInfo = res.data
    setState({ product: productInfo })
  }

  return (
    <div id='productDiv'>
      <article>
        <strong>{state.product.title}</strong>
        <p>{state.product.description}</p>
        <a href={state.product.url}>{state.product.url}</a>
      </article>
    </div>
  )
}

export default Product