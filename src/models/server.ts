import { createServer, Server as HttpServer } from 'http'
import express, { Application } from 'express'
import { Server as WebSocketServer } from 'socket.io'
import { SocketServerInterface } from '../interfaces/socket'
import cors from 'cors'
import Socket from './socket'
import routes from '../routes/rooms'

class Server {
  constructor(
    private port = process.env.PORT || 3000,
    private app: Application = express(),
    private server: HttpServer = createServer(app),
    private io = new WebSocketServer<SocketServerInterface>(server)
  ) {
    new Socket(this.io)
    this.middleware()
    this.apiRest()
  }

  private middleware() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private apiRest() {
    this.app.use('/api', routes)
  }

  listen() {
    this.server.listen(this.port, () =>
      console.log(`Server on port: ${this.port}`)
    )
  }
}

export default Server
