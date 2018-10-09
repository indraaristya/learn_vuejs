<template>
  <!-- <v-app> -->
  <v-content>
    <br>
    <h1 class="white--text">Yudhasboard</h1>
    <v-container fluid fill-height>

      <v-layout align-center justify-center>

        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login to Yudhasboard</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" @keyup.enter.native="login(nama,pass)">
                <v-text-field v-model="nama" :rules="namaRules" prepend-icon="person" name="login" label="Login" type="text" required=""></v-text-field>
                <v-text-field v-model="pass" :rules="passRules" id="password" prepend-icon="lock" name="password" label="Password" type="password" required=""></v-text-field>
                <v-btn :disabled="!valid" @click="login(nama,pass)">Login</v-btn>
                <br>
                <br>
                <!-- <div v-if="salah === true"> <p class="wrongpass"><strong>Wrong Password! </strong></p></div> -->
                <p>user: yudha & pass: 123</p>
                <div v-if="salah === true">
                  <p class="wrongpass"><strong>Wrong Password! </strong></p>
                </div>
              </v-form>
            </v-card-text>
            <!-- <v-card-actions> -->
            <v-spacer></v-spacer>

            <!-- </v-card-actions> -->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
  <!-- </v-app> -->
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    nama: "",
    pass: "",
    namaRules: [v => !!v || "Username is required"],
    passRules: [v => !!v || "Password is required"],
    valid: true,
    salah: false
  }),
  props: {
    source: String
  },
  methods: {
    login(nama, pass) {
      this.salah = false;
      if (nama == "yudha" && pass == "123") {
        this.$router.push({ name: "yudha" });
      } else {
        this.salah = true;
      }
    }
  }
};
</script>