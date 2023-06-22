import { Request, Response } from 'express'
import { getRooms } from '../services/redis'
import { CoinInterface, CoinsRoom } from '../interfaces/socket'

interface TransformedData {
  [room: string]: {
    coins: CoinInterface[]
  }
}

function formatResponse(data: CoinsRoom[]): TransformedData {
  const transformedData: TransformedData = {}

  data?.forEach(({ coins, room }) => {
    transformedData[`room${room}`] = { coins }
  })
  return transformedData
}

export const getCoinsInRooms = async (_req: Request, res: Response) => {
  try {
    const result = await getRooms()
    if (!result) return

    const data = formatResponse(result)

    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
  }
}

export const getCoinsInRoom = async (req: Request, res: Response) => {
  const roomId = req.params.id
  try {
    const result = await getRooms()
    if (!result) return

    const data = formatResponse(result)
    if (!data[`room${roomId}`])
      return res.status(404).json({ msg: 'room not found' })

    return res.status(200).json({ data: data[`room${roomId}`] })
  } catch (error) {
    console.log(error)
    return
  }
}
