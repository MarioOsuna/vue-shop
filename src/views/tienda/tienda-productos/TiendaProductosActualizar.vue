<template>
<div>
    <b-card>
        <b-card-title>Actualizar Productos</b-card-title>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Referencia" label-for="referencia">
                        <b-form-input id="referencia" placeholder="Referencia" v-model="products.referencia" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-input id="nombre" placeholder="Nombre" v-model="products.nombre" disabled />
                    </b-form-group>
                </b-col>
                <!--<b-col>
                    <b-form-group label="Imagen" label-for="imagen">
                        <b-form-file class="mt-1" v-model="file1" plain disabled />
                    </b-form-group>
                    <div class="mt-1">
                        Archivo seleccionado: <strong>{{ file1 ? file1.name : '' }}</strong>
                    </div>
                </b-col> -->
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Talla" label-for="talla">
                        <b-form-input id="talla" placeholder="XS, S, M, L, XL, XXL" v-model="products.talla" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Precio" label-for="precio">
                        <b-form-input id="precio" placeholder="Precio (0.00)" v-model="products.precio" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Cantidad" label-for="cantidad">
                        <b-form-input id="cantidad" placeholder="Cantidad" v-model="products.cantidad" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
                        Actualizar Producto
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
</div>
</template>

<script>
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import {
    BCard,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton,
    BCardTitle
} from 'bootstrap-vue'
export default {
    data(){
        return{
            products: []
        }
    },
    components: {
        BCard,
        BForm,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormFile,
        BButton,
    BCardTitle
    },
    created(){
        axios.get('http://localhost/shop.php/?referencia='+ this.$route.params.referencia)
        .then((resp) => {
            this.products = resp.data[0]
            console.log(this.products)
        })
    },
    directives: {
        Ripple
    }
}
</script>

<style>

</style>
