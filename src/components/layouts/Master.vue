<template>
  <div id="app">
    <div class="menu" v-if="mobileView" @click="showNav = !showNav">
      <i class="fas fa-bars"></i>
    </div>
    <div class="menu__mobile" :class="{ open: showNav }">
      <li @click="showNav = !showNav">
        <router-link :to="{ name: 'todo' }">TODOS</router-link>
      </li>
      <li v-if="!loggedIn" @click="showNav = !showNav">
        <router-link :to="{ name: 'login' }">LOGIN</router-link>
      </li>
      <li v-if="!loggedIn" @click="showNav = !showNav">
        <router-link :to="{ name: 'register' }">REGISTER</router-link>
      </li>
      <li v-if="loggedIn" @click="showNav = !showNav">
        <router-link :to="{ name: 'profile' }"> ACCOUNT </router-link>
      </li>
      <li v-if="loggedIn" @click="showNav = !showNav">
        <router-link :to="{ name: 'logout' }">LOGOUT</router-link>
      </li>
    </div>
    <ul class="nav" v-if="!mobileView">
      <li>
        <router-link :to="{ name: 'todo' }"
          ><TextBase component="p" variant="nav" weight="bold"
            >Todos</TextBase
          ></router-link
        >
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'login' }"
          ><TextBase component="p" ariant="nav" weight="bold"
            >Login</TextBase
          ></router-link
        >
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'register' }"
          ><TextBase component="p" ariant="nav" weight="bold"
            >Register</TextBase
          ></router-link
        >
      </li>
      <li v-if="loggedIn">
        <router-link :to="{ name: 'profile' }">
          <TextBase component="p" ariant="nav" weight="bold">Account</TextBase>
        </router-link>
      </li>
      <li v-if="loggedIn">
        <router-link :to="{ name: 'logout' }"
          ><TextBase component="p" ariant="nav" weight="bold"
            >Logout</TextBase
          ></router-link
        >
      </li>
    </ul>
    <router-view></router-view>
    <notifications
      classes="notifi__success"
      group="success"
      animation-type="velocity"
      position="top center"
      width="55%"
    />
    <notifications
      classes="notifi__error"
      group="error"
      animation-type="velocity"
      position="top center"
      width="55%"
    />
  </div>
</template>

<script>
import TextBase from "../base/TextBase.vue";
export default {
  components: {
    TextBase,
  },
  data() {
    return {
      userName: null,
      mobileView: true,
      showNav: false,
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 850;
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style lang="scss">
@import "~/../src/styles/abstracts/variables";
@import "~/../src/styles/abstracts/mixin";
#app {
  color: #2c3e50;
  font-size: 24px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu {
  position: fixed;
  top: 10px;
  left: 18px;
  width: auto;
  padding: 0 10px 10px 0;
  z-index: 3;
  cursor: pointer;
  i {
    font-size: 1.5rem;
  }
}
.menu__mobile {
  position: fixed;
  top: 0;
  left: -3000px;
  width: 100%;
  height: 100vh;
  transition: 0.5s transform cubic-bezier(0.42, 0.43, 0.85, 1.03);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3ab397;
  z-index: 2;
  li {
    list-style: none;
    margin-bottom: 40px;
    font-weight: bold;
    a {
      text-decoration: none;
      color: #fff;
    }
  }
}
.open {
  transform: translateX(3000px);
}
.nav {
  display: flex;
  list-style: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  background: #f5f8fa;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 24px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
  }
  a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.1rem;
    text-decoration: none;
    text-transform: uppercase;
  }
}
.notifi__success {
  padding: 20px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: #ffffff;
  background: #68cc86;
  .notification-title {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
  }
}
.notifi__error {
  padding: 20px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: #ffffff;
  background: rgb(206, 63, 63);
  .notification-title {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    @include respond(mobile) {
      font-size: 10px;
    }
  }
}
</style>
