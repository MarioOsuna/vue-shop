<template>
<div>

    <div class="ecommerce-searchbar mt-1">
        <b-row>
            <b-col cols="12">
                <b-input-group class="input-group-merge">
                    <b-form-input v-model="buscar" placeholder="Buscar producto" class="search-product" />
                    <b-input-group-append is-text>
                        <feather-icon icon="SearchIcon" class="text-muted" />
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>

    <hr>

    <section :class="itemView">
        <b-row class="match-height">
            <b-col v-for="item in filtrarProductos" :key="item.referencia" md="12" lg="3">
                <b-card class="ecommerce-card" no-body>
                    <!-- <div class="item-img">
                        <b-img :alt="`${item.nombre}-${item.referencia}`" fluid class="card-img-top" :src="'@/assets/images/shop/' + item.img" />
                    </div> -->

                    <!-- Detalles -->
                    <b-card-body>
                        <div class="item-wrapper">
                            <div>
                                <h6 class="item-price">
                                    ${{ item.precio }}
                                </h6>
                            </div>
                        </div>
                        <b-card-text class="item-description">
                            {{ item.referencia }}
                        </b-card-text>
                        <h6 class="item-name">
                            <b-link :to="{name: '', params: {referencia: item.referencia}}" class="text-body">
                                {{ item.nombre }}
                            </b-link>
                        </h6>
                        <b-row>
                            <b-col>
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-secondary">
                                    Actualizar Producto
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </section>
</div>
</template>

<script>
import axios from '@axios'
import {
    BRow,
    BCol,
    BCard,
    BImg,
    BCardBody,
    BCardText,
    BLink,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton
} from 'bootstrap-vue'
export default {
    data: () => {
        return {
            products: [],
            itemView: 'grid-view',
            buscar: ''
        }
    },
    created() {
        let BD = 'http://localhost/shop.php'
        axios.get(BD)
            .then((resp) => {
                this.products = resp.data
                console.log(resp)
            })
    },
    computed: {
        filtrarProductos() {
            if (this.products) {
                return this.products.filter((item) => {
                    return item.nombre.match(this.buscar);
                });
            }
            return false;
        }
    },
    components: {
        BRow,
        BCol,
        BCard,
        BImg,
        BCardBody,
        BCardText,
        BLink,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButton
    }
}
</script>

<style>

</style>
