<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="pindahKeHome()">
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="pindahKeMenu()">

          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="pindahKeAbout()">

          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>DasèGoods</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs10 offset-xs1>
            <v-card dark color="secondary">
              <v-card-text>
                <h1>DasèGoods</h1>
              </v-card-text>
            </v-card>
            <p> </p>
            <p>Welcome to DasèGoods</p>
            <blockquote class="blockquote mb-5"> Makes awesome wide range of color and authentic graphic T-shirt. </blockquote>
            <h3> Follow us on: </h3>
            <v-btn fab dark large color="purple" @click="ig()">
              <v-icon dark>instagram</v-icon>
            </v-btn>

            <v-btn fab dark large color="purple" @click="line()">
              <v-icon dark>line</v-icon>
            </v-btn>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; Indra Aristya 2018</span>
    </v-footer>
  </v-app>
</template>


<script>
export default {
  datas() {
    return {
      nama: "Indra",
      tutor: ["Yogi", "Wisesa"]
    };
  },
  data: () => ({
    drawer: false
  }),
  props: {
    source: String
  },
  methods: {
    addArray() {
      this.tutor.push(this.nama);
    },
    deleteArray(s) {
      console.log(s);
      this.tutor.splice(s, 1);
    },
    pindahKeAbout() {
      this.$router.push({ name: "about" });
    },
    pindahKeMenu() {
      this.drawer = false;
      this.$router.push({ name: "menu" });
    },
    pindahKeHome() {
      this.$router.push({ name: "home" });
    },
    ig() {
      window.open("http://instagram.com/dase.goods", "_blank");
    },
    line() {
      window.open("https://line.me/R/ti/p/@cei6009u", "_blank");
    }
  }
};
</script>
