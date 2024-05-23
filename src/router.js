import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/index.js'
import Alunos from './pages/Alunos/index.js'
import NovoAluno from './pages/NovoAluno/index.js'

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />
      </Routes>
    </Router>
  )
}
