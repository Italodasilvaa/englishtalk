import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'


import '../styles/auth.scss'
import { Button } from '../components/Button/index'
import { database } from '../services/firebase'



export function Home() {
  const history = useHistory();
  const { user, signInWithGooogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGooogle()
    }
    history.push('./rooms/new');
  }
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }
    if (roomRef.val().endedAt) {
      alert('Room already closed')
      return;
    }
    history.push(`/rooms/${roomCode}`)

  }



  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustracao Simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas de Inglês em tempo-real </p>
      </aside>
      <main>
        <div className="main-container">
          <img src={logoImg} alt="Ensligh Talk" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entra na sala
            </Button>
          </form>
        </div>
      </main>
    </div>

  )
}