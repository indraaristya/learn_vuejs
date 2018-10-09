<template>
  <v-app>
    <v-layout justify-center>
      <v-flex xs11 sm8>
        <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
        <div style="text-align: left">
          <v-btn color="error" style="margin:10px" @click="$router.push({name: 'yudhasboard'})">Back</v-btn>
        </div>
        <br>
        <h2 class="white--text"><strong>Barang</strong></h2>
        <p class="white--text">{{tryedit.namabaju}}</p>
        <v-card>
          <v-form v-model="valid" @keyup.enter.native="submit(namabaju,hargabaju,linkbaju,stok_S,stok_M,stok_L,stok_XL,stok_XXL)">
            <v-layout justify-center>
              <v-flex xs9 sm7>
                <v-text-field v-model="namabaju" :rules="namaRules" :counter="20" label="Nama Barang" required></v-text-field>
                <v-text-field v-model="hargabaju" :rules="hargaRules" label="Harga Barang" required></v-text-field>
                <v-flex xs9 sm7>
                  <v-text-field v-model="stok_S" :rules="stokRules" label="Stok Ukuran S" required></v-text-field>
                  <v-text-field v-model="stok_M" :rules="stokRules" label="Stok Ukuran M" required></v-text-field>
                  <v-text-field v-model="stok_L" :rules="stokRules" label="Stok Ukuran L" required></v-text-field>
                  <v-text-field v-model="stok_XL" :rules="stokRules" label="Stok Ukuran XL" required></v-text-field>
                  <v-text-field v-model="stok_XXL" :rules="stokRules" label="Stok Ukuran XXL" required></v-text-field>
                </v-flex>
                <!-- <v-text-field v-model="linkbaju" :rules="linkRules" label="Link Gambar Barang" required></v-text-field> -->
                <br>
                <p v-if="linkbaju != ''" class="green--text"> Photo ready to Submit! </p>
                <div>
                  <input type="file" multiple accept="image/jpeg/png" @change="detectFiles($event.target.files)">
                  <v-progress-linear class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</v-progress-linear>
                </div>
                <v-btn :disabled="!valid" @click="submit(namabaju,hargabaju,linkbaju,stok_S,stok_M,stok_L,stok_XL,stok_XXL)">
                  Submit
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
        <v-data-table :headers="headers" :items="barang" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-center">{{ props.item.namabaju }}</td>
            <td class="text-center">{{ props.item.hargabaju }}</td>
            <!-- <td class="text-xs-right">{{ props.item.linkbaju }}</td> -->
            <td>
              <v-btn depressed flat icon color="error" @click="deletes(props.item.id)"><v-icon dark>delete</v-icon></v-btn>
              <v-btn depressed flat icon color="blue" @click="edit(props.item.id)"><v-icon dark>edit</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
        
        <v-progress-linear :indeterminate="true" v-if="barang[0] === undefined"></v-progress-linear>

      </v-flex>
    </v-layout>

    <!-- DIALOG SHOW -->
    <!-- <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                  chips
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout> -->
  </v-app>
</template>


<script>
import { db, storage } from "../main";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    namabaju: "",
    namaRules: [
      v => !!v || "Nama Barang is required",
      v => v.length >= 5 || "Name must be at least 5 characters"
    ],
    hargabaju: "",
    hargaRules: [v => !!v || "Harga Barang is required"],
    linkbaju: "",
    linkRules: [v => !!v || "Link Gambar is required"],
    stok_S: "",
    stok_M: "",
    stok_L: "",
    stok_XL: "",
    stok_XXL: "",
    stokRules: [
      v => !!v || "Masukkan jumlah barang",
      v => v >= 0 || "Masukkan jumlah barang!"],
    barang: [],
    a: "",
    tryedit: [],
    headers: [
      {
        text: "Nama Barang",
        align: "center",
        sortable: true,
        value: "namabaju"
      },
      { text: "Harga Barang", value: "hargabaju", align: "center" },
      { text: "", sortable: false }
    ],
    progressUpload: 0,
    file: File,
    uploadTask: ""
  }),
  firestore() {
    return {
      barang: db.collection("produk")
    };
  },
  methods: {
    submit(namabaju, hargabaju, linkbaju, stok_S, stok_M, stok_L, stok_XL, stok_XXL) {
      db.collection("produk").add({ hargabaju, linkbaju, namabaju, stok_L, stok_M, stok_S, stok_XL, stok_XXL });
      this.namabaju = " ";
      this.hargabaju = " ";
      this.linkbaju = " ";
      this.stok_S = " ";
      this.stok_M = " ";
      this.stok_L = " ";
      this.stok_XL = " ";
      this.stok_XXL = " ";
    },
    deletes(id) {
      // const index = this.barang.indexOf(id)
      db.collection("produk")
        .doc(id)
        .delete();
    },
    edit(id) {
      // const index = this.barang.indexOf(id)
      this.tryedit = db.collection("produk")
        .doc(id)
        .get;
    },
    detectFiles(fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
      });
    },
    upload(file) {
      this.uploadTask = storage.ref(file.name).put(file);
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$emit("url", downloadURL);
            this.linkbaju = downloadURL;
          });
        }
      );
    }
  }
};
</script>