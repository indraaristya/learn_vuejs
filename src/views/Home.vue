<template>
  <v-app id="inspire" light>
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
        <v-list-tile @click="pindahKeDashboard()">
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="pindahkeHome()">DasèGoods</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-carousel style="height:60%">
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
      <p> </p>
      <h1><em>DASE (Re: Dëiß)</em></h1>
      <h3><em>Makes awesome wide range of color and authentic graphic T-shirt.</em></h3>
    </v-content>
    <v-footer app fixed>
      <span>&copy; Indra Aristya 2018</span>
    </v-footer>
  </v-app>
</template>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      nama: "Indra",
      tutor: ["Yogi", "Wisesa"],
      drawer: false,
      items: [
        {
          src:
            "https://preview.ibb.co/c0aUSU/Screen_Shot_2018_09_26_at_1_00_01_PM.png"
        },
        {
          src:
            "https://preview.ibb.co/nKREu9/Screen_Shot_2018_09_26_at_12_59_53_PM.png"
        }
      ]
    };
  },
  // data: () => ({
  //   drawer: false,
  // }),
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
    pindahKeDashboard() {
      this.$router.push({ name: "yudhasboard" });
    }
  }
};
</script>
