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
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>DasèGoods</v-toolbar-title>
        </v-toolbar>
        <v-content>

            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <!-- <v-flex v-for="i in 2" :key="`6${i}`" xs6>
                    <v-card dark color="secondary">
                        <v-card-text class="px-0" >6</v-card-text>
                    </v-card>
                </v-flex> -->
                    <v-flex sm1></v-flex>
                    <v-flex xs12 sm5>
                        <v-card light>
                            <v-img :src="produk.linkbaju" height="100%" width="100%"></v-img>
                            <v-card-title primary-title>
                                <div>
                                    <h4 class="headline mb-0" style="color:orange;font-style:oblique" >{{produk.namabaju}}</h4>
                                </div>
                            </v-card-title>
                        </v-card>
                        <v-card-actions>
                            <v-flex xs12 align-end flexbox>
                                <v-btn  color="orange">Share</v-btn>
                            </v-flex>
                        </v-card-actions>
                    </v-flex>
                    <v-flex xs12 sm5>
                        <!-- {{produk}} -->
                        <!-- <v-layout align-center> -->
                        <v-card light>
                            <v-card-text class="px-5" style="text-transform: uppercase;font-family:Lucida Console; font-style:oblique"><h1>{{produk.namabaju}}</h1></v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-flex xs12 sm4>
                                    <v-select v-model="orSize" :items="ukuran" :rules="[v => !!v || 'Item is required']" label="Ukuran" required></v-select>
                                    <p v-if="orSize == 'S'" style="font-family:courier; color:gray; text-align:left">Stock: {{produk.stok_S}} pcs</p>
                                    <p v-if="orSize == 'M'" style="font-family:courier; color:gray; text-align:left">Stock: {{produk.stok_M}} pcs</p>
                                    <p v-if="orSize == 'L'" style="font-family:courier; color:gray; text-align:left">Stock: {{produk.stok_L}} pcs</p>
                                    <p v-if="orSize == 'XL'" style="font-family:courier; color:gray; text-align:left">Stock: {{produk.stok_XL}} pcs</p>
                                    <p v-if="orSize == 'XXL'" style="font-family:courier; color:gray; text-align:left">Stock: {{produk.stok_XXL}} pcs</p>
                                </v-flex>
                                <v-flex xs12 sm4 d-flex>
                                    <v-text-field v-if="stok != 0" v-model="orCount" :rules="qtyRules" :counter="3" label="Jumlah" required type="number"></v-text-field>
                                    <p v-if="stok == 0" class="red--text">Out of Stock</p>
                                    
                                </v-flex>
                                <v-btn color="success" >Order</v-btn>
                            </v-form>
                            <p></p>

                            <!-- <div class="text-xs-center">
                                <v-dialog v-model="dialog" width="500">
                                    <p>sssss</p>
                                    <v-btn slot="activator" @click="submit()" :disabled="!valid">Order</v-btn>

                                    <v-card>
                                        <v-card-title class="headline grey lighten-2" primary-title>
                                            Your order details:
                                        </v-card-title>
                                        <v-card-text>
                                            Your order of {{nama}}: {{orCount}} pc/s of size {{orSize}}
                                        </v-card-text>

                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" flat @click="dialog =false">
                                                Close
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div> -->
                        </v-card>
                        <!-- </v-layout> -->
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
import { db } from "../main";
export default {
  data: () => ({
    drawer: false,
    ukuran: ["S", "M", "L", "XL", "XXL"],
    valid: false,
    qtyRules: [
      v => !!v || "Qty is required"
    //   v => v != 0 || "Qty is required"
    //   v => v.length != 0 || "Only max can ordered 999 pcs",
    ],
    show: false,
    orSize: null,
    orCount: null,
    dialog: false,
    produk: [],
    stok: null,
    asd: false
  }),
  props: {
    source: String,
    id: String
  },
  created() {



  },
  watch: {
      orCount(){
        if (parseInt(this.orCount) > this.stok) {
            this.qtyRules.push(parseInt(this.orCount) < this.stok || "There's no more clothes")
        } else if (parseInt(this.orCount) <= 0) {
            this.qtyRules.push(parseInt(this.orCount) > 0 || "At least buy 1")        
        } else {
            this.qtyRules.pop()
        }          
      },
      orSize() {
          if (this.orSize === 'S') {
              this.stok = this.produk.stok_S;
          } else if (this.orSize === 'M') {
              this.stok = this.produk.stok_M;
          } else if (this.orSize === 'L') {
              this.stok = this.produk.stok_L;
          } else if (this.orSize === 'XL') {
              this.stok = this.produk.stok_XL;
          } else if (this.orSize === 'XXL') {
              this.stok = this.produk.stok_XXL;
          } 
          this.orCount = null;
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
    submit() {
      // if (this.orSize != null && this.orCount != '') {
      //     this.show = true
      // }
      if (this.valid) {
        this.show = true;
      }
    }
  },
  firestore() {
    return {
      produk: db.collection("produk").doc(this.id)
    };
  }
};
</script>
