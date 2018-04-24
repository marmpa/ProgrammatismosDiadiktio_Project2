<?php
	
	$mysqli = new mysqli('localhost','marios','ETclLl105NUvU6N9','marios');

	$sql = "SELECT * FROM country_specs";

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

?>