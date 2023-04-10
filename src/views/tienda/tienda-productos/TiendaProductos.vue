<template>
<div>
    <!-- Productos -->

    <b-row class="match-height">
        <b-col v-for="item in products" :key="item.id" md="12" lg="3">
            <b-card :img-src="item.image" img-top :title="item.title" class="ecommerce-card">
                <b-card-body>
                    <div class="item-rating">
                        <ul class="unstyled-list list-inline">
                            {{ item.rating.rate }}
                            <li v-for="star in 5" :key="star" class="ratings-list-item" :class="{'ml-25': star-1}">
                                <feather-icon icon="StarIcon" size="16" :class="[{'fill-current': star <= item.rating.rate}, star <= item.rating.rate ? 'text-warning' : 'text-muted']" />
                            </li>
                            ({{ item.rating.count }})
                        </ul>
                        <b-card-text>
                            <h6>{{ item.price }}€</h6>
                        </b-card-text>
                        <b-card-text class="item-description">
                            {{ item.description }}
                        </b-card-text>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
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
