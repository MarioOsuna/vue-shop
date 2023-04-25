<template>
<div>
    <div class="table">
        <table>
            <tr>
                <td>Referencia</td>
                <td>Nombre</td>
                <td>Talla</td>
                <td>Precio</td>
                <td>Cantidad</td>
                <td>Acciones</td>
            </tr>
            <tr v-for="item in products" :key="item.referencia">
                <td>{{ item.referencia }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.talla }}</td>
                <td>{{ item.precio }}</td>
                <td>{{ item.cantidad }}</td>
                <td>
                    <template>
                        <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
                            <template #button-content>
                                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                            </template>
                            <b-dropdown-item>
                                <b-link :to="{ name: 'tienda-productosBD-editar', params: { referencia: item.referencia }}">
                                    <feather-icon icon="EditIcon" />
                                    <span class="align-middle ml-50">Editar</span>
                                </b-link>
                            </b-dropdown-item>
                            <b-dropdown-item @click="eliminarProducto(item.referencia)">
                                <b-link>
                                    <feather-icon icon="TrashIcon" />
                                    <span class="align-middle ml-50">Eliminar</span>
                                </b-link>
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                </td>
            </tr>
        </table>
    </div>
    <template>
        <div>
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-toggle.sidebar-right variant="outline-primary">
                CREAR PRODUCTO
            </b-button>
            <b-sidebar id="sidebar-right" bg-variant="white" right backdrop shadow>
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
                                    <b-button @click="crearProducto()" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" style="align-items: center;">
                                        Crear Producto
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-card>
                </div>
            </b-sidebar>
        </div>
    </template>
</div>
</template>

<script>
import axios from "@axios";
import Ripple from "vue-ripple-directive";
import {
    BDropdown,
    BDropdownItem,
    BCard,
    BButton,
    BLink,
    BSidebar,
    VBToggle,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BCardTitle
} from "bootstrap-vue";
export default {
    components: {
        BDropdown,
        BDropdownItem,
        BCard,
        BButton,
        BLink,
        BSidebar,
        BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BCardTitle
    },
    data: () => {
        return {
            products: [],
        };
    },
    created() {
        axios.get("http://localhost/shop.php/").then((resp) => {
            this.products = resp.data;
        });
    },
    methods: {
        eliminarProducto(referencia) {
            axios
                .delete('http://localhost/shop.php/?borrar="' + referencia + '"')
                .then((resp) => {
                    console.log("Eliminado correctamente");
                    location.reload();
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
            axios.post("http://localhost/shop.php/?insertar", JSON.stringify(datosEnviar))
                .then((resp) => {
                    console.log("Producto creado")
                });
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
