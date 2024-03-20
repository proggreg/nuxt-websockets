import type { Peer, Message } from 'crossws'

const room = 'ROOM'

const userNames = new Map<Peer, string>()

export default defineWebSocketHandler({
  open(peer: Peer) {
    console.log('opened WS', peer)
    peer.subscribe(room)
    peer.publish(room, 'Another user joined the chat')
  },
  close(peer: Peer) {
    console.log('closed WS', peer)
  },
  error(peer, error) {
    console.log('error on WS', peer, error)
  },
  message(peer, message) {
    console.log('message on WS', peer, message)
    const data = message.text()
    // console.log('data', typeof data, data)
    if (data.includes('"type":"username"')) {
      let userName = JSON.parse(message.text())
      userNames.set(peer.id, userName.value)
      console.log('username', userName.value)
    } else {
      peer.publish(room, `${userNames.get(peer.id)}: ${data}`)
    }

  },
  resolve(req) {
    console.log('resolve', req)
  }
})


