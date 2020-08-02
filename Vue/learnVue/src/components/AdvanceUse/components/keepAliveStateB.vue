<template>
    <p>state B</p>
</template>

<script>
export default {
    mounted(){
        console.log("keep alive component B is mounted");
    },
    destroyed(){
        console.log("B is destroyed")
    }
}
</script>