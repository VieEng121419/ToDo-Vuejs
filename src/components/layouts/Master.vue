<template>
  <div id="app">
    <div class="menu" v-if="mobileView" @click="showNav = !showNav"> 
      <i class="fas fa-bars"></i>
    </div>
    <div class="menu__mobile" :class="{'open': showNav}">
      <li @click="showNav = !showNav"><router-link :to="{ name: 'home' }">HOME</router-link></li>
      <li @click="showNav = !showNav"><router-link :to="{ name: 'todo' }">TODOS</router-link></li>
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
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'todo' }">Todos</router-link></li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'register' }">Register</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link :to="{ name: 'profile' }"> Account </router-link>
      </li>
      <li v-if="loggedIn">
        <router-link :to="{ name: 'logout' }">Logout</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <notifications
      group="error"
      animation-type="velocity"
      position="top center"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: null,
      mobileView: true,
      showNav: false
    };
  },
  methods: {
    handleView(){
      this.mobileView = window.innerWidth <= 850;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["auth/loggedIn"];
    },
  },
  created(){
    this.handleView();
    window.addEventListener('resize', this.handleView);
  }
};
</script>

<style lang="scss">
#app {
	color: #2c3e50;
	font-size: 24px;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.menu{
  position: fixed;
	top: 10px;
  left: 18px;
	width: auto;
  padding: 0 10px 10px 0;
	z-index: 3;
  cursor: pointer;
  i{
    font-size: 1.5rem;
  }
}
.menu__mobile{
  position: absolute;
  top: 0;
  left: -3000px;
  width: 100%;
  height: 100vh;
  transition: 0.5s transform cubic-bezier(.42,.43,.85,1.03);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3ab397;
  z-index: 2;
    li{
      list-style: none;
      margin-bottom: 40px;
      font-weight: bold;
      a{
         text-decoration: none;
         color: #fff;
      }    
    }
}
.open{
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
	}
	a {
		color: #636b6f;
		padding: 0 25px;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.1rem;
		text-decoration: none;
		text-transform: uppercase;
	}
}
</style>
