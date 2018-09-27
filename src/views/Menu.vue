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
            <v-container grid-list-md text-xs-center>
                <v-progress-circular indeterminate color="primary" v-if="namaBaju[0] === undefined"></v-progress-circular>
                <v-layout row wrap>
                    <!-- <v-flex v-for="i in 3" :key="`4${i}`" xs4>
                <v-card>
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
                    <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-flex xs12 align-end flexbox>
                            <v-btn flat color="orange">Share</v-btn>
                            <v-btn flat color="orange" @click="showDetail()">Explore</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-flex> -->
                    <v-flex v-for="(namaB) in namaBaju" :key="namaB.id" xs4>
                        <div @click="showDetail(namaB.id)" style="cursor:pointer">
                            <v-card>
                                <v-img class="white--text" height="200px" :src="namaB.linkbaju">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                            <!-- <v-flex xs12 align-end flexbox>
                                <span class="headline">{{namaB.namabaju}} </span>
                            </v-flex> -->
                                        </v-layout>
                                    </v-container>
                                </v-img>
                                <v-card-title>
                                    <v-flex xs12 align-end flexbox>
                                        <div>
                                            <span class="white--text"><strong> Rp.{{namaB.hargabaju}} </strong></span><br>
                                            <span class="white--text"><strong> {{namaB.namabaju}} </strong></span><br>
                                            <!-- <span>Whitsunday Island, Whitsunday Islands</span> -->
                                        </div>
                                    </v-flex>
                                </v-card-title>
                                <v-card-actions>
                                    <v-flex xs12 align-end flexbox>
                                        <v-btn flat color="orange">Share</v-btn>
                                        <v-btn flat color="orange" @click="showDetail(namaB.id)">Explore</v-btn>
                                    </v-flex>
                                </v-card-actions>
                            </v-card>
                        </div>

                    </v-flex>
                </v-layout>
            </v-container>

            <div class="text-xs-center">
                <v-pagination v-model="page" :length="4" circle></v-pagination>
            </div>
            <br>
    </v-content>
            <v-footer app fixed>
                <span>&copy; Indra Aristya 2018</span>
            </v-footer>
    </v-app>
</template>



<script>
import { db } from "../main";
export default {
  data: () => ({
    drawer: false,
    namaBaju: [],
    page: 1,
    ids: ""
  }),
  props: {
    source: String
  },
  watch: {
    page() {
      console.log(this.page);
    }
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
      this.$router.push({ name: "menu" });
    },
    pindahKeHome() {
      this.$router.push({ name: "home" });
    },
    showDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    }
  },
  firestore() {
    return {
      namaBaju: db.collection("produk")
    };
  }
};
</script>
