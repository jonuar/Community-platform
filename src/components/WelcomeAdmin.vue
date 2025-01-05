<template>
    <section id="container">
        <div id="dashboard">
            <div id="left-side">
                <img src="../assets/logo-community-nospace.png" alt="Logo Comunidad Global One More" id="logo">
                <h1>Bienvenido, {{ user }}.</h1>
                <div id="cont-buttons">
                    <button>Gestion</button>
                    <button>Datos</button>
                    <button>Configuracion</button>
                </div>
            </div>
            <div id="right-side">
                <div id="cont-list"></div>
                <div id="cont-squares">
                    <div id="cont-up"></div>
                    <div id="cont-down"></div>
                </div>
            </div>
        </div>
    </section>
</template> 

<script>
export default {
    name:"WelcomeAdmin",
    props:["user"],
};
</script> 

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')

#container
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    background: linear-gradient(to bottom, #0b004b, #b83aff)
    font-family: 'Roboto', sans-serif
    #dashboard
        display: flex
        width: 80%
        height: 80%
        background: white
        border-radius: 10px
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2)
        #left-side
            display: flex
            justify-content: start
            align-items: center
            flex-direction: column
            width: 30%
            height: 100%
            background: #0704A5
            border-radius: 10px 0 0 10px
            #logo
                width: 30%
                padding-top: 20px
            h1
                font-size: 2rem
                color: white
                text-align: center
                margin-bottom: 100px
            #cont-buttons
                display: flex
                flex-direction: column
                align-items: center
                width: 100%
                gap: 25px
                button
                    width: 80%
                    height: 50px
                    background: #e1e1ef
                    border-radius: 5px
                    color: #0704A5
                    font-size: 1rem
                    font-weight: 600
                    outline: none
                    cursor: pointer
                    border: none
                    &:hover
                        background: #6a42ff
                        color: white
        #right-side
            display: flex
            justify-content: center
            align-items: center
            width: 70%
            height: 100%
            background: white
            border-radius: 0 10px 10px 0
            #cont-list
                width: 50%
                height: 80%
                background: #e1e1ef
                border-radius: 10px
                margin: 40px
            #cont-squares
                display: flex
                justify-content: center
                align-items: center
                gap: 40px
                flex-direction: column
                width: 50%
                height: 80%
                #cont-up
                    width: 80%
                    height: 100%
                    background: #e1e1ef
                    border-radius: 10px
                #cont-down
                    width: 80%
                    height: 100%
                    background: #e1e1ef
                    border-radius: 10px
</style>
