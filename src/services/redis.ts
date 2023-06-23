import { createClient } from 'redis'
import { CoinsRoom, Data } from '../interfaces/socket'
import { generateRoomsAndCoins } from '../helpers/functions'

const client = createClient({
  url: 'redis://redis',
})

// const client = createClient()

export const saveDataToRedis = async (data: CoinsRoom[]) => {
  await client.connect()
  try {
    const formatData: Data = { data }
    await client.set('dataRooms', JSON.stringify(formatData))

    client.disconnect()
  } catch (error) {
    console.log(error)
  }
}

export const getRooms = async (): Promise<CoinsRoom[] | null> => {
  try {
    await client.connect()

    const value = await client.get('dataRooms')
    if (value) {
      const res: Data = JSON.parse(value)
      return res.data
    }

    client.disconnect()
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getRoom = async (
  roomNumber: number
): Promise<CoinsRoom | null> => {
  const data = await getRooms()
  if (!data) return null
  return data[roomNumber - 1]
}

export const deleteCoinInRoom = async (
  coinId: string,
  roomNumber: number
): Promise<CoinsRoom[] | null> => {
  const rooms = await getRooms()
  if (!rooms) return null

  const availableCoins = rooms.map((element) => {
    if (element.room === roomNumber) {
      return {
        coins: element.coins.filter((coin) => coin.id !== coinId),
        room: element.room,
      }
    } else {
      return element
    }
  })
  if (availableCoins) {
    saveDataToRedis(availableCoins)
    return availableCoins
  }
  return null
}

setInterval(async () => {
  const data = generateRoomsAndCoins()
  await saveDataToRedis(data)
}, 3600000)
