<?php
	$functionData = 'coordX'; 
	if(issett($_POST[$functionData]) && !empty($_POST['coordX']))
	{
		$function2Call = 'a'; //$_POST[$functionData]
		switch ($function2Call) {
			case 'a':
				echo '<script language="javascript">';
				echo 'alert("message $_POST[$functionData] sent")';
				echo '</script>';
				break;
			
			default:
				# code...
				break;
		}
	}
?>