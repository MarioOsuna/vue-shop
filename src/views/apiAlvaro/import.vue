<template>
<div>
    <b-overlay :show="show" rounded="sm" variant="transparent">
        <b-card>
            <b-form-group label="API KEY" label-for="apikey">
                <b-form-input id="apikey" value="oRwmECKCXaBx4J7A" disabled />
            </b-form-group>
            <b-form-group label="CLIENT ID" label-for="clientid">
                <b-form-input id="clientid" value="F434ZsYAF0cQheSc6DCs69iIz1vXx1fA9SSS0tp2" disabled />
            </b-form-group>
            <b-form-group label="USERNAME" label-for="username">
                <b-form-input id="username" value="rotary" disabled />
            </b-form-group>
            <b-form-group label="PASSWORD" label-for="password">
                <b-form-input id="password" value="LlaveAzul321*" disabled />
            </b-form-group>
            <b-form-group label="ID CATEGORIA" label-for="categoria">
                <b-form-input id="categoria" placeholder="ID CATEGORIA" v-model="id" />
            </b-form-group>
        </b-card>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" >
            Importar JSON
        </b-button>
    </b-overlay>
</div>
</template>

<script>
import {
    BCard,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
} from "bootstrap-vue";
export default {
    components: {
        BCard,
        BFormGroup,
        BFormInput,
        BButton,
        BOverlay,
    }
}
</script>

<style>

</style>
