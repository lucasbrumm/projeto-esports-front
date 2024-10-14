import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaginaNaoEncontrada = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/fagammon-esports/')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <span
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        Página não encontrada
      </span>
      <div
        style={{
          cursor: 'pointer',
          backgroundColor: 'blue',
          padding: 20,
          borderRadius: 10,
          color: 'white',
        }}
        onClick={goToLogin}
      >
        Voltar ao login
      </div>
    </div>
  )
}

export default PaginaNaoEncontrada
