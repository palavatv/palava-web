<template>
  <main>
    <div v-if="error === 'room_full'">
      <h3>This palava.tv room is full</h3>

      <p>You cannot enter this room, because the maximum number of participants is reached</p>
      <p><a href="javascript:window.location.reload()">Try again!</a></p>
    </div>
    <div v-if="error === 'maintenance'">
      <h3>Sorry, your connection will be reset</h3>

      <p>Because of a palava.tv server maintenance, your connection is being lost.<br/>
         We apologize for any inconvenience this may cause.</p>
      <p><a href="javascript:window.location.reload()">Please reload in a few moments!</a></p>
    </div>
    <div v-else>
      <h3>Unable to join this room</h3>

      <p>The connection to palava.tv could not be established</p>
      <p>This is often caused by an Internet connection error.</p>
      <p><a href="javascript:window.location.reload()">Try again!</a></p>
    </div>
  </main>
</template>

<script>
export default {
  props: ['error'],
}
</script>
