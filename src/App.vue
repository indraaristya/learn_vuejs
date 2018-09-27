<template>
  <v-app id="inspire" dark>
    <div id="app">
      <!-- <v-toolbar>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>DasèGoods</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat><router-link to="/">Home</router-link></v-btn>
          <v-btn flat><router-link to="/about">About</router-link></v-btn>
          <v-btn flat><router-link to="/menu">Menu</router-link></v-btn>
        </v-toolbar-items>
      </v-toolbar> -->
    <router-view/>
    </div>
  </v-app>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.wrongpass {
  animation-name: shake, glow-red;
  animation-duration: 0.7s, 1s;
  animation-iteration-count: 1, 2, 3, 4, 5;
  color: red;
}
</style>
