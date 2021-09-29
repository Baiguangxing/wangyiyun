function get (url,data) {
    return uni.request({url:"https://autumnfish.cn"+url,data:data})
}

function post (url,data) {
    return uni.request({url:"https://autumnfish.cn"+url,data:data,method:"POST"})
}

export {get,post}