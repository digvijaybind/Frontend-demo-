<template>
  <div class="mx-8 mt-8">
    <div v-if="this.cards.length > 0">
      <v-form>
        <v-row justify="end">
          <v-col cols="12" md="3">
            <v-text-field
              label="Search By Name"
              single-line
              outlined
              dense
              @input="getCardsCompanyFilter"
              v-model="search"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              :items="items"
              label="Search by Category"
              v-on:change="getCategory"
              dense
            ></v-select>
          </v-col>
        </v-row>
      </v-form>

      <v-row>
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
                <th>Edit</th>
                <th>Delete</th>
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

                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="green"
                    @click="
                      $router.push({
                        name: 'update-card',
                        params: { cardId: c.id },
                      })
                    "
                  >
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="red"
                    @click="deleteD(c.id)"
                  >
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </div>
    <loader v-if="showLoader"></loader>
  </div>
</template>

<script>
import { getCards } from "@/service/Managner";
import { deleteCard, getCardsByCompanyFilter } from "@/service/Managner";
import loader from "@/components/loader";
import { getByCategory } from "@/service/Managner";

export default {
  name: "Manager",
  components: {
    loader,
  },
  data: () => {
    return {
      cards: [],
      Category: [],
      search: "",
      showLoader: false,
      items: [
        "Chemical",
        "Science And Technology",
        "Furniture",
        "Dry Fruits",
        "Textiles",
        "AutoMobile",
        "Agriculture",
      ],
    };
  },
  mounted() {
    this.getData();
    this.getCategory();
  },
  methods: {
    deleteD(cardId) {
      console.log("Delete Method Called" + cardId);
      deleteCard(cardId).then((response) => console.log(response));
      this.$swal("delete successfully");
      this.getData();
    },

    getCardsCompanyFilter() {
      if (this.search != null) {
        getCardsByCompanyFilter(this.search).then((response) => {
          console.log(response);
          this.cards = response.data;
        });
      }
    },

    getData() {
      this.showLoader = true;
      getCards()
        .then((response) => {
          this.showLoader = false;
          console.log("response", response);
          this.cards = response.data;
        })
        .catch((error) => console.log("error:::::", error));
    },
    getCategory(event) {
      this.showLoader = true;
      console.log(event);
      getByCategory()
        .then((response) => {
          this.showLoader = false;
          console.log("Category response", response);
          this.Category = response.data;
        })
        .catch((error) => console.log("error:::::", error));
    },
  },
};
</script>

<style>
.row1 {
  font-weight: bold;
}
</style>
