<template>
<v-layout justify-center>
    <v-flex xs12 sm6 >
        <br>
        <h2 class="white--text"><strong>Barang</strong></h2>
        <v-card>
            <v-form v-model="valid" @keyup.enter.native="submit(namabaju,hargabaju,linkbaju)">
                <v-layout justify-center>
                    <v-flex xs12 sm6>
                    <v-text-field
                    v-model="namabaju"
                    :rules="namaRules"
                    :counter="20"
                    label="Nama Barang"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="hargabaju"
                    :rules="hargaRules"
                    label="Harga Barang"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="linkbaju"
                    :rules="linkRules"
                    label="Link Gambar Barang"
                    required
                    ></v-text-field>
                    <br>
                    <v-btn
                    :disabled="!valid"
                    @click="submit(namabaju,hargabaju,linkbaju)"
                    >
                    Submit
                    </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card>
        <v-data-table
        :headers="headers"
        :items="barang"
        hide-actions
        
        class="elevation-1"
        
        >
            <template slot="items" slot-scope="props">
                <td class="text-center" >{{ props.item.namabaju }}</td>
                <td class="text-center">{{ props.item.hargabaju }}</td>
                <!-- <td class="text-xs-right">{{ props.item.linkbaju }}</td> -->
                <td> <v-btn depressed small color="error" @click="deletes(props.item.id)">Delete</v-btn></td>
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
</template>


<script>
import { db } from '../main'
  export default {
    data: () => ({
      valid: true,
      namabaju: '',
      namaRules: [
        v => !!v || 'Nama Barang is required',
        v => v.length >= 5 || 'Name must be at least 5 characters'
      ],
      hargabaju: '',
      hargaRules: [
        v => !!v || 'Harga Barang is required'
      ],
      linkbaju: '',
      linkRules: [
          v => !!v || 'Link Gambar is required'
      ],
      barang: [],
      a: '',
      headers: [
          {
            text: 'Nama Barang',
            align: 'center',
            sortable: true,
            value: 'namabaju'
          },
          { text: 'Harga Barang', value: 'hargabaju', align: 'center' },
          { text: '' , sortable: false},
        ],
        
    }),
    firestore () {
        return {
        barang: db.collection('produk')
        // a: db.collection('produk').orderBy('namabaju','asc').length
        }
    },
    methods: {
        submit(namabaju,hargabaju,linkbaju) {
            db.collection('produk').add({ hargabaju, linkbaju, namabaju })
            this.namabaju = ''
            this.hargabaju = ''
            this.linkbaju = ''
        },
        deletes(id) {
            // const index = this.barang.indexOf(id)
            db.collection('produk').doc(id).delete()
        }
    }
  }
</script>