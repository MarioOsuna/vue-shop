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
                    isFinal: this.datos[0].isFinal,
                    type: this.datos[0].type,
                    quality: this.datos[0].quality,
                    hasSubtitle: this.datos[0].hasSubtitle,
                    modeGrid: this.datos[0].modeGrid,
                    description: this.datos[0].description,
                    shortDescription: this.datos[0].shortDescription,
                    friendlyUrl: this.datos[0].friendlyUrl,
                    seoTitle: this.datos[0].seoTitle,
                    seoDescription: this.datos[0].seoDescription,
                    image: this.datos[0].image,
                    imageMobile: this.datos[0].imageMobile,
                    background: this.datos[0].background,
                    backgroundMobile: this.datos[0].backgroundMobile,
                    backgroundRoot: this.datos[0].backgroundRoot,
                    backgroundRootMobile: this.datos[0].backgroundRootMobile,
                    alternativeImage: this.datos[0].alternativeImage,
                    titleImage: this.datos[0].titleImage,
                    mediaLocation: this.datos[0].mediaLocation,
                    imageUrl: this.datos[0].imageUrl,
                    imageMobileUrl: this.datos[0].imageMobileUrl,
                    backgroundUrl: this.datos[0].backgroundUrl,
                    backgroundMobileUrl: this.datos[0].backgroundMobileUrl,
                    backgroundRootUrl: this.datos[0].backgroundRootUrl,
                    backgroundRootMobileUrl: this.datos[0].backgroundRootMobileUrl,
                    alternativeImageUrl: this.datos[0].alternativeImageUrl,
                    titleImageUrl: this.datos[0].titleImageUrl,
                    trailerUrl: this.datos[0].trailerUrl,
                    isPremium: this.datos[0].isPremium,
                    isContentFree: this.datos[0].isContentFree,
                    trailer: this.datos[0].trailer,
                    staticUrl: this.datos[0].staticUrl,
                    isBackgroundBlur: this.datos[0].isBackgroundBlur,
                    isBackgroundKenBurns: this.datos[0].isBackgroundKenBurns,
                    isTitle: this.datos[0].isTitle,
                    contentDesign: this.datos[0].contentDesign,
                    templateCategory: this.datos[0].templateCategory,
                    order: this.datos[0].order,
                    orderType: this.datos[0].orderType,
                    startSecondChapter: this.datos[0].startSecondChapter,
                    finishSecondChapter: this.datos[0].finishSecondChapter,
                    reference: this.datos[0].reference,
                    technicalDetails: this.datos[0].technicalDetails,
                    isActive: this.datos[0].isActive,
                };
    
                axios.post("", {
                        query: `mutation($name: String!, $client: ID!, $isFinal: Boolean, $type: CategoryTypeInput, $quality: CategoryQualityInput, $hasSubtitle: Boolean, $modeGrid: Boolean, $description: String, $shortDescription: String, $friendlyUrl: String, $seoTitle: String, $seoDescription: String, $image: String, $imageMobile: Upload, $background: Upload, $backgroundMobile: Upload, $backgroundRoot: Upload, $backgroundRootMobile: Upload, $alternativeImage: Upload, $titleImage: Upload, $mediaLocation: CategoryMediaLocationInput, $imageUrl: String, $imageMobileUrl: String,  $backgroundUrl: String, $backgroundMobileUrl: String, $backgroundRootUrl: String, $backgroundRootMobileUrl: String, $alternativeImageUrl: String, $titleImageUrl: String, $trailerUrl: String, $isPremium: Boolean, $isContentFree: Boolean, $trailer: Upload, $staticUrl: String, $isBackgroundBlur: Boolean, $isBackgroundKenBurns: Boolean, $isTitle: Boolean, $contentDesign: CategoryContentDesignInput, $templateCategory: CategoryTemplateCategoryInput, $order: Int, $orderType: CategoryOrderTypeInput, $startSecondChapter: Int, $finishSecondChapter: Int, $reference: String, $technicalDetails: String, $isActive: Boolean){ 
                                    createCategory(input: {name: $name, client: $client, isFinal: $isFinal, type: $type, quality: $quality, hasSubtitle: $hasSubtitle, modeGrid: $modeGrid, description: $description, shortDescription: $shortDescription, friendlyUrl: $friendlyUrl, seoTitle: $seoTitle, seoDescription: $seoDescription, image: $image, imageMobile: $imageMobile, background: $background, backgroundMobile: $backgroundMobile, backgroundRoot: $backgroundRoot, backgroundRootMobile: $backgroundRootMobile, alternativeImage: $alternativeImage, titleImage: $titleImage, mediaLocation: $mediaLocation, imageUrl: $imageUrl, imageMobileUrl: $imageMobileUrl, backgroundUrl: $backgroundUrl, backgroundMobileUrl: $backgroundMobileUrl, backgroundRootUrl: $backgroundRootUrl, backgroundRootMobileUrl: $backgroundRootMobileUrl, alternativeImageUrl: $alternativeImageUrl, titleImageUrl: $titleImageUrl, trailerUrl: $trailerUrl, isPremium: $isPremium, isContentFree: $isContentFree, trailer: $trailer, staticUrl: $staticUrl, isBackgroundBlur: $isBackgroundBlur, isBackgroundKenBurns: $isBackgroundKenBurns, isTitle: $isTitle, contentDesign: $contentDesign, templateCategory: $templateCategory, order: $order, orderType: $orderType,  startSecondChapter: $startSecondChapter, finishSecondChapter: $finishSecondChapter, reference: $reference, technicalDetails: $technicalDetails, isActive: $isActive }){
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
    