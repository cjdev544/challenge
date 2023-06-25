import { generateRoomsAndCoins } from '../helpers/functions'
import { CoinsRoom } from '../interfaces/socket'
import {
  getRooms,
  getRoom,
  deleteCoinInRoom,
  saveDataToRedis,
} from '../services/redis'

class RoomList {
  constructor() {
    this.checkDataRooms()
  }

  private async checkDataRooms() {
    const data = await getRooms()

    if (!data) {
      this.saveDataRooms()
    }
  }

  private async saveDataRooms() {
    const dataRooms = generateRoomsAndCoins()
    await saveDataToRedis(dataRooms)
  }

  async getAllRooms(): Promise<CoinsRoom[] | null> {
    return await getRooms()
  }

  async getCoinsInRoom(roomNumber: number): Promise<CoinsRoom | null> {
    return await getRoom(roomNumber)
  }

  async captureCoin(
    coinId: string,
    roomNumber: number
  ): Promise<CoinsRoom[] | null> {
    return await deleteCoinInRoom(coinId, roomNumber)
  }
}

export default RoomList
