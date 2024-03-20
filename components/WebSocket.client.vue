<script setup lang="ts">
// In prod: check if secure, then use wss://
const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/websocket`)

const history = ref<string[]>([])
watch(data, (newValue) => {
  history.value.push(`server: ${newValue}`)
})

const message = ref('')
function sendData(){
  history.value.push(`client: ${message.value}`)
  send(message.value)
  message.value = ''
}
</script>

<template>
  <h1>WebSocket - let's go!</h1>
  <form @submit.prevent="sendData">
    <Input v-model="message"/>
    <Button type="submit">Send</Button>
  </form>
  <Card>
    <CardHeader>
      <CardTitle>Messages</CardTitle>
    </CardHeader>
    <CardContent>
      <p v-for="entry in history">{{ entry }}</p>
    </CardContent>
  </Card>
</template>