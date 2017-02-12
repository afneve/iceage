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
    distanceArray: [],
    distanceObject: {},
    elevationArray: [],
    elevationObject: {},
    ruggednessArray: [],
    ruggednessObject: {},
    position: '',
    useGeo: false,


    /*
    ******************
    Start of App
    ******************
    */
    init: function() {
        var loc = window.location.pathname;
        if (loc.includes('afneve')) {
            iceAge.getGeo = true;
        }

        if (navigator.geolocation && iceAge.useGeo) {
            navigator.geolocation.getCurrentPosition(function(position) {
                iceAge.position = position;
                iceAge.dataCollection();
                iceAge.displaySegmentList();
            }, function() {
                iceAge.dataCollection();
                iceAge.displaySegmentList();
            });
        } else {
            iceAge.dataCollection();
            iceAge.displaySegmentList();
        }
    },

    /*
    ******************
    Organize data
    ******************
    */
    dataCollection: function() {
        for (var i = 0; i < ice_age_data.length; i++) {
            iceAge.distanceArray.push(parseFloat(ice_age_data[i].iceagetraildistance));
            iceAge.elevationArray.push(parseFloat(ice_age_data[i].elevation));
            iceAge.ruggednessArray.push(parseFloat(ice_age_data[i].ruggedness));
        }

        iceAge.getAverage(iceAge.distanceArray, iceAge.distanceObject);
        iceAge.getAverage(iceAge.elevationArray, iceAge.elevationObject);
        iceAge.getAverage(iceAge.ruggednessArray, iceAge.ruggednessObject);
    },

    getAverage: function(array, object) {
        var average = 0;

        for (var i = 0; i < array.length; i++) {
            average += array[i];
        }

        average = (average / array.length).toFixed(2);

        object.average = parseFloat(average);

        array.sort(function(a, b) {
            return a - b;
        });

        object.lowest = array[0];
        object.highest = array[array.length - 1];
        object.shortCutoff = parseFloat(((object.average + object.lowest) / 2).toFixed(2));
        object.midCutoff = parseFloat(((object.average + object.highest) / 2).toFixed(2));
    },

    /*
    ******************
    Retrieves data and put it on the page
    ******************
    */
    displaySegmentList: function() {
        var segmentHTML = '',
            filterHTML = '',
            selectHTML = '',
            previousSection = '',
            nextSection = '',
            difficulty = '',
            segmentCounter = 1;

        selectHTML += '<select>';

        for (var i = 0; i < ice_age_data.length; i++) {
            ice_age_data[i].segment_id = i + 1;
            iceAge.totalTrailDistance += parseFloat(ice_age_data[i].iceagetraildistance);

            //IF NEW COUNTY
            if (ice_age_data[i].booksection != previousSection) {
                if (i == 0) {
                    segmentHTML += '<div class="county" data-index="' + segmentCounter + '">';
                } else {
                    segmentHTML += '<div class="county hide" data-index="' + segmentCounter + '">';
                }
                segmentCounter++

                segmentHTML += '<h3 id="segment_' + i + '">' + ice_age_data[i].booksection + '</h3>';



                if (i == 0) {
                    filterHTML += '<li class="selected">';
                } else {
                    filterHTML += '<li>';
                }
                selectHTML += '<option value="' + (segmentCounter - 1) + '">' + ice_age_data[i].booksection + '</option>';
                filterHTML += '<a href="' + (segmentCounter - 1) + '">' + ice_age_data[i].booksection + '</a>';
                filterHTML += '</li>';
            }

            segmentHTML += '<div class="segment_container">';
            segmentHTML += '<div class="segment" data-index="' + i + '">';
            segmentHTML += '<h4 class="segment_name">' + ice_age_data[i].segment + '</h4>';
            segmentHTML += '<div class="segment_summary">' + ice_age_data[i].summary + '</div>';

            

            /*
            MESS TO CLEAN UP
            */
            if (parseFloat(ice_age_data[i].iceagetraildistance) <= iceAge.distanceObject.shortCutoff) {
                difficulty = 'easy';
            } else if (parseFloat(ice_age_data[i].iceagetraildistance) <= iceAge.distanceObject.midCutoff) {
                difficulty = 'average';
            } else {
                difficulty = 'hard';
            }
            segmentHTML += '<div class="' + difficulty + '">Distance: ' + ice_age_data[i].iceagetraildistance + '</div>';

            if (parseFloat(ice_age_data[i].elevation) <= iceAge.elevationObject.shortCutoff) {
                difficulty = 'easy';
            } else if (parseFloat(ice_age_data[i].elevation) <= iceAge.elevationObject.midCutoff) {
                difficulty = 'average';
            } else {
                difficulty = 'hard';
            }
            segmentHTML += '<div class="' + difficulty + '">Elevation: ' + ice_age_data[i].elevation + '</div>';

            if (parseFloat(ice_age_data[i].ruggedness) <= iceAge.ruggednessObject.shortCutoff) {
                difficulty = 'easy';
            } else if (parseFloat(ice_age_data[i].ruggedness) <= iceAge.ruggednessObject.midCutoff) {
                difficulty = 'average';
            } else {
                difficulty = 'hard';
            }
            segmentHTML += '<div class="' + difficulty + '">Ruggedness: ' + ice_age_data[i].ruggedness + '</div>';
            /*
            MESS TO CLEAN UP
            */

            segmentHTML += '<div class="icons">';

            for (var l = 0; l < iceAge.iconArray.length; l++) {
                var type = iceAge.iconArray[l];
                var readableType = type;
                var className = iceAge.iconArray[l].toLowerCase();

                if (readableType == 'potablewater') {
                    readableType = 'potable water';
                }
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

            for (var j = 0; j < segment_id_location_data.length; j++) {
                if (segment_id_location_data[j].segment_id == ice_age_data[i].segment_id) {
                    var eastLat = segment_id_location_data[j].eastLat,
                        eastLong = segment_id_location_data[j].eastLong,
                        westLat = segment_id_location_data[j].westLat,
                        westLong = segment_id_location_data[j].westLong;

                    segmentHTML += '<div class="map">';
                    if (eastLat !== '') {
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/place/' + eastLat + 'N+' + eastLong + 'W" >East End</a>';
                    }
                    if (westLat !== '') {
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/place/' + westLat + 'N+' + westLong + 'W" >West End</a>';
                    }
                    if (eastLat !== '' && westLat !== '') {
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + eastLat + 'N+' + eastLong + 'W/' + westLat + 'N+' + westLong + 'W">Beginning to End</a>';
                    }

                    if (iceAge.position !== '') {
                        if (eastLat !== '') {
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + eastLat + 'N+' + eastLong + 'W">To East end from your location</a>';
                        }
                        if (westLat !== '') {
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + westLat + 'N+' + westLong + 'W">To West end from your location</a>';
                        }
                    }

                    segmentHTML += '</div>';
                }
            }

            if (ice_age_data[i].nohiking.trim() !== '') {
                segmentHTML += '<div class="nohiking">Hiking Restrictions: </div><div>' + ice_age_data[i].nohiking + '</div>';
            }

            segmentHTML += '</div>';
            segmentHTML += '<div class="clear"></div>';
            //segmentHTML += '<span data-efnprogress="' + efnProgress + '" data-notes="'+notes+'"></span><span data-afnprogress="' + afnProgress + '" data-notes="'+notes+'"></span>';
            segmentHTML += '</div>';
            segmentHTML += '<div class="clear"></div>';
            segmentHTML += '</div>';

            if (typeof ice_age_data[i + 1] != 'undefined') {
                nextSection = ice_age_data[i + 1].booksection;
            } else {
                nextSection = '';
            }

            if (ice_age_data[i].booksection != nextSection) {
                //filterHTML += '</ul>';

                segmentHTML += '</div>'; //END COUNTY DIV
                segmentHTML += '<div class="clear"></div>';
            }

            previousSection = ice_age_data[i].booksection;
        }

        selectHTML += '</select>';

        $('#segment_list').html(segmentHTML);
        $('#segment_filter ul').html(filterHTML);
        $('#segment_filter_container').append(selectHTML);

        iceAge.displayUserProgress();
    },
    /*
    ******************
    Display User Progress
    ******************
    */
    displayUserProgress: function() {
        var userName = '',
            userHTML = '',
            userCompleteList = '',
            userPartialList = '',
            userIncompleteList = '',
            userCompleteMiles = 0,
            userPartialMiles = 0,
            userMilesRemaining = 0;

        //segment_id_location_data  

        for (var i = 0; i < progress_data.users.length; i++) {
            userCompleteList = '';
            userPartialList = '';
            userCompleteMiles = 0;
            userPartialMiles = 0;

            userName = progress_data.users[i].user;
            userHTML += '<div class="user_container">';
            userHTML += '<h4>' + progress_data.users[i].user + '</h4>';
            for (var j = 0; j < ice_age_data.length; j++) {


                for (var k = 0; k < progress_data.users[i].completedSegmentIds.length; k++) {
                    var id = progress_data.users[i].completedSegmentIds[k];
                    if (id == ice_age_data[j].segment_id) {

                        userCompleteList += '<div class="seg">' + ice_age_data[j].segment + '</div>';
                        userCompleteMiles += parseFloat(ice_age_data[j].iceagetraildistance);
                        break;
                    }
                }

                for (var l = 0; l < progress_data.users[i].partialSegments.length; l++) {
                    var id = progress_data.users[i].partialSegments[l].segmentId;
                    if (id == ice_age_data[j].segment_id) {
                        userPartialList += '<div class="user_segment_container">';
                        userPartialList += '<div class="seg">' + ice_age_data[j].segment + '</div>';
                        userPartialList += '<div class="seg_notes">' + progress_data.users[i].partialSegments[l].notes + '</div>';
                        userPartialList += '</div>';
                        userPartialMiles += parseFloat(ice_age_data[j].iceagetraildistance);

                        break;
                    }
                }

            } //END ICE AGE DATA LOOP
            userHTML += '<div class="user_segments">';
            userHTML += '<div class="user_header">Completed Segments ( ' + progress_data.users[i].completedSegmentIds.length + ' )</div>';
            userHTML += userCompleteList;
            userHTML += '</div>';

            userHTML += '<div class="user_segments">';
            userHTML += '<div class="user_header">Partially Completed Segments ( ' + progress_data.users[i].partialSegments.length + ' )</div>';
            userHTML += userPartialList;
            userHTML += '</div>';

            userHTML += '<div class="user_segments">';
            userHTML += '<div class="user_header">Distance:</div>';
            userHTML += '<div>Length of trails partially done is ' + userPartialMiles + ' miles</div>';
            userHTML += '<div>' + parseFloat(userCompleteMiles.toFixed(2)) + ' of ' + iceAge.totalTrailDistance + ' miles completed</div>';

            userHTML += '<div>' + (parseFloat(iceAge.totalTrailDistance) - parseFloat(userCompleteMiles.toFixed(2))) + ' miles remaining!</div>';
            userHTML += '</div>'

            userHTML += '</div>';
        } //END USER LOOP

        $('#progress_container').html(userHTML);

        /*if(progress_data[j].segment == ice_age_data[i].segment){
            console.log(ice_age_data[i].segment);
            console.log(ice_age_data[i].segment_id);

           // efnProgress = progress_data[j].efnStatus;
            //afnProgress = progress_data[j].afnStatus;

            //Name
            //Miles complete vs mile remaining
            //Number of completed segments
            //List of completed segments
            //Number of partial segments
            //List of partial segments
            //Number of unwalked segments
            //LIst of unwalked segments

            //progress_data.splice(j,1);            
        }*/



    },
    /*
    ******************
    Attach Event Listeners
    ******************
    */
    attachEventListeners: function() {

        $('#segment_filter').on('click', 'a', function(e) {
            e.preventDefault();

            var segment = $(this).attr('href');

            $('#segment_filter li').removeClass('selected');
            $(this).parent('li').addClass('selected');


            $('.county').hide();
            $('[data-index="' + segment + '"]').show();

        });

        $('body').on('change', '#segment_filter_container select', function(){ 

            var segment = $(this).val();

            $('.county').hide();
            $('[data-index="' + segment + '"]').show();
        });

        $('#segments').on('click', function(e) {
            $('#progress_container').hide();
            $('#segment_container').show();
            $('#nav div').removeClass('selected');
            $(this).addClass('selected');

        });

        $('#progress').on('click', function(e) {
            $('#segment_container').hide();
            $('#progress_container').show();
            $('#nav div').removeClass('selected');
            $(this).addClass('selected');
        });

        $('body').on('keyup', function(e) {

            if (e.keyCode == 39) {
                var nextElement = $('#segment_filter li.selected');

                if ($(nextElement).next().length > 0) {
                    $('#segment_filter li').removeClass('selected');
                    $(nextElement).next().addClass('selected');
                    $('#segment_filter li.selected a').click();
                }

            } else if (e.keyCode == 37) {
                var nextElement = $('#segment_filter li.selected');

                if ($(nextElement).prev().length > 0) {
                    $('#segment_filter li').removeClass('selected');
                    $(nextElement).prev().addClass('selected');
                    $('#segment_filter li.selected a').click();
                }

            }

            if (e.keyCode == 83) {
                iceAge.enableSpeech();
            }

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
              
                       
               		});*/
        ////TEST

    },

    formatData: function() {
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