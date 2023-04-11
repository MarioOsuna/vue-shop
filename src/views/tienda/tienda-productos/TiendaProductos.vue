<template>
<div>
    <b-row class="match-height">
        <b-col v-for="item in products" :key="item.id" md="12" lg="3">
            <b-card class="ecommerce-card" no-body>
                <div class="item-img">
                    <b-img fluid class="card-img-top" :src="item.image" />
                </div>
                <b-card-body>
                    <b-card-text class="item-title">
                        <h6>{{ item.title }}</h6>
                    </b-card-text>
                    <div class="item-rating">
                        <ul class="unstyled-list list-inline">
                            {{ item.rating.rate }}
                            <li v-for="star in 5" :key="star" class="ratings-list-item" :class="{'ml-25': star-1}">
                                <feather-icon icon="StarIcon" size="16" :class="[{'fill-current': star <= item.rating.rate}, star <= item.rating.rate ? 'text-warning' : 'text-muted']" />
                            </li>
                            ({{ item.rating.count }})
                        </ul>
                    </div>
                    <hr>
                    <b-card-text class="item-price">
                        <h6>{{ item.price }}€</h6>
                    </b-card-text>
                    <b-card-text>
                        Available - On Stock
                    </b-card-text>
                    <hr>
                    <b-card-text class="item-description">
                        {{ item.description }}
                    </b-card-text>

                </b-card-body>

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
    BCard,
    BImg,
    BCardBody,
    BCardText
} from 'bootstrap-vue'
export default {
    name: 'Productos',
    data: () => {
        return {
            products: [],
        }
    },
    created() {
        let parametro = this.$route.params.name
        let api = ''
        if (parametro == null) {
            api = 'https://fakestoreapi.com/products'
        } else {
            api = 'https://fakestoreapi.com/products/category/' + this.$route.params.name
        }
        axios.get(api)
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
        BCardText
    }
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-ecommerce.scss";

.item-img {
    align-items: center;
    justify-content: center;
}

.card-img-top {
    width: 100%;
    height: 300px;
    overflow: hidden;
}
</style>
