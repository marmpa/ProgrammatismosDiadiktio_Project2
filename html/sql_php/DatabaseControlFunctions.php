<?php
	//phpinfo();
	$functionData = 'gini';  
	$serverName = 'localhost';
	$userName = 'jim';
	$password = 'l9ALjFONKySHbRMT';
	$dbname = 'psd_project';
	function InsertData()
	{
		
		$functionData = 'gini';  
		$serverName = 'localhost';
		$userName = 'jim';
		$password = 'l9ALjFONKySHbRMT';
		$dbname = 'psd_project';

		$mysqli = new mysqli($serverName,$userName,$password,$dbname);

		if($mysqli->connect_error)
		{
			die("Connection failed: " . $mysqli->connect_error);
		}

		echo (str_replace("$","",$_POST['GPD']));

		$sql = "INSERT into Countries values('".$_POST['countryName']."','".$_POST['capitalName']."','"."tempFlag"."','". $_POST['coordX']."','".$_POST['coordY']."',".intval($_POST['area']).",".floatval($_POST['population']).",".floatval(str_replace("$","",$_POST['GPD'])).",".floatval($_POST['HDI']).",".floatval($_POST['gini']).")";
		//$sql = "SELECT * FROM Countries";


		if($result = $mysqli->query($sql) === TRUE)
		{
			echo "Dimiourgithike nea egrafi";
		}
		else
		{
			echo "Error " .$sql . "<br>" . $mysqli->error;
		}

		$sql = "SELECT * FROM Countries where Country_Name=".$_POST['countryName']."";

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

	function GetCountriesInDB()
	{
			$functionData = 'gini';  
			$serverName = 'localhost';
			$userName = 'jim';
			$password = 'l9ALjFONKySHbRMT';
			$dbname = 'psd_project';
		
		$mysqli = new mysqli($serverName,$userName,$password,$dbname);

		if($mysqli->connect_error)
		{
			die("Connection failed: " . $mysqli->connect_error);
		}

		$sql = "SELECT Country_Name FROM Countries";

		if($stmt = $mysqli->prepare($sql))
		{
			$stmt->bind_result($Country_Name);
			$stmt->execute();
		}

		$row = null;
		$countryArray = Array();
			while($stmt->fetch())
		{
			$countryArray[] = $Country_Name;
		}

		$json_array = json_encode($countryArray);
		

		//$result->free();
		$mysqli->close();

		echo $json_array;
	}

	

	function GetCountriesAndCorrespondingValues()
	{
		$functionData = 'gini';  
		$serverName = 'localhost';
		$userName = 'jim';
		$password = 'l9ALjFONKySHbRMT';
		$dbname = 'psd_project';
		
		$mysqli = new mysqli($serverName,$userName,$password,$dbname);

		if($mysqli->connect_error)
		{
			die("Connection failed: " . $mysqli->connect_error);
		}
		$temp='';
		$sql = "SELECT Country_Name,".$_POST['typeValue']." FROM Countries WHERE Country_Name in (";

		$va = $_POST['values'];

		//echo gettype($va);
		foreach($va as &$values)
		{
			$sql .= $temp;
			$sql .= '"'.$values.'"';
			$temp=',';
		}
		$sql.=")";

		//echo $sql . "pataaaates";
		if($stmt = $mysqli->prepare($sql))
		{
			//echo "marios";
			$stmt->bind_result($Country_Name,$typeValue);
			$stmt->execute();
		}

		$row = null;
		$countryArray = Array();
		while($stmt->fetch())
		{
			$countryArray[] = Array($Country_Name, $typeValue);
		}

		$json_array = json_encode($countryArray);
		

		//$result->free();
		$mysqli->close();

		echo $json_array;
	}

	function InsertUser()
	{
		
		$functionData = 'gini';  
		$serverName = 'localhost';
		$userName = 'jim';
		$password = 'l9ALjFONKySHbRMT';
		$dbname = 'psd_project';

		$mysqli = new mysqli($serverName,$userName,$password,$dbname);

		if($mysqli->connect_error)
		{
			die("Connection failed: " . $mysqli->connect_error);
		}

		echo (str_replace("$","",$_POST['GPD']));

		$sql = "INSERT into Users values(".$_POST['fname'].",".$_POST['lname'].",".$_POST['email'].",".$_POST['pwd'].",1)";
		//$sql = "SELECT * FROM Countries";


		if($result = $mysqli->query($sql) === TRUE)
		{
			echo "Dimiourgithike neos xristis";
		}
		else
		{
			echo "Error " .$sql . "<br>" . $mysqli->error;
		}

		//To parakato borei na diagrafei *********************************
		$sql = "SELECT * FROM Users";

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
	}

	function SignUpUser()
	{
		
		$functionData = 'gini';  
		$serverName = 'localhost';
		$userName = 'jim';
		$password = 'l9ALjFONKySHbRMT';
		$dbname = 'psd_project';

		$mysqli = new mysqli($serverName,$userName,$password,$dbname);

		if($mysqli->connect_error)
		{
			die("Connection failed: " . $mysqli->connect_error);
		}

		echo (str_replace("$","",$_POST['GPD']));

		$sql = "SELECT COUNT (Name) From Users where(Email=".$_POST['email_sign']."AND password=".$_POST['pwd_sign'].")";
		//$sql = "SELECT * FROM Countries";


		if($result = $mysqli->query($sql) === TRUE)
		{
			//if($sql>0)
			echo "Uparxei o xristis";
		}
		else
		{
			echo "Error " .$sql . "<br>" . $mysqli->error;
		}

		//To parakato borei na diagrafei *********************************
		//$sql = "SELECT * FROM Users";

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
	}

	
	
	if(isset($_POST[$functionData]) && !empty($_POST[$functionData]))
	{

		$function2Call = $_POST[$functionData];
		
		
		
		if(is_numeric($function2Call) && !isset($_POST['type']))
		{
			
			InsertData();
		}
		else if(isset($_POST['sha1']) && $_POST['sha1'] !== 'true')
		{
			$function2Call = $_POST['sha1'];
			$function2Call();
		}
		else
		{		
			GetCountriesInDB();
		}
	}
?>