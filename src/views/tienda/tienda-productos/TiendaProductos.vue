<template>
<div>
    <section class="ecommerce-header">
        <div class="row">
            <div class="ecommerce-header-items">
                <div class="view-options d-flex">
                    <b-overlay :show="show" rounded="sm" variant="transparent">
                        <b-tabs>
                            <b-tab active>
                                <template #title>
                                    <feather-icon icon="ListIcon" size="16" class="mr-0 mr-sm-50" />
                                </template>
                                <vistaTabla :product="products" @refresh="getData()" />
                            </b-tab>
                            <b-tab>
                                <template #title>
                                    <feather-icon icon="GridIcon" size="16" class="mr-0 mr-sm-50" />
                                </template>
                                <vistaCarta :product="products" @refresh="getData()" />
                            </b-tab>
                        </b-tabs>
                    </b-overlay>
                </div>
            </div>
        </div>
    </section>
    <b-sidebar ref="sidebar" id="sidebar-right" bg-variant="white" right backdrop shadow>
        <b-overlay :show="show" rounded="sm" variant="transparent">
            <div>
                <b-card>
                    <b-card-title>Crear Productos</b-card-title>
                    <b-form>
                        <b-row>
                            <b-col>
                                <b-form-group label="Referencia" label-for="referencia" style="text-align: center;">
                                    <b-form-input id="referencia" placeholder="Referencia" v-model="products.referencia" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Nombre" label-for="nombre" style="text-align: center;">
                                    <b-form-input id="nombre" placeholder="Nombre" v-model="products.nombre" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Talla" label-for="talla" style="text-align: center;">
                                    <b-form-input id="talla" placeholder="XS, S, M, L, XL, XXL" v-model="products.talla" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Precio" label-for="precio" style="text-align: center;">
                                    <b-form-input id="precio" placeholder="Precio (0.00)" v-model="products.precio" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Cantidad" label-for="cantidad" style="text-align: center;">
                                    <b-form-input id="cantidad" placeholder="Cantidad" v-model="products.cantidad" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="crear" style="align-items: center;">
                                    Crear Producto
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-card>
            </div>
        </b-overlay>
    </b-sidebar>
</div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import vistaTabla from './TiendaProductosTable.vue'
import vistaCarta from './TiendaProductosCard.vue'
import {
    BTabs,
    BTab,
    BSidebar,
    BCard,
    BCardTitle,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VBToggle,
    BButton,
    BOverlay
} from "bootstrap-vue";
export default {
    components: {
        BTabs,
        BTab,
        BSidebar,
        BCard,
        BCardTitle,
        BForm,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BButton,
        BOverlay,
        vistaTabla,
        vistaCarta
    },
    data: () => {
        return {
            products: [],
            buscar: '',
            show: false
        };
    },
    created() {
        this.getData();
    },
    computed: {
        filtrarProducto() {
            if (this.products) {
                return this.products.filter((item) => {
                    return item.nombre.match(this.buscar);
                });
            }
            return false;
        }
    },
    methods: {
        getData() {
            this.show = true;
            fetch('https://vuealvaro.000webhostapp.com/shop.php/?consultar')
                .then(res => res.json())
                .then(json => {
                    this.products = json
                    this.show = false;
                });
        },
        crearProducto() {
            var datosEnviar = {
                referencia: this.products.referencia,
                nombre: this.products.nombre,
                talla: this.products.talla,
                precio: this.products.precio,
                cantidad: this.products.cantidad
            }
            this.show = true;
            fetch('https://vuealvaro.000webhostapp.com/shop.php/?insertar', {
                    method: "POST",
                    body: JSON.stringify(datosEnviar)
                })
                .then(res => {
                    this.$refs.sidebar.hide();
                    this.show = false;
                    this.getData();

                }).catch(
                    error => console.log(error)
                )

        },
        crear() {
            this.$swal({
                title: '¡Añadido!',
                text: '¡El producto se añadió a la base de datos correctamente!',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonStyling: false,
            })
            this.crearProducto()
        }
    },
    directives: {
        Ripple,
        'b-toggle': VBToggle
    },
};
</script>

<style>
</style>
