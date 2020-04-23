<template>
  <div class="earth">
    <Navigation />
    <main>
      <h3>You are about to join a palava.tv room</h3>

      <p><router-link to="/info/how">click here to learn more about palava.tv</router-link></p>

      <p>This will join or create a video chat meeting with anyone also connected to this page. For technical reasons, your IP address and other personal data is sent to all other participants via the palava.tv server. By continuing, you consent to our privacy policy, <a href="/info/privacy">you can read it here</a>.</p>
      <p>Please select the video and audio streams you want to send to other participants:</p>

      <ul>
        <li><button @click="$emit('join-room', {video: true, audio:true})" autofocus>Video &amp; Audio</button></li>
        <li><button @click="$emit('join-room', {video: true, audio:false})">Only Video</button></li>
        <li><button @click="$emit('join-room', {video: false, audio:true})">Only Audio</button></li>
      </ul>

      <div v-if="error">
        <h3>The palava.tv application was unable to access the requested stream.</h3>
        <br/>
        Possible reasons and solutions:<br/>
        - You have denied access. Try again by pressing one of the above buttons.<br/>
        - You have previously denied palava.tv to access you microphone or camera. You will need to unblock it in your browser settings to be able to join this room. In most browsers, this can be done by clicking on a small camera symbol in the address bar<br/>
        - Another program on your computer is using the camera. Stop this program and try again.<br/>
      </div>
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation,
  },
  props: ["error"],
}
</script>
