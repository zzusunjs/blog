<template>
    <p>state C</p>
</template>

<script>
export default {
    mounted(){
        console.log("keep alive component C is mounted");
    },
    destroyed(){
        console.log("C is destroyed")
    }
}
</script>