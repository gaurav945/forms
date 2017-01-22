$(document).ready(function () {
	//$('.stuff').hide();
	//$('iframe').hide();

	// $($('.stuff')[0]).show();
	// $($('iframe')[0]).show();
	console.log('Working...');

	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}

	$('.main-content').on('change', '.wish', function () {
	// $('.main-content').on('change', '#wish', function () {
		// debugger;
		var playerid = $(this).parent().next().find('iframe').attr('src').split('https://www.youtube.com/embed/')[1];
		console.log(playerid);

		// $('body').prepend($($(this).parent().children()[1]).find('h1').html()); //the scene for now, is as is written below :
		// if you keep ticking it, on & off, it will keep on prepending it to the body & also, for the first 10 cartoons, you are not 
		// prepending anything to the body, so onload, they will not get prepended, if they have been ticked.

		data = {
			'playerid' : playerid 
		}

		$.ajax({
			type : 'POST',
			url : '/cartoon_wisher/',
			data : data,
			headers : {
					'X-CSRFToken' : getCookie('csrftoken')	
				},
			success : function (response) {
				console.log('yess')
			}
		})
	});

	$(window).scroll(function() {

		// console.log($(window).scrollTop() - $(document).height() + $(window).height());

		if(parseInt($(window).scrollTop() - $(document).height() + $(window).height()) == 0) {
		   // ajax call get data from server and append to the div
		   // alert();
		   $('body').css('overflow', 'hidden');

		   var url = '/get_more/';

		   var total = $('.stuff').length;

		   var data = {
		   		'total' : total
		   };
		   // debugger;

		   $.ajax({

				type : 'POST',
				url : url,
				data : data,
				headers : {
					'X-CSRFToken' : getCookie('csrftoken')	
				},
				success : function (response) {
					console.log('yayyy !!');
					// debugger;
					for (var i=0; i<10; i++) {
						var line1 = '<span class="title stuff" style="display : block"><h1> ';
						var line1r = ' </h1></span>';
						var line2 = '<iframe width="400" height="225" src="https://www.youtube.com/embed/';
						var line2r = '" frameborder="0" allowfullscreen></iframe>';
						// var name = Object.keys(response.toons)[i];
						// var num = response.toons[Object.keys(response.toons)[i]];

						// p1 = line1 + name + line1r;
						// $('body').append(p1);
						// p2 = line2 + num + line2r;
						// $('body').append(p2);

						var name;
						if (response[i].fields.text.length >= 22) {
							name = response[i].fields.text.slice(0, 22) + '...';
						}
						else {
							name = response[i].fields.text;
						}
						var num = response[i].fields.title;
						var val = response[i].fields.value;

						if (val == false) {
							$('.main-content').append(
								'<div class="cartoon col-lg-4">' + 
								'<div class="content" style="height : 100px">' + 
								'<input type="checkbox" class="wish" name="wisher" value="checker" style="float : left; margin-top : 40px">' + 
								'<div class="title-class" style="float : left"><span class="title stuff" style="margin-right : 60%"><h3> ' + 
								name + 
								'</h3></span></div></div>' + 
								'<div id="iframe" style="float : left; width : 100%">' + 
								'<iframe width="330" height="186" src="https://www.youtube.com/embed/' + 
								num + 
								'" frameborder="0" allowfullscreen></iframe>' + 
								'</div>' +
								'</div>'
							)
						}
						else {
							$('.main-content').append(
								'<div class="cartoon col-lg-4">' + 
								'<div class="content" style="height : 100px">' + 
								'<input type="checkbox" class="wish" name="wisher" value="checker" checked style="float : left; margin-top : 40px">' + 
								'<div class="title-class" style="float : left"><span class="title stuff" style="margin-right : 60%"><h3> ' + 
								name + 
								'</h3></span></div></div>' + 
								'<div id="iframe" style="float : left; width : 100%">' + 
								'<iframe width="330" height="186" src="https://www.youtube.com/embed/' + 
								num + 
								'" frameborder="0" allowfullscreen></iframe>' + 
								'</div>' +
								'</div>'
							)
							$('body').prepend(name)
						}
					}
					$('body').css('overflow', 'auto');
				}

		   });
		}
	});

});