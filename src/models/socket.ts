import { SocketInterface, SocketServerInterface } from '../interfaces/socket'
import RoomList from './room-list'

class Socket {
  roomsList: RoomList

  constructor(private io: SocketServerInterface) {
    this.roomsList = new RoomList()
    this.socketEvents()
  }

  private socketEvents() {
    this.io.on('connection', (socket: SocketInterface) => {
      console.log('client connected')

      socket.on('user-position', async (payload) => {
        socket.emit(
          'coins-room',
          await this.roomsList.getCoinsInRoom(payload.roomNumber)
        )
      })

      socket.on('captured-coin', async (data) => {
        const availableCoins = await this.roomsList.captureCoin(
          data.coinId,
          data.roomNumber
        )
        this.io.emit('available-coins', availableCoins)
      })

      socket.on('disconnect', () => {
        console.log('client disconnected')
      })
    })
  }
}

export default Socket
