<template>
<b-row class="match-height">
    <b-col v-for="categoria in categorias" :key="categoria" md="12" lg="3">
        <b-card class="ecommerce-card" no-body>
            <b-link :to="{name: 'tienda-categorias-productos', params: {name: categoria}}">
                <b-card-body>
                    <b-card-title>{{categoria}}</b-card-title>
                </b-card-body>
            </b-link>
        </b-card>
    </b-col>
</b-row>
</template>

<script>
import axios from '@axios'
import {
    BRow,
    BCol,
    BCardGroup,
    BCard,
    BCardBody,
    BCardTitle,
    BImg,
    BLink
} from 'bootstrap-vue'

export default {
    /*props: {
    name: {
      type: String,
      default: false,
    }
  },*/
    data: () => {
        return {
            categorias: [],
        }
    },
    created() {
        axios.get('https://fakestoreapi.com/products/categories')
            .then((resp) => {
                this.categorias = resp.data
            })
    },
    components: {
        BRow,
        BCol,
        BCardGroup,
        BCard,
        BCardBody,
        BCardTitle,
        BImg,
        BLink
    }
}
</script>
