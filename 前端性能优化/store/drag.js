function drag(event){
    const ele = event.target;
    let [xpos, ypox] = document.getCurrentPosition();
    // 获取鼠标坐标
    ele.setAttribute("transform", `translate(${xpos}, ${ypox})`);
}

let dragHandler = ele.addEventListener('mouseClicked', drag);
ele.addEventListener('mouseUp', ()=>{
    ele.removeEventListener(dragHandler);
});