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
			firstname: "Το όνομά σου ξέχασες..",
			lastname: "Το επίθετο είναι υποχρεωτικό",
			password: {
				required: "Υποχρεωτικό πεδίο",
				minlength: "5 χαρακτήρες τουλάχιστον"
			},
			email: "Βάλε και το σωστό εμαιλ σου",
			password_match: "Δεν ταιριάζουν οι κωδικοί"
		},
		submitHandler: function(form) {
			form.submit();
		}
	});
});