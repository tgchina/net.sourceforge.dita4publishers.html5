Array.prototype.clean=function(b){var a=0;for(var a=0;a<this.length;a++){if(this.hasOwnProperty(a)){if(this[a]==b){this.splice(a,1);a=a-1}}}return this};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(c){if(this==null){throw new TypeError()}var d=Object(this);var a=d.length>>>0;if(a===0){return -1}var e=0;if(arguments.length>1){e=Number(arguments[1]);if(e!=e){e=0}else{if(e!=0&&e!=Infinity&&e!=-Infinity){e=(e>0||-1)*Math.floor(Math.abs(e))}}}if(e>=a){return -1}var b=e>=0?e:Math.max(a-Math.abs(e),0);for(;b<a;b++){if(b in d&&d[b]===c){return b}}return -1}}(function(a){a.fn.fixedHeader=function(c){var b={topOffset:40};if(c){a.extend(b,c)}return this.each(function(){var i=a(this);var j=a(window),d=a("thead.thead",i),h=0;var g=d.length&&d.offset().top-b.topOffset;function e(){if(!i.is(":visible")){return}if(a("thead.header-copy").size()){a("thead.header-copy").width(a("thead").width());var l,m=j.scrollTop()}var k=d.length&&d.offset().top-b.topOffset;if(!h&&g!=k){g=k}if(m>=g&&!h){h=1}else{if(m<=g&&h){h=0}}h?a("thead.header-copy",i).removeClass("hide"):a("thead.header-copy",i).addClass("hide")}j.on("scroll",e);d.on("click",function(){if(!h){setTimeout(function(){j.scrollTop(j.scrollTop()-47)},10)}});d.clone().removeClass("header").addClass("header-copy header-fixed").appendTo(i);var f=d.width();i.find("thead.header-copy").width(f);i.find("thead.thead > tr:first > th").each(function(l,m){var k=a(m).width();i.find("thead.header-copy> tr > th:eq("+l+")").width(k)});d.css({margin:"0 auto",width:i.width(),"background-color":b.bgColor});e()})}})(jQuery);$(document).ready(function(){$("table").fixedHeader()});