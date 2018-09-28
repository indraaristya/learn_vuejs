<template>
<v-app>
    <v-layout justify-center>
        <v-flex xs12 sm6>
          <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
            <div style="text-align: left">
          <v-btn color="error" style="margin:10px" @click="$router.push({name: 'yudhasboard'})">Back</v-btn>
            </div>
            <br>
            <h2 class="white--text"><strong>Barang</strong></h2>
            
              
            <v-card>
                <v-form v-model="valid" @keyup.enter.native="submit(namabaju,hargabaju,linkbaju)">
                    <v-layout justify-center>
                        <v-flex xs12 sm6>
                            <v-text-field v-model="namabaju" :rules="namaRules" :counter="20" label="Nama Barang" required></v-text-field>
                            <v-text-field v-model="hargabaju" :rules="hargaRules" label="Harga Barang" required></v-text-field>
                            <!-- <v-text-field v-model="linkbaju" :rules="linkRules" label="Link Gambar Barang" required></v-text-field> -->
                            <br>
                            <p v-if="linkbaju != ''" class="green--text"> Photo ready to Submit! </p>
                            <div>
                                <input type="file" multiple accept="image/jpeg/png" @change="detectFiles($event.target.files)">
                                <v-progress-linear class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</v-progress-linear>
                            </div>
                            <v-btn :disabled="!valid" @click="submit(namabaju,hargabaju,linkbaju)">
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
                        <v-btn depressed small color="error" @click="deletes(props.item.id)">Delete</v-btn>
                    </td>
                </template>

            </v-data-table>
            <v-progress-linear :indeterminate="true" v-if="barang[0] === undefined"></v-progress-linear>
            <!-- <v-card>
        <v-flex v-for="(namaB, idx) in namaBaju" :key="idx" xs4>
            <p> {{namaB.namabaju}} </p>
            <p> {{namaB.hargabaju}} </p>
        </v-flex>
        </v-card> -->
        </v-flex>
    </v-layout>
    </v-app>
</template>


<script>
import { db, storage} from "../main";
export default {
  data: () => ({
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
    barang: [],
    a: "",
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
      // a: db.collection('produk').orderBy('namabaju','asc').length
    };
  },
  methods: {
    submit(namabaju, hargabaju, linkbaju) {
      db.collection("produk").add({ hargabaju, linkbaju, namabaju });
      this.namabaju = "";
      this.hargabaju = "";
      this.linkbaju = "";
    },
    deletes(id) {
      // const index = this.barang.indexOf(id)
      db.collection("produk")
        .doc(id)
        .delete();
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
            sp.bytesTransferred / sp.totalBytes * 100
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