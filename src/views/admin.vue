<template>
  <div>
    <h2 class="pa-4 text-center">Add New Stall Details</h2>

    <div class="container">
      <v-card class="pa-8" elevation="2" outlined shaped>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="row">
            <div class="col-md-4">
              <v-file-input
                truncate-length="12"
                label="Company Logo*"
                filled
                v-model="form.logo"
                :rules="[() => !!form.logo || 'This field is required']"
              ></v-file-input>
            </div>
            <div class="col-md-4">
              <v-text-field
                label="Company Name*"
                filled
                v-model="form.company"
                :rules="[() => !!form.company || 'This field is required']"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-select
                :items="items"
                label="Categories *"
                v-model="form.category"
                :rules="[() => !!form.category || 'This field is required']"
                filled
              ></v-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <v-file-input
                label="Company Video *"
                v-model="form.video"
                :rules="videoRules"
                chips
                multiple
                filled
                prepend-icon="mdi-video"
              ></v-file-input>
            </div>
            <div class="col-md-6">
              <v-file-input
                label="Upload products image *"
                chips
                multiple
                filled
                v-model="form.image"
                :rules="imageRules"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <v-text-field
                label="Location *"
                prepend-icon="mdi-map-marker"
                filled
                v-model="form.location"
                :rules="[() => !!form.location || 'This field is required']"
              ></v-text-field>
            </div>
            <div class="col-md-6">
              <v-text-field
                label="Annual Revenue *"
                prefix="₹"
                filled
                :rules="numberRules"
                v-model="form.annualRevenue"
              ></v-text-field>
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <v-textarea
                class="mx-2"
                label="Company CEO/Founder Name *"
                rows="1"
                prepend-icon="mdi-account-voice"
                filled
                v-model="form.founder"
                :rules="[() => !!form.founder || 'This field is required']"
              ></v-textarea>
            </div>
            <div class="col-md-6">
              <v-textarea
                class="mx-2"
                label="Company brochure_link *"
                rows="1"
                prepend-icon="mdi-file"
                filled
                :rules="linkValidator"
                v-model="form.companyBrochure"
              ></v-textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <v-text-field
                label="Whatsapp Link*"
                placeholder="please enter like this http://wa.me/+918788825286"
                prepend-icon="mdi-alpha-w-circle"
                filled
                :rules="linkValidator"
                v-model="form.whatsapp"
              ></v-text-field>
            </div>

            <div class="col-md-3">
              <v-text-field
                label="Skype Link *"
                placeholder="Placeholder"
                prepend-icon="mdi-skype"
                filled
                :rules="linkValidator"
                v-model="form.skype"
              ></v-text-field>
            </div>

            <div class="col-md-3">
              <v-text-field
                label="Linkedln Link *"
                prepend-icon="mdi-linkedin"
                filled
                :rules="linkValidator"
                v-model="form.linkedin"
              ></v-text-field>
            </div>

            <div class="col-md-3">
              <v-text-field
                label="Website Link *"
                prepend-icon="mdi-web"
                filled
                :rules="linkValidator"
                v-model="form.website"
              ></v-text-field>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
            <div class="col-md-3 text-right">
              <v-btn color="success" dark @click="submit" :loading="showLoader">
                Save
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-card>
    </div>
    <loader v-if="showLoader"></loader>
  </div>
</template>

<script>
import loader from "@/components/loader";
import { Stalls } from "@/service/Admin";
export default {
  components: {
    loader,
  },
  name: "Admin",
  data() {
    return {
      showLoader: false,
      valid: true,
      form: {
        logo: [],
        company: "",
        video: [],
        image: [],
        location: "",
        annualRevenue: "",
        companyBrochure: "",
        whatsapp: "",
        skype: "",
        founder: "",
        linkedin: "",
        category: "",
        website: "",
      },

      items: [
        "Agriculture",
        "Automobile",
        "Chemical",
        "Dryfruits",
        "Furniture",
        "science&Technology",
        "TextTiles",
      ],
      numberRules: [
        (v) =>
          Number.isInteger(Number(v)) || "The value must be an integer number",
        (v) => !!v || "This field is required.",
      ],
      imageRules: [(v) => v.length !== 0 || "This field is required."],
      videoRules: [(v) => v.length !== 0 || "This field is required."],
      linkValidator: [
        (value) => !!value || "This field is required.",
        (value) => this.isURL(value) || "URL is not valid",
      ],
    };
  },

  methods: {
    isURL(str) {
      let url;

      try {
        url = new URL(str);
      } catch (__) {
        return false;
      }

      return url.protocol === "https:" || url.protocol === "https";
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.showLoader = true;
        Stalls(this.form)
          .then((response) => {
            if (response.success) {
              this.showLoader = false;
              this.$swal("Stall Has Been Added Successfully");
              this.$router.push({ path: `/category/${this.form.category}` });
              this.reset();
              this.resetValidation();
            }
          })
          .catch((error) => this.$swal(error));
      }
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
