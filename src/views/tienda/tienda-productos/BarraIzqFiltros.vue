<template>
    <div class="sidebar-detached sidebar-left">
        <div class="sidebar">
            <div class="sidebar-shop" :class="{'show': mqShallShowLeftSidebar}">
                <b-row>
                    <b-col cols="12">
                        <h6 class="filter-heading d-none d-lg-block">
                            Filtros
                        </h6>
                    </b-col>
                </b-row>

                <!-- Tabla filtros -->
                <b-card>

                    <!-- Precio -->
                    <div class="multi-range-price">
                        <h6 class="filter-title mt-0">
                            Precios
                        </h6>
                        <b-form-radio-group v-model="filters.priceRangeDefined" class="price-range-defined-radio-group" stacked />
                    </div>

                    <!-- Slider Precio -->
                    <div class="price-slider">
                        <h6 class="filter-title">
                            Rango de precios
                        </h6>
                        <vue-slider v-model="filters.priceRange" :direction="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" />
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import VueSlider from 'vue-slider-component'
export default {
    data: () => {
        return {
            filters: ref({
                q: '',
                priceRangeDefined: 'all',
                priceRange: [0, 100],
                categories: [],
                brands: [],
                ratings: null,
                page: 1,
                perPage: 9
            })
        }
    },
    components: {
        VueSlider
    }
}
</script>

<style>

</style>