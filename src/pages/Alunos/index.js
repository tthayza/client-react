import React from 'react'
import logoCadastro from '../../assets/cadastro.png'
import './styles.css'
import { Link } from 'react-router-dom'
import { FiXCircle } from 'react-icons/fi'

export default function Alunos() {
  return (
    <div className="aluno-container">
      <header>
        <img src={logoCadastro} alt="imagem de cadastro" />
        <span>
          Bem-Vinda, <strong>Thayza</strong>!
        </span>
        <Link className="button" to="aluno/novo">
          Novo Aluno
        </Link>
        <button type="button" className="close-btn">
          <FiXCircle size={35} color="#17202a" />
        </button>
      </header>
      <form>
        <input type="text" placeholder="Nome" />
        <button type="button" className="button">
          Filtrar aluno por nome (parcial)
        </button>
      </form>
      <h1>Relação de Alunos</h1>
    </div>
  )
}
