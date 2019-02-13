/**
 *
 *	Water Rating - Department of Agriculture and Water Resources
 * 	Global JavaScript
 *
 */
 
 
 
 
/*
===================================================================================================
	Globally reuseable Methods and functions definition
===================================================================================================
*/
var parentWindow = (window.location === window.parent.location) ? true : false;

//Updated generic JS date object to handle days and months, - supporting old browsers
Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];			
Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};
Date.prototype.dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];			
Date.prototype.getDayName = function() {
    return this.dayNames[this.getDay()];
};


/*
 *	remove double spaces and replace spaces with hyphens
 */
function safeString(rawText) {
    return jQuery.trim(rawText).replace(/[^a-z0-9\s]/gi, '').replace(/\s\s+|[_\s]/g, '-').toLowerCase() || '';
}

//Edit mode variable def
var inEditMode = (jQuery('input[name="MSOLayout_InDesignMode"]').val() == "1") ? true : false;

//Element On Screen method definition
jQuery.fn.isOnScreen = function(){
    var win = jQuery(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

//Browser check mobile/Tablet
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};



/*
===================================================================================================
	Water Rating Custom JavaScript Function definitions
===================================================================================================
*/

var WR = {

	
	//Set document user agent for css minipulations
	AddBodyAttributesAndClasses: function(){
		document.documentElement.setAttribute('data-useragent', navigator.userAgent);
		
		//Add ribbon status class to body
		if(document.querySelector('#suiteBar')) {
			document.body.classList.add("ribbon-visible");
		} else {
			jQuery('#s4-workspace').attr('style','');
			jQuery('#s4-workspace').addClass('public-view-mode');
		}

	},
	
	
	//Set variable if page is in edit mode
	SetPageEditOrPreviewMode: function(){
		
		if(inEditMode) {
			jQuery('.body-wrapper').addClass('edit-mode');
		} else {
			jQuery('.body-wrapper').addClass('view-mode');
		}
	},
	
	
	//Preload Images	
	PreLoadImages: function() {
		var images = new Array()
		function preload() {
			for (i = 0; i < preload.arguments.length; i++) {
				images[i] = new Image()
				images[i].src = preload.arguments[i]
			}
		}
		preload(
			"/Style%20Library/css/images/body-bg.jpg"
		)
		
		//Load background banner gracefully
		var pb = document.querySelector('body');
		if(typeof pb !== 'undefined') {
			//pb.classList.add('bg-active');
			pb.className += " bg-active";
		}
	},

	//Mobile menu toggle	
	MobileNavExpandCollapse: function() {	
	    //Main Mobile navigation active toggle
	    jQuery(".nav-mobile-link").on('click tap', function (e) {
	        e.preventDefault();
	        jQuery('.main-navigation').toggleClass('active');
	        jQuery(this).toggleClass('active');
	    });
	

	    //Secondary navigation clickable
	    jQuery(".secondary-nav_toggle").on('click tap', function (e) {
	        e.preventDefault();
	        jQuery('.secondary-nav__links').toggleClass('active');
	        jQuery(this).toggleClass('active');
	    });
	
	    //add index to top level navigation for desktop css
	    jQuery('.main-navigation > ul > li').each(function(index){
	        jQuery(this).addClass('nav-item-'+ (index +1));
	    });	
	},
	
	//Home page Carousel, Loads data over SharePoint Search API
	HomeCarousel: function(){
		var HS = {};
		
		HS.ListName = "HomeCarousel";
		HS.SourceId = "8413cd39-2156-4e00-b54d-11efd9abdb89";
		
	    HS.SiteUrl = window.location.protocol +"//"+ window.location.hostname;
	    
		HS.QueryText = 'ParentLink:'+ HS.ListName +' contentclass:STS_ListItem_GenericList HomeCarouselActive:true';
		HS.RowLimit = 10;
		HS.SelectProperties = 'Title,PublishingImage,HomeCarouselActive,PublishingPageContentOWSHTML';
		HS.SortBy = 'ArticleDate:descending';
		
		HS.SearchQuerySting = "querytext='"+ HS.QueryText +"'&sourceid='"+ HS.SourceId +"'&rowlimit="+ HS.RowLimit +"&selectproperties='"+ HS.SelectProperties +"'&sortlist='"+ HS.SortBy +"'&QueryTemplatePropertiesUrl='spfile://webroot/queryparametertemplate.xml'";
		
		
	    //Load slider data from the search API
	    jQuery.ajax({
	        method: "GET",
	        url: "/_api/search/query?"+ HS.SearchQuerySting,
	        headers: {
	            'Accept': 'application/json; odata=verbose'
	        },
	    }).done(function(r) {
	        if(r.d.query.PrimaryQueryResult === null) {
	            return false;
	        }
	        flatenObjectValues(r.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results);
	    });
	    
	    //Put all object values at top level and pass it on to build markup
	    function flatenObjectValues(results){
		    var sliderData = [];
		    jQuery.each(results,function(i,r){
		    	var tempObj = {};
			    jQuery.each(r.Cells.results,function(i,ra){
	    	    	tempObj[ra.Key] = ra.Value;
			    });
			    sliderData.push(tempObj);
		    });
		    buildSliderMarkup(sliderData);
	    }
	
	    //Build slider markup and render it on the page
	    function buildSliderMarkup(d) {
	        var hsItemsHtml = '';
	        var hsControls = '<div class="hs__controls"><button type="button" class="hs__play-pause playing"><span class="visually-hidden"><span class="action">Pause</span> slider</span></button></div>';
	        jQuery.each(d, function(i, row) {
	        	var slideType = 'text';
		        if((row.PublishingImage !== null) && (row.PublishingPageContentOWSHTML !== null)) {
		        	slideType = 'image-text';
		        } else if(row.PublishingImage !== null){
					slideType = 'image';
		        } else if(row.PublishingPageContentOWSHTML.indexOf('<iframe') !== -1){
		        	slideType = 'youtube';
		        }
	            hsItemsHtml +=
	                "<div class='hs-item "+ slideType +" item-"+ row.DocId +"'>" +
	                "<h2>" + row.Title + "</h2>";
	            if (row.PublishingImage !== null) {
	                hsItemsHtml += "<div class='hs-img'>" + row.PublishingImage + "</div>";
	            }
	            hsItemsHtml +=
	                "<div class='hs-content'>" + ((row.PublishingPageContentOWSHTML !== null) ? row.PublishingPageContentOWSHTML : '') + "</div>" +
	                "</div>";
	        });
	        jQuery('.tfc__home-slider').append("<div class='hs-list'>" + hsItemsHtml + "</div>" + hsControls);
	
	        //Initialise the slider
	        initSlider();
	    }
	
	    function initSlider() {
	        //Initialise slick slider on newly create slider list
	        var playTitle = 'Play';
	        var pauseTitle = 'Pause';
	        var $playButton = jQuery('.hs__play-pause');
	        var $hs = jQuery('.hs-list');
	        var $hsControls = jQuery('.hs__controls');
	
	        //Pause slider
	        function pause($element) {
	            $playButton.removeClass('playing').attr('title', playTitle).find('.action').text(playTitle);
	            $hs.slick('slickPause');
	        }
	        
	        //Play slider
	        function play($element) {
	            $playButton.addClass('playing').attr('title', pauseTitle).find('.action').text(pauseTitle);
	            $hs.slick('slickPlay');
	        }
	        
	        // Play button toggle
	        $playButton.on('click', function() {
	            if (!$playButton.hasClass('playing')) {
	                play($hs);
	            } else {
	                pause($hs);
	            }
	        });
	
			//Actions after slider is initiated
	        $hs.on('init', function(){
	        	$hsControls.append(jQuery('.slick-dots'));
	        	
	        	//Hide controls when there is one slide
	        	if(jQuery('.slick-dots li').length < 2){
					jQuery('.hs__controls').hide();
				}
	        });
	        
	        $hs.slick({
	            dots: true,
	            infinite: true,
	            fade: true,
	            speed: 300,
			    autoplaySpeed: 6000,
	            slidesToShow: 1,
	            adaptiveHeight: true,
	            arrows: false,
	            autoplay: true,
	            cssEase: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
	            init: function() {
			        //Move controlls
			        $hsControls.append(jQuery(this.$dots[0]));
			   }
	        });
	    }
	},
	
	//Add image alt as image caption when "ms-rteStyle-image-right" class is added to image
	AddImageCaption: function(){
		var $captionImages = jQuery("img.ms-rteStyle-image-right[alt!='']");
		jQuery.each($captionImages, function(){
			var $img = jQuery(this);
			//If image is loaded in cache add width on container	
			var imgWidth = ($img.width() !== 0) ? ('width:'+ Math.ceil($img.width()) +'px') : '';
			$img.before("<div class='ms-rteStyle-image-right' style='"+ imgWidth +"'><span>"+ $img.attr('alt') +"</span></div>");
			$img.prev().prepend($img);
	
			//Add width on container after load if it doesn't exists in cache
			$img.on('load',function() {		
				jQuery(this).closest('div.ms-rteStyle-image-right').width(Math.ceil(jQuery(this).width()));
		    });   
		});
	},

	MoveHtmlOnScreenResChange: function(){
	    var mediaQueries = {};
		if(window.matchMedia) {
			mediaQueries.wide = window.matchMedia('(min-width: 1025px)');
		
			moveHtmlOnPage(mediaQueries.wide.matches);	
		
			mediaQueries.wide.addListener(function(mql) {
				// Empty console statement needed to ensure FF always runs this
				window.console && console.log();        
				moveHtmlOnPage(mql.matches);
				
			});
		}
		
		//Move html on page based on screen size changes
		function moveHtmlOnPage(screenSizeMatched) {
			if(!screenSizeMatched) {
				jQuery('#main-navigation').addClass('mobile');
			} else {				
				jQuery('#main-navigation').removeClass('mobile');

			}		
		}
	},
	
	//MegaMenu builder
	MegaMenu: function(){
		var $megaMenuTrigerLinks = jQuery('#main-navigation li.dynamic-children');
		jQuery('#main-navigation li,#main-navigation li a').removeClass('dynamic-children');
		var megaMenuWraper = "<div class='megamenu'>{0}</div>";
		//Loop through all top level menu links
		$megaMenuTrigerLinks.each(function() {
		    $sourceLink = jQuery(this);
		    $sourceHref = $sourceLink.find('> a.menu-item');
		    var megamenu__srcArr = $sourceHref.attr('title') ? $sourceHref.attr('title').split("|") : "";	    
	
		    //if Source string has | then use the part before | as title
		    if(megamenu__srcArr.length > 1) {
		    	var megamenu__title = megamenu__srcArr[0];
		    	var megamenu__desc =  megamenu__srcArr[1];
		    } else {
		    	var megamenu__title = $sourceLink.find('> a.menu-item .menu-item-text').text() || "";
				var megamenu__desc = $sourceHref.attr('title') || "";
		    }
		    
		    var megamenu__link = $sourceHref.attr('href') || "#";
		    $sourceHref.attr('title', '');
		    $sourceHref.html($sourceHref.find('.menu-item-text').text());	
		    //locate the sub links
		    $sourceSubLinks = $sourceLink.find('ul.dynamic');
		    //Add description of sub links underneath
		    $sourceSubLinks.find('> li').each(function() {
			    var $srcSub = jQuery(this).find('a.menu-item');
		   	    var submenu__srcArr = $srcSub.attr('title') ? $srcSub.attr('title').split("|") : "";	    
	
			    //if Source string has | then use the part before | as title
			    if(submenu__srcArr.length > 1) {
			    	$srcSub.html(submenu__srcArr[0]);
			    	var submenu__desc =  submenu__srcArr[1];
			    } else {
					var submenu__desc = $srcSub.attr('title') || "";
			    }
			    
		        jQuery(this).find('a.menu-item').attr({
		            'class': '',
		            'title': ''
		        });
		        jQuery(this).append("<p class='submenu__desc'>" + submenu__desc + "</p>");
		
		    });
		    //Insert sub links as megamenu in the main link wrapper
		    var currMegaMenuContent = "<a href='" + megamenu__link + "' class='megamenu__title'>" + megamenu__title + "</a><p class='megamenu__desc'>" + megamenu__desc + "</p><ul>" + $sourceSubLinks.html() + "</ul>";
		    $sourceLink.append(String.format(megaMenuWraper, currMegaMenuContent));
		    $sourceSubLinks.remove();
		});
		
		//Initialise megamenu on Top row
		jQuery("#main-navigation .ms-core-listMenu-horizontalBox").accessibleMegaMenu({	
			openClass: "open",
			openDelay: 200		
		});

		//Mobile navigation click		
		jQuery('.main-navigation.mobile a.menu-item').on('click tap', function (e) {
	        e.preventDefault();
	       	window.location = jQuery(this).attr('href');
	    });
	},
	
	//Secondary Naviation mobile controls
	SecondaryNavigationMobile: function(){
		//expand collapse toggle
	    jQuery(".secondary-nav_toggle").on('click tap', function (e) {
	        e.preventDefault();
	        jQuery('#DeltaPlaceHolderLeftNavBar').slideToggle().toggleClass('active');
	        jQuery(".secondary-nav_toggle").toggleClass('active');
	    });
	    
	    //Secondary navigation back to parent link
		if(jQuery('.secondary-nav__section-title').length && jQuery('.breadcrumb a:eq(-2)').length) {
			jQuery('.secondary-nav__section-title').text(jQuery('.breadcrumb a:eq(-2)').text()).attr('href',jQuery('.breadcrumb a:eq(-2)').attr('href'));
		}
		
		//Fix SP bug: Adding selected class to dynamicly expanded current link
		jQuery('.secondary-nav-links a.dynamic').each(function(){
			if(jQuery(this).attr('href') === window.location.pathname) {
				jQuery(this).addClass('selected');
				return false;
			}
		});
	
		//Remove title attribute	
		jQuery('.secondary-nav a[title]').each(function(){
			jQuery(this).attr('title','');
		});	
	},
	
	
	//Home page Statistics animation 
	HomeStatsAnimations: function(){
	
		var peopleAnimateHtml = 
			'<ul class="stats-people">'+
				'<li class="female"></li><li class="male"></li>'+
				'<li class="female"></li><li class="male"></li>'+
				'<li class="female"></li><li class="male"></li>'+
				'<li class="female"></li><li class="male"></li>'+
				'<li class="female"></li><li class="male"></li>'+
			'</ul>';
		
		var productsAnimateHtml = 
			'<ul class="stats-products">'+
				'<li class="shower"></li>'+
				'<li class="toilet"></li>'+
				'<li class="tap"></li>'+
				'<li class="dishwasher"></li>'+
				'<li class="washingmachine"></li>'+
				'<li class="drop"></li>'+		
				'<li class="label"></li>'+
			'</ul>';
		//Remove animated class if it is stored withmarkup
		jQuery('.sec-stats').removeClass('animated');
		
		//Initialise animation when container is in view
		if(jQuery('.sec-stats').length !== 0) {
			//Place people icons in the people container
			jQuery('.stat.people').append(peopleAnimateHtml);
			
			//Place products icons in the products container
			jQuery('.stat.products').append(productsAnimateHtml);
		
			//For autoring view
			jQuery('#s4-workspace').scroll(function() {
				initStatsAnimation();
			});
			
			//For public view
			jQuery(window).scroll(function() {
				initStatsAnimation();
			});
			
			//If container is in view when page is loaded trigger animation
			if(jQuery('.sec-stats').isOnScreen()) {
				initStatsAnimation();
			}
		}
		
		function initStatsAnimation(){
		    if (jQuery('.sec-stats').isOnScreen() && !jQuery('.sec-stats').hasClass('animated')) {
		        jQuery('.sec-stats').addClass('animated');
		        var $peopleCount = jQuery('.people-count');
		        var $productCount = jQuery('.product-count');
		        var startDelay = 800;
		
		        var peopleCountEnd = $peopleCount.text();
		        var productCountEnd = $productCount.text().replace(/,/g, "");

		        //Set the visible numbers to zero
		        $peopleCount.text('0');
		        $productCount.text('0');
		        //Start after a little delay
		        setTimeout(function() {

		            // People counter
		            $peopleCount.attr('data-counter', 0).animate({
		                'data-counter': peopleCountEnd
		            }, {
		                duration: 1000,
		                easing: 'swing',
		                step: function(now) {
		                    var currNum = Math.ceil(now);
		                    $peopleCount.text(currNum);
		                    jQuery('.stats-people li:nth-child(' + currNum + ')').addClass('alive');
		                    jQuery('.stats-products li:nth-child(' + currNum + ')').addClass('alive');
		                }
		            });
		
		            //Product counter
		            $productCount.attr('data-counter', 0).animate({
		                'data-counter': productCountEnd
		            }, {
		                duration: 1000,
		                easing: 'swing',
		                step: function(now) {
		                    var currNum = Math.ceil(now);
		                    $productCount.text(currNum.toLocaleString());
		                }
		            });
		
		        }, startDelay);
		    }
		}//initStatsAnimation

	},
	
	
	//Convert last reviewed date into human readable format
	FormatLastReviewedDate: function(){
		if(!jQuery('.last-reviewed__value').find('.ms-formfieldvaluecontainer').length && jQuery('.last-reviewed__value').text().trim().length ) {
	
			var articleDateString = jQuery('.last-reviewed__value').text().trim().split('/');
			var $articleDate = new Date(articleDateString[1]+'/'+articleDateString[0]+'/'+articleDateString[2]);
			var newDate = $articleDate.getDate() + ' ' + $articleDate.getMonthName() + ' ' + $articleDate.getFullYear();
			if(newDate.indexOf('undefined') == -1) {
				jQuery('.last-reviewed__value').text(newDate);
			}
		} else if(jQuery('.last-reviewed__value').text().trim().length == 0) {
			jQuery('.last-reviewed').hide();
		}
	},
	
	
	//Scroll to top feature
	ScrollToTop: function(){
		var scrollTopHideOnPages = ["/", "/Pages/home.aspx", "/Pages/default.aspx", "/search", "/Pages/search.aspx"];
	    var scrollTop = "<div class='scrolltop'></div>";
	    var scrollTopInner = "<a href='javascript:void(0)' class='scroll icon'><span class='visually-hidden'>Back to top</span></a>";
	    if ((jQuery('.scrolltop').length === 0) && (scrollTopHideOnPages.indexOf(window.location.pathname) === -1)) {
	        jQuery('body').append(scrollTop);
	    }
	
	    //Define selector for public and authoring mode
	    if (document.querySelector('#suiteBar')) {
	        var bodyScrollListenElement = '#s4-workspace';
	        var bodyElementToScroll = '#s4-workspace';
	    } else {
	        var bodyScrollListenElement = window;
	        var bodyElementToScroll = 'html, body';    
	    }
	
	    jQuery(bodyScrollListenElement).scroll(function() {
	        if (jQuery(this).scrollTop() > 800) {
	            jQuery('.scrolltop:hidden').stop(true, true).fadeIn();
	            if(jQuery('.scrolltop .scroll ').length === 0){
	            	jQuery('.scrolltop').append(scrollTopInner); 
	            }
	        } else {
	            jQuery('.scrolltop').stop(true, true).fadeOut();
	        }
	    });
	
	    jQuery(function() {
	        jQuery("body").on('click tap','a.scroll',function() {
	            jQuery(bodyElementToScroll).animate({
	                scrollTop: 0
	            }, "1000");
	            return false
	        })
	    });

	},
	
	//WELS database login form
	WelsDataBaseLogin: function() {
		var welsLoginForm = 
			'<label class="visually-hidden">Username</label>'+
			'<input id="wels-username" type="text" placeholder="Username"/>'+
			'<label class="visually-hidden">Password</label>'+
			'<input id="wels-password" type="Password" placeholder="Password"/>'+
			'<div class="clearfix">'+
				'<a href="http://wels.agriculture.gov.au/wels-public/action/forgot-password-load" class="wels-password-reset-link">Forgot your username or password?</a>'+
			'</div>'+
			'<div class="wels-login-form__links ">'+
				'<input class="wels-login-button" type="button" value="Login" name="wels-login"/>'+
				'<a href="http://wels.agriculture.gov.au/wels-public/action/signup-load" class="wels-signup-link">Sign up</a>'+
			'</div>';
			
		//Add the form to relevent section of the page	
		jQuery('.wels-login-form').html(welsLoginForm);
		
		
		//Wells Product registration database login form
		function post(path, params, method) {
		    method = method || "post";
		    var form = document.createElement("form");
		    form.setAttribute("method", method);
		    form.setAttribute("action", path);
		    form.setAttribute("target", "_blank");
		    for (var key in params) {
		        if (params.hasOwnProperty(key)) {
		            var hiddenField = document.createElement("input");
		            hiddenField.setAttribute("type", "hidden");
		            hiddenField.setAttribute("name", key);
		            hiddenField.setAttribute("value", params[key]);
		
		            form.appendChild(hiddenField);
		        }
		    }
		    document.body.appendChild(form);
		    form.submit();
		}
		
		jQuery('body').on('click','.wels-login-button',function() {
		    var username = jQuery('#wels-username').val();
		    var password = jQuery('#wels-password').val();
		    var wellsLoginForm = 'http://wels.agriculture.gov.au/wels-public/j_spring_security_check';
		    jQuery('.wells-login-error').remove();
		    window.location = "http://wels.agriculture.gov.au/wels-public/action/login";
		    /*
		    if (username.trim().length < 1 || password.trim().length < 1) {
		        jQuery('.wels-login-button').before('<p class="wells-login-error error">Username and password are required.</p>');
		    } else {
		    	if(window.mobileAndTabletcheck()) {
		    		window.location = "http://wels.agriculture.gov.au/wels-public/action/login";
		    	} else {
			        post(wellsLoginForm, {
			            'j_username': username,
			            'j_password': password
			        });
		        }
		    }
		    */
		});

	},
	
	
	//WELS database Product search form
	WelsDataBaseProductSearch: function(){	
		var psForm = 
			'<div class="ps__type-wp"> '+
				'<select name="product-search">'+
					'<option></option>'+
					'<option value="CLOTWAMA">Clothes washing machines</option>'+
					'<option value="DISHWASH">Dishwashers</option>'+
					'<option value="FLOWCONT">Flow controllers</option>'+
					'<option value="SHOWERS">Showers</option>'+
					'<option value="TAPEQUIP">Taps</option>'+
					'<option value="LAVEQUIP">Toilets</option>'+
					'<option value="URIEQUIP">Urinals</option>'+
				'</select>'+
			'</div>'+
			'<input type="button" value="Search" name="product-search__btn"/>';
		
		jQuery('.ps__form').html(psForm);
		
		//Submit product search
		var productSearchUrl = "http://wels.agriculture.gov.au/wels-public/action/search-product-load?src=menu&code=";
		var $prdSrhFrm = jQuery('.ps__form');
		$prdSrhFrm.find('input[type="button"]').click(function() {
		    var wellsProduct = $prdSrhFrm.find('select').val();
		    if (wellsProduct.indexOf('Select') === -1 && wellsProduct.trim().length > 0) {
		        window.open(productSearchUrl + wellsProduct, '_blank');      
		    } else {
		        $prdSrhFrm.addClass('error');
		    }
		});
		$prdSrhFrm.find('select').change(function() {
		    if (jQuery(this).val().indexOf('Select') === -1) {
		        $prdSrhFrm.removeClass('error');
		    }
		});
	},
	
	
	//Manage right columns in edit and preview mode
	ManageRightColumn: function(){
		if(inEditMode) {
			jQuery('.content').removeClass('full-width');
			jQuery('.right-col').show();		
		} else {
			var relatedContOne = jQuery('.related-content.one div[id$="ControlWrapper_RichHtmlField"]').text().trim().length;
			var relatedContTwo = jQuery('.related-content.two div[id$="ControlWrapper_RichHtmlField"]').text().trim().length;
		
			//Display right column
			if(relatedContOne > 2 || relatedContTwo > 2) {
				jQuery('.content').removeClass('full-width');
				jQuery('.right-col').show();
			}
			
			if(relatedContOne < 3) {
				jQuery('.related-content.one').remove();
			}
			if(relatedContTwo < 3) {
				jQuery('.related-content.two').remove();
			}
		}
	},
	
	//Focus on page elements based on hash value
	FocusPageElement: function(){
		if (document.location.hash) {
			var currentAnchor = document.location.hash;
			//escape selector
			currentAnchor = currentAnchor.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
			jQuery(currentAnchor).attr('tabindex', -1).on('blur focusout', function () {
				jQuery(this).removeAttr('tabindex');
			}).focus();
		}
		
		jQuery(window).on('hashchange', function() {
			var hash = "#"+window.location.hash.replace(/^#/,'');
			if (hash!="#" && hash.indexOf('=') == -1) {
				jQuery(hash).attr('tabindex', -1).on('blur focusout', function () {
					jQuery(this).removeAttr('tabindex');
				}).focus();
			}
		});
	},
	
	//Generic Collapsible
	Collapsible: function(){
		//convert name attribute into hash value for link
		jQuery(".page-content a[name^='#']").each(function(){
			jQuery(this).attr("href",(jQuery(this).attr("href")+jQuery(this).attr("name")))
		});
		var lastActionedLink;
		jQuery('.clp-heading').each(function(index) {
			//insert link inside heading
			jQuery(this).html("<a>"+ jQuery(this).text() +"</a>");
		    collapsibleAction(jQuery(this).find("a"), jQuery(this).next(), index);
		});
		
		//Expand hash for associated collapsible content on page load
	    if(jQuery('.clp-heading').length && window.location.hash.length > 0 && window.location.hash.match(/([$.?])/g) === null) {
	        var pageLoadLinkHash = window.location.hash.substring(1);
	        
	        var $activeFaqLink = jQuery("[data-target*='"+ pageLoadLinkHash +"']");
	        if($activeFaqLink.length) {
				$activeFaqLink.click();
				jQuery('html, body, #s4-bodyContainer, #s4-workspace').animate({scrollTop: ($activeFaqLink.offset().top - 80)}, 500);
			}
		}
		
		jQuery('body').on('click', '.expand-all', function(e) {
		    e.preventDefault();
		    expandCollapse(jQuery(this), '.clp-heading > a', '.clp-content');	
		});
		
		//Project results collapsible
		function collapsibleAction($actionLink, $targetContent, index) {
		    //Adding aria roles
		    $actionLink.attr({
		        'href': 'javascript:void(0);',
		        'data-target': safeString($actionLink.text()),
		        'aria-expanded': 'false',
		        'aria-controls': 'clp-content-' + index,
		        'id': 'clp-link-' + index
		    });
		    $targetContent.attr({
		        'aria-expanded': 'false',
		        'aria-hidden': 'true',
		        'id': 'clp-content-' + index,
		        'aria-labelledby': 'clp-link-' + index,
		        'style': 'display:none;'
		    });
		
		    $actionLink.on('click', function(e) {
		        e.preventDefault();			
				$actionLink.toggleClass('active');
				window.location.hash = jQuery(this).attr('data-target');
		        if ($targetContent.hasClass('expanded')) {
		            $targetContent.slideUp(300).removeClass('expanded');
		            $actionLink.attr('aria-expanded', 'false');
		            $targetContent.attr({
		                'aria-expanded': 'false',
		                'aria-hidden': 'true'
		            });
		        } else {
		            $targetContent.slideDown(300).addClass('expanded');
		            $actionLink.attr('aria-expanded', 'true');		
		            $targetContent.attr({
		                'aria-expanded': 'true',
		                'aria-hidden': 'false'
		            });
		        }
	            lastActionedLink = jQuery(this).attr('id');		        
		    });
		}//collapsibleAction
		
		//Expand collapse
		function expandCollapse($triggerLink, resultsTitle, resultsContent) {
		    var linkText = ($triggerLink.text().indexOf('Expand') !== -1) ? 'Collapse all' : 'Expand all';
		    var $collGroup = $triggerLink.closest('.collapsible');
		    if (($triggerLink.text().indexOf('Expand') !== -1)) {
		        $collGroup.find(resultsTitle).addClass('active');
		        $collGroup.find(resultsContent).show().addClass('expanded');
		    } else {
		        $collGroup.find(resultsTitle).removeClass('active');
		        $collGroup.find(resultsContent).hide().removeClass('expanded');
		    }
		    $triggerLink.text(linkText).toggleClass('collapse');
		}
		
		//only trigger this event for faq page content anchore tag links
	    if(jQuery('.collapsible').length){
	        jQuery(window).on('hashchange',function(event){
			    var pageLoadLinkHash = window.location.hash.substring(1);
		        var $activeFaqLink = jQuery("[data-target='"+ pageLoadLinkHash +"']"); 
		        //Do not trigger hash change if heading link is triggered
		        if(!($activeFaqLink.attr('id') == lastActionedLink)) {
					if($activeFaqLink.length > 0 && !$activeFaqLink.hasClass('active')) {
						$activeFaqLink.click();
						jQuery('html, body').animate({scrollTop: $activeFaqLink.offset().top}, 500);
					} else if($activeFaqLink.parent().hasClass('expanded')) {
						jQuery('html, body').animate({scrollTop: $activeFaqLink.offset().top}, 500);
					}
				}
			});
	    }
	},
	
	//WasThisPageHelpFul widget
	WasThisPageHelpFul: function(){
	    var FB = {};    
	    FB.FeedbackPageName = "Feedback.aspx";
	    FB.FormPageUrl = "/Pages/" + FB.FeedbackPageName + "?IsDlg=1&feedbackWidget=1";
	    FB.InsertBefore = jQuery('footer');
	    FB.PhoneUsUrl = "/about/contact";
	    FB.InquiryUsUrl = "/about/contact";
	    FB.HideOnPages = ["/", "/Pages/home.aspx", "/Pages/default.aspx", "/search", "/Pages/search.aspx"];
	
	    FB.Path = window.location.pathname || "/";
	
	    //Markup
	    FB.IframeHtml = "<iframe id='feedbackWidget' allowtransparency='true' width='100%' scrolling='no' frameborder='0' src='" + FB.FormPageUrl + "'></iframe>";
		FB.FormHtml = 	'<div class="page-feedback">'+
							'<div id="DivYesNo" class="page-feedback__yes-no">'+
								'<p class="page-helpful">Was this page helpful?</p>'+
								'<input type="button" id="BtnYes" value="Yes"/> '+
								'<input type="button" id="BtnNo" value="No" />'+ 
							'</div>'+
							'<div id="DivWhy" class="page-feedback__why" style="display:none;"> '+
								'<div class="page-feedback__why-fld">'+
									'<label class="page-feedback__why-label">Thanks for your feedback.<br/>Please tell us more in your own words (do not provide personal details)</label>'+
									'<textarea id="txtWhy" class="page-feedback__why-text" placeholder=""></textarea>'+									
									'<div class="page-feedback__note">'+
										'We aren\'t able to respond to your individual comments or questions. <br/>'+
										'To contact us directly <a target="_parent" href="'+ FB.PhoneUsUrl +'">phone us</a> or submit an <a target="_parent" href="'+ FB.InquiryUsUrl +'">online inquiry</a>'+
									'</div>'+
								'</div>'+
								'<div id="fbCpt" class="page-feedback__captcha"></div>'+
								'<div id="fbSmt" class="page-feedback__submit">'+
									'<input type="button" class="page-feedback__submit-btn" id="BtnSbt" value="Submit" />'+
									'<input type="button" class="page-feedback__skip-btn" id="BtnSkp" value="Skip" />'+									
								'</div>'+
							'</div> '+
						'</div>';
	    //Messages
	    FB.Msgs = {};
	    FB.Msgs.Body = '<div id="DivMessage" class="page-feedback__msg {0}">{1}</div>';
	    FB.Msgs.Success = 'Thanks! Your feedback has been submitted.';
	    FB.Msgs.RobotError = 'Please verify that you are not a robot.';
	
	    //Add feedback Widget to every page except for the feedback page itself
	    if ((window.location.pathname.indexOf(FB.FeedbackPageName) === -1) && (FB.HideOnPages.indexOf(FB.Path) === -1)) {
	        FB.InsertBefore.before(FB.IframeHtml);
	    }
	
	    FB.Msgs.ServerResponse = jQuery('.page-content #messages').html() || '';
	    FB.Iframe = jQuery('#feedbackWidget', parent.document);
	
		//Add custom form control when iframe is loaded
	    if ((FB.Path.indexOf(FB.FeedbackPageName) !== -1) && (window.location != window.parent.location)) {
	        //insert page feedback webpart markup
	        jQuery('.page-content').append("<div class='page-feedback-wrapper'>" + FB.FormHtml + "</div>");
	        FB.PageTitle = jQuery.trim(jQuery('.content h1:first', parent.document.body).text()) || _spPageContextInfo.pageItemId;
	        FB.PageUrl = (window.location != window.parent.location) ? window.parent.location.toString() : '';
	        FB.PageUrl = FB.PageUrl ? FB.PageUrl.split('#')[0] : FB.PageUrl;
	        jQuery('input[name$="_PageTitle"]').val(FB.PageTitle);
	        jQuery('input[name$="_PageUrl"]').val(FB.PageUrl);
	        jQuery('#fbCpt').prepend(jQuery('.g-recaptcha'));
	    }
	
	    //Form submitted with errors
	    if (FB.Msgs.ServerResponse.indexOf('not a robot') != -1) {
	        FB.Iframe.animate({
	            height: "600"
	        }, 300);
	        jQuery('#DivYesNo').hide();
	        jQuery('#DivWhy').show();
	        jQuery('#txtWhy').val(jQuery('textarea[name$="_PageFeedback').val());
	        jQuery('.page-feedback__captcha').append(String.format(FB.Msgs.Body, 'error', FB.Msgs.RobotError));
	        window.top.location.hash = "feedbackWidget";
	    } else if (FB.Msgs.ServerResponse.indexOf('submitted successfully') != -1) {
	        FB.Iframe.animate({
	            height: "50"
	        }, 300);
	        jQuery('#DivYesNo').hide();
	        jQuery('.page-feedback').prepend(String.format(FB.Msgs.Body, 'success', FB.Msgs.Success));
	    }
	
	    //Feedback yes clicked
	    jQuery('body').on('click', '#DivYesNo input[type="button"]', function() {
	        FB.Iframe.animate({
	            height: "600"
	        }, 300);
	        window.top.location.hash = "";
	        var YesNoFeedback = jQuery(this).val() || 'Null';
	
	        jQuery('select[name$="_PageHelpful"]').val(YesNoFeedback);
	        jQuery('#DivYesNo').hide();
	        jQuery('#DivWhy').show();
	        window.top.location.hash = "feedbackWidget";
	
	        //Send event to Google analytics server		
	        if (typeof window.parent.gtag !== "undefined") {
	            window.parent.gtag('event', YesNoFeedback, {
				  'event_category': 'WasThisPageHelpful',
				  'event_label': FB.PageUrl
				});
	        }
	    });
	
	    //Submit the SP form
	    jQuery('body').on('click', '#BtnSbt', function() {
	        jQuery('textarea[name$="_PageFeedback"]').val(jQuery('#txtWhy').val());
	        jQuery('.submitButton').click();
	        FB.Iframe.animate({
	            height: "50"
	        }, 300);
	        window.top.location.hash = "feedbackWidget";
	    });
	
	    //Skip the SP form submission
	    jQuery('body').on('click', '#BtnSkp', function() {
	        jQuery('#DivYesNo').hide();
	        FB.Iframe.animate({
	            height: "50"
	        }, 300);
	        window.top.location.hash = "feedbackWidget";
	        jQuery('.page-feedback').prepend(String.format(FB.Msgs.Body, 'success', FB.Msgs.Success));
	    });	
	},
	
	//Global search form submit
	GlobalSearchForm: function() {
		//Post search form generic function
		function postSearchForm($searchForm) {
		    var searchUrl = $searchForm.data('action');
		    var searchQuery = $searchForm.find('input[type="text"]').val();
		    var searchQueryName = 'k';
		    //redirect user to the search page
		    window.location = searchUrl + '?' + searchQueryName + '=' + searchQuery;  
		}
		
		//Call search post on submit click 
		jQuery('.global-search-form button').on('click tap', function() {
		    postSearchForm(jQuery(this).parent());
		});
		
		//Call search post on hitting entered
		jQuery('.global-search-form input[type="text"]').on('keydown', function(event) {
		    if (event.keyCode == 13 && jQuery(this).val().length) {
		        postSearchForm(jQuery(this).parent());
		        return false;
		    }
		});
	}

};
 
 
 
 
 
 
/*
===================================================================================================
	Execute immediately
===================================================================================================
*/

if(parentWindow) {
	WR.AddBodyAttributesAndClasses();
	WR.SetPageEditOrPreviewMode();
	WR.PreLoadImages();
	WR.WelsDataBaseLogin();
	WR.WelsDataBaseProductSearch();
	WR.ManageRightColumn();
	
	if(parentWindow) {	
		WR.ScrollToTop();
	}
}//ParentWindow

WR.WasThisPageHelpFul();







/*
===================================================================================================
	Execute on jQuery ready
===================================================================================================
*/
(function(jQuery){
	if(parentWindow) {
		WR.MobileNavExpandCollapse();
		WR.AddImageCaption();
		WR.MoveHtmlOnScreenResChange();
		WR.MegaMenu();
		WR.SecondaryNavigationMobile();
		WR.HomeStatsAnimations();
		WR.FormatLastReviewedDate();
		WR.GlobalSearchForm();
		WR.FocusPageElement();
	
		if(!inEditMode) {
			WR.Collapsible();	
		}
		
		//Load carousel on home page only
		if(jQuery('.tfc__home-slider').length && !inEditMode) {
			WR.HomeCarousel();
		}
	}//ParentWindow
}(jQuery));



