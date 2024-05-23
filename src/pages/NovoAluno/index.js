import React, { useState, useEffect } from 'react'
import './styles.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi'
import api from '../../services/api'
export default function NovoAluno() {
  const [id, setId] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [idade, setIdade] = useState(0)
  const { alunoId } = useParams()
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  async function loadAluno() {
    if (alunoId && alunoId !== '0') {
      try {
        const response = await api.get(`/api/alunos/${alunoId}`, authorization)
        setId(response.data.id)
        setNome(response.data.nome)
        setEmail(response.data.email)
        setIdade(response.data.idade)
      } catch (error) {
        alert('Erro ao recuperar aluno')
        navigate('/alunos')
      }
    }
  }

  async function saveOrUpdate(e) {
    e.preventDefault()
    const data = {
      nome,
      email,
      idade
    }
    try {
      if (!alunoId) {
        await api.post('api/alunos', data, authorization)
        alert('Aluno incluído com sucesso!')
      } else {
        data.id = id // Adicione o id ao data
        await api.put(`api/alunos/${alunoId}`, data, authorization)
        alert('Aluno atualizado com sucesso!')
      }
      navigate('/alunos')
    } catch (error) {
      alert('Erro ao salvar informações')
    }
  }

  useEffect(() => {
    if (alunoId) {
      loadAluno()
    }
  }, [])
  return (
    <div className="novo-aluno-container">
      <div className="content">
        <section className="form">
          <FiUserPlus size={105} color="#17202a" />
          <h1>{alunoId ? 'Atualizar Aluno' : 'Incluir Novo Aluno'}</h1>
          <Link className="back-link" to="/alunos">
            <FiCornerDownLeft size={25} color="#17202a" />
            Retornar
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Idade"
            value={idade === 0 ? '' : idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <button type="submit" className="button">
            {alunoId ? 'Atualizar' : 'Incluir'}
          </button>
        </form>
      </div>
    </div>
  )
}
