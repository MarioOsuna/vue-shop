<template>
<div>
    <div>
        <b-card>
            <b-link :to="{name: 'tienda-productosBD-crear'}">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit">
                    Crear Producto
                </b-button>
            </b-link>
        </b-card>
    </div>
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
                                <b-link :to="{name: 'tienda-productosBD-actualizar', params: {referencia: item.referencia}}">
                                    <feather-icon icon="EditIcon" />
                                    <span class="align-middle ml-50">Editar</span>
                                </b-link>
                            </b-dropdown-item>
                            <b-dropdown-item @click="eliminarProducto(item.referencia)">
                                <feather-icon icon="TrashIcon" />
                                <span class="align-middle ml-50">Eliminar</span>
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
    BDropdown,
    BDropdownItem,
    BCard,
    BButton,
    BLink
} from 'bootstrap-vue'
export default {
    components: {
        BDropdown,
        BDropdownItem,
        BCard,
        BButton,
        BLink
    },
    data: () => {
        return {
            products: []
        }
    },
    created() {
        axios.get('http://localhost/shop.php/')
            .then((resp) => {
                this.products = resp.data
            })
    },
    methods: {
        eliminarProducto(referencia) {
            axios.delete('http://localhost/shop.php/?borrar="' + referencia + '"')
                .then((resp) => {
                    console.log('Eliminado correctamente')
                    location.reload()
                })
        }
    },
    directives: {
        Ripple
    }
}
</script>

<style>

</style>
