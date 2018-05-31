<?php
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

		$sql = "INSERT into Countries values('".$_POST['countryName']."','".$_POST['capitalName']."','".$_POST['flagUrl']."','". $_POST['coordX']."','".$_POST['coordY']."',".intval(str_replace(",","",$_POST['area'])).",".floatval(str_replace(",","",$_POST['population'])).",".floatval(str_replace(["$",","],"",$_POST['GPD'])).",".floatval($_POST['HDI']).",".floatval($_POST['gini']).")";

		if($result = $mysqli->query($sql) === TRUE)
		{
			echo "Dimiourgithike nea egrafi";
		}
		else
		{
			echo "Error " .$sql . "<br>" . $mysqli->error;
		}

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

		foreach($va as &$values)
		{
			$sql .= $temp;
			$sql .= '"'.$values.'"';
			$temp=',';
		}
		$sql.=")";

		if($stmt = $mysqli->prepare($sql))
		{
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


		$sql = "INSERT into Users values(\"".$_POST['email']."\",\"".$_POST['fname']."\",\"".$_POST['lname']."\",\"".$_POST['pwd']."\",1)";

		if($result = $mysqli->query($sql) === TRUE)
		{
			echo "Dimiourgithike neos xristis";
		}
		else
		{
			echo "Error " .$sql . "<br>" . $mysqli->error;
		}

		$sql = "SELECT * FROM Users";

		$result = $mysqli->query($sql);

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

		$sql = "SELECT * From Users where email=\"".$_POST['email']."\"";


		if($result = $mysqli->query($sql) === TRUE)
		{
			echo "Uparxei o xristis";
		}
		else
		{
			echo "Error ba " .$sql . "<br>" . $mysqli->error;
		}

		$mysqli->close();
	}

	function K_Means()
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
		$sql = '';

		$row = null;
		$countryArray = Array();

		if(is_numeric($_POST['countryList'])==567)
		{
			$sql = "SELECT Country_Name,".$_POST['typeValue1'].",".$_POST['typeValue2']." FROM Countries";

			if($stmt = $mysqli->prepare($sql))
			{
				
				$stmt->bind_result($Country_Name,$column1,$column2);
				$stmt->execute();
			}

			
			while($stmt->fetch())
			{
				$countryArray[] = Array($Country_Name, $column1,$column2);
			}
		}
		elseif(count($_POST['countryList'])>0) 
		{
			$temp='';
		
			$sql = "SELECT Country_Name,".$_POST['typeValue1'].",".$_POST['typeValue2'].",Area FROM Countries WHERE Country_Name in (";

			$va = $_POST['countryList'];

			
			foreach($va as &$values)
			{
				$sql .= $temp;
				$sql .= '"'.$values.'"';
				$temp=',';
			}
			$sql.=")";

			if($stmt = $mysqli->prepare($sql))
			{
				
				$stmt->bind_result($Country_Name,$column1,$column2,$Area);
				$stmt->execute();
			}

			
			while($stmt->fetch())
			{
				$countryArray[] = Array($Country_Name, $column1,$column2,$Area);
			}
		}
		
		

		
		

		
		if(is_string($_POST['center1']) && is_string($_POST['center2']))
		{
			if(strcmp($_POST['center1'],"errorRSA") == 0)
			{
				$Center1 = rand(0,sizeof($countryArray)-1);
				while(($Center2 = rand(0,sizeof($countryArray)-1)) == $Center1){}
			}
			else
			{
				$Center1=$_POST['center1'];
				$Center2=$_POST['center2'];
			}
			
		}
		else
		{
			
			$Center1 = rand(0,sizeof($countryArray)-1);
			while(($Center2 = rand(0,sizeof($countryArray)-1)) == $Center1){}
		}

		$NewCenterLat1=$countryArray[$Center1][1];
		$NewCenterLon1=$countryArray[$Center1][2];

		$NewCenterLat2=$countryArray[$Center2][1];
		$NewCenterLon2=$countryArray[$Center2][2];

	
		$FinalCountryArray = Array();

		session_start();
		$toSessionArray = Array();

		for ($i=0; $i < $_POST['forLoop']; $i++) 
		{ 
			$team1 = Array();
			$team2 = Array();
				
			$CenterSumLat1 = 0;
			$CenterSumLon1 = 0;
			

			$CenterSumLat2 = 0;
			$CenterSumLon2 = 0;

			foreach ($countryArray as $key => $value) 
			{
				
				$distanceFromCenter1 = sqrt(pow($value[1] - $NewCenterLat1,2) + pow($value[2] - $NewCenterLon1,2));
				$distanceFromCenter2 = sqrt(pow($value[1] - $NewCenterLat2,2) + pow($value[2] - $NewCenterLon2,2));


				if($distanceFromCenter1<=$distanceFromCenter2)
				{
					$team1[] = $value;

					$CenterSumLat1 += $value[1];
					$CenterSumLon1 += $value[2];
				}
				else
				{
					$team2[] = $value;

					$CenterSumLat2 += $value[1];
					$CenterSumLon2 += $value[2];
				}
			}

			$FinalCountryArray[] = Array($team1,$team2);

			if($i>0)
			{
				if($FinalCountryArray[$i-1][0]==$FinalCountryArray[$i][0])
				{
					break;
				}
			}

			if(sizeof($team1)!=0)
			{
				$NewCenterLat1 = $CenterSumLat1/sizeof($team1);
				$NewCenterLon1 = $CenterSumLon1/sizeof($team1);


			}
			

			if(sizeof($team2)!=0)
			{
				$NewCenterLat2 = $CenterSumLat2/sizeof($team2);
				$NewCenterLon2 = $CenterSumLon2/sizeof($team2);
			}

			$toSessionArray[] = Array($NewCenterLat1,$NewCenterLon1,$NewCenterLat2,$NewCenterLon2);
		}
		$_SESSION['centersArray'] = $toSessionArray;
		



		$json_array = json_encode($FinalCountryArray);
		

		
		$mysqli->close();

		echo $json_array;
		
		
		
		
	}

	function GetFromSession()
	{

		session_start();

		if(isset($_SESSION['centersArray']))
		{
			$json_array = json_encode($_SESSION['centersArray']);
			echo $json_array;
		}

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


