<template>
<div style="height: inherit">

    <section class="ecommerce-header">
        <div class="row">
            <div class="col-sm-12">
                <div class="ecommerce-header-items">
                    <!-- Filtro -->
                    <b-dropdown v-ripple.400="'rgba(113, 102, 240, 0.15)'" :text="sortBy.text" right variant="outline-primary">
                        <b-dropdown-item v-for="sortOption in sortByOptions" :key="sortOption.value" @click="sortBy=sortOption">
                            {{ sortOption.text }}
                        </b-dropdown-item>
                    </b-dropdown>
                    <!-- Botones Vistas -->
                    <b-form-radio-group v-model="itemView" class="ml-1 list item-view-radio-group" buttons size="sm" button-variant="outline-primary">
                        <b-form-radio v-for="option in itemViewOptions" :key="option.value" :value="option.value">
                            <feather-icon :icon="option.icon" size="18" />
                        </b-form-radio>
                    </b-form-radio-group>
                </div>
            </div>
        </div>

    </section>

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

    <b-row class="match-height">
        <b-col v-for="item in filtrarUsuarios" :key="item.id" md="12" lg="3">
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
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import {
    BRow,
    BCol,
    BCard,
    BImg,
    BCardBody,
    BCardText,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BFormRadioGroup,
    BFormRadio,
    BDropdown,
    BDropdownItem
} from 'bootstrap-vue'
export default {
    name: 'Productos',
    data: () => {
        return {
            products: [],
            buscar: '',
            // FILTROS
            sortBy: ref({
                text: 'Featured',
                value: 'featured'
            }),
            sortByOptions: [{
                    text: 'Featured',
                    value: 'featured'
                },
                {
                    text: 'Lowest',
                    value: 'price-asc',
                },
                {
                    text: 'Highest',
                    value: 'price-desc'
                }
            ],
            // BOTONES VISTAS
            itemView: 'grid-view',
            itemViewOptions: [{
                    icon: 'GridIcon',
                    value: 'grid-view'
                },
                {
                    icon: 'ListIcon',
                    value: 'list-view'
                }
            ]
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
    computed: {
        filtrarUsuarios() {
            if (this.products) {
                return this.products.filter((item) => {
                    return item.title.match(this.buscar);
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
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BFormRadioGroup,
        BFormRadio,
        BDropdown,
        BDropdownItem
    },
    directives: {
        Ripple
    }
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style><style lang="scss" scoped>
.item-img {
    align-items: center;
    justify-content: center;
}

.card-img-top {
    width: 100%;
    height: 300px;
    overflow: hidden;
}

.item-view-radio-group ::v-deep {
    .btn {
        display: flex;
        align-items: center;
    }
}
</style>
