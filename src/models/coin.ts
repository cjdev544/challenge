import { v4 } from 'uuid'

class Coin {
  id: string
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.id = v4()
    this.x = x
    this.y = y
    this.z = z
  }
}

export default Coin
