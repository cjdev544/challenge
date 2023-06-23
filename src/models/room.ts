import Coin from './coin'
import { Config } from '../interfaces/config'

class Room {
  roomNumber: number
  coins: Coin[] = []

  constructor(roomNumber: number, config: Config) {
    this.roomNumber = roomNumber

    for (let i = 0; i < config.coinsForRoom; i++) {
      const coin = new Coin(
        Math.floor(
          Math.random() * (config.roomArea.xMax - config.roomArea.xMin + 1) +
            config.roomArea.xMin
        ),
        Math.floor(
          Math.random() * (config.roomArea.yMax - config.roomArea.yMin + 1) +
            config.roomArea.yMin
        ),
        Math.floor(
          Math.random() * (config.roomArea.zMax - config.roomArea.zMin + 1) +
            config.roomArea.zMin
        )
      )
      this.coins.push(coin)
    }
  }
}

export default Room
