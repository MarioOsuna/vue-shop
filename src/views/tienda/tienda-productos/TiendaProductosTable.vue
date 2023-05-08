<template>
<div>
    <div class="ecommerce-searchbar mt-1">
        <b-row>
            <b-col>
                <b-input-group class="input-group-merge">
                    <b-form-input v-model="buscar" placeholder="Buscar producto" class="search-product" />
                    <b-input-group-append is-text>
                        <feather-icon icon="SearchIcon" class="text-muted" />
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" v-b-toggle.sidebar-right variant="primary" class="btn-icon" style="float: right;">
                <feather-icon icon="PlusIcon" />
            </b-button>
        </b-row>
    </div>
        <div class="table">
        <table>
            <tr>
                <td>Referencia</td>
                <td>Nombre</td>
                <td>Tipo</td>
                <td>Talla</td>
                <td>Precio</td>
                <td>Cantidad</td>
                <td>Acciones</td>
            </tr>
            <tr v-for="item in filtrarProducto" :key="item.referencia">
                <td>{{ item.referencia }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.tipo }}</td>
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
                                <b-link :to="{ name: 'tienda-productos-editar', params: { referencia: item.referencia }}">
                                    <feather-icon icon="EditIcon" />
                                    <span class="align-middle ml-50">Editar</span>
                                </b-link>
                            </b-dropdown-item>
                            <b-dropdown-item @click="eliminar(item.referencia)">
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
</div>
</template>

<script>
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import {
    BRow,
    BCol,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BLink,
    VBToggle
} from 'bootstrap-vue'
export default {
    components: {
        BRow,
        BCol,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
        BButton,
        BDropdown,
        BDropdownItem,
        BLink,
        
    },
    data: () => {
        return {
            buscar: '',
            show: false
        };
    },
    props: {
        product: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        filtrarProducto() {
            if (this.product) {
                return this.product.filter((item) => {
                    return item.nombre.match(this.buscar);
                });
            }
            return false;
        }
    },
    methods: {
        eliminarProducto(referencia) {
            axios
                .delete('http://localhost/shop.php/?borrar="' + referencia + '"')
                .then((resp) => {
                    console.log("Eliminado correctamente");
                    this.$emit('refresh');
                });

        },
        crearProducto() {
            var datosEnviar = {
                referencia: this.product.referencia,
                nombre: this.product.nombre,
                talla: this.product.talla,
                precio: this.product.precio,
                cantidad: this.product.cantidad
            }
            axios.post("http://localhost/shop.php/?insertar", JSON.stringify(datosEnviar))
                .then((resp) => {
                    console.log("Producto creado");
                    this.$refs.sidebar.hide();
                    this.$emit('refresh');
                });

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

            });
            this.crearProducto();

        },
        eliminar(referencia) {
            this.$swal({
                title: '¿Estás seguro?',
                text: 'El producto se eliminará de la base de datos',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Sí, eliminar!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    this.$swal({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: 'La referencia ' + referencia + ' ha sido eliminada.',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    })
                    this.eliminarProducto(referencia)

                } else {
                    this.$swal({
                        icon: 'error',
                        title: '¡Cancelado!',
                        text: 'La referencia ' + referencia + ' no ha sido eliminada.',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        }
                    })
                }
            })

        }
    },
    directives: {
        Ripple,
        'b-toggle': VBToggle
    }
}
</script>

<style>

</style>
