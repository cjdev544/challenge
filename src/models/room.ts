import * as fs from 'fs'
import path from 'path'
import Coin from './coin'

type Config = {
  roomsNumber: number
  coinsForRoom: number
  roomArea: {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
    zMin: number
    zMax: number
  }
}

class Room {
  private config: Config
  roomNumber: number
  coins: Coin[] = []

  constructor(roomNumber: number) {
    this.roomNumber = roomNumber

    this.config = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf-8')
    )

    for (let i = 0; i < 10; i++) {
      const coin = new Coin(
        Math.floor(
          Math.random() *
            (this.config.roomArea.xMax - this.config.roomArea.xMin + 1) +
            this.config.roomArea.xMin
        ),
        Math.floor(
          Math.random() *
            (this.config.roomArea.yMax - this.config.roomArea.yMin + 1) +
            this.config.roomArea.yMin
        ),
        Math.floor(
          Math.random() *
            (this.config.roomArea.zMax - this.config.roomArea.zMin + 1) +
            this.config.roomArea.zMin
        )
      )
      this.coins.push(coin)
    }
  }
}

export default Room
