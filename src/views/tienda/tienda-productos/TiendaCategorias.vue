<template>
<div>
    <div class="ecommerce-searchbar mt-1">
        <b-row>
            <b-col cols="12">
                <b-input-group class="input-group-merge">
                    <b-form-input v-model="buscar" placeholder="Buscar categoría" class="search-product" />
                    <b-input-group-append is-text>
                        <feather-icon icon="SearchIcon" class="text-muted" />
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
    <hr>
    <b-row class="match-height">
        <b-col v-for="categoria in filtrarCategorias" :key="categoria" md="12" lg="3">
            <b-card class="ecommerce-card" no-body>
                <b-link :to="{name: 'tienda-categorias-productos', params: {name: categoria}}">
                    <b-img src="@/assets/images/shop/default.jpg" fluid />
                    <b-card-body>
                        <b-card-title>{{categoria}}</b-card-title>
                    </b-card-body>
                </b-link>
            </b-card>
        </b-col>
    </b-row>
</div>
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
    BLink,
    BInputGroup,
    BFormInput,
    BInputGroupAppend
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
            buscar: ''
        }
    },
    created() {
        axios.get('https://fakestoreapi.com/products/categories')
            .then((resp) => {
                this.categorias = resp.data
            })
    },
    computed: {
        filtrarCategorias() {
            if (this.categorias) {
                return this.categorias.filter((categoria) => {
                    return categoria.match(this.buscar);
                });
            }
            return false;
        }
    },
    components: {
        BRow,
        BCol,
        BCardGroup,
        BCard,
        BCardBody,
        BCardTitle,
        BImg,
        BLink,
        BInputGroup,
        BFormInput,
        BInputGroupAppend
    }
}
</script>
