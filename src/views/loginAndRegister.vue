<template>
  <div id="app">
    <v-app>
      <div class="row vertical-center bg-iamge">
        <v-row justify="center" id="Login">
          <v-card>
            <v-tabs
              v-model="tab"
              background-color="primary accent-4"
              class="elevation-2"
              dark
            >
              <v-tabs-slider></v-tabs-slider>
              <v-tab
                v-for="i in tabs"
                :key="i"
                :href="`#tab-${i}`"
                @click="selectTab(i)"
              >
                {{ tabsName[i - 1] }}
              </v-tab>
            </v-tabs>
            <v-card-text v-show="selectedTab == 2">
              <v-container>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="register.name"
                        :rules="[rules.required]"
                        label="First Name"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="register.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="register.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12">
                      <v-text-field
                        block
                        v-model="register.repeatPassword"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirm Password"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                      <v-select
                        v-model="register.userType"
                        :items="items"
                        :rules="[(v) => !!v || 'Item is required']"
                        label="Select Role"
                        required
                      ></v-select>
                    </v-col>

                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12">
                      <v-btn
                        block
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="getRegister()"
                      >
                        Register
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-text v-show="selectedTab == 1">
              <v-container>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <!-- <v-col cols="12">
                      <v-select
                        v-model="login.userType"
                        :items="items"
                        :rules="[(v) => !!v || 'Item is required']"
                        label="Select Role"
                        required
                      ></v-select>
                    </v-col> -->
                    <v-col cols="12">
                      <v-text-field
                        v-model="login.email"
                        :rules="loginEmailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="login.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>

                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12">
                      <v-btn
                        block
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="getLogin()"
                      >
                        login
                      </v-btn>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12">
                      <v-btn block color="outlined" class="mr-4" to="/forgot">
                        Forgot Password
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-row>
      </div>
    </v-app>
  </div>
</template>

<script>
import { Register, login } from "@/service/Login&Register";

export default {
  computed: {
    isLogin() {
      return this.localStorage.getItem("accessToken");
    },
  },

  methods: {
    selectTab(stuff) {
      this.selectedTab = stuff;
      this.reset();
      this.resetValidation();
      this.valid = true;
    },

    getLogin() {
      if (this.$refs.loginForm.validate()) {
        login(this.login)
          .then((response) => {
            if (response) {
              this.$swal(response.message);
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("userType", response.data.data.userType);
              if (localStorage.getItem("userType") === "admin") {
                this.$router.push({ name: "admin" });
              } else if (localStorage.getItem("userType") === "participant") {
                this.$router.push({ name: "participant" });
              } else {
                this.$router.push({ name: "manager" });
              }
              this.reset();
              this.resetValidation();
            }
          })
          .catch((error) => this.$swal(error));
      }
    },
    getRegister() {
      if (this.$refs.registerForm.validate()) {
        Register(this.register)
          .then((response) => {
            if (response) {
              this.$swal(response.message);
              this.reset();
              this.resetValidation();
              this.selectedTab = 1;
            }
          })
          .catch((error) => this.$swal(error));
      }
    },
    reset() {
      this.$refs.loginForm.reset();
      this.$refs.registerForm.reset();
    },
    resetValidation() {
      this.$refs.loginForm.resetValidation();
      this.$refs.registerForm.resetValidation();
    },
  },
  data: () => ({
    login: {
      // userType: "participant",
      password: "Digvijay123@gmail.com",
      email: "Digvijay123@gmail.com",
    },
    register: {
      name: "",
      email: "",
      userType: "",
      password: "",
      // repeatPassword: "",s
    },
    items: ["admin", "participant", "manager"],
    selectedTab: 1,
    tab: null,
    tabsName: ["Login", "Register"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tabs: 2,
    valid: true,

    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    zipCodeRules: [
      (v) => !!v || "Required",
      (v) => /^\d+$/.test(v) || "Zipcode contains only digits",
    ],

    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
};
</script>

<style>
.vertical-center {
  display: flex;
  align-items: center;
  min-height: 100vh;
}

.bg-iamge {
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url(https://images.unsplash.com/photo-1482858683229-74280d78908b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5530707633478a5be10d25f09dacf9ef&auto=format&fit=crop&w=700&q=60);
  background-size: cover;
  background-position: top;
  position: relative;
}
</style>
