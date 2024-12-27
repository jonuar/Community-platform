<template>
    <div>
        <h1>Bienvenido, {{ user }} !</h1>
    </div>
</template> 

<script>
export default{
    name: 'WelcomeUser',
    props: ['user'],
};
</script>