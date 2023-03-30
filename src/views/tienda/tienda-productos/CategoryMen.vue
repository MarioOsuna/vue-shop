<template>
<div style="height: inherit">
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Men's Clothing</span>
    </b-button>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Jewelery</span>
    </b-button>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Electronics</span>
    </b-button>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Women's Clothing</span>
    </b-button>

    <!-- Productos -->
    <section class="app-ecommerce-details">
        <b-card v-for="item in products" :key="item.id" class="ecommerce-card" no-body>
            <b-card-body>
                <b-row class="my-2">

                    <!-- Parte Izq. Foto del producto-->
                    <b-col cols="12" md="5" class="d-flex align-items-center justify-content-center mb-2 mb-md-0">
                        <div class="d-flex align-items-center justify-content-center">
                            <b-img :src="item.image" :alt="`Image of ${item.name}`" class="product-img" fluid style="width: 350px; height: 250px;" />
                        </div>
                    </b-col>

                    <!-- Parte Derecha. Info y detalles-->
                    <b-col cols="12" md="7">
                        <!-- Nombre -->
                        <h4>{{ item.title }}</h4>

                        <!-- Precio y Valoración -->
                        <div class="ecommerce-details-price d-flex flex-wrap mt-1">
                            <h4 class="item-price mr-1">
                                {{ item.price }}€
                            </h4>
                        </div>

                        <!-- Stock -->
                        <b-card-text>
                            Available -
                            <span class="text-success">
                                On Stock
                            </span>
                        </b-card-text>
                        <!-- Descripción -->
                        <b-card-text>
                            {{ item.description }}
                        </b-card-text>

                        <hr>

                        <!-- Botones Carrito y Fav -->
                        <div class="d-flex felx-column flex-sm-row pt-1">
                            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0">
                                <feather-icon icon="ShoppingCartIcon" class="mr-50" />
                                <span>Añadir al carrito</span>
                            </b-button>
                            <b-button variant="outline-secondary" class="btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0">
                                <feather-icon icon="HeartIcon" class="mr-50" />
                                <span>Favorito</span>
                            </b-button>
                        </div>

                    </b-col>

                </b-row>
            </b-card-body>
        </b-card>
    </section>
</div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import {
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,
} from 'bootstrap-vue'
export default {
    name: 'Productos',
    data: () => {
        return {
            products: []
        }
    },
    created() {
        axios.get('https://fakestoreapi.com/products')
            .then((resp) => {
                this.products = resp.data
            })
    },
    components: {
        BDropdown,
        BDropdownItem,
        BFormRadioGroup,
        BFormRadio,
        BRow,
        BCol,
        BInputGroup,
        BInputGroupAppend,
        BFormInput,
        BCard,
        BCardBody,
        BLink,
        BImg,
        BCardText,
        BButton,
        BPagination
    },
    directives: {
        Ripple,
    }
}
</script>

<style>
</style>
