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
		//flagImg1 = "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/125px-Flag_of_Greece.svg.png\" + alt=\""+tempArrayFlagInfo[1]+"\">";
		
		console.log(flagImg);
		$("#wikiInfo").append(flagImg+"</br>");
		//$("#wikiInfo").append(flagImg1+"</br>");
	});

	var site = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles="+searchTerm+"&rvsection=0";

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
		var patternCoordinates = /coordinates\s=\s\{+Coord((\|[\d*\w]*\|*){6})/i;


		var splittedArray = wikiString.match(patternCoordinates)[1].split('|');
		
		
		
		//console.log(coordX+" yep "+coordY);

		var patternTest = /Gini\s=\s((\d*\.)?\d+)/i;

		countryDictionary.coordX = (parseInt(splittedArray[1])+(parseInt(splittedArray[2])/60)).toString();
		countryDictionary.coordY = (parseInt(splittedArray[4])+(parseInt(splittedArray[4])/60)).toString();

		//countryDictionary.coordX = splittedArray[1] +" "+splittedArray[2];//+" "+splittedArray[3]; 
		//countryDictionary.coordY = splittedArray[4] +" "+splittedArray[5];//+" "+splittedArray[6];



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
		//console.log(JSON.stringify(wikiHTML));


		$("#wikiInfo").append("Όνομα προτεύουσας : "+countryDictionary.capitalName+"</br>");
		$("#wikiInfo").append("Γεογραφικό στίγμα Χ : "+countryDictionary.coordX+"</br>");
		$("#wikiInfo").append("Γεογραφικό στίγμα Y : "+countryDictionary.coordY+"</br>");
		$("#wikiInfo").append("Έκταση : "+countryDictionary.area+" km/2"+"</br>");
		try
		{
			$("#wikiInfo").append("Πλυθυσμός : "+countryDictionary.population+"</br>");
		}
		catch(err)
		{
			//$("#wikiInfo").append("Πλυθυσμός : "+wikiString.match(patternPopulation)[1]+"</br>");
		}
		
		$("#wikiInfo").append("GPD per capita : "+countryDictionary.GPD+"</br>");
		$("#wikiInfo").append("HDI : "+countryDictionary.HDI+"</br>");
		$("#wikiInfo").append("Gini : "+countryDictionary.gini+"</br>");

		//$wikiDOM = $("<document>"+wikiHTML+"</document>");
		//$("#wikiInfo").append($wikiDOM.find('.infobox').html());
		//console.log("Hello    "+document.getElementById('wikiInfo').innerHTML);

		//var a = json.parse.text['*'];
		//$('#wikiInfo').html(json.parse.text['*']);
		//$('#wikiInfo').find("a:not(.references a)").attr("href", function(){return "http://www.wikipedia.org" + $(this).attr("href");});
		//$('#wikiInfo').find("a").attr("target", "_blank");


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
		

		//var $form = $(this);

		//var $inputs = $form.find("input, select, button, textarea");

		//var serializedData = $form.serialize();

		//$inputs.prop("disabled",true);

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
			{
		//		$inputs.prop("disabled",false);
			}
		);
}

function GetCountryNames()
{
	//var Country_Names = Array();
		if(request)
		{
			request.abort();
		}

		

		//var $form = $(this);

		//var $inputs = $form.find("input, select, button, textarea");

		//var serializedData = $form.serialize();

		//$inputs.prop("disabled",true);

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
            			
            			//var arrayObj = <?php echo $json_array; ?>
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
			{
		//		$inputs.prop("disabled",false);
			}
		);

		

		return Country_Names;
}

function GetCountryNamesC()
{
	//console.log("marios");
	if(request)
	{
		request.abort();
	}

	//console.log("geia sou  maria");

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
	//console.log(answer);	

	return answer;
}

function GetCountryAndFeatures(values,typeData)
{
	console.log("naiii breeeeeeeeeee");
	if(request)
	{
		request.abort();
	}

	console.log(values);
	console.log("naiii");

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

	//console.log("geia sou  maria");

	var dataV = {};

	dataV.fname = document.getElementById("fname").value;
	dataV.lname = document.getElementById("lname").value;
	dataV.email = document.getElementById("email").value;
	dataV.pwd = document.getElementById("pwd").value;

	console.log(dataV);

	dataV.gini = 5;
	dataV.type = 3;
	dataV.sha1 = "InsertUser";

	console.log("InsertData");

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
	
		
	//console.log(answer);	

	//return answer;
}

function SignUpUserFromDb()
{
	if(request)
	{
		request.abort();
	}

	//console.log("geia sou  maria");

	dataV = {};

	dataV.email_sign = document.getElementById("email_sign");
	dataV.pwd_sign = document.getElementById("pwd_sign");

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
                    //console.log(textStatus);
                    //console.log(errorThrown);
                }
	}).responseJSON;

	alert(answer);
		
		
	console.log(answer);	

	//document.getElementById("submitForm").submit();
}

function K_Means(num,typeValue)
{
	console.log(num);
	console.log("gieaa");
	if(request)
	{
		request.abort();
	}

	//console.log("geia sou  maria");

	dataV = {};

	dataV.crit1 = document.getElementById("criterion1");
	dataV.crit2 = document.getElementById("criterion1");
	dataV.typeValue = typeValue;

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
                    //console.log(textStatus);
                    //console.log(errorThrown);
                }
	}).responseJSON;

	alert(answer);
		
		
	console.log(answer);	

	//document.getElementById("submitForm").submit();
}


//Onoma tis xoras epistrofi se sinartisi se pinaka


//http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0
// original working: http://en.wikipedia.org/w/api.php?action=parse&page=google&prop=text&format=json&callback=?

//kinda works 8:32

/*$.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=google&prop=text&format=json&callback=?',function(json)
					{
						$('#wikiInfo').html(json.parse.text['*']);
						$('#wikiInfo').find("a:not(.references a)").attr("href", function(){return "http://www.wikipedia.org" + $(this).attr("href");});
						$('#wikiInfo').find("a").attr("target", "_blank");
					})*/

					//to parapano leitourgei mesa sto test.html