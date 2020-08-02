<template>
    <p>state A</p>
</template>

<script>
export default {
    mounted(){
        console.log("keep alive component A is mounted");
    },
    destroyed(){
        console.log("A is destroyed")
    }
}
</script>