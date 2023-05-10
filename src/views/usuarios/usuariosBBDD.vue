<template>
<div>
    <section class="ecommerce-header">
        <div class="row">
            <div class="col-sm-12">
                <div class="ecommerce-header-items">
                    <div class="view-options d-flex">
                        <!-- Botones Vistas -->
                        <b-tabs>
                            <!-- Tab: Vista Tabla -->
                            <b-tab active>
                                <template #title>
                                    <feather-icon icon="MenuIcon" size="16" class="mr-0 mr-sm-50" />
                                </template>
                                <usuariosBBDDTabla :user="users" @refresh="getData()" />

                            </b-tab>
                            <!-- Tab: Vista Cards -->
                            <b-tab>
                                <template #title>
                                    <feather-icon icon="GridIcon" size="16" class="mr-0 mr-sm-50" />
                                </template>
                                <usuariosBBDDCards :user="users" @refresh="getData()" />

                            </b-tab>
                        </b-tabs>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <br>
</div>
</template>

<script>
import {
    BDropdown,
    VBToggle,
    BTab,
    BTabs,
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
    BSidebar,
    BListGroup,
    BListGroupItem,
    BFormGroup,
    BForm,
    BOverlay,
    BAvatar,

} from 'bootstrap-vue'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import usuariosBBDDCards from './usuariosBBDDCards.vue'
import usuariosBBDDTabla from './usuariosBBDDTabla.vue'
export default {
    data: () => {
        return {
            users: [],
            show: false,
            search: '',
        }
    },
    directives: {
        'b-toggle': VBToggle,
        Ripple,
    },
    components: {
        usuariosBBDDCards,
        usuariosBBDDTabla,
        // BSV
        BDropdown,
        BDropdownItem,
        BTab,
        BTabs,
        BFormRadioGroup,
        BFormRadio,
        BRow,
        BForm,
        BCol,
        BFormGroup,
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
        BSidebar,
        BListGroup,
        BListGroupItem,
        BOverlay,
        BAvatar,
    },
    created() {
        this.getData()
    },
    computed: {
        filteredUsers() {
            if (this.users) {
                return this.users.filter((item) => {
                    return item.usuario.match(this.search);
                });
            }
            return false;
        }
    },
    methods: {
        eliminarValor(id) {
            fetch('https://vueproyect.000webhostapp.com/vue_project.php/?borrar=' + id, {
                    method: "DELETE",
                })
                .then((resp) => {
                    console.log(resp)
                    console.log("Usuario Eliminado Correctamente")
                    // location.reload()
                    this.getData()
                })

        },
        getData() {
            fetch('https://vueproyect.000webhostapp.com/vue_project.php/')
                .then(response => response.json())
                .then(responseData => {
                    this.users = responseData;
                })
        },

        agregarRegistro() {
            console.log(this.users)
            var datosEnviar = {
                usuario: this.users.usuario,
                nombre: this.users.nombre,
                apellido: this.users.apellido,
                email: this.users.email,
                telefono: this.users.telefono,
                ciudad: this.users.ciudad,
                direccion: this.users.direccion,
                numero: this.users.numero,
                codigo_postal: this.users.codigo_postal
            }

            fetch('https://vueproyect.000webhostapp.com/vue_project.php/?insertar=1',{
                    method: "POST",
                    body: JSON.stringify(datosEnviar),
                })
                .then((resp) => {
                    console.log(resp)
                    console.log("Actualizado Correctamente")
                    console.log(resp)
                    // location.reload()
                    // this.crearUsuarioToast('primary')
                    this.$refs.mySidebar.hide();
                    this.$emit('refresh');
                    this.resetearDatos();
                })

        },
        crearUsuarioToast(variant = null) {
            this.$bvToast.toast('La Creación Del Usuario Se Ha Ejecutado Correctamente', {
                title: `Usuario Creado Correctamente`,
                variant,
                solid: false,
            })
        },

        makeToast(variant = null) {
            this.$bvToast.toast('El Usuario Se Ha Eliminado Correctamente', {
                title: `Usuario Eliminado Correctamente`,
                variant,
                solid: false,
            })
        },
        resetearDatos() {
            document.getElementById("miform").reset();
            this.$refs.mySidebar.hide();
        },
        completado() {
            this.$swal({
                title: '¡Usuario Creado!',
                text: 'Usuario Creado Correctamene',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
            })
        },
        confirmarEliminar(id) {
            this.$swal({
                title: '¿Estas Seguro?',
                text: "¡Una Vez Eliminado No Lo Podrás Recuperar!",
                icon: 'error',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    this.$swal({
                        icon: 'success',
                        title: '¡Usuario Eliminado!',
                        text: 'El Usuario Se Ha Eliminado Correctamente',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    })
                    this.eliminarValor(id)
                }
            })
        },
    }

}
</script>

<style>

</style>
