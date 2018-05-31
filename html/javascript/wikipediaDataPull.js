var site = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0';
			
var marios = 'gia';
var flagImg;

var countryDictionary={};

var coordX;
var coordY;

var request;

var country_Name;



function getCountryInfo(searchTerm)
{
	document.getElementById("wikiInfo").innerHTML = "";
	

	countryDictionary.countryName = searchTerm;

	console.log(searchTerm + "hello");
	var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + searchTerm+"&redirects&prop=text&callback=?";
	var flagUrl = "https://en.wikipedia.org/w/api.php?action=parse&page="+searchTerm+"&prop=text&format=json&callback=?";
	

	$.getJSON(flagUrl,function(flag)
	{
		var FlagPattern = /<img\salt=\"(Flag\sof\s.*)\"\ssrc=\"(.*)\"\sw/i;
		var tempArrayFlagInfo = flag.parse.text["*"].match(FlagPattern);
		
		
		flagImg = "<img src=\"https:"+tempArrayFlagInfo[2]+"\" alt=\""+tempArrayFlagInfo[1]+"\">";
		countryDictionary.flagUrl = "https:"+tempArrayFlagInfo[2];

		console.log(flagImg);
		$("#wikiInfo").append(flagImg+"</br>");
	});

	var site = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles="+searchTerm+"&rvsection=0";

$.getJSON(site,function(json)
	{
		
		
		wikiHTML = json.query.pages;
		var wikiString = JSON.stringify(wikiHTML);

		var patternGini = /Gini\s=\s((\d*\.)?\d+)/i;
		var patternHDI = /HDI\s=\s((\d*\.)?\d+)/i;
		var patternGDPpC = /GDP_nominal_per_capita\s=\s(\$(\d*,)?\d+)/i;
		var patternPopulationE =/population_estimate\s=\s({{increase}}\s)?([\d,]*)(\s{{increase}})?/i;
		var patternPopulationS =/population_census\s=\s({{increase}}\s)?([\d,]*)(\s{{increase}})?/i;
		var patternPopulationOld = /population_estimate\s=(\s{{.*}})?\s([\d,]*)(<ref.+?\sweb)?\s*\|/i;
		var patternArea = /area_km2\s=\s(((\d*),?)*)/i;
		var patternCapital = /capital\s=\s\[+(\w+\s*)+\]+/i;
		var patternCoordinates = /coordinates\s=\s\{+Coord((\|[\d*\.\w]*\|*){6})/i;


		var splittedArray = wikiString.match(patternCoordinates)[1].split('|');

		var patternTest = /Gini\s=\s((\d*\.)?\d+)/i;

		countryDictionary.coordX = (parseInt(splittedArray[1])+(parseInt(splittedArray[2])/60)).toString();
		countryDictionary.coordY = (parseInt(splittedArray[4])+(parseInt(splittedArray[4])/60)).toString();
		countryDictionary.capitalName = wikiString.match(patternCapital)[1];
		countryDictionary.area = wikiString.match(patternArea)[1];
		try
		{
			countryDictionary.population = wikiString.match(patternPopulationE)[2];
		}
		catch(err)
		{
			countryDictionary.population = wikiString.match(patternPopulationS)[2];
		}
		
		countryDictionary.GPD = wikiString.match(patternGDPpC)[1];
		countryDictionary.HDI = wikiString.match(patternHDI)[1];
		countryDictionary.gini = wikiString.match(patternGini)[1];

		console.log(countryDictionary.population);
		console.log(JSON.stringify(wikiHTML).match(patternGini)[1]+" Geia sou maria");

		$("#wikiInfo").append("Όνομα προτεύουσας : "+countryDictionary.capitalName+"</br>");
		$("#wikiInfo").append("Γεογραφικό στίγμα Χ : "+countryDictionary.coordX+"</br>");
		$("#wikiInfo").append("Γεογραφικό στίγμα Y : "+countryDictionary.coordY+"</br>");
		$("#wikiInfo").append("Έκταση : "+countryDictionary.area+" km/2"+"</br>");
		try
		{
			$("#wikiInfo").append("Πλυθυσμός : "+countryDictionary.population+"</br>");
		}
		catch(err){}
		
		$("#wikiInfo").append("GPD per capita : "+countryDictionary.GPD+"</br>");
		$("#wikiInfo").append("HDI : "+countryDictionary.HDI+"</br>");
		$("#wikiInfo").append("Gini : "+countryDictionary.gini+"</br>");
	});

}

function InsertToDB()
{
	event.preventDefault();

		if(request)
		{
			request.abort();
		}


		if(!("gini" in countryDictionary))
		{
			return;
		}

		request = $.ajax(
			{
				url: 'sql_php/DatabaseControlFunctions.php',
				type: 'POST',
				data : countryDictionary,
					success: function(result) 
					{
            			alert(result);
        			}
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
			{}
		);
}

function GetCountryNames()
{
		if(request)
		{
			request.abort();
		}

		cc = {};
		cc.gini = 5;
		cc.type = 3;
		cc.sha1 = "true";


		request = $.ajax(
			{
				url: 'sql_php/DatabaseControlFunctions.php',
				type: 'POST',
				data : cc,
					success: function(result) 
					{
            			Country_Names = result;
            			console.log(Country_Names);
       				 },
       				 dataType:"json",
       				 error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
			}

		);
		


		var Country_Names = request.done(function(response,textStatus,jqXHR)
			{
				insertcountries(Country_Names);
			}
		);
		console.log(Country_Names.responseJSON);

		request.always(function ()
			{}
		);

		

		return Country_Names;
}

function GetCountryNamesC()
{
	if(request)
	{
		request.abort();
	}

	dataV = {};
	dataV.gini = 5;
	dataV.type = 3;
	dataV.sha1 = "true";

	console.log("GetCountryNamesC");
	

	var answer = $.ajax(
	{
		url:'sql_php/DatabaseControlFunctions.php',
		type:'POST',
		dataType:"json",
		data:dataV,
		async:false,
       	error: function( jqXhr, textStatus, errorThrown ){
                    console.log(jqXhr);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
	}).responseJSON;

	console.log(answer);

	return answer;
}

function GetCountryAndFeatures(values,typeData)
{
	if(request)
	{
		request.abort();
	}

	dataV = {};
	dataV.typeValue = typeData;
	dataV.values = values;

	dataV.gini = 8;
	dataV.sha1 = 'GetCountriesAndCorrespondingValues';
	dataV.type = 3;

	var answer = $.ajax(
	{
		url:'sql_php/DatabaseControlFunctions.php',
		type:'POST',
		dataType:"json",
		data:dataV,
		async:false,
		error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                    console.log( textStatus );
                    console.log( jqXhr );
                }
	}).responseJSON;
		
	console.log(answer);

	return answer;
}

function InsertUserToDb()
{
	if(request)
	{
		request.abort();
	}

	var dataV = {};

	dataV.fname = document.getElementById("fname").value;
	dataV.lname = document.getElementById("lname").value;
	dataV.email = document.getElementById("email").value;
	dataV.pwd = document.getElementById("pwd").value;

	console.log(dataV);

	dataV.gini = 5;
	dataV.type = 3;
	dataV.sha1 = "InsertUser";

	try
	{

	
		var answer = $.ajax(
		{
			url:'sql_php/DatabaseControlFunctions.php',
			type:'POST',
			dataType:"json",
			data:dataV,
			async:false,
			error: function( jqXhr, textStatus, errorThrown ){
	                    console.log( errorThrown );
	                    console.log( textStatus );
	                    console.log( jqXhr );
	                }
		});
	}
	catch(err)
	{
		console.log(err.message);
	}
}

function SignUpUserFromDb()
{
	if(request)
	{
		request.abort();
	}

	dataV = {};

	dataV.email = document.getElementById("email_sign").value;
	dataV.pwd = document.getElementById("pwd_sign").value;

	dataV.gini = 5;
	dataV.type = 3;
	dataV.sha1 = "SignUpUser";

	console.log("SignUpUserFromDb");

	var answer = $.ajax(
	{
		url:'sql_php/DatabaseControlFunctions.php',
		type:'POST',
		dataType:"json",
		data:dataV,
		async:false,
       	error: function( jqXhr, textStatus, errorThrown ){
                    console.log(jqXhr);
                }
	}).responseText;

	console.log(answer);	
}

function K_Means(num,typeValue1,typeValue2,countryList)
{
	if(request)
	{
		request.abort();
	}
	dataV = {};
	dataV.countryList = (typeof(countryList)==typeof(true)?567:countryList);

	dataV.center1 = (document.getElementById("center1") !== null?parseInt(document.getElementById("center1").value):"errorRSA");
	dataV.center2 = (document.getElementById("center2") !== null?parseInt(document.getElementById("center2").value):"errorRSA");

	

	dataV.typeValue1 = typeValue1;
	dataV.typeValue2 = typeValue2;
	dataV.forLoop = num;

	dataV.gini = 5;
	dataV.type = 3;
	dataV.sha1 = "K_Means";

	console.log("K_Means");


	var answer = $.ajax(
	{
		url:'sql_php/DatabaseControlFunctions.php',
		type:'POST',
		dataType:"json",
		data:dataV,
		async:false,
       	error: function( jqXhr, textStatus, errorThrown ){
                    console.log(jqXhr);
                    console.log(textStatus);
                    console.log(errorThrown);
                    console.log("Ebgale error file")
                }
	}).responseJSON;

	console.log(answer);	

	return answer;
}