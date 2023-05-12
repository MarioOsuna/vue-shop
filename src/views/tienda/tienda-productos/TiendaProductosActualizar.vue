<template>
  <div>
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="primary"
      style="float: right; position: static;"
      :to="{name: 'tienda-productos'}"
    >
      <feather-icon icon="ArrowLeftIcon" />
    </b-button>
    <div>
      <b-overlay
        :show="show"
        rounded="sm"
        variant="transparent"
      >
        <b-card>
          <b-form
            class="position-relative"
            @submit.prevent="onSubmit"
          >
            <b-row>
              <b-col>
                <b-form-group
                  label="Referencia"
                  label-for="referencia"
                >
                  <b-form-input
                    id="referencia"
                    v-model="product.referencia"
                    placeholder="Referencia"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Nombre"
                  label-for="nombre"
                >
                  <b-form-input
                    id="nombre"
                    v-model="product.nombre"
                    placeholder="Nombre"
                    disabled
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                  label="Talla"
                  label-for="talla"
                >
                  <b-form-input
                    id="talla"
                    v-model="product.talla"
                    placeholder="XS, S, M, L, XL, XXL"
                    disabled
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Precio"
                  label-for="precio"
                >
                  <b-form-input
                    id="precio"
                    v-model="product.precio"
                    placeholder="Precio (0.00)"
                  />
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group
                  label="Cantidad"
                  label-for="cantidad"
                >
                  <b-form-input
                    id="cantidad"
                    v-model="product.cantidad"
                    placeholder="Cantidad"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button
                  ref="submit"
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  type="submit"
                  :disabled="busy"
                >
                  Actualizar Producto
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-overlay>
    </div>
    <b-overlay
      :show="busy"
      no-wrap
      @shown="onShown"
      @hidden="onHidden"
    >
      <template #overlay>
        <div
          v-if="processing"
          class="text-center p-4 primary text-light rounded"
        >
          <b-icon
            icon="cloud-upload"
            font-scale="4"
          />
          <div class="mb-3">
            Procesando petición...
          </div>
          <b-progress
            min="1"
            max="20"
            :value="counter"
            variant="success"
            height="3px"
            class="mx-n4 rounded-0"
          />
        </div>
        <div
          v-else
          ref="dialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p><strong id="form-confirm-label">¿Estás seguro?</strong></p>
          <div class="d-flex">
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              class="mr-3"
              @click="onCancel"
            >
              Cancelar
            </b-button>
            <b-button
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="outline-success"
              @click="onOK"
            >
              OK
            </b-button>
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import {
  BCard,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormFile,
  BButton,
  BCardTitle,
  BOverlay,
  BProgress,
  BIcon,
  BInputGroup,
  BInputGroupPrepend,
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
    BButton,
    BCardTitle,
    BOverlay,
    BProgress,
    BIcon,
    BInputGroup,
    BInputGroupPrepend,
  },
  directives: {
    Ripple,
  },
  data: () => ({
    busy: false,
    processing: false,
    counter: 1,
    interval: null,
    product: [],
    show: false,
  }),
  beforeUnmount() {
    this.clearInterval()
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.show = true
      fetch(`https://vuealvaro.000webhostapp.com/shop.php/?referencia=${this.$route.params.referencia}`)
        .then(res => res.json())
        .then(json => {
          this.product = json[0]
          this.show = false
        })
    },
    editarProducto() {
      const datosEnviar = {
        referencia: this.$route.params.referencia,
        precio: this.product.precio,
        cantidad: this.product.cantidad,
      }

      fetch(`https://vuealvaro.000webhostapp.com/shop.php/?actualizar='${this.$route.params.referencia}'`, {
        method: 'POST',
        body: JSON.stringify(datosEnviar),
      })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    },
    makeToast() {
      this.$bvToast.toast('El producto se ha actualizado correctamente', {
        title: 'Actualización de producto',
        variant: 'primary',
        solid: true,
      })
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    onShown() {
      this.$refs.dialog.focus()
    },
    onHidden() {
      this.$refs.submit.focus()
    },
    onSubmit() {
      this.processing = false
      this.busy = true
    },
    onCancel() {
      this.busy = false
    },
    onOK() {
      this.counter = 1
      this.processing = true
      this.clearInterval()
      this.interval = setInterval(() => {
        if (this.counter < 20) {
          this.counter += 1
        } else {
          this.clearInterval()
          this.$nextTick(() => {
            this.busy = this.processing = false
          })
        }
      }, 350)
      this.editarProducto()
    },
  },
}
</script>

<style>

</style>
