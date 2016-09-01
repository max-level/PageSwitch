(function($){
	var privateFun = function(){
		//
	}
	$.fn.PageSwitch = function(options){
		var PageSwitch = (function(){
			function PageSwitch(element, options){
				this.settings = $.extend(true, $.fn.PageSwitch.default, options||{});
				this.element = element;
				this.init();
			}
			PageSwitch.prototype = {
				// 说明： 初始化插件
				// 实现： 初始化dom结构,布局，分页及绑定时间
				init: function(){},
				// 说明： 获取滑动页面数量
				pagesCount : function() {},
				// 说明： 获取滑动的宽度（横屏）或高度（竖屏滑动）
				switchLength : function() {},
				// 说明： 主要针对横屏情况进行页面布局
				_initLayout : function() {},
				// 说明： 实现分页的dom结构及css样式
				_initPaging : function() {},
				// 说明： 初始化插件时间
				_initEvent : function() {}
			}
			return PageSwitch;
		})();
		return this.each(function(){
			var me = $(this),
				instance = me.data("PageSwitch");

			if(!instance) {
				instance = new PageSwitch(me, options);
				me.data("PageSwitch", instance);
			}
			if($.type(options) === "string") return instance[options]();


		});
	}
	$.fn.PageSwitch.default = {
		selectors : {
			sections:".sections",
			section:".section",
			page:".pages",
			active:".active"
		},
		index : 0,
		easing : "ease",
		duration : 500,
		loop : false,
		pagination : true,
		keyboard : true,
		direction : "vertical",
		callback : ""
	}

	$(function(){
		$("[data-PageSwitch]").PageSwitch();
	});

})(jQuery);

