export default {
    data(){
        return{
            city: 'KF',
        }
    },
    methods:{
        showName(){
            console.log("this.name ", this.name);
        }
    },

    mounted(){
        console.log("mixinExample mounted", this.name);
    }
}