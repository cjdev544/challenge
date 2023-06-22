import Room from '../models/room'
// import { saveDataToRedis } from '../services/redis'

export const generateRoomsAndCoins = () => {
  const staticRooms: Room[] = []
  for (let i = 0; i < 10; i++) {
    staticRooms.push(new Room(i + 1))
  }

  const dataRooms = staticRooms.map((room) => ({
    coins: room.coins,
    room: room.roomNumber,
  }))
  // await saveDataToRedis(dataRooms)
  return dataRooms
}
