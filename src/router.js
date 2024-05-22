import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/index.js'
import Alunos from './pages/Alunos/index.js'
import NovoAluno from './pages/NovoAluno/index.js'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Login} />
        <Route path="/alunos" Component={Alunos} />
        <Route path="/aluno/novo/:alunoid" Component={NovoAluno} />
      </Routes>
    </BrowserRouter>
  )
}
