var site = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0';
console.log(site);



$(document).ready(function ()
{

	var searchTerm = "Greece";
	var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + searchTerm+"&redirects&prop=text&callback=?";
	var site = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+searchTerm+'&rvsection=0';

$.getJSON(site,function(json)
	{
		wikiHTML = json.parse.text["*"];

		var pattern = /Gini\s=\s\d+/i;

		console.log(JSON.stringify(wikiHTML));
		$("#wikiInfo").append(wikiHTML.match(pattern));

		//$wikiDOM = $("<document>"+wikiHTML+"</document>");
		//$("#wikiInfo").append($wikiDOM.find('.infobox').html());
		//console.log("Hello    "+document.getElementById('wikiInfo').innerHTML);

		//var a = json.parse.text['*'];
		//$('#wikiInfo').html(json.parse.text['*']);
		//$('#wikiInfo').find("a:not(.references a)").attr("href", function(){return "http://www.wikipedia.org" + $(this).attr("href");});
		//$('#wikiInfo').find("a").attr("target", "_blank");
	});

});


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