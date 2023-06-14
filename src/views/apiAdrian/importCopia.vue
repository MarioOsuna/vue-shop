<template>
    <div>
        <b-overlay rounded="sm" variant="transparent">
            <b-card>
                <b-form-file v-model="file" ref="fileInput" placeholder="Escoge el archivo a subir" drop-placeholder="Drop file here..." />
                <b-card-text class="my-1">
                    Archivo Seleccionado: <strong>{{ file ? file.name : '' }}</strong>
                </b-card-text>
            </b-card>
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="leerFichero">
                Extraer Datos JSON
            </b-button>
        </b-overlay>
        <br>
        <div class="table">
            <h2>Datos del archivo JSON</h2>
            <br>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>¿Es Final?</th>
                    <th>Descripción</th>
                    <th>Descripción Corta</th>
                    <th>Calidad</th>
                    <th>Tipo</th>
                </tr>
                <tr v-for="item in datos" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.isFinal }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.shortDescription }}</td>
                    <td>{{ item.quality }}</td>
                    <td>{{ item.type }}</td>
                </tr>
    
            </table>
    
        </div>
        <br>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="leerFichero">
            Importar JSON
        </b-button>
    </div>
    </template>
    
    <script>
    import Ripple from "vue-ripple-directive";
    import {
        BCard,
        BFormGroup,
        BFormInput,
        BButton,
        BOverlay,
        BCardText,
        BFormFile,
    } from "bootstrap-vue";
    import axios from 'axios';
    export default {
        components: {
            BCard,
            BFormGroup,
            BFormInput,
            BButton,
            BOverlay,
            BCardText,
            BFormFile,
        },
        data() {
            return {
                file: null,
                datos: [],
                jsonData: []
            }
        },
        directives: {
            Ripple,
        },
        methods: {
            leerFichero() {
                if (this.file) {
                    const reader = new FileReader();
    
                    reader.onload = (event) => {
                        this.jsonData = JSON.parse(event.target.result)
                        this.datos = this.jsonData.map(item => item)
                        this.crearCategoria()
                        console.log(this.datos)
                    };
                    reader.readAsText(this.file);
                } else {
                    console.log("Error")
                }
    
            },
            crearCategoria() {
                const variables = {
                    name: this.datos[0].name,
                    client: "Q2xpZW50Tm9kZTpvUndtRUNLQ1hhQng0SjdB",
                    isFinal: this.datos[0].name,
                    type: this.datos[0].name,
                    quality: this.datos[0].name,
                    hasSubtitle: this.datos[0].name,
                    modeGrid: this.datos[0].name,
                    description: this.datos[0].name,
                    shortDescription: this.datos[0].name,
                    friendlyUrl: this.datos[0].name,
                    seoTitle: this.datos[0].name,
                    seoDescription: this.datos[0].name,
                    image: this.datos[0].name,
                    imageMobile: this.datos[0].name,
                    background: this.datos[0].name,
                    backgroundMobile: this.datos[0].name,
                    backgroundRoot: this.datos[0].name,
                    backgroundRootMobile: this.datos[0].name,
                    alternativeImage: this.datos[0].name,
                    titleImage: this.datos[0].name,
                    mediaLocation: this.datos[0].name,
                    imageUrl: this.datos[0].name,
                    imageMobileUrl: this.datos[0].name,
                    backgroundUrl: this.datos[0].name,
                    backgroundMobileUrl: this.datos[0].name,
                    backgroundRootUrl: this.datos[0].name,
                    backgroundRootMobileUrl: this.datos[0].name,
                    alternativeImageUrl: this.datos[0].name,
                    titleImageUrl: this.datos[0].name,
                    trailerUrl: this.datos[0].name,
                    isPremium: this.datos[0].name,
                    isContentFree: this.datos[0].name,
                    trailer: this.datos[0].name,
                    staticUrl: this.datos[0].name,
                    isBackgroundBlur: this.datos[0].name,
                    isBackgroundKenBurns: this.datos[0].name,
                    isTitle: this.datos[0].name,
                    contentDesign: this.datos[0].name,
                    templateCategory: this.datos[0].name,
                    order: this.datos[0].name,
                    orderType: this.datos[0].name,
                    startSecondChapter: this.datos[0].name,
                    finishSecondChapter: this.datos[0].name,
                    reference: this.datos[0].name,
                    technicalDetails: this.datos[0].name,
                    isActive: this.datos[0].name,
                };
    
                axios.post("", {
                        query: `mutation($name: String!, $client: ID!, $isFinal: Boolean, $type: CategoryTypeInput, $quality: CategoryQualityInput, $hasSubtitle: Boolean,
                        $modeGrid: Boolean, $description: String, $shortDescription: String, $friendlyUrl: String, $seoTitle: String, $seoDescription: String,
                        $image: String, $imageMobile: Upload, $background: Upload, $backgroundMobile: Upload, $backgroundRoot: Upload, $backgroundRootMobile: Upload,
                        $alternativeImage: Upload, $titleImage: Upload, $mediaLocation: CategoryMediaLocationInput, $imageUrl: String, $imageMobileUrl: String,  $backgroundUrl: String,
                        $backgroundMobileUrl: String, $backgroundRootUrl: String, $backgroundRootMobileUrl: String, $alternativeImageUrl: String, $titleImageUrl: String,
                        $trailerUrl: String, $isPremium: Boolean, $isContentFree: Boolean, $trailer: Upload, $staticUrl: String, $isBackgroundBlur: Boolean, $isBackgroundKenBurns: Boolean,
                        $isTitle: Boolean, $contentDesign: CategoryContentDesignInput, $templateCategory: CategoryTemplateCategoryInput, $order: Int, $orderType: CategoryOrderTypeInput,
                        $startSecondChapter: Int, $finishSecondChapter: Int, $reference: String, $technicalDetails: String, $isActive: Boolean
    
                        
                        ){ 
                                    createCategory(input: {name: $name, client: $client, isFinal: $isFinal, type: $type, quality: $quality, hasSubtitle: $hasSubtitle, 
                                        modeGrid: $modeGrid, description: $description, shortDescription: $shortDescription, friendlyUrl: $friendlyUrl, seoTitle: $seoTitle, seoDescription: $seoDescription,
                                        image: $image, imageMobile: $imageMobile, background: $background, backgroundMobile: $backgroundMobile, backgroundRoot: $backgroundRoot, backgroundRootMobile: $backgroundRootMobile,
                                        alternativeImage: $alternativeImage, titleImage: $titleImage, mediaLocation: $mediaLocation, imageUrl: $imageUrl, imageMobileUrl: $imageMobileUrl, backgroundUrl: $backgroundUrl,
                                        backgroundMobileUrl: $backgroundMobileUrl, backgroundRootUrl: $backgroundRootUrl, backgroundRootMobileUrl: $backgroundRootMobileUrl, alternativeImageUrl: $alternativeImageUrl, titleImageUrl: $titleImageUrl,
                                        trailerUrl: $trailerUrl, isPremium: $isPremium, isContentFree: $isContentFree, trailer: $trailer, staticUrl: $staticUrl, isBackgroundBlur: $isBackgroundBlur, isBackgroundKenBurns: $isBackgroundKenBurns,
                                        isTitle: $isTitle, contentDesign: $contentDesign, templateCategory: $templateCategory, order: $order, orderType: $orderType, 
                                        startSecondChapter: $startSecondChapter, finishSecondChapter: $finishSecondChapter, reference: $reference, technicalDetails: $technicalDetails, isActive: $isActive }){
                                        category{
                                            id
                                        }
                                    }
                                }`,
                        variables
                    })
                    .then((result) => {
                        console.log("Categoría creada correctamente");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
    
        }
    }
    </script>
    
    <style>
    
    </style>
    