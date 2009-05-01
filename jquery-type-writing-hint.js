/*
 * jQuery Type Writing Hint 1.0.0
 *
 * Copyright (c) 2009 MORI Naohiko
 * Dual licensed under the MIT and GPL licenses.
 *
 */
(function($){
	$.fn.twhint = function(option){
		var opt = $.extend({
			hint: ['keyword'],
			speed: 100,
			delay: 1000,
			hintClass: null,
			hintCss: null
		}, (option||{}));
		if(typeof opt.hint=='string'){
			opt.hint = [opt.hint];
		}
		return this.each(function(){
			var trg = $(this);
			var trge = trg.get(0);
			var hinx, tinx, hint;
			var hlbl = trg.clone();
			var pos = trg.offset();
			if(opt.hintCss){
				hlbl.css(opt.hintCss);
			}
			hlbl.css({
				left: pos.left,
				top: pos.top,
				position: 'absolute'
			}).appendTo(document.body).focus(function(){
				trg.focus();
			});
			if(opt.hintClass){hlbl.addClass(opt.hintClass);}
			function st(){
				hinx = tinx = 0;
				hint = opt.hint[hinx];
				hlbl.show();
				tw();
			}
			trg.focus(function(){
				hlbl.hide();
				var ti = $.data(trge, 'twhint');
				if(ti){
					clearTimeout(ti);
					$.data(trge, 'twhint', false);
				}else{
					$(this).select();
				}
			});
			trg.blur(function(){
				if(trg.val()==''){st();}
			});
			function tw(){
				hlbl.val(hint.substring(0, tinx++)+'|');
				if(tinx > hint.length){
					$.data(trge, 'twhint', setTimeout(function(){
						if(++hinx >= opt.hint.length){hinx=0;}
						hint = opt.hint[hinx];
						tinx = 0;
						tw();
					}, opt.delay));
				}else{
					$.data(trge, 'twhint', setTimeout(tw, opt.speed));
				}
			}
			if(!trg.val()){st();}
		});
	}
})(jQuery);
