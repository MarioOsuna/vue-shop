<template>
<div class="table">

    <table>
        <tr>
            <td>Usuario</td>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Email</td>
            <td>Teléfono</td>
            <td>Acciones</td>

        </tr>

        <tr v-for="item in users" :key="item.id">
            <td>{{item.usuario}}</td>
            <td>{{ item.nombre}}</td>
            <td>{{ item.apellido }}</td>
            <td>{{item.email}}</td>
            <td>{{ item.telefono }}</td>
            <td>
                <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
                    <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <b-dropdown-item :to="{ name: 'users-usuarios-editarbbdd', params: { id: item.id }} ">
                        <feather-icon icon="EditIcon" />
                        <span class="align-middle ml-50">Editar</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="makeToast('primary')" variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1" v-on:click="eliminarValor(item.id) ">
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">Eliminar</span>
                    </b-dropdown-item>
                </b-dropdown>
            </td>
        </tr>
    </table>
    <div>
        <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" v-b-toggle.sidebar-right variant="primary" class="btn-icon" style="float: right; position: static;">
            <feather-icon icon="UserPlusIcon" />

        </b-button>
        <b-sidebar id="sidebar-right" bg-variant="white" right backdrop shadow>
            <div class="m-2">
                    <div class="text-center mb-3">
                        <!-- Name -->
                        <b-card-text class="mt-2 h4 color-inherit text-reset">
                            Crear Usuarios
                        </b-card-text>
                    </div>
                    <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group label="Usuario" label-for="usuario">
                                <b-form-input  placeholder="alex1234" id="usuario" v-model="users.usuario" required/>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group label="Nombre" label-for="nombre">
                                <b-form-input  placeholder="Francisco" id="nombre" v-model="users.nombre" required />
                            </b-form-group>
                        </b-col>
                        </b-row>
                        <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group label="Apellido" label-for="apellido">
                                <b-form-input  placeholder="Sanchez" id="apellido" v-model="users.apellido" required/>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group label="Email" label-for="email">
                                <b-form-input type="email" placeholder="franciscosanchez@example.com" id="email" v-model="users.email" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group label="Teléfono" label-for="telefono">
                                <b-form-input type="number" placeholder="675890123" id="telefono" v-model="users.telefono" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group label="Ciudad" label-for="ciudad">
                                <b-form-input  placeholder="Madrid" id="ciudad" v-model="users.ciudad" required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group label="Dirección" label-for="direccion">
                                <b-form-input  placeholder="Calle Borja Pavon" id="direccion" v-model="users.direccion" />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group label="Número" label-for="numero">
                                <b-form-input type="number" placeholder="2" id="numero" v-model="users.numero" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="justify-content-center" >
                        <b-col >
                            <b-form-group label="Código Postal" label-for="codigo_postal" style="text-align: center;">
                                <b-form-input type="number"  placeholder="14700" id="codigo_postal" v-model="users.codigo_postal" required />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="justify-content-center m-1" >
                            <b-button type="submit" v-ripple.400="'rgba(113, 102, 240, 0.15)'" 
                        v-on:click="agregarRegistro" @click="crearUsuarioToast('primary')" variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1">
                            Crear Usuario
                        </b-button>
                    </b-row>
            </div>
            
            
            
            
        </b-sidebar>
    </div>
</div>
</template>

<script>
import {
    BDropdown,
    VBToggle,
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
} from 'bootstrap-vue'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
export default {
    data: () => {
        return {
            users: [],
        }
    },
    directives: {
        'b-toggle': VBToggle,
        Ripple,
    },
    components: {
        // BSV
        BDropdown,
        BDropdownItem,
        BFormRadioGroup,
        BFormRadio,
        BRow,
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
    },
    created() {
        axios.get('http://localhost/users.php')
            .then((resp) => {
                this.users = resp.data
                console.log(resp)
            })
    },
    methods: {
        eliminarValor(id) {
            axios.delete('http://localhost/users.php/?borrar=' + id)
                .then((resp) => {
                    console.log(resp)
                    console.log("Usuario Eliminado Correctamente")
                    location.reload()
                })

        },
        agregarRegistro() {
            console.log(this.users)
            var datosEnviar={usuario:this.users.usuario,
                nombre:this.users.nombre,
                apellido:this.users.apellido,
                email:this.users.email,
                telefono:this.users.telefono,
                ciudad:this.users.ciudad,
                direccion:this.users.direccion,
                numero:this.users.numero,
                codigo_postal:this.users.codigo_postal} 

                axios.post('http://localhost/users.php/?insertar=1', JSON.stringify(datosEnviar))
                .then((resp) => {
                    console.log(resp)
                    console.log("Actualizado Correctamente")
                    console.log(resp)
                    location.reload()
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
    }

}
</script>

<style>

</style>
