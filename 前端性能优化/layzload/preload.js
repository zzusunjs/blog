// 通过 xmlHttpRequest 请求图片

let xmlhttprequest = new XMLHttpRequest();

xmlhttprequest.onreadystatechange = () => {
    if(xmlhttprequest.readyState === 4 && xmlhttprequest.status === 200){
        let responseText = xmlhttprequest.responseText;
        console.log("reponseText", responseText);  // 乱码
    }else{
        console.log("request failed ", xmlhttprequest.readyState, xmlhttprequest.status);
    }
}

xmlhttprequest.onprogress = (e) => {
    // 监听数据传输过程
    e = e || event;
    if(e.lengthComputable){
        console.log("Received " + e.loaded + ' er ' + e.total + ' bytes');
    }
}



xmlhttprequest.open("GET", "https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy90cm01Vk1lRnA5a0pIejVYc2YwM1lCa0tnOTNyd3I2S1VFYUdnY0xwaWJlenRsdUEyYlB1UlZ0YkJxaWNYd0pmZERrRmljR3Q4ZVBzVTdZaWJDS1NvWW91RHcvNjQw?x-oss-process=image/format,png", true);

xmlhttprequest.send();

// 使用 PreloadJS
