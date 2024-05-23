import React from 'react'
import logoCadastro from '../../assets/cadastro.png'
import './styles.css'
import { Link } from 'react-router-dom'
import { FiEdit, FiLogOut, FiUserX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Alunos() {
  const [alunos, setAlunos] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [filtro, setFiltro] = useState([])
  const navigate = useNavigate()

  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  async function logout() {
    try {
      localStorage.clear()
      localStorage.setItem('token', '')
      authorization.headers = ''
      navigate('/')
    } catch (error) {
      alert('Falha no logout', error)
    }
  }

  async function editAluno(id) {
    try {
      navigate(`/aluno/novo/${id}`)
    } catch (error) {
      alert('Falha ao editar aluno', error)
    }
  }
  async function deleteAluno(id) {
    try {
      if (window.confirm(`Deseja deletar aluno de id ${id}?`)) {
        await api.delete(`api/Alunos/${id}`, authorization)
        setAlunos(alunos.filter((aluno) => aluno.id !== id))
      }
    } catch (error) {
      alert('Falha ao excluir aluno', error)
    }
  }

  const searchAlunos = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput !== '') {
      const dadosFiltrados = alunos.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      })
      setFiltro(dadosFiltrados)
    } else {
      setFiltro(alunos)
    }
  }

  useEffect(() => {
    api.get('api/Alunos', authorization).then((response) => {
      setAlunos(response.data)
    })
  }, [])

  return (
    <div className="aluno-container">
      <header>
        <img src={logoCadastro} alt="imagem de cadastro" />
        <span>
          Bem-Vind@, <strong>{email}</strong>!
        </span>
        <Link className="button" to="/aluno/novo/0">
          Novo Aluno
        </Link>
        <button type="button" onClick={logout}>
          <FiLogOut size={35} color="#17202a" />
        </button>
      </header>
      <form>
        <input
          type="text"
          placeholder="Filtrar por nome"
          onChange={(e) => searchAlunos(e.target.value)}
        />
      </form>
      <h1>Relação de Alunos</h1>
      {searchInput.length > 0 ? (
        <ul>
          {filtro.map((aluno) => (
            <li key={aluno.id}>
              <b>Nome:</b> {aluno.nome}
              <br />
              <b>Email:</b> {aluno.email}
              <br />
              <b>Idade:</b> {aluno.idade}
              <br />
              <button type="button" onClick={() => editAluno(aluno.id)}>
                <FiEdit size={24} color="#17202a" />
              </button>
              <button type="button" onClick={() => deleteAluno(aluno.id)}>
                <FiUserX size={24} color="#17202a" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.id}>
              <b>Nome:</b> {aluno.nome}
              <br />
              <b>Email:</b> {aluno.email}
              <br />
              <b>Idade:</b> {aluno.idade}
              <br />
              <button type="button" onClick={() => editAluno(aluno.id)}>
                <FiEdit size={24} color="#17202a" />
              </button>
              <button type="button" onClick={() => deleteAluno(aluno.id)}>
                <FiUserX size={24} color="#17202a" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
