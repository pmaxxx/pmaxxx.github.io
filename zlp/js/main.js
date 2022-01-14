
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;

function number_format( number, decimals, dec_point, thousands_sep ) {  // Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}


(function(jQuery){
     jQuery.fn.extend({
         pwdstr: function(el) {
            return this.each(function() {

                    jQuery(this).keyup(function(){
                        jQuery(el).html(getTime(jQuery(this).val()));
                    });

                    function getTime(str){

                        var chars = 0;
                        var rate = 2800000000;

                        if((/[a-z]/).test(str)) chars +=  26;
                        if((/[A-Z]/).test(str)) chars +=  26;
                        if((/[0-9]/).test(str)) chars +=  10;
                        if((/[^a-zA-Z0-9]/).test(str)) chars +=  32;

                        var pos = Math.pow(chars,str.length);
                        var s = pos/rate;

                        var decimalYears = s/(3600*24*365);
                        var years = Math.floor(decimalYears);

                        var decimalMonths =(decimalYears-years)*12;
                        var months = Math.floor(decimalMonths);

                        var decimalDays = (decimalMonths-months)*30;
                        var days = Math.floor(decimalDays);

                        var decimalHours = (decimalDays-days)*24;
                        var hours = Math.floor(decimalHours);

                        var decimalMinutes = (decimalHours-hours)*60;
                        var minutes = Math.floor(decimalMinutes);

                        var decimalSeconds = (decimalMinutes-minutes)*60;
                        var seconds = Math.floor(decimalSeconds);

                        var time = [];

                        if(years > 0){
                            if(years == 1)
                                time.push("1 год, ");
                            else
                                time.push(years + " лет, ");
                        }
                        if(months > 0){
                            if(months == 1)
                                time.push("1 мес, ");
                            else
                                time.push(months + " мес, ");
                        }
                        if(days > 0){
                            if(days == 1)
                                time.push("1 д, ");
                            else
                                time.push(days + " д, ");
                        }
                        if(hours > 0){
                            if(hours == 1)
                                time.push("1 ч, ");
                            else
                                time.push(hours + " ч, ");
                        }
                        if(minutes > 0){
                            if(minutes == 1)
                                time.push("1 мин, ");
                            else
                                time.push(minutes + " мин, ");
                        }
                        if(seconds > 0){
                            if(seconds == 1)
                                time.push("1 сек, ");
                            else
                                time.push(seconds + " сек, ");
                        }

                        if(time.length <= 0)
                            time = "меньше 1 сек, ";
                        else if(time.length == 1)
                            time = time[0];
                        else
                            time = time[0] + time[1];

                         return time.substring(0,time.length-2);
                    }

             });
        }
    });
})(jQuery);

function gen_password(len){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
    for (var i = 0; i < len; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
}


function passgen(){
    var pass = gen_password(12);
    jQuery('#pass').val(pass);
    jQuery('#pass').removeClass('red123');
    document.getElementById('testpassres').innerHTML = passwordStrength(pass, document.getElementById('email').value);
    document.getElementById('passgen').innerHTML = pass;
    jQuery('#pass').keyup();
}

function passwordStrength(password,username)
{
var shortPass='<span style="background:#FF5A00; color:#fff">&nbsp;<b>низкая</b>&nbsp;'
var badPass='<span style="background:#f00; color:#fff">&nbsp;<b>очень низкая</b>&nbsp;'
var goodPass='<span style="background:#C0EF00; ">&nbsp;<b>нормальная</b>&nbsp;'
var strongPass='<span style="background:#3DFF00;">&nbsp;<b>очень высокая</b>&nbsp;'
var score=0

if(password.length<4){return shortPass}
if(password.toLowerCase()==username.toLowerCase())return badPass
score+=password.length*4
score+=(checkRepetition(1,password).length-password.length)*1
score+=(checkRepetition(2,password).length-password.length)*1
score+=(checkRepetition(3,password).length-password.length)*1
score+=(checkRepetition(4,password).length-password.length)*1
if(password.match(/(.*[0-9].*[0-9].*[0-9])/))score+=5
if(password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/))score+=5
if(password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))score+=10
if(password.match(/([a-zA-Z])/)&&password.match(/([0-9])/))score+=15
if(password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&password.match(/([0-9])/))score+=15
if(password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&password.match(/([a-zA-Z])/))score+=15
if(password.match(/^\w+$/)||password.match(/^\d+$/))score-=10
if(score<0)score=0
if(score>100)score=100
if(score<34)return badPass
if(score<68)return goodPass
return strongPass}

function checkRepetition(pLen,str){
var res=""
for(var i=0;i<str.length;i++){var repeated=!0
for(var j=0;j<pLen&&(j+i+pLen)<str.length;j++)
repeated=repeated&&(str.charAt(j+i)==str.charAt(j+i+pLen))
if(j<pLen)repeated=!1
if(repeated){i+=pLen-1
repeated=!1}
else{res+=str.charAt(i)}}
return res}

if(!jQuery.browser){

	jQuery.browser = {};
	jQuery.browser.mozilla = false;
	jQuery.browser.webkit = false;
	jQuery.browser.opera = false;
	jQuery.browser.safari = false;
	jQuery.browser.chrome = false;
	jQuery.browser.msie = false;
	jQuery.browser.yandex = false;
	jQuery.browser.android = false;
	jQuery.browser.blackberry = false;
	jQuery.browser.ios = false;
	jQuery.browser.operaMobile = false;
	jQuery.browser.windowsMobile = false;
	jQuery.browser.mobile = false;

	var nAgt = navigator.userAgent;
	jQuery.browser.ua = nAgt;

	jQuery.browser.name  = navigator.appName;
	jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}

// In Opera, the true version is after "OPR" or after "Version"
	else if ((verOffset=nAgt.indexOf("OPR"))!=-1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+4);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}

// In YaBrowser, the true version is after "YaBrowser" or after "Version"
	else if ((verOffset=nAgt.indexOf("YaBrowser"))!=-1) {
		jQuery.browser.yandex = true;
		jQuery.browser.name = "YaBrowser";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+10);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}

// In MSIE < 11, the true version is after "MSIE" in userAgent
	else if ( (verOffset=nAgt.indexOf("MSIE"))!=-1) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+5);
	}

// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
	else if (nAgt.indexOf("Trident")!=-1 ) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		var start = nAgt.indexOf("rv:")+3;
		var end = start+4;
		jQuery.browser.fullVersion = nAgt.substring(start,end);
	}

// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		jQuery.browser.webkit = true;
		jQuery.browser.chrome = true;
		jQuery.browser.name = "Chrome";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
	}
// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		jQuery.browser.webkit = true;
		jQuery.browser.safari = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}
// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("AppleWebkit"))!=-1) {
		jQuery.browser.webkit = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}
// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		jQuery.browser.mozilla = true;
		jQuery.browser.name = "Firefox";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}
// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
		jQuery.browser.name = nAgt.substring(nameOffset,verOffset);
		jQuery.browser.fullVersion = nAgt.substring(verOffset+1);
		if (jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()) {
			jQuery.browser.name = navigator.appName;
		}
	}

	/*Check all mobile environments*/
	jQuery.browser.android = (/Android/i).test(nAgt);
	jQuery.browser.blackberry = (/BlackBerry/i).test(nAgt);
	jQuery.browser.ios = (/iPhone|iPad|iPod/i).test(nAgt);
	jQuery.browser.operaMobile = (/Opera Mini/i).test(nAgt);
	jQuery.browser.windowsMobile = (/IEMobile/i).test(nAgt);
	jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;


// trim the fullVersion string at semicolon/space if present
	if ((ix=jQuery.browser.fullVersion.indexOf(";"))!=-1)
		jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);
	if ((ix=jQuery.browser.fullVersion.indexOf(" "))!=-1)
		jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);

	jQuery.browser.majorVersion = parseInt(''+jQuery.browser.fullVersion,10);
	if (isNaN(jQuery.browser.majorVersion)) {
		jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
	}
	jQuery.browser.version = jQuery.browser.majorVersion;
}


	var dataLayer = [];

	function owlWrapperWidth( selector ) {
      $(selector).each(function(){
        $(this).find('.owl-carousel').outerWidth( $(this).closest( selector ).innerWidth() );
      });
    }

function noNumbers(e,obj)
{
    var keynum;
    var keychar;
    var numcheck;
    if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}
    keychar = String.fromCharCode(keynum);
    numcheck = /\d/;
    //alert(keynum);
    if (keynum==38) {a=parseFloat(obj.value);a=a+1;obj.value=a;}
    if (keynum==40) {a=parseFloat(obj.value);a=a-1;if(a<0){a=0;}obj.value=a;}
    if (keynum==96 || keynum==97 || keynum==98 || keynum==99 || keynum==32 || keynum==100 || keynum==101 || keynum==102 || keynum==103 || keynum==104 || keynum==105 || keynum==8 || keynum==46 || keynum==39 || keynum==37 || keynum==38 || keynum==40 || keynum==36 || keynum==35 || keynum==107 || keynum==187   || keynum==189 || keynum==109 || keynum==9 || keynum==13) {return true; } else {return numcheck.test(keychar);}

}
    function searchGoalName(){
    	var ret = '';
    	var keyNames = Object.keys(dataLayer);
    	for (i=keyNames.length-1;i>=0;i--) {
    		if (typeof(dataLayer[i])!=='undefined')  {
	    		var keyNames1 = Object.keys(dataLayer[i]);
	    		for (j in keyNames1) {
	    			if (keyNames1[j]=='formSent') {
	    				ret = dataLayer[i].formSent;
	    			}
	    		}
    		}
    	}
    	return ret;
    }

	$.fn.isInViewport = function() {
	  	var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	function vrst() {
		owlWrapperWidth('.owl-wrapper');
	}


	jQuery.fn.center = function () {
	    this.css("position","absolute");
	    this.css("top", eval( ( $(window).height() - this.height() ) / 2+$(window).scrollTop() )+ "px");
	    if ($(window).width()<600){
	    	this.css("top", eval($(window).scrollTop()+100)+ "px");
		}
	    if ($(window).width()>700 && $(window).width()<1000) {
	    	this.css("left", eval( ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() ) + "px");
		}
		if ($(window).width()>600 && $(window).width()<700) {
	    	this.css("left", eval( ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() ) + "px");
		}
        if ($(window).width()<600){
	    	this.css("left", "0px");
		}
		if ($(window).width()>1000) {
			this.css("left", eval( ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() ) + "px");
		}
	    return this;
  	}
  	// pickmeup.defaults.locales['ru'] = {
			// 								days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
			// 								daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			// 								daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			// 								months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			// 								monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
			// 							};

  	function bEnter(e,obj) {
		var keynum;
		var keychar;
		var numcheck;
		if(window.event){keynum = e.keyCode;}else if(e.which){keynum = e.which;}
		keychar = String.fromCharCode(keynum);
		numcheck = /\d/;
		// alert(keynum);
		if (keynum == 13) {
			// console.log(obj);
			// console.log($(obj).closest('#fmSearch'));
			// $(obj).closest('form').submit();
			$(obj).closest('#fmSearch').submit();
		}
		return false;

	}

  	function closedlg() {
	    $(".dlg").fadeOut();
        $(".dlg1").fadeOut();
	    $("#bg132").fadeOut();
        // console.log('close');
  	}

  	function call() {
	    $("#bg132").css('height',eval($(document).height()));
	    $("#bg132").fadeIn();
	    $("#dialog-call").center();
	    $("#dialog-call").fadeIn();
	}
    function oborud() {
        $("#bg132").css('height',eval($(document).height()));
        $("#bg132").fadeIn();
        $("#dialog-oborud").center();
        $("#dialog-oborud").fadeIn();
    }
    function mobCont() {
        $("#bg132").css('height',eval($(document).height()));
        $("#bg132").fadeIn();
        $("#dialog-mob-cont").center();
        $("#dialog-mob-cont").fadeIn();
    }
	function readReview(id) {
		$('.otzyv'+id).toggleClass('act');
	}
	function success() {
		closedlg() ;
	    $("#bg132").css('height',eval($(document).height()));
	    $("#bg132").fadeIn();
	    $("#dialog-success").center();
	    $("#dialog-success").fadeIn();
  	}

    function unsuccess() {
        closedlg() ;
        $("#bg132").css('height',eval($(document).height()));
        $("#bg132").fadeIn();
        if (typeof(arguments[0]) !== 'undefined') {
            $('.unsuc').html(arguments[0]);
        } else {
            $('.unsuc').html('Произошла ошибка');
        }
        $("#dialog-unsuccess").center();
        $("#dialog-unsuccess").fadeIn();
    }

  	function mobilemenu() {
	    $(".mobilemenu").fadeIn();
	    $('.burger.show1').hide();
	    $('.burger.hide1').css('display', 'inline-block');
	}

  	function mobilemenuhide() {
	    $(".mobilemenu").fadeOut();
	    $('.burger.show1').css('display', 'inline-block');
	    $('.burger.hide1').hide();
	}

	function goToByScroll(id){
	    id = id.replace("-link", "");
	      closedlg();
	    if ($(window).width()>767) {
	    	$('html,body').animate({
	        	scrollTop: $("#"+id).offset().top },
	        	'slow');
	   	} else {
	   		$('html,body').animate({
	        	scrollTop: $("#"+id).offset().top},
	        	'slow');
	   	}
	    return false;
	}

	var _validFileExtensions = ["jpg", "jpeg", "png", "gif"]; /*, "txt", "doc", "docx", "pdf", "xlsx", "xls"*/
	function ValidateSingleInput(oInput) {
		var id = oInput.getAttribute('id');
		var control = document.getElementById(id);
	  	var filelength = control.files.length;
	  	$('.filelist').html('');
	  	var blnValid = true;
		for (var i = 0; i < control.files.length; i++) {
		    var file = control.files[i];
		    var FileName = file.name;
		    var FileExt = FileName.substr(FileName.lastIndexOf('.') + 1);
		    if (_validFileExtensions.indexOf(FileExt)<0) {
		    	blnValid = false;
		    	$('.filelist').append('<span style="color:red">'+FileName+'</span><br>');
		    } else {
		    	$('.filelist').append(FileName+'<br>');
		    }
	  	}
  	 	if (!blnValid) {
        	$('.filetypewarning').html('Допустимые расширения файлов '+ _validFileExtensions.join(", ")+'. Приложите правильные файлы.')
                control.value = "";
                return false;
        } else {
        	$('.filetypewarning').html('');
        }

	}

$(function() {

 	$('.fancybox').attr('data-fancybox','group');

 	$(window).bind('scroll', function(event) {
 		vrst();
 	});

 	$(window).bind('resize', function(event) {
 		vrst();
 	});

	vrst();

 	$(document).on('click', '#bg132', function(event) {
 		event.preventDefault();
 		closedlg();
 	});

 	$(document).on('click', '.close_feedback', function(event) {
 		event.preventDefault();
 		closedlg();
 	});

    $(document).on('click', '.blank-a1', function(event) {
        event.preventDefault();
        oborud();
    });

 	$('a[href="#form_popup"]').click(function(event) {
 		call();
 		return false;
 	});

    $('.mob-cont').click(function(event) {
        /* Act on the event */
        if ($(window).width()<768) {
            mobCont();
        } else {
            call();
        }
    });


    $('.fas-tabs-button a').click(function(event) {
        var iter = $(this).attr('iter');
        $('.fas-tabs-button a').removeClass('act');
        $('.fas-tabs-button a[iter="'+iter+'"]').addClass('act');
        $('.fas-tabs-content').removeClass('act');
        $('.fas-tabs-content[iter="'+iter+'"]').addClass('act');
        return false;
    });
/*
    $('.owl-zak').owlCarousel({
    	loop: true,
    	center: true,
    	autoplay: true,
    	autoplayTimeout: 3000,
        items : 6,
        nav : false,
        navText: ["", ""],
        dots: false,
        margin:30,
        responsive : {
		   0 : {
		       	items : 1
		    },
		    768 : {
		       	items : 2
		    },
		    1024 : {
		       	items : 6
		    }
		}
    });*/

	$('input[name="phone"]').inputmask("9 (999) 999-99-99", {
		placeholder: '_ (___) ___-__-__',
		keepStatic: true,
	});

	$('input[name="phone"]').blur(function(event) {
		if (/\d \(\d\d\d\) \d\d\d-\d\d-\d\d/.test($(this).val())) {
		} else {
		   	$(this).val('');
	  	}
	});

	$('.burger.show1').click(function(event) {
		mobilemenu();
		return false;
	});
	$('.burger.hide1').click(function(event) {
		mobilemenuhide();
		return false;
	});


	$('.updown').click(function(event) {
 		if ($(this).hasClass('act')) {
			$(this).removeClass('act');
			$(this).parent().next('.subsubmenu-div').hide();
 		} else {
			$(this).addClass('act');
			$(this).parent().next('.subsubmenu-div').show();
 		}
 		return false;
 	});

 	$('.updown1').click(function(event) {
 		if ($(this).hasClass('act')) {
			$(this).removeClass('act');
			$(this).parent().next('.mobdiv-wrap').hide();
 		} else {
			$(this).addClass('act');
			$(this).parent().next('.mobdiv-wrap').show();
 		}
 		return false;
 	});

	$('input').focus(function(event) {
		$(this).removeClass('red');
		$(this).prev().removeClass('red');
		$(this).attr('placeholder',$(this).attr('data-name'));
		if ($(this).val()=='Заполните это поле') $(this).val('');
	});

/*
	$('form').submit(function(event) {
		// console.log('asd');
		var form = $(this);

		var empty = false;

		form.find('input.req').each(function(index, el) {
			if ($(this).val()=='' || $(this).val()=='Заполните это поле') {
				$(this).addClass('red');
				$(this).val('Заполните это поле');
				$(this).attr('placeholder','Заполните это поле');
				empty = true;
			}
		});

		console.log(empty);

		if (empty) {
			return false;
		} else {
			// var run = form.attr('data-metrika');
			// eval(run);
			// result = run.replace(/yaCounter19727863\.reachGoal\('/g, "");
			// result = result.replace(/'\);/g, "");
			// result = result.replace(/;/g, "");
			// dataLayer.push({'formSent':result, 'event':'formSent'});

			formData= new FormData();
			form.find('input').each(function(index, el) {
				formData.append($(this).attr('name'), $(this).val());
			});
			form.find('textarea').each(function(index, el) {
				formData.append($(this).attr('name'), $(this).val());
			});
			form.find('input[type="file"]').each(function(index, el) {
				formData.append($(this).attr('name'), $(this).prop('files')[0]);
			});

			$.ajax({
	            url: '/index/form_sent',
	            method: 'post',
	            contentType: false,
	            processData: false,
	            cache:false,
	            data: formData,
	        })
	        .done(function(data) {
	                // console.log(data);
					if (data.status == 'error'){
						alert(data.text);
						return;
					}
					if (data=='1') {
						form.find('input,textarea').val('');
						success();
						return;
					}
					if (data.status == 'done'){
						// alert(data.text);
						// metroDialog.open('#success');
	                    // window.location.href='/admin/Content/list/?parent_id='+$('#parent_id').val();
						return;
					}
	        })
	        .fail(function( jqXHR, textStatus ) {
	            err= 'Ошибка!' + "\n" + jqXHR.status + "\n" + jqXHR.statusText;
	            alert( err );
	        });

			// console.log(dataLayer);
			return false;
		}
	});
	*/

	$('a[href="#toggler"]').click(function(event) {
		if ($(this).hasClass('act')) {
			$(this).removeClass('act');
		} else {
			$(this).addClass('act');
		}
		$(this).parent().next('.toggler').toggle();
		return false;
	});

	/*$('.more-news-home').click(function(event) {
		var vsego = $('.press-item').length;
		var cur_id = $(this).attr('cur_id');
		$.ajax({
	            url: '/index/more_news/?vsego='+vsego+'&tohome=1&receiveClass=more-news&cur_id='+cur_id,
	            method: 'post',
	            contentType: false,
	            processData: false,
	            cache:false,
	        }).done(function(data) {
	        	var html_ = '';
	        	for (a in data.news) {
	        		html_ = html_ + '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 press-item"><article>';
	        		if ( typeof(data.news[a].img)!='undefined' && data.news[a].img!='') {
	        			html_ = html_ + '<a href="'+data.news[a].url+'"><img src="/images/upload_images/'+data.news[a].img+'"></a>';
	        		}
	        		html_ = html_ + '<div class="datetime">'+data.news[a].dt+'</div><a href="'+data.news[a].url+'" class="a-name">'+data.news[a].name+'</a></article></div>';
	        	}
	        	$('.more-news').append(html_);
	        	var vsego1 = $('.press-item').length;
	        	if (vsego1>=parseInt(data.total)) {
	        		$('.more-news-home').hide();
	        	}
	        }).fail(function( jqXHR, textStatus ) {
	            err= 'Ошибка!' + "\n" + jqXHR.status + "\n" + jqXHR.statusText;
	            alert( err );
	        });
		return false;
	});*/


 });