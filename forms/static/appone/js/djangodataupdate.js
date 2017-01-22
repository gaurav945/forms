$(document).ready(function () {
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

	value = $('#checker').html().toLowerCase();

	if (value == 'true')
		document.getElementById("testing").checked = true;
	else if (value == 'false')
		document.getElementById("testing").checked = false;

	$('input[type=checkbox]').change(function () {
		value = document.getElementById("testing").checked;
		console.log('the value in the database should be this now : ' + value);
		data = {
			'binary' : value 
		}

		// debugger;
		$.ajax({
			type : 'POST',
			url : '/data_updater/',
			data : data,
			headers : {
					'X-CSRFToken' : getCookie('csrftoken')	
				},
			success : function (response) {
				console.log('another successful ajax call');

			}
		});
	});

});