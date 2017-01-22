$(function(){

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

	var url = '/ajax_call/';

	$('.submit-button').on('click', function (e) {

		e.preventDefault();

		var no1 = $('.no1').val();
		var no2 = $('.no2').val();

		var data = {
			'no1' : no1,
			'no2' : no2
		};
		

		// setTimeout(function () {console.log('Processing your submission....')}, 2000);
		setTimeout(function () {
			$.ajax({
				type : 'POST',
				url : url, 
				data : data,
				headers : {
					'X-CSRFToken' : getCookie('csrftoken')	
				},
				success : function (data) {
					// alert('Congrats, something happened :D :D');
					// debugger;
					var blabla = data.no3;

					// $('.output-class').val(blabla)

					$('.final-sol').html(blabla)
					$('.final-sol').counterUp({
						delay: 10, // the delay time in ms
						time: 1000 // the speed time in ms
					});
					// $('.caret').html('');
				}
			});
		}, 500);
	});


})