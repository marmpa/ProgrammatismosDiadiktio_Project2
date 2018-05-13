var request;


$("#foo").submit(function(event)
	{
		event.preventDefault();

		if(request)
		{
			request.abort();
		}

		var $form = $(this);

		var $inputs = $form.find("input, select, button, textarea");

		var serializedData = $form.serialize();

		$inputs.prop("disabled",true);

		request = $.ajax(
			{
				url: "/form.php",
				type: "post",
				data : serializedData;
			}

		);


		request.done(function(response,textStatus,jqXHR)
			{
				console.log("Nai leitourgei");
			}
		);

		request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        	console.error(
            	"The following error occurred: "+
            	textStatus, errorThrown
        	);
    	});



		request.always(function ()
			{
				$inputs.prop("disabled",false);
			}
		);
	});
