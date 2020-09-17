function getJson(){

    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'www.xxx.com/api', true);

        xhr.onreadystatechange = () => {
            if(this.readState !== 4){
                return ;
                // 请求未结束
            }else{
                if(this.status === 200){
                    // 请求成功
                    resolve(this.response);
                }else{
                    reject(new Error(this.statusText));
                }
            }
        }
        xhr.onerror = () => {
            reject( new Error(this.statusText));
        }

        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.send(null);
    });

    return promise;
}