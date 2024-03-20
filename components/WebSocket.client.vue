<script setup lang="ts">
// In prod: check if secure, then use wss://
const { status, data, send, open, close } = useWebSocket(`ws://${location.host}/api/websocket`)

const history = ref<string[]>([])
watch(data, (newValue) => {
  console.log('watch data', newValue)
  history.value.push(`${newValue}`)
})

const message = ref('')
const userName = ref('')
function sendData(){
  history.value.push(`${userName.value}: ${message.value}`)
  send(message.value)
  message.value = ''
}

const edit = ref(true)

function enterUsername(){
  send(JSON.stringify({
    type: 'username',
    value: userName.value
  }))
  edit.value = false
}
</script>

<template>
  <h1>WebSocket - let's go! {{ status }}</h1>
  <form @submit.prevent="enterUsername">
    <Input :disabled="!edit" v-model="userName"/>
    <Button v-if="edit" type="submit">Save Username</Button>
    <Button v-else @click="edit = true">Edit Username</Button>
  </form>

  <form @submit.prevent="sendData">
    <Input v-model="message"/>
    <Button :disabled="!userName || edit" type="submit">Send</Button>
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