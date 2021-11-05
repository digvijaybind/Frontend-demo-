<template>
  <div class="mx-8 mt-8">
    <v-form>
      <v-row justify="end">
        <v-col cols="12" md="3">
          <v-text-field
            label="Search By Name"
            v-model="search"
            @input="getCardsCompanyFilter(search)"
            single-line
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            label="Search By Category"
            single-line
            outlined
            v-model="searchCategory"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-row v-if="cards.length > 0">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>logo</th>
              <th>Company_Name</th>
              <th>Categories</th>
              <th>Video</th>
              <th>Images</th>
              <th>Location</th>
              <th>Annual_Revenue</th>
              <th>CEO</th>
              <th>Company_brochure</th>
              <th>Whatsapp</th>
              <th>Skype</th>
              <th>Linkedin</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, i) in cards" :key="i">
              <td><img v-bind:src="c.logo" width="50px" /></td>
              <td>{{ c.company }}</td>
              <td>{{ c.category }}</td>
              <td>{{ c.video }}</td>
              <td><img v-bind:src="c.images[0].image" width="50px" /></td>
              <td>{{ c.location }}</td>
              <td>{{ c.annualRevenue }}</td>
              <td>{{ c.founder }}</td>
              <td>{{ c.companyBrochure }}</td>
              <td>{{ c.whatsapp }}</td>
              <td>{{ c.skype }}</td>
              <td>{{ c.linkedin }}</td>
              <td>{{ c.website }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <loader v-if="showLoader"></loader>
  </div>
</template>

<script>
import { getCards, getCardsByCompanyFilter } from "@/service/Managner";
import loader from "@/components/loader";

export default {
  components: {
    loader,
  },
  name: "Manager",
  data: () => {
    return {
      search: "",
      searchCategory: "",
      cards: [],
      showLoader: false,
    };
  },

  mounted() {
    console.log("insid emounted", this.$store);
    this.getData();
  },
  methods: {
    getCardsCompanyFilter(search) {
      console.log("getCardsCompanyFilter method called");
      if (search != "") {
        getCardsByCompanyFilter(search)
          .then((response) => {
            console.log(response);
            this.cards = response.data;
          })
          .catch((errorHandler) => console.log(errorHandler));
      } else {
        this.getData();
      }
    },
    getData() {
      this.showLoader = true;
      getCards()
        .then((response) => {
          console.log("response", response);
          this.showLoader = false;
          this.cards = response.data;
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
.row1 {
  font-weight: bold;
}
</style>
