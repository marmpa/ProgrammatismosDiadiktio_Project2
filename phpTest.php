<?php
	
	$mysqli = new mysqli('localhost','jim','l9ALjFONKySHbRMT','psd_project');

	$sql = "SELECT * FROM Countries";

	if(!$result = $mysqli->query($sql))
	{
		echo 'problem';
		exit;
	}

	if($result->num_rows ===0)
	{
		echo 'we could no find';
		exit;
	}

	$actor = $result->fetch_assoc();

	echo "Sometimes I see " . $actor['Name'] . "and i have " . $actor['GDP'];

	$result->free();
	$mysqli->close();


	//ETclLl105NUvU6N9

	//$connection = mysqli_connect('localhost','marios','ETclLl105NUvU6N9');

	//mysqli_select_db('marios');

	//$query = "SELECT * FROM country_specs";
	//$result = mysqli_query($query);

	//echo "<table>";

	//while($row = mysqli_fetch_array($result))
	//{
//		echo "<tr><td>" . $row['Country'] . $row['Money'] . "</td></tr>";
//	}

//	echo "</table>";

//	mysqli_close();

	//INSERT into countries values('marios','greece',100.2,100.3,100000,500000,221.570,0.866,34.3);

?>