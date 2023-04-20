<template>
<div class="table">

        <table>
            <tr>
                <td>Usuario</td>
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Email</td>
                <td>Teléfono</td>
                <td>Editar</td>

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
                    <b-dropdown-item  @click="makeToast('primary')" variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1" v-on:click="eliminarValor(item.id) ">
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">Eliminar</span>
                    </b-dropdown-item>
                </b-dropdown>
                </td>
                
            </tr>
        </table>

</div>
</template>

<script>
import {
    BDropdown,
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
} from 'bootstrap-vue'
import axios from '@axios'
export default {
    data: () => {
        return {
            users: []
        }
    },
    components: {
        // BSV
        BDropdown,
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
