
// example of Object.defineProperty

const data = {};
let name = "zhangsan";

Object.defineProperty(data, "name", {
    get: function(){
        console.log("getter is running ...");
        return name;
    },
    set: function(newValue){
        console.log("setter is running ...");
        name = newValue;
    }
});

// test

console.log(data.name);
data.name = "LuoJiaoShou";
console.log(data.name);