let viewHeight = document.documentElement.clientHeight; // 可视区域的高度

function lazyload(){
    let eles = document.querySelectorAll('img[data-original][lazyload]');
    Array.prototype.forEach.call(eles, (item, idx => {
        let rect;
        if(item.dataset.original === ''){
            return
        }
        rect = item.getBoundingClientRect();

        if(rect.bottom >= 0 && rect.top < viewHeight){
            (function(){
                let img = new Image();
                img.src = item.dataset.original;
                img.onload = () => {
                    item.src = img.src;
                }
                item.removeAttribute('data-original');
                item.removeAttribute('lazyload');
            })();
        }
    }))
}

lazyload();  // 首屏加载需要执行

document.addEventListener('scroll', lazyload);

// css 中需要预先设置 image 图像的宽高才可以计算
// .image-item{
//     width: 40px,
//     height: 100px
// }

// 另外可以尝试 使用 zepto 实现，简单方便