<template>
  <div class="info user-media-configurator">
    <LanguageSwitcher class="language-switcher language-switcher--desktop" />
    <Logo class="logo logo--desktop" />

    <main class="info-page">
      <LanguageSwitcher class="language-switcher language-switcher--mobile" />
      <Logo class="logo logo--mobile" />

      <h1>You are about to join a palava.tv room</h1>

      <p><router-link to="/info/how">click here to learn more about palava.tv</router-link></p>

      <p>This will join or create a video chat meeting with anyone also connected to this page. For technical reasons, your IP address and other personal data is sent to all other participants via the palava.tv server. By continuing, you consent to our privacy policy, <a href="/info/privacy">you can read it here</a>.</p>

      <!-- Use relay server<br/>
      Use password<br/> -->

      <p>Please select the video and audio streams you want to send to other participants:</p>

      <ul>
        <li><button @click="$emit('join-room', { video: { facingMode: 'user' }, audio:true })" autofocus>Video &amp; Audio</button></li>
        <li><button @click="$emit('join-room', { video: { facingMode: 'user' }, audio:false })">Only Video</button></li>
        <li><button @click="$emit('join-room', { video: false, audio:true })">Only Audio</button></li>
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
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Logo from '@/components/Logo.vue'

export default {
  components: {
    LanguageSwitcher,
    Logo,
  },
  props: {
    error: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">

</style>
