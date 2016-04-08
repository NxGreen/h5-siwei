// JavaScript Document
var imgArray = [
	"img/bg1.jpg",
	"img/bg2.jpg",
	"img/bg3.jpg",
	"img/bg4.jpg",
	"img/bg5.jpg",
	"img/jt.png",
	"img/logo.png",
	"img/page1_1.png",
	"img/page2.png",
	"img/page3.png",
	"img/page4_1.png",
	"img/page4_2.png",
	"img/page4_3.png",
	"img/page4_4.png",
	"img/page4_5.png",
	"img/page4_6.png",
	"img/page5_1.png",
	"img/page5_2.png",
	"img/page5_3.png",
	"img/page5_4.png",
	"img/page5_5.png",
	"img/page5_6.png",
	"img/page5_7.png",
	"img/page5_8.png",
	"img/share.png",
	"img/stars.png"
];
// 资源加载
var Loader = function() {
		this.currProgress = 0; // 当前加载进度
		this.isCompleted = false; // 判断是否加载完毕
		this.total = 100; // 最大值100

		var loaded = 1;

		//var content = document.getElementById('content');
		var number = document.getElementById('number');
		//var w = document.getElementsByClassName('progress')[0].offsetWidth / 20;
		this.Loading = function(imgArray, success) {
			var self = this;
			for (var i = 1; i < imgArray.length; i++) {
				var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
				if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif') {
					var img = new Image();
					img.onload = function() {
						loaded++;
						self.currProgress = loaded / imgArray.length * 100;
						//content.style.width = self.currProgress / 100 * w+"rem";
						number.innerHTML = (self.currProgress).toFixed()+"%";
						// console.log(number.innerHTML);
						if (loaded == imgArray.length) {
							success(); // 回调函数
						}
					};
					img.onerror = function() {
						loaded++;
						if (loaded == imgArray.length) {
							success(); // 回调函数
						}
					};
					img.src = ctx  + imgArray[i];
				} else {
					this.loadMusic(imgArray[i]);
				}
			}
		};
		this.loadMusic = function(path) {
			$.ajax({
				type: 'get',
				url: path,
				data: {},
				async: false,
				// false 同步  true  异步
				success: function(data) {
					loaded++;
					if (loaded == imgArray.length) {
						success(); // 回调函数
					}
					//console.log("success");
				},
				error: function(xhr, type) {
					loaded++;
					if (loaded == imgArray.length) {
						success(); // 回调函数
					}
					//console.log('error');
				}
			})
		};
		this.success = function() {
			console.log("加载完毕");
			//$('.page').css({width:GC.w,height:GC.h});
			//$('.page1 .content').css({width:GC.w,height:GC.h});
			init.wpInit();
			$('.loading').addClass('hidden');
		};
		this.loadLoading = function(imgArray, obj) {
			var img = new Image();
			img.onload = function() {
				obj.Loading(imgArray, obj.success);
			};
			img.onerror = function() {
				obj.Loading(imgArray, obj.success);
			};
			img.src = ctx  + imgArray[0];
		};
	};
//window.onload = function(){
var loader = new Loader();
loader.loadLoading(imgArray, loader);
//};