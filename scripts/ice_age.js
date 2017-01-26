var iceAge = {
    labelArray : [],
    iconArray : ["potablewater", "restrooms", "nohiking"],
    jsonString : '',
    efnComplete : 0,
    efnPartial : 0,
    afnComplete : 0,
    afnPartial : 0,
    totalTrailDistance : 0,
    getData : false,


    /*
    ******************
    Start of App
    ******************
    */
    init: function () {
        if (iceAge.getData) {
            iceAge.getLabelsFromWebPage();
            iceAge.getJsonFromWebPage();
        }
        else {
            iceAge.displaySegmentList();
           // iceAge.displayProgress();
        }
    },

    /*
    ******************
    Retrieves data and put it on the page
    ******************
    */
    displaySegmentList: function(){
        var segmentHTML = '',
            filterHTML = '',
            previousSection = '';
    
        for(var i=0; i < ice_age_data.length; i++){
            var efnProgress = '',
            afnProgress = '',
            notes = '';


            if(ice_age_data[i].booksection != previousSection){
                segmentHTML += '<div class="county"><h3 id="segment_' + i + '">' + ice_age_data[i].booksection + '</h3>';
                filterHTML += '<li>'
                filterHTML += '<a href="' + i + '">' + ice_age_data[i].booksection + '</a>';
                filterHTML += '</li>';
                //filterHTML += '<ul>';
            }

          //  filterHTML += '<li><a href="' + i + '">' + ice_age_data[i].segment + '</a></li>'

            segmentHTML += '<div class="segment_container">';
            segmentHTML += '<div class="segment" data-index="'+i+'">';
                segmentHTML += '<h4 class="segment_name">' + ice_age_data[i].segment + '</h4>';
                segmentHTML += '<div class="segment_summary">' + ice_age_data[i].summary + '</div>'

                segmentHTML += '<div>Distance: ' + ice_age_data[i].iceagetraildistance + '</div>';
                segmentHTML += '<div>Elevation: ' + ice_age_data[i].elevation + '</div>';
                segmentHTML += '<div>Ruggedness: ' + ice_age_data[i].ruggedness + '</div>';
                
                segmentHTML += '<div class="icons">';

                    for(var l = 0; l < iceAge.iconArray.length; l++){
                        var type = iceAge.iconArray[l];
                        var readableType = type;

                        if(readableType == 'potablewater'){
                            readableType = 'potable water';
                        }
                        console.log(type);
                        console.log(ice_age_data[i]);
                        if(ice_age_data[i][type].trim() != ''){
                            var className = iceAge.iconArray[l].toLowerCase();
                            segmentHTML += '<div data-icon="'+className+'" class="segment_details">';
                            segmentHTML += '<span class="yes">' + readableType + ':</span>';
                            segmentHTML += '</div>';
                            //segmentHTML += '<span data-icon="'+className+'" class="icon"><img src="icons/'+className+'.png" /></span>';
                        }
                        else{
                            segmentHTML += '<div data-icon="'+className+'" class="segment_details">';
                            segmentHTML += '<span class="no">' + readableType + ':</span>';
                            segmentHTML += '</div>';
                        }
                    }

                segmentHTML += '</div>';
                segmentHTML += '<div class="clear"></div>'
            //segmentHTML += '<span data-efnprogress="' + efnProgress + '" data-notes="'+notes+'"></span><span data-afnprogress="' + afnProgress + '" data-notes="'+notes+'"></span>';
            segmentHTML += '</div>';
            segmentHTML += '</div>';





            
            if(typeof ice_age_data[i+1] != 'undefined'){
                nextSection = ice_age_data[i+1].booksection;
            }
            else{
                nextSection = '';
            }

            if(ice_age_data[i].booksection != nextSection){
                //filterHTML += '</ul>';
                segmentHTML += '</div>'; //END COUNTY DIV
            }

            previousSection = ice_age_data[i].booksection;
        }

        $('#segment_list').html(segmentHTML);
        $('#segment_filter ul').html(filterHTML);
        console.log($('#segment_filter').height());
        $('#segment_filter_container').css({
            'height' : $('#segment_filter ul').height()
        });
    },
    /*
    ******************
    Attach Event Listenrs
    ******************
    */
    attachEventListeners: function(){

        $('body').on('keyup', function(e) {
            if (e.keyCode == 39) {
                console.log('right arrow');
            } else if (e.keyCode == 37) {
                console.log('left arrow');
            }

            if (e.keyCode == 83) {
                iceAge.enableSpeech();
            }
        });

        $('#segment_filter').on('click', 'a', function(e){
            e.preventDefault();

            var segment = '#segment_'+$(this).attr('href');
            $('html, body').animate({
			    scrollTop: $(segment).offset().top - 8 
		    }, 1000, function(){
                
             /*   $('#segment_filter').css({
                    'position' : 'absolute',
                    'top' : $(window).scrollTop()
                }); */

            });

        });

     $(window).scroll(function () {
            var firstCounty = $("#segment_0").offset().top;
           // console.log(firstCounty);
           // console.log($(this).scrollTop());
				if ($(this).scrollTop() > firstCounty) {
				    $('#segment_filter').css({
                        'position' : 'fixed',
                        'top' : 10
                    });
				}
                else{
                    $('#segment_filter').css({
                        'position' : 'relative'
                    });
                }
        });
/*
        $('body').on('change', '#segment_filter select', function(){ 
            console.log($(this).val());
            var segment = '#'+$(this).val();
            $('html, body').animate({
			    scrollTop: $(segment).offset().top - 8 
		    });
		});*/
        ////TEST

    },

     enableSpeech: function() {
        console.log("enabled");
        var ignore_onend;
        // get navigation links
        //   var allLinks = document.getElementsByTagName('a');
        // get last word said element
        // var strongEl = document.getElementById('latest-word');

        // new instance of speech recognition
        var recognition = new webkitSpeechRecognition();
        // set params
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.start();

        recognition.onresult = function(event) {

            // delve into words detected results & get the latest
            // total results detected
            console.log(event.results);
            //console.log(event.results[0].isFinal);
            
            var resultsLength = event.results.length - 1;
            //console.log(resultsLength);
            // get length of latest results
            var ArrayLength = event.results[resultsLength].length - 1;
            //console.warn(event.results[resultsLength].length);
            // get last word detected
            var saidWord = event.results[resultsLength][ArrayLength].transcript;
            saidWord = saidWord.trim();
            //console.log(saidWord);
            console.log(saidWord);
            alert(saidWord);
            if(saidWord.indexOf("next slide") >= 0 && event.results[0].isFinal){
                p.next();
            }
            if(saidWord.indexOf("previous slide") >= 0 && event.results[0].isFinal){
                p.previous();
            }

            // loop through links and match to word spoken
            //  for (i = 0; i < allLinks.length; i++) {

                // get the word associated with the link
            //     var dataWord = allLinks[i].dataset.word;

                // if word matches chenge the colour of the link
            //     if (saidWord.indexOf(dataWord) != -1) {
            //        allLinks[i].style.color = 'red';
            //    }
            // }

            // append the last word to the bottom sentence
            // strongEl.innerHTML = saidWord;
        }

        // speech error handling
        recognition.onerror = function(event) {
            console.log(event.error);
            if (event.error == 'no-speech') {
                ignore_onend = true;
                console.log("TESTIGN");
            }
            if (event.error == 'audio-capture') {
                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                ignore_onend = true;
            }
            console.log(event);
        }
        
        recognition.onend = function(event) {
            console.log(event);
            var ignore_onend = true; 
        console.log(ignore_onend);
            if (ignore_onend) {
                console.log("RETURN");
                recognition.start();
            return false;
            }
        }
    },
    
    /*
    **Retrive Labels from table and put into array
    **ID was added in
    */
    getLabelsFromWebPage: function () {

        $("#labels").children("td").each(function (index) {
            var label = $(this).text();
            label = label.toLowerCase();
            label = label.replace(/\s+/g, '');
            label = label.replace(/�/g, '');       
            iceAge.labelArray.push(label);
        });
    },
    /*
    **Build JSON from table and console JSON object
    */
    getJsonFromWebPage: function () {
        var rowCount = $("tr").length - 1;


        iceAge.jsonString += '[';
        
        $("tr").each(function (index) {
            if (index > 0) {
                iceAge.jsonString += '{';
                var columnCount = $(this).children('td').length - 1;

                $(this).children('td').each(function (index) {
                    
                  //  iceAge.jsonString += '"' + iceAge.labelArray[index] + '":';

                  //  if (index == 1 || index == 4) {
                        var cellText = $(this).text();
                        cellText = cellText.replace(/\s\s+/g, ' ');
                        cellText = cellText.replace(/�/g, '');    

                        iceAge.jsonString += '"' + iceAge.labelArray[index] + '":';
                        iceAge.jsonString += '"' + cellText + '"';

                        //use var columnCount if reading everything in JSON
                        if (index != columnCount) {
                            iceAge.jsonString += ',';
                        }
                  //  }
                });

                iceAge.jsonString += '}';
                if (index < rowCount) {
                    iceAge.jsonString += ',';
                }
            }
        });

        iceAge.jsonString += ']';
        console.log(iceAge.jsonString);
    }
};

$(document).ready(function () {
    iceAge.init();
    iceAge.attachEventListeners();
  //iceAge.enableSpeech();
});