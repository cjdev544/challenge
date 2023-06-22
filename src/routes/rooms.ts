import { Router } from 'express'
import { getCoinsInRoom, getCoinsInRooms } from '../controllers/rooms'

const router = Router()

router.get('/rooms', getCoinsInRooms)
router.get('/rooms/:id', getCoinsInRoom)

export default router
