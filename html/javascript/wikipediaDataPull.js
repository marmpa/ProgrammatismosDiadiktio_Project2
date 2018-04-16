let site = 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0';
console.log(site);



/*$(document).ready(function ()
{
$.getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0',function(json)
	{
		$('#wikiInfo').html(json.parse.text['*']);
		$('#wikiInfo').find("a:not(.references a)").attr("href", function(){return "http://www.wikipedia.org" + $(this).attr("href");});
		$('#wikiInfo').find("a").attr("target", "_blank");
	});

});
*/

//http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=google&rvsection=0
// original working: http://en.wikipedia.org/w/api.php?action=parse&page=google&prop=text&format=json&callback=?

/*$.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=google&prop=text&format=json&callback=?',function(json)
					{
						$('#wikiInfo').html(json.parse.text['*']);
						$('#wikiInfo').find("a:not(.references a)").attr("href", function(){return "http://www.wikipedia.org" + $(this).attr("href");});
						$('#wikiInfo').find("a").attr("target", "_blank");
					})*/

					//to parapano leitourgei mesa sto test.html