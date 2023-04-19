<template>
<div>
    <b-card>
        <b-card-title>Actualizar Productos</b-card-title>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Referencia" label-for="referencia">
                        <b-form-input id="referencia" placeholder="Referencia" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-input id="nombre" placeholder="Nombre" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Imagen" label-for="imagen">
                        <b-form-file class="mt-1" v-model="file1" plain disabled />
                    </b-form-group>
                    <div class="mt-1">
                        Archivo seleccionado: <strong>{{ file1 ? file1.name : '' }}</strong>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Talla" label-for="talla">
                        <b-form-input id="talla" placeholder="XS, S, M, L, XL, XXL" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Precio" label-for="precio">
                        <b-form-input id="precio" placeholder="Precio (0.00)" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Cantidad" label-for="cantidad">
                        <b-form-input id="cantidad" placeholder="Cantidad" />
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
import {
    BCard,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton
} from 'bootstrap-vue'
export default {
    components: {
        BCard,
        BForm,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormFile,
        BButton
    }
}
</script>

<style>

</style>
