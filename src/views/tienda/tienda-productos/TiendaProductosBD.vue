<template>
<section :class="itemView">
    <b-row class="match-height">
        <b-col v-for="item in products" :key="item.referencia" md="12" lg="3">
            <b-card class="ecommerce-card" no-body>
                <div class="item-img">
                    <b-img :alt="`${item.nombre}-${item.referencia}`" fluid class="card-img-top" :src="'@/assets/images/shop/'+`${item.img}`" />
                </div>

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
                        <b-link class="text-body">
                            {{ item.nombre }}
                        </b-link>
                    </h6>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</section>
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
    BLink
} from 'bootstrap-vue'
export default {
    data: () => {
        return {
            products: [],
            itemView: 'grid-view'
        }
    },
    created() {
        let BD = 'https://localhost/shop.php/'
        axios.get(BD)
            .then((resp) => {
                this.products = resp.data
            })
    },
    components: {
        BRow,
        BCol,
        BCard,
        BImg,
        BCardBody,
        BCardText,
        BLink
    }
}
</script>

<style>

</style>
