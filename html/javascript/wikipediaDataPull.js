var site = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0';
			
var marios = 'gia';
var flagImg;

var coordX;
var coordY;

function getCountryInfo(searchTerm)
{
	document.getElementById("wikiInfo").innerHTML = "";

	console.log(searchTerm + "hello");
	var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + searchTerm+"&redirects&prop=text&callback=?";
	var flagUrl = "https://en.wikipedia.org/w/api.php?action=parse&page="+searchTerm+"&prop=text&format=json&callback=?";
	

	$.getJSON(flagUrl,function(flag)
	{
		var FlagPattern = /<img\salt=\"(Flag\sof\s.*)\"\ssrc=\"(.*)\"\sw/i;
		var tempArrayFlagInfo = flag.parse.text["*"].match(FlagPattern);
		
		
		flagImg = "<img src=\"https:"+tempArrayFlagInfo[2]+"\" alt=\""+tempArrayFlagInfo[1]+"\">";
		//flagImg1 = "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/125px-Flag_of_Greece.svg.png\" + alt=\""+tempArrayFlagInfo[1]+"\">";
		
		console.log(flagImg);
		$("#wikiInfo").append(flagImg+"</br>");
		//$("#wikiInfo").append(flagImg1+"</br>");
	});

	var site = "http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles="+searchTerm+"&rvsection=0";

$.getJSON(site,function(json)
	{
		marios = 'tiropita';
		
		wikiHTML = json.query.pages;
		var wikiString = JSON.stringify(wikiHTML);

		var patternGini = /Gini\s=\s((\d*\.)?\d+)/i;
		var patternHDI = /HDI\s=\s((\d*\.)?\d+)/i;
		var patternGDPpC = /GDP_nominal_per_capita\s=\s(\$(\d*,)?\d+)/i;
		var patternPopulation = /population_estimate\s=\s(\{+.*\}+\s)*(((\d*),?)*)(<ref)?.*\|/i;
		var patternArea = /area_km2\s=\s(((\d*),?)*)/i;
		var patternCapital = /capital\s=\s\[+(\w+\s*)+\]+/i;
		var patternCoordinates = /coordinates\s=\s\{+Coord((\|[\d*\w]*\|*){6})/i;


		var splittedArray = wikiString.match(patternCoordinates)[1].split('|');
		coordX = splittedArray[1] +" "+splittedArray[2]+" "+splittedArray[3];
		coordY = splittedArray[4] +" "+splittedArray[5]+" "+splittedArray[6];
		
		//console.log(coordX+" yep "+coordY);

		var patternTest = /Gini\s=\s((\d*\.)?\d+)/i;

		


		

		

		

		console.log(wikiString.match(patternPopulation));
		console.log(JSON.stringify(wikiHTML).match(patternGini)[1]+" Geia sou maria");
		//console.log(JSON.stringify(wikiHTML));


		$("#wikiInfo").append("Όνομα προτεύουσας : "+wikiString.match(patternCapital)[1]+"</br>");
		$("#wikiInfo").append("Γεογραφικό στίγμα Χ : "+coordX+"</br>");
		$("#wikiInfo").append("Γεογραφικό στίγμα Y : "+coordY+"</br>");
		$("#wikiInfo").append("Έκταση : "+wikiString.match(patternArea)[1]+" km/2"+"</br>");
		try
		{
			$("#wikiInfo").append("Πλυθυσμός : "+wikiString.match(patternPopulation)[2]+"</br>");
		}
		catch(err)
		{
			//$("#wikiInfo").append("Πλυθυσμός : "+wikiString.match(patternPopulation)[1]+"</br>");
		}
		
		$("#wikiInfo").append("GPD per capita : "+wikiString.match(patternGDPpC)[1]+"</br>");
		$("#wikiInfo").append("HDI : "+wikiString.match(patternHDI)[1]+"</br>");
		$("#wikiInfo").append("Gini : "+wikiString.match(patternGini)[1]+"</br>");

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

		var $form = $(this);

		//var $inputs = $form.find("input, select, button, textarea");

		//var serializedData = $form.serialize();

		$inputs.prop("disabled",true);

		request = $.ajax(
			{
				url: "/DatabaseControlFunctions.php",
				type: "post",
				data : {'coordX' : coordX,'coordY':coordY};
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
				$inputs.prop("disabled",false);
			}
		);
}


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