import { Server, Socket } from 'socket.io'

interface ClientToServerEvents {
  'user-position': (position: { roomNumber: number }) => void
  'captured-coin': (data: { coinId: string; roomNumber: number }) => void
}

interface ServerToClientEvents {
  'coins-room': (data: CoinsRoom | null) => void
  'available-coins': (data: CoinsRoom[] | null) => void
}

interface ServerInternalEvents {
  'server-message': () => void
}

export type SocketServerInterface = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  ServerInternalEvents
>

export type SocketInterface = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  ServerInternalEvents
>

export interface CoinInterface {
  id: string
  x: number
  y: number
  z: number
}

export interface CoinsRoom {
  coins: CoinInterface[]
  room: number
}

export interface Data {
  data: CoinsRoom[]
}
