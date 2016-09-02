(function($){
	var privateFun = function(){
		//
	}
	$.fn.PageSwitch = function(options){
		var PageSwitch = (function(){
			function PageSwitch(element, options){
				this.settings = $.extend(true, $.fn.PageSwitch.defaults, options||{});
				this.element = element;
				this.init();
			}
			PageSwitch.prototype = {
				// 说明： 初始化插件
				// 实现： 初始化dom结构,布局，分页及绑定时间
				init: function(){
					var me = this;

					me.selectors = me.settings.selectors;
					me.sections = me.selectors.sections;
					me.section = me.selectors.section;

					me.direction = me.settings.direction == 'vertical' ? true : false;
					me.pagesCount = me.pagesCount();
					me.index = (me.settings.index >= 0 && me.settings.index < pagesCount) ? me.settings.index : 0;

					if(!me.direction) {
						me._initLayout();
					}

					if(me.settings.pagination){
						me._initPaging();
					}

					me._initEvent();
				},
				// 说明： 获取滑动页面数量
				pagesCount : function() {
					return this.section.length;
				},
				// 说明： 获取滑动的宽度（横屏）或高度（竖屏滑动）
				switchLength : function() {
					return this.direction? this.element.height() : this.element.width();
				},
				// 说明： 向前滑动即上一页面
				prev : function(){
					var me = this;
					if(me.index > 0){
						me.index --;
					}else if(me.settings.loop){
						me.index = me.pagesCount - 1;
					}
					me._scrollPage();
				},
				// 说明： 向后滑动即下一页面
				next : function(){
					var me = this;
					if(me.index < me.pageCount){
						me.index ++;
					}else if(me.settings.loop){
						me.index = 0;
					}
					me._scrollPage();
				},
				// 说明： 主要针对横屏情况进行页面布局
				_initLayout : function() {
					var me = this;
					var width = (me.pagesCount * 100) + "%",
						cellWidth = (100/me.pageCount).toFixed(2) + "%",
						me.sections.width(width);
						me.section.width(cellWidth).css("float", "left");
				},
				// 说明： 实现分页的dom结构及css样式
				_initPaging : function() {
					var me = this,
					pagesClass = me.selectors.page.substring(1),
					activeClass = me.selectors.active.substring(1);
					var pageHtml = "<ul class=" + pagesClass + ">";
					for(var i=0; i<me.pagesCount;i++){
						pageHtml += "<li></li>";
					}
					pageHtml += "</ul>";
					me.element.append();
					var pages = me.element.find(me.selectors.page);
					me.pageItem = pages.find("li");
					me.pageItem.eq(me.index).addClass(me.activeClass);
					
					if(me.direction){
						pages.addClass("vertical");
					}else{
						pages.addClass("horizontal");
					}
				},
				// 说明： 初始化插件时间
				_initEvent : function() {
					var me = this;
					me.element.on("click", me.selectors.pages + "li", function(){
						me.index = $(this).index();
						me._scrollPage();
					});

					me.element.on("mousewhell DOMMouseScroll", function(e){
						var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

						if(delta > 0 && (me.index && !me.settings.loop || me.settings.loop)){
							me.prev();
						}else if(delta<0 && (me.index<(me.pagesCount-1) && !me.settings.loop || me.settings.loop)){
							me.next();
						}
					});

					if(me.settings.keyboard){
						$(window).on("keydown", function(e){
							var keyCode = e.keyCode;
							if(keyCode == 37 || keyCode == 38) {
								me.prev();
							}else if(keyCode == 39 || keyCode == 40) {
								me.next();
							}
						});
					}
				}
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
	$.fn.PageSwitch.defaults = {
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
		direction : "vertical", //horizontal
		callback : ""
	}

	$(function(){
		$("[data-PageSwitch]").PageSwitch();
	});

})(jQuery);

