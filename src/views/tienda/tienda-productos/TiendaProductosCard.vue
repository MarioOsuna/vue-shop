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
    <div>
        <b-row class="match-height">
            <b-col v-for="item in filtrarProducto" :key="item.referencia" md="12" lg="4">
                <b-card :img-src="require('@/assets/images/banner/banner-12.jpg')" img-alt="Profile Cover Photo" img-top class="card-profile">
                    <div class="profile-image-wrapper">
                    </div>
                    <h3>{{item.nombre}}</h3>
                    <h6 class="text-muted">
                        Referencia: {{item.referencia}}
                    </h6>
                    <b-badge class="profile-badge" variant="light-primary">
                        Talla - {{item.talla}}
                    </b-badge>
                    <hr class="mb-2">

                    <!-- follower projects rank -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted font-weight-bolder">
                                Cantidad
                            </h6>
                            <h3 class="mb-0">
                                {{item.cantidad}}
                            </h3>
                        </div>
                        <div>
                            <h6 class="text-muted font-weight-bolder">
                                Acciones
                            </h6>
                            <h3 class="mb-0">
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
                            </h3>
                        </div>
                        <div>
                            <h6 class="text-muted font-weight-bolder">
                                Precio
                            </h6>
                            <h3 class="mb-0">
                                {{ item.precio }}€
                            </h3>
                        </div>
                    </div>
                    <!--/ follower projects rank -->
                </b-card>
            </b-col>
        </b-row>
    </div>
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
    BCardTitle,
    BInputGroup,
    BInputGroupAppend,
    BFormRadioGroup,
    BFormRadio,
    BCardBody,
    BCardText,
    BAvatar,
    BBadge
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
        BCardTitle,
        BInputGroup,
        BInputGroupAppend,
        BFormRadioGroup,
        BFormRadio,
        BCardBody,
        BCardText,
        BAvatar,
        BBadge
    },
    data: () => {
        return {
            products: [],
            buscar: ''
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
            fetch('https://vuealvaro.000webhostapp.com/shop.php/?borrar="' + referencia + '"', {
                    method: "DELETE"
                })
                .then(res => {
                    this.$emit('refresh');
                })

        },
        crearProducto() {
            this.show = true;
            var datosEnviar = {
                referencia: this.product.referencia,
                nombre: this.product.nombre,
                talla: this.product.talla,
                precio: this.product.precio,
                cantidad: this.product.cantidad
            }
            fetch('https://vuealvaro.000webhostapp.com/shop.php/?insertar', {
                    method: "POST",
                    body: JSON.stringify(datosEnviar)
                })
                .then(res => {
                    this.$refs.sidebar.hide();
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
};
</script>

<style>
    </style>
