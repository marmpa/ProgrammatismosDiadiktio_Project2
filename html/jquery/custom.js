$(function() {
	$("form[name='registration']").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			password_match: {
				equalTo: "#pws"
			}
		},
		messages: {
			firstname: "Το όνομά είναι υποχρεωτικό",
			lastname: "Το επίθετο είναι υποχρεωτικό",
			password: {
				required: "Υποχρεωτικό πεδίο",
				minlength: "5 χαρακτήρες τουλάχιστον"
			},
			email: "Βάλε ένα έγκυρο εμαιλ σου",
			password_match: "Οι κωδικοί δεν είναι ίδιοι"
		},
		submitHandler: function(form) {
			form.submit();
		}
	});
});