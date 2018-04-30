<?php
	$functionData = 'tempFunction'; 
	if(issett($_POST[$functionData]) && !empty($_POST['tempFunction']))
	{
		$function2Call = $_POST[$functionData]
		switch ($function2Call) {
			case 'functions1':
				# code...
				break;
			
			default:
				# code...
				break;
		}
	}
?>