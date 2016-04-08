function wxShare(shareData){
    $.ajax({
        url:"/",
        data:{r:Math.random(),wxurl:shareData.link},
        type:"POST",
        dataType:"json",
        //jsonp:"jsoncallback",
        success:function(d){
            wx.config({
                debug: false, // 
                appId: 'wx2a898550725b6eba', // 必填，公众号的唯一标识
                timestamp:d.timestamp, // 必填，生成签名的时间戳
                nonceStr: d.nonceStr, // 必填，生成签名的随机串
                signature: d.signature,// 必填，签名，
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']// 
            });
            // config end
            wx.ready(function(){
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: shareData.title, // 分享标题
                    link: shareData.link, // 分享链接
                    imgUrl: shareData.imgUrl, // 分享图标
                    success: function () {},
                    cancel: function () {}
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: shareData.title, // 分享标题
                    desc: shareData.desc, // 分享图标
                    link: shareData.link, // 分享链接
                    imgUrl:shareData.imgUrl, // 分享图标
                    success: function () {},
                    cancel: function () { }
                });

            });//wx ready  end
            wx.error(function (res) {
                //alert(res.errMsg);
            });
        },//success end
        error: function (xhr, type) {
            console.log('xhr:' + xhr + "type:" + type);
            alert("网络错误请重试");
        }
    })//ajax end
}