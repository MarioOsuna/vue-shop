<template>
<div>
    <b-button :to="{ name: 'users-usuarios-bbdd'}" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary" class="btn-icon" style="float: right; position: static;">
        Volver
    </b-button>
    <div>
        <b-overlay :show="show" rounded="sm">
            <b-card>
                <b-form>
                    <b-row>
                        <b-col cols="12" md="4">
                            <b-form-group label="Usuario" label-for="usuario">
                                <b-form-input id="usuario" v-model="users.usuario" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Nombre" label-for="nombre">
                                <b-form-input id="nombre" v-model="users.nombre" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Apellido" label-for="apellido">
                                <b-form-input id="apellido" v-model="users.apellido" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Email" label-for="email">
                                <b-form-input id="email" v-model="users.email" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Teléfono" label-for="telefono">
                                <b-form-input id="telefono" v-model="users.telefono" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Ciudad" label-for="ciudad">
                                <b-form-input id="ciudad" v-model="users.ciudad" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Dirección" label-for="direccion">
                                <b-form-input id="direccion" v-model="users.direccion" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Número" label-for="numero">
                                <b-form-input id="numero" v-model="users.numero" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="4">
                            <b-form-group label="Código Postal" label-for="codigo_postal">
                                <b-form-input id="codigo_postal" v-model="users.codigo_postal" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
            <!-- Action Buttons -->
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-on:click="actualizarRegistro" @click=completado variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1">
                Guardar Cambios
            </b-button>
        </b-overlay>
    </div>
</div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
    BOverlay,
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BDropdown,
    VBToggle,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    BInputGroup,
    BInputGroupAppend,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BPagination,
    BSidebar,
    BListGroup,
    BListGroupItem,
} from 'bootstrap-vue'
import axios from '@axios'
export default {
    components: {
        BButton,
        BOverlay,
        BMedia,
        BAvatar,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        BTable,
        BCard,
        BCardHeader,
        BCardTitle,
        BFormCheckbox,
        BDropdown,
        VBToggle,
        BDropdownItem,
        BFormRadioGroup,
        BFormRadio,
        BInputGroup,
        BInputGroupAppend,
        BCardBody,
        BLink,
        BImg,
        BCardText,
        BPagination,
        BSidebar,
        BListGroup,
        BListGroupItem,
        BOverlay,

    },
    directives: {
        Ripple
    },
    data: () => {
        return {
            users: [],
            show: false,
        };

    },
    created() {
        /*axios.get('http://localhost/vue_proyect.php/?id_usuario=' + this.$route.params.id)
            .then((resp) => {
                this.users = resp.data[0]
                console.log("La Consulta")
                console.log(resp)

            })
            */
        this.getData()
    },
    methods: {
        actualizarRegistro() {
            var datossEnviar = {
                id: this.$route.params.id,
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
            fetch('https://vueproyect.000webhostapp.com/vue_project.php/?actualizar=' + this.$route.params.id, {
                    method: "POST",
                    body: JSON.stringify(datossEnviar)
                })
                .then((resp) => {
                    console.log(resp)
                    console.log("Actualizado Correctamente")
                    console.log(resp)
                })

        },
        getData() {
            this.show = true;
            fetch('https://vueproyect.000webhostapp.com/vue_project.php/?id_usuario=' + this.$route.params.id)
                .then(response => response.json())
                .then(responseData => {
                    this.users = responseData[0]
                    this.show = false;
                })
        },
        completado() {
            this.$swal({
                title: '¡Usuario Actualizado!',
                text: 'Usuario Actualizado Correctamene',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
            })
        },
        makeToast(variant = null) {
            this.$bvToast.toast('La Información Del Usuario Se Ha Actualizado Correctamente', {
                title: `Usuario Actualizado Correctamente`,
                variant,
                solid: false,
            })
        },
    },

}
</script>

<style>

</style>
