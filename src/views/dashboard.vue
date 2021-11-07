<template>
  <v-card class="mx-auto mt-8" max-width="90%">
    <v-container fluid>
      <div class="row">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="col-md-4"
          @click="goCategory(card.name)"
        >
          <v-card hover>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
              hover
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
          </v-card>
        </div>
        <!-- <div class="col-md-4"></div>
        <div class="col-md-4"></div> -->
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Chemical",
        src: require("@/assets/chemical.jpg"),
        name: "chemical",
      },
      {
        title: "Science And Technology",
        src: require("@/assets/science.jpg"),
        name: "science-and-technology",
      },
      {
        title: "Furniture",
        src: require("@/assets/furniture.jpg"),
        name: "furniture",
      },
      {
        title: "Dry Fruits",
        src: require("@/assets/dry-fruit.jpg"),
        name: "dry-fruits",
      },
      {
        title: "Textiles",
        src: require("@/assets/tex.jpg"),
        name: "tex-tiels",
      },
      {
        title: "AutoMobile",
        src: require("@/assets/automobile.jpg"),
        name: "autoMobile",
      },
      {
        title: "Agriculture",
        src: require("@/assets/agriculture.jpg"),
        name: "agriculture",
      },
    ],
  }),

  methods: {
    goCategory(type) {
      console.log("inside", type);
      this.$router.push({ path: `/category/${type}` });
    },
  },
};
</script>
