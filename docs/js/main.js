$(function(){
	$("img.loadimg").lazyload({effect: "fadeIn"});
	/*--公用模版数据展现--*/
	function show_Template(uTemplate, obj) {
		var txt = $(uTemplate).html();
		$.each(obj, function (i, n) {
			var reg = new RegExp('\\{%' + i + '%\\}', 'g');
			txt = txt.replace(reg, !!n ? n : "");
		});
		return txt;
	}
	function appInit(){

		$.ajax({
			type: 'GET',
			url: 'data/w.json?'+new Date().getTime(),
			dataType: 'json',
			success: function(res) {
				if(res&&res.length){
					var html = [];
					$.each(res,function(i,n){
						var t = show_Template("#appTemplate",n);
						t&&html.push(t);
					});
					$(".work_box").html(html.join(""));
					// $(".webpage").wen_plug_details({
					// 	star_fn:function(elm){
					// 		elm.find(".details_3d_versa").css({"background-image":"none"});
					// 		elm.find(".details_3d_versa").html('<div style="padding:1em;word-break: break-all;">'+ elm.data("detail") +'</div>');
					// 	}
					// });
					$(".webpage,.ReactNative,.firmware").wen_plug_details({
						effects:"door2",
						star_fn:function(elm){
							elm.find(".details_3d_versa").css({"background-image":"none"});
							elm.find(".details_3d_versa").html('<div style="padding:1em;word-break: break-all;">'+ elm.data("detail") +'</div>');
						}
					});
				}
			},
			error: function (e) {
				$(".work_box").html("连接超时，请刷新重试！");
			}
		})
	}
	appInit();
});
