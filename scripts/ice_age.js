"use strict";

var iceAge = {
    labelArray: [],
    iconArray: ["potablewater", "restrooms"],
    jsonString: '',
    efnComplete: 0,
    efnPartial: 0,
    afnComplete: 0,
    afnPartial: 0,
    totalTrailDistance: 0,
    getData: false,


    /*
    ******************
    Start of App
    ******************
    */
    init: function() {
        if (iceAge.getData) {
            iceAge.getLabelsFromWebPage();
            iceAge.getJsonFromWebPage();
        } else {
            iceAge.displaySegmentList();
            //iceAge.formatData();
        }
    },

    /*
    ******************
    Retrieves data and put it on the page
    ******************
    */
    displaySegmentList: function() {
        var segmentHTML = '',
            filterHTML = '',
            previousSection = '',
            nextSection = '',
            segmentCounter = 1;

        for (var i = 0; i < ice_age_data.length; i++) {

            if (ice_age_data[i].booksection != previousSection) {
                if(i == 0){
                    segmentHTML += '<div class="county" data-index="'+ segmentCounter +'">';
                    segmentCounter++
                }
                else{
                    segmentHTML += '<div class="county hide" data-index="'+ segmentCounter +'">';
                    segmentCounter++
                }
                
                segmentHTML += '<h3 id="segment_' + i + '">' + ice_age_data[i].booksection + '</h3>';
                
                if(i == 0){
                    filterHTML += '<li class="selected">';   
                }
                else{
                    filterHTML += '<li>';
                }
                


                filterHTML += '<a href="' + (segmentCounter - 1) + '">' + ice_age_data[i].booksection + '</a>';
                filterHTML += '</li>';
                //filterHTML += '<ul>';
            }

            //  filterHTML += '<li><a href="' + i + '">' + ice_age_data[i].segment + '</a></li>'

            segmentHTML += '<div class="segment_container">';
            segmentHTML += '<div class="segment" data-index="' + i + '">';
            segmentHTML += '<h4 class="segment_name">' + ice_age_data[i].segment + '</h4>';
            segmentHTML += '<div class="segment_summary">' + ice_age_data[i].summary + '</div>';

            segmentHTML += '<div>Distance: ' + ice_age_data[i].iceagetraildistance + '</div>';
            segmentHTML += '<div>Elevation: ' + ice_age_data[i].elevation + '</div>';
            segmentHTML += '<div>Ruggedness: ' + ice_age_data[i].ruggedness + '</div>';

            segmentHTML += '<div class="icons">';

            for (var l = 0; l < iceAge.iconArray.length; l++) {
                var type = iceAge.iconArray[l];
                var readableType = type;
                var className = iceAge.iconArray[l].toLowerCase();

                if (readableType == 'potablewater') {
                    readableType = 'potable water';
                }
                console.log(type);
                console.log(ice_age_data[i]);
                if (ice_age_data[i][type].trim() !== '') {
                    segmentHTML += '<div data-icon="' + className + '" class="segment_details">';
                    segmentHTML += '<span class="yes">' + readableType + ':</span>';
                    segmentHTML += '</div>';
                    //segmentHTML += '<span data-icon="'+className+'" class="icon"><img src="icons/'+className+'.png" /></span>';
                } else {
                    segmentHTML += '<div data-icon="' + className + '" class="segment_details">';
                    segmentHTML += '<span class="no">' + readableType + ':</span>';
                    segmentHTML += '</div>';
                }
            }

            if(ice_age_data[i].nohiking.trim() !== '')
                segmentHTML += '<div class="nohiking">Hiking Restrictions: </div><div>' + ice_age_data[i].nohiking + '</div>';

            segmentHTML += '</div>';
            segmentHTML += '<div class="clear"></div>';
            //segmentHTML += '<span data-efnprogress="' + efnProgress + '" data-notes="'+notes+'"></span><span data-afnprogress="' + afnProgress + '" data-notes="'+notes+'"></span>';
            segmentHTML += '</div>';
            segmentHTML += '</div>';




            if (typeof ice_age_data[i + 1] != 'undefined') {
                nextSection = ice_age_data[i + 1].booksection;
            } else {
                nextSection = '';
            }

            if (ice_age_data[i].booksection != nextSection) {
                //filterHTML += '</ul>';
                segmentHTML += '</div>'; //END COUNTY DIV
            }

            previousSection = ice_age_data[i].booksection;
        }

        $('#segment_list').html(segmentHTML);
        $('#segment_filter ul').html(filterHTML);
    },
    /*
    ******************
    Attach Event Listenrs
    ******************
    */
    attachEventListeners: function() {

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

        $('#segment_filter').on('click', 'a', function(e) {
            e.preventDefault();

            var segment = $(this).attr('href');

            $('#segment_filter li').removeClass('selected');
            $(this).parent('li').addClass('selected');


            $('.county').hide();
            $('[data-index="' + segment + '"]').show();

        });
 /*
        $(window).scroll(function() {
            var firstCounty = $("#segment_0").offset().top;
            // console.log(firstCounty);
            // console.log($(this).scrollTop());
            if ($(this).scrollTop() > firstCounty) {
                $('#segment_filter').css({
                    'position': 'fixed',
                    'top': 10
                });
            } else {
                $('#segment_filter').css({
                    'position': 'relative'
                });
            }
        });
       
                $('body').on('change', '#segment_filter select', function(){ 
                    console.log($(this).val());
                    var segment = '#'+$(this).val();
                    $('html, body').animate({
        			    scrollTop: $(segment).offset().top - 8 
        		    });
        		});*/
        ////TEST

    },

    /*
     **Retrive Labels from table and put into array
     **ID was added in
     */
    getLabelsFromWebPage: function() {

        $("#labels").children("td").each(function(index) {
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
    getJsonFromWebPage: function() {
        var rowCount = $("tr").length - 1;


        iceAge.jsonString += '[';

        $("tr").each(function(index) {
            if (index > 0) {
                iceAge.jsonString += '{';
                var columnCount = $(this).children('td').length - 1;

                $(this).children('td').each(function(index) {

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
    },

    formatData : function(){
        var countyObject = {},
            segmentObject = {},
            text = '';

        for (var i = 0; i < ice_age_data.length; i++) {
            
            countyObject.id = i + 1;
            countyObject.countyName = ice_age_data[i].booksection;
        }

        console.log(countyObject);

    }
};

$(document).ready(function() {
    iceAge.init();
    iceAge.attachEventListeners();
});