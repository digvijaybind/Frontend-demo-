<template>
  <div class="ma-8">
    <div class="row">
      <div class="col-md-4" v-for="(card, i) in cards" :key="i">
        <v-card class="mx-auto" max-width="500">
          <v-container fluid>
            <div class="row">
              <div class="col-md-4">
                <v-card class="image-card">
                  <v-img
                    :src="card.logo"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                  </v-img>
                </v-card>
              </div>
              <div class="col-md-4">
                <v-btn small color="warning">
                  {{ card.company }}
                </v-btn>
              </div>
              <div class="col-md-4">
                <v-btn small color="warning">
                  {{ card.category }}
                </v-btn>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <v-card @click="openVideo(card.video)">
                  <v-img
                    src="@/assets/Playvideo.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                  </v-img>
                </v-card>
              </div>
              <div class="col-md-6">
                <v-card @click="openImage(card.images)">
                  <v-img
                    src="@/assets/gallery.jpg"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                  </v-img>
                </v-card>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <v-btn
                  :href="card.companyBrochure"
                  target="_blank"
                  color="primary"
                  block
                >
                  Click On Broucher Link
                </v-btn>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <v-btn
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="card.companyBrochure"
                  class="mx-2"
                  fab
                  dark
                  small
                  color="green"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
              </div>
              <div class="col-md-3">
                <v-btn
                  class="mx-2"
                  :href="card.companyBrochure"
                  target="_blank"
                  fab
                  dark
                  small
                  color="green"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
              </div>
              <div class="col-md-3">
                <v-btn
                  class="mx-2"
                  :href="card.companyBrochure"
                  target="_blank"
                  fab
                  dark
                  small
                  color="green"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
              </div>
              <div class="col-md-3">
                <v-btn
                  class="mx-2"
                  :href="card.companyBrochure"
                  target="_blank"
                  fab
                  dark
                  small
                  color="green"
                >
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
              </div>
            </div>
          </v-container>
        </v-card>
      </div>
    </div>
    <!-- for video dialog -->
    <div class="text-center">
      <v-dialog v-model="videoDialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> video </v-card-title>

          <v-card-text>
            <video width="400" height="240" controls>
              <source :src="video_data" type="video/mp4" />
            </video>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="videoDialog = false">
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- for images dialog -->
    <div class="text-center">
      <v-dialog v-model="imageDialog" width="800">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2"> image </v-card-title>

          <v-card-text>
            <v-carousel>
              <v-carousel-item
                v-for="(item, i) in image_data"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="imageDialog = false">
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <loader v-if="showLoader"></loader>
  </div>
</template>

<script>
import loader from "@/components/loader";
import { getByCategory } from "@/service/Participant";

export default {
  components: {
    loader,
  },
  data() {
    return {
      showLoader: false,
      cards: [],
      videoDialog: false,
      imageDialog: false,
      image_data: [],
      video_data: [],
    };
  },

  created() {
    console.log("insid emounted", this.$route.params.id);
    this.getData();
  },

  methods: {
    openVideo(data) {
      this.videoDialog = true;
      console.log("data::::::", data);
      this.video_data = data;
    },
    openImage(data) {
      console.log("data image", data);
      this.imageDialog = true;
      data.forEach((el) => {
        this.image_data.push({ src: el.image });
      });
      console.log(" this.image_data:::", this.image_data);
    },
    getData() {
      this.showLoader = true;
      getByCategory(this.$route.params.id)
        .then((response) => {
          console.log("response", response);
          this.showLoader = false;
          // if (response) {
          this.cards = response.data;

          // }
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style lang="scss">
.image-card {
  .v-image {
    height: 50px !important;
  }
}
</style>
