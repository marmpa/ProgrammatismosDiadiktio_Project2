<?php
$functionData = 'coordX'; 
	function InsertData()
	{
		$functionData = 'coordX'; 
		$serverName = 'localhost';
	$userName = 'jim';
	$password = 'l9ALjFONKySHbRMT';
	$dbname = 'psd_project';


	$mysqli = new mysqli($serverName,$userName,$password,$dbname);

	if($mysqli->connect_error)
	{
		die("Connection failed: " . $mysqli->connect_error);
	}


	$sql = "INSERT into Countries values('".$_POST['country_Name']."','Athens','tempFlag','". $_POST[$functionData]."','75 50 E',131957,10768477,20570,0.866,43.3)";
	//$sql = "SELECT * FROM Countries";


	if($result = $mysqli->query($sql) === TRUE)
	{
		echo "Dimiourgithike nea egrafi";
	}
	else
	{
		echo "Error " .$sql . "<br>" . $mysqli->error;
	}

	$sql = "SELECT * FROM Countries";

	$result = $mysqli->query($sql);//Calling the query and saving the result

	if($result->num_rows > 0)
	{
		while($row = $result->fetch_assoc())
		{
			print_r(array_values($row));
		}
	}

	$result->free();
	$mysqli->close();

	

	//if(!$result = $mysqli->query($sql))
	//{
//		echo 'problem';
//		exit;
///	}

	//if($result->num_rows ===0)
//	{
//		echo 'we could no find';
//		exit;
//	}

//	$actor = $result->fetch_assoc();

	//echo "Sometimes I see " . $actor['Name'] . "and i have " . $actor['GDP'];

	//$result->free();
//	$mysqli->close();


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
	}

	
	echo '<script language="javascript">';
				echo 'alert("message gia sent")';
				echo '</script>';
	if(isset($_POST[$functionData]) && !empty($_POST['coordX']))
	{
		$function2Call = 'a'; //$_POST[$functionData]
		switch ($function2Call) {
			case 'a':
				InsertData();
				break;
			
			default:
				# code...
				break;
		}
	}
?>