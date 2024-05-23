import React, { useState } from 'react'
import logoImage from '../../assets/Login.png'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function login(e) {
    e.preventDefault()

    const data = {
      email,
      password
    }
    try {
      const response = await api.post('/api/account/login', data)

      localStorage.setItem('email', email)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('expiration', response.data.token)

      navigate('/alunos')
    } catch (error) {
      alert('Falha no login', error)
    }
  }
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} id="img1" alt="imagem logo" />
        <form onSubmit={login}>
          <h1>Cadastro de Alunos</h1>

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            // type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Login
          </button>
        </form>
      </section>
    </div>
  )
}
