import React from 'react'
import logoImage from '../../assets/Login.png'
import './styles.css'
export default function Login() {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImage} id="img1" alt="imagem logo" />
        <form>
          <h1>Cadastro de Alunos</h1>
          <input placeholder="Email" type="email" />
          <input placeholder="Password" type="password" />
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </section>
    </div>
  )
}
