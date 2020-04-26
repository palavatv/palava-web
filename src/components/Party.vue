<template>
  <main class="party">
    <nav class="top-control">
      <span class="home-link">
        <router-link to="/">
          <img
            alt="palava.tv logo, click here to get back to start page"
            src="@/assets/palava.svg"
            />
        </router-link>
      </span>
      <span class="share-link">
        {{ shareLink }}
      </span>
    </nav>
    <ul :class="{
      'stage': true,
      'stage--empty': peers.length === 0,
      'stage--one': peers.length === 1,
      'stage--two': peers.length === 2,
      'stage--three': peers.length === 3,
      'stage--four': peers.length === 4,
      'stage--five': peers.length === 5,
      'stage--six': peers.length === 6,
    }">
      <Peer v-for="peer in peers" :key="peer.id" :peer="peer" />
    </ul>
  </main>
</template>

<script>
import Peer from "@/components/Peer.vue"

export default {
  props: ["peers"],
  components: {
    Peer,
  },
  computed: {
    shareLink() {
      if (!window) { return '' }
      return `${window.location.protocol}//${window.location.host}/${window.location.pathname}`
    },
  },
}
</script>

<style lang="scss">
.dashboard {
  height: 100%;
  background: black;
  position: relative;
}

.top-control {
  position: absolute;
  top: 0;
  left: 0;

  /* debug start */
  a { color: white; }
  z-index: 1000;
  top: 10px;
  left: 10px;
  /* debug end */

  .home-link {
    opacity: 0.6;
    img {
      height: 40px;
    }
  }

  .share-link {
    display: none;
    text-decoration: underline;
  }
}

.party {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  > * {
    flex: 1;
  }
}

</style>
