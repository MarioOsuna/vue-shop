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
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="getCategory(id)">
            Exportar JSON
        </b-button>
    </b-overlay>
</div>
</template>

<script>
import axios from "@axios";
import Ripple from "vue-ripple-directive";
import useGraphJwt from "@/auth/jwt/useGraphJwt";
import {
    BCard,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
} from "bootstrap-vue";
import {
    forEach
} from "postcss-rtl/lib/affected-props";
export default {
    data: () => ({
        user: null,
        id: "",
        array: [],
        arrayFinal: [],
        arrayContenidos: [],
        show: false
    }),
    components: {
        BCard,
        BFormGroup,
        BFormInput,
        BButton,
        BOverlay,
    },
    directives: {
        Ripple,
    },
    mounted() {
        this.login();
    },
    methods: {
        getCategory(id) {
            this.executionCount = this.executionCount || 0;
            this.executionCount++;
            axios.post("", {
                    query: `{
                    allCategories(id: "${id}") {
                        edges {
                            node {
                                id
                                name
                                isFinal
                                type
                                quality
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
                                treeId
                                level
                                categoryContent {
                                    totalCount
                                    edges {
                                        node {
                                            id
                                            name
                                            description
                                        }
                                    }
                                }
                                categoryContentOrder {
                                    totalCount
                                    edges{
                                        node {
                                            id
                                        }
                                    }
                                }
                                childCategories {
                                    totalCount
                                    edges {
                                        node {
                                            id
                                        }
                                    }
                                }
                            }
                        }
                    }
                }`,
                })
                .then((result) => {
                    result.data.data.allCategories.edges.forEach((parent) => {
                        this.array.push(parent.node);

                        if (parent.node.isFinal == false) {
                            if (parent.node.childCategories.totalCount > 0) {
                                parent.node.childCategories.edges.forEach((child) => {
                                    this.getCategory(child.node.id);
                                });
                            }
                        }
                        if (parent.node.isFinal) {
                            if (parent.node.categoryContent.totalCount > 0) {
                                if (parent.node.categoryContent.totalCount == parent.node.categoryContentOrder.totalCount) {
                                    this.getContent(parent.node.id, true)
                                } else {
                                    this.getContent(parent.node.id, false)
                                }
                            }
                        }
                    });

                    // RECORRO HIJAS Y VOY ANIDANDO
                    for (let i = 0; i < this.array.length; i++) {
                        if (this.array[i].isFinal) {
                            if (this.array[i].categoryContent.totalCount > 0) {
                                for (let x = 0; x < this.array[i].categoryContent.edges.length; x++) {
                                    for (let k = 0; k < this.arrayContenidos.length; k++) {
                                        if (this.array[i].categoryContent.edges[x].node.id == this.arrayContenidos[k].id) {
                                            this.array[i].categoryContent.edges[x].node = this.arrayContenidos[k]
                                        }
                                    }
                                }
                            }
                        }
                        if (!this.array[i].isFinal) {
                            if (this.array[i].childCategories.totalCount > 0) {
                                for (let x = 0; x < this.array[i].childCategories.edges.length; x++) {
                                    for (let k = 0; k < this.array.length; k++) {
                                        if (this.array[i].childCategories.edges[x].node.id == this.array[k].id) {
                                            this.array[i].childCategories.edges[x].node = this.array[k];
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // AÑADO HIJAS ANIDADAS DENTRO DE LA PADRE
                    for (let i = 0; i < this.array.length; i++) {
                        for (let x = 0; x < this.array[0].childCategories.edges.length; x++) {
                            if (this.array[0].childCategories.edges[x].node.id == this.array[i].id) {
                                this.array[0].childCategories.edges[x].node = this.array[i];
                            }
                        }
                    }

                    // CUANDO ACABE DE EJECUTAR, DESCARGO EL ARCHIVO .JSON
                    if (this.executionCount === this.array.length) {
                        this.arrayFinal[0] = this.array[0];

                        console.log(this.arrayContenidos)
                        console.log(this.arrayFinal)

                        const jsonData = JSON.stringify(this.arrayFinal);
                        const blob = new Blob([jsonData], {
                            type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "Categoria " + this.arrayFinal[0].name;
                        link.click();
                        URL.revokeObjectURL(url);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getContent(id, a = false) {
            let consulta = `{
                    allCategories(id:"${id}"){
                        edges {
                            node {
                                id
                                name
                                isFinal`
                                ;
            if (a) {
                consulta += `categoryContent {
                                    totalCount
                                        edges {
                                            node {
                                            id
                                            name
                                            order
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
            } else {
                consulta += `categoryContentOrder(orderBy: "order") {
                                edges {
                                    node {
                                        id
                                        content {
                                            id
                                            order
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
                }
            }`
            }

            axios.post("", {
                query: consulta
                
            }).then((result) => {
                result.data.data.allCategories.edges.forEach(categoria => {
                    if (a) {
                        categoria.node.categoryContentOrder.edges.forEach(contenido => {
                            this.arrayContenidos.push(contenido.node)
                        })
                    } else {
                        categoria.node.categoryContent.edges.forEach(contenido => {
                            if (categoria.node.categoryContent.totalCount > 0) {
                                this.arrayContenidos.push(contenido.node)
                            }
                        })
                    }
                })
                
                // RECORRO HIJAS Y VOY ANIDANDO
                for (let i = 0; i < this.array.length; i++) {
                    if (this.array[i].isFinal) {
                        if (this.array[i].categoryContent.totalCount > 0) {
                            for (let x = 0; x < this.array[i].categoryContent.edges.length; x++) {
                                for (let k = 0; k < this.arrayContenidos.length; k++) {
                                    if (this.array[i].categoryContent.edges[x].node.id == this.arrayContenidos[k].id) {
                                        console.log("añadiendo")
                                        this.array[i].categoryContent.edges[x].node = this.arrayContenidos[k]
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })

        },
        login() {
            useGraphJwt
                .login("", "")
                .then((response) => {
                    const {
                        data,
                        errors
                    } = response.data;

                    this.user = data;
                    if (errors) {
                        console.log(errors[0].message);

                        return;
                    }

                    if (!data.tokenAuth.user.profile) {
                        return;
                    }

                    const ability = {
                        ability: [{
                            action: "manage",
                            subject: "all",
                        }, ],
                    };

                    useGraphJwt.setToken(data.tokenAuth.token);
                    const userData = {
                        ...data.tokenAuth.user,
                        ...ability,
                    };
                    setUserData(userData);
                    localStorage.setItem(
                        "userData",
                        window.btoa(unescape(encodeURIComponent(JSON.stringify(userData))))
                    );

                    this.$ability.update(userData.ability);
                })
                .catch((error) => {});
        },
    },
};
</script>

<style>
</style>
