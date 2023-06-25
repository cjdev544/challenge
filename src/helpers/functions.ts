import * as fs from 'fs'
import path from 'path'
import Room from '../models/room'
import { Config } from '../interfaces/config'

export const generateRoomsAndCoins = () => {
  const config: Config = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf-8')
  )

  const staticRooms: Room[] = []
  for (let i = 0; i < config.roomsNumber; i++) {
    staticRooms.push(new Room(i + 1, config))
  }

  const dataRooms = staticRooms.map((room) => ({
    coins: room.coins,
    room: room.roomNumber,
  }))

  return dataRooms
}
