<template>
<div>
    <h2>Api Interactvty</h2>
    <hr>
    <b-card>
        <b-form>
            <b-row>
                <b-col cols="12" md="4">
                    <b-form-group label="Api KEY">
                        <b-form-input type="text" value="oRwmECKCXaBx4J7A" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Client ID">
                        <b-form-input type="text" value="F434ZsYAF0cQheSc6DCs69iIz1vXx1fA9SSS0tp2" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="UserName">
                        <b-form-input type="text" value="rotary" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Password">
                        <b-form-input type="text" value="LlaveAzul321*" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="ID Categoria">
                        <b-form-input type="text" v-model="id" />
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
    <!-- Action Buttons -->
    <b-button type="submit" v-ripple.400="'rgba(113, 102, 240, 0.15)'" @click="getData" variant="danger" class="mb-1 mb-sm-0 mr-0 mr-sm-1">
        Descargar JSON
    </b-button>

</div>
</template>

<script>
import useGraphJwt from "@/auth/jwt/useGraphJwt";
import Ripple from 'vue-ripple-directive'
import {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
} from 'bootstrap-vue'
import axios from '@axios'
export default {
    data: () => {
        return {
            array: [],
            user: null,
            id: ''
        }
    },
    components: {
        BButton,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        BTable,
        BCard,

    },
    directives: {
        Ripple
    },
    mounted() {
        this.login()
    },

    methods: {
        /*
        getData() {
            
            axios.post("", {
                    query: `

            {
                allCategories(id:"${this.id}"){
                    edges {
                        node {
                            id
                            name
                            isFinal
                            type
                            isActive
                            hasSubtitle
                            modeGrid
                            description
                            shortDescription
                            friendlyUrl
                            seoTitle
                            seoDescription
                            image
                            imageMobile
                            background
                            backgroundMobile
                            backgroundRoot
                            backgroundRootMobile
                            alternativeImage
                            titleImage
                            mediaLocation
                            imageUrl
                            imageMobileUrl
                            backgroundUrl
                            backgroundMobileUrl
                            backgroundRootUrl
                            backgroundRootMobileUrl
                            alternativeImageUrl
                            titleImageUrl
                            trailerUrl
                            isPremium
                            isContentFree
                            trailer
                            staticUrl
                            isBackgroundBlur
                            isBackgroundKenBurns
                            isTitle
                            contentDesign
                            templateCategory
                            order
                            orderType
                            startSecondChapter
                            finishSecondChapter
                            reference
                            technicalDetails
                            isActive
                            lft
                            rght
                            level
                            treeId
                        }
                    }
                }
            }`

                })

                .then(result => {
                    console.log(result.data.data.allCategories.edges)
                    let array = [];
                    result.data.data.allCategories.edges.forEach(element => {
                        array.push(element.node);
                    });
                    const data = JSON.stringify(array);

                    const blob = new Blob([data], {
                        type: 'application/json'
                    });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'datos.json';
                    link.click();

                    URL.revokeObjectURL(url);
                }).catch(err => {
                    console.log(err)
                })

        }*/

        getData() {
            axios.post("", {
                    query: `
            {
                allCategories(id:"${this.id}"){
                    edges {
                        node {
                            id
                            name
                            isFinal
                            categoryContent {
                                totalCount
                                edges {
                                    node {
                                        id
                                        name
                                        isActive
                                        description
                                        shortDescription
                                        image
                                        duration
                                        maxViews
                                        alternativeImage
                                        imageMobile
                                        background
                                        backgroundMobile
                                        titleImage
                                        mediaLocation
                                        imageUrl
                                        alternativeImageUrl
                                        imageMobileUrl
                                        backgroundUrl
                                        backgroundMobileUrl
                                        titleImageUrl
                                        trailerUrl
                                        quality
                                        hasSubtitle
                                        state
                                        comment
                                        isPremium
                                        duration
                                        type
                                        resources {
                                            edges {
                                                node {
                                                id
                                                name
                                                description
                                                type
                                                videotype
                                                file {
                                                    id
                                                    name
                                                    type
                                                    media
                                                    staticUrl
                                                    createdAt
                                                    modifiedAt
                                                    isActive
                                                    mediaDuration
                                                    fileUrl
                                                }
                                                    directUrl
                                                    inputStream
                                                    passwordStream
                                                    userStream
                                                    product {
                                                        id
                                                        name
                                                        description
                                                        image
                                                        imageMobile
                                                        background
                                                        trailer
                                                        mediaLocation
                                                        imageUrl
                                                        imageMobileUrl
                                                        backgroundUrl
                                                        trailerUrl
                                                        tags {
                                                            edges {
                                                                node {
                                                                    id
                                                                }
                                                            }
                                                        }
                                                        categories {
                                                            edges {
                                                                node {
                                                                    id
                                                                }
                                                            }
                                                        }
                                                        price
                                                        priceOld
                                                        stock
                                                        weight
                                                        high
                                                        width
                                                        long
                                                        tax
                                                        reference
                                                        state
                                                        comment
                                                        order
                                                        createdAt
                                                        modifiedAt
                                                        vendor {
                                                            id
                                                        }
                                                        isSpecial
                                                        isBackgroundBlur
                                                        isBackgroundKenBurns
                                                        isDelete
                                                        isActive
                                                        friendlyUrl
                                                        seoTitle
                                                        seoDescription
                                                        productResource {
                                                            edges {
                                                                node {
                                                                    id
                                                                }
                                                            }
                                                        }
                                                    }
                                                    test {
                                                        id
                                                        name
                                                        correct
                                                        intro
                                                        failFeedback
                                                        successFeedback
                                                        image
                                                        background
                                                        isActive
                                                        testAnswer {
                                                            id
                                                            response
                                                            order
                                                        }
                                                        testUseranswer {
                                                            edges {
                                                                node {
                                                                    id
                                                                    test {
                                                                        id
                                                                        name
                                                                        correct
                                                                        intro
                                                                        image
                                                                        imageUrl
                                                                        background
                                                                    }
                                                                    answer {
                                                                        id
                                                                        response
                                                                    }
                                                                    result
                                                                }
                                                            }
                                                        }
                                                        testResource {
                                                            edges {
                                                                node {
                                                                    id
                                                                    name
                                                                    description
                                                                    type
                                                                    videotype
                                                                    isActive
                                                                }
                                                            }
                                                        }
                                                        imageUrl
                                                        backgroundUrl
                                                    }   
                                                    plain {
                                                        id
                                                        name
                                                        title
                                                        text
                                                        image
                                                        isActive
                                                        plainResource {
                                                            edges {
                                                                node {
                                                                    id
                                                                }
                                                            }
                                                        }
                                                        imageUrl
                                                    }
                                                    remoteProductId
                                                    urlApp
                                                    urlAppAndroidTv
                                                    urlAppIos
                                                    urlAppIosTv
                                                    urlAppWeb
                                                    urlAppSamsung
                                                    urlAppLg
                                                    deviceApp
                                                    isActive
                                                    resourceInteractivity {
                                                        edges {
                                                            node {
                                                                id
                                                                name
                                                                description
                                                                connect
                                                                timeType
                                                                second
                                                                date
                                                                hour
                                                                fileReco
                                                                typeReco
                                                                urlReco
                                                                messageReco
                                                                idReco
                                                                urlPush
                                                                typePush
                                                                isAuto
                                                                messagePush
                                                                subjectMail
                                                                bodyMail
                                                                fileMail
                                                                content {
                                                                    id
                                                                }
                                                                secondFile
                                                                resourceStart {
                                                                    id
                                                                }
                                                                resourceEnd {
                                                                    id
                                                                }
                                                                image
                                                                time
                                                                isVisible
                                                                isActive
                                                                interactivityIdStatistics {
                                                                    edges {
                                                                        node {
                                                                            id
                                                                        }
                                                                    }
                                                                }
                                                                interactivityAd {
                                                                    edges {
                                                                        node {
                                                                            id
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }`
                })

                .then(result => {
                    //  console.log(result.data.data.allCategories.edges)
                    let array = [];
                    result.data.data.allCategories.edges.forEach(categoria => {
                        //    array.push(element.node);
                        console.log(categoria.node.isFinal)
                        if (categoria.node.isFinal == true) {
                            if (categoria.node.categoryContent.totalCount > 0) {
                                categoria.node.categoryContent.edges.forEach(contenido => {
                                    console.log(contenido.node.name + " " + contenido.node.id)
                                    contenido.node.resources.edges.forEach(recursos => {
                                        console.log(recursos.node.id + " " + recursos.node.nombre)
                                    })
                                    array.push(categoria.node);
                                })

                            }
                        } else {

                        }

                    });

                    const data = JSON.stringify(array);

                    const blob = new Blob([data], {
                        type: 'application/json'
                    });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'datos.json';
                    link.click();

                    URL.revokeObjectURL(url);

                }).catch(err => {
                    console.log(err)
                })
        },

        login() {
            useGraphJwt.login("", "").then(response => {
                const {
                    data,
                    errors
                } = response.data;

                this.user = data
                if (errors) {
                    console.log(errors[0].message)

                    return;
                }

                if (data.tokenAuth.user.isSuperuser) {
                    console.log("isSuperuser")
                    // this.loginErrors = [{ message: "Superusers access denied." }];

                    useGraphJwt.setToken(this.user.tokenAuth.token);

                    return

                }
                if (!data.tokenAuth.user.profile) {

                    return;
                }

                const ability = {
                    ability: [{
                        action: "manage",
                        subject: "all"
                    }]
                };

                useGraphJwt.setToken(data.tokenAuth.token);
                const userData = {
                    ...data.tokenAuth.user,
                    ...ability
                };
                setUserData(userData)
                localStorage.setItem("userData", window.btoa(unescape(encodeURIComponent(JSON.stringify(userData)))))

                this.$ability.update(userData.ability);

            }).catch(error => {})
        }

    },
}
</script>

<style>

</style>
