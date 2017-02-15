"use strict";

var iceAge = {
    iconArray: ["potablewater", "restrooms"],
    totalTrailDistance: 0,
    distanceArray: [],
    distanceObject: {},
    elevationArray: [],
    elevationObject: {},
    ruggednessArray: [],
    ruggednessObject: {},
    position: '',
    useGeo: true,

    /*
    ******************
    Start of App
    ******************
    */
    init: function() {
        var loc = window.location.host;
        if (loc.includes('afneve')) {
            iceAge.useGeo = true;
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

        iceAge.attachEventListeners();
    },

    /*
    ******************
    Organize Trail Data into Arrays
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

    /*
    ******************
    Get Average of trail data to use later
    ******************
    */
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
            usersArray = [],
            usersPartialArray = [],
            segmentCounter = 1;

        selectHTML += '<select>';

        for (var i = 0; i < ice_age_data.length; i++) {
            ice_age_data[i].segment_id = i + 1;

            usersArray = iceAge.usersWhoHaveCompletedSegment(i + 1);
            usersPartialArray = iceAge.usersWhoHavePartialSegment(i + 1);

            iceAge.totalTrailDistance += parseFloat(ice_age_data[i].iceagetraildistance);

            //IF NEW COUNTY
            if (ice_age_data[i].booksection != previousSection) {
                if (i === 0) {
                    segmentHTML += '<div class="county" data-index="' + segmentCounter + '">';
                } else {
                    segmentHTML += '<div class="county hide" data-index="' + segmentCounter + '">';
                }
                segmentCounter++;

                segmentHTML += '<h3>' + ice_age_data[i].booksection + '</h3>';

                if (i === 0) {
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

            
            segmentHTML += '<div class="segment_info">';

            difficulty = iceAge.getDifficultyLevel(parseFloat(ice_age_data[i].iceagetraildistance), iceAge.distanceObject.shortCutoff, iceAge.distanceObject.midCutoff);          
            segmentHTML += '<div class="' + difficulty + '">Distance: ' + ice_age_data[i].iceagetraildistance + '</div>';


            difficulty = iceAge.getDifficultyLevel(parseFloat(ice_age_data[i].elevation), iceAge.elevationObject.shortCutoff, iceAge.elevationObject.midCutoff);          
            segmentHTML += '<div class="' + difficulty + '">Elevation: ' + ice_age_data[i].elevation + '</div>';

            difficulty = iceAge.getDifficultyLevel(parseFloat(ice_age_data[i].ruggedness), iceAge.ruggednessObject.shortCutoff, iceAge.ruggednessObject.midCutoff);          
            segmentHTML += '<div class="' + difficulty + '">Ruggedness: ' + ice_age_data[i].ruggedness + '</div>';


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
                } else {
                    segmentHTML += '<div data-icon="' + className + '" class="segment_details">';
                    segmentHTML += '<span class="no">' + readableType + ':</span>';
                    segmentHTML += '</div>';
                }
            }
            

            for (var j = 0; j < segment_id_location_data.length; j++) {
                if (segment_id_location_data[j].segment_id == ice_age_data[i].segment_id) {
                    var eastLat = iceAge.convertCoord(segment_id_location_data[j].eastLat),
                        eastLong = iceAge.convertCoord(segment_id_location_data[j].eastLong),
                        westLat = iceAge.convertCoord(segment_id_location_data[j].westLat),
                        westLong = iceAge.convertCoord(segment_id_location_data[j].westLong);

                    segmentHTML += '<div class="map">';
                    if (westLat !== '') {
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/place/' + westLat + 'N+' + westLong + 'W" >West End</a>';
                    }
                    if (eastLat !== '') {
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/place/' + eastLat + 'N+' + eastLong + 'W" >East End</a>';
                    }
                    if (eastLat !== '' && westLat !== '') {
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + eastLat + 'N+' + eastLong + 'W/' + westLat + 'N+' + westLong + 'W">Beginning to End</a>';
                    }

                    if (iceAge.position !== '') {
                        if (westLat !== '') {
                            segmentHTML += '<div class="location_based_info">';
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + westLat + 'N+' + westLong + 'W">Directions to West End</a>';
                            segmentHTML += '<div class="getDistance" data-lat="' + westLat + '" data-long="' + westLong + '"></div>';
                            segmentHTML += '</div>';
                        }
                        if (eastLat !== '') {
                            segmentHTML += '<div class="location_based_info">'
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + eastLat + 'N+' + eastLong + 'W">Directions to East End</a>';
                            segmentHTML += '<div class="getDistance" data-lat="' + eastLat + '" data-long="' + eastLong + '"></div>'; 
                            segmentHTML += '</div>';
                        }            
                    }

                    segmentHTML += '</div>';
                }
            }

            segmentHTML += '</div>';

            segmentHTML += '<div class="user_badge_container">';
            for(var u = 0; u < usersArray.length; u++){
                segmentHTML += '<div class="badge" data-complete="'+ usersArray[u] +'"><img src="./images/' + usersArray[u] + '-complete.svg" alt="" /><span class="badge_label">' + usersArray[u] + '</span></div>';
            }
            for(var up = 0; up < usersPartialArray.length; up++){
                segmentHTML += '<div class="badge" data-partial="'+ usersPartialArray[up] +'"><img src="./images/' + usersPartialArray[up] + '-partial.svg" alt="" /><span class="badge_label">' + usersPartialArray[up] + '</span></div>';
            }

            segmentHTML += '</div>';

            if (ice_age_data[i].nohiking.trim() !== '') {
                segmentHTML += '<div class="nohiking">Hiking Restrictions: </div><div>' + ice_age_data[i].nohiking + '</div>';
            }

            segmentHTML += '</div>';
            segmentHTML += '</div>';

            if (typeof ice_age_data[i + 1] != 'undefined') {
                nextSection = ice_age_data[i + 1].booksection;
            } else {
                nextSection = '';
            }

            if (ice_age_data[i].booksection != nextSection) {
                segmentHTML += '</div>'; //END COUNTY DIV
            }

            previousSection = ice_age_data[i].booksection;
        }

        selectHTML += '</select>';

        $('#segment_list').html(segmentHTML);
        $('#segment_filter ul').html(filterHTML);
        $('#segment_filter_container').append(selectHTML);

        iceAge.displayUserProgress();
    },
    getDistanceFromCurrentLocation : function(htmlElement, currentPosLat, currentPosLong, destLat, destLong){
        var origin1 = new google.maps.LatLng(currentPosLat,currentPosLong);
        var destination1 = new google.maps.LatLng(destLat,-(destLong));
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: [destination1],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function(response, status){
             if (status == 'OK') {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;

                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                        var element = results[j];
                        var distance = element.distance.text;
                        var duration = element.duration.text;
                        var from = origins[i];
                        var to = destinations[j];
                        $(htmlElement).html("<div>Drive Distance: " + distance + "</div><div>Drive Time: " + duration + "</div>");
                    }
                }
            }
        });

    },
    convertCoord : function(coord){
        var decimalCoord;
        var degree = 0,
            min = 0,
            sec = 0;
        if(coord !== ''){
            //45° 23.979'
            //-92° 38.973'
            coord = coord.split(' ');
            degree = parseFloat(coord[0]);
            min = parseFloat(coord[1]);


            decimalCoord = degree + (min/60);
            
            //DD = d + (min/60) + (sec/3600)
            return decimalCoord;
        }
    }, 


    getDifficultyLevel: function(iceAgeDistance, shortCutoff, midCutoff){
        var difficulty = '';
        if (iceAgeDistance <= shortCutoff) {
            difficulty = 'easy';
        } else if (iceAgeDistance <= midCutoff) {
            difficulty = 'average';
        } else {
            difficulty = 'difficult';
        }
        return difficulty;
    },

    usersWhoHaveCompletedSegment: function(segmentId){
        var userArray = [];

        for (var i = 0; i < progress_data.users.length; i++) {
                for (var k = 0; k < progress_data.users[i].completedSegmentIds.length; k++) {
                    var id = progress_data.users[i].completedSegmentIds[k];
                    if (id == segmentId) {
                        userArray.push(progress_data.users[i].user);
                        break;
                    }
                }
        }
        return userArray;
    },

    usersWhoHavePartialSegment: function(segmentId){
        var userArray = [];

        for (var i = 0; i < progress_data.users.length; i++) {
               for (var l = 0; l < progress_data.users[i].partialSegments.length; l++) {
                    var id = progress_data.users[i].partialSegments[l].segmentId;
                    if (id == segmentId) {
                        userArray.push(progress_data.users[i].user);
                        break;
                    }
                }
        }
        return userArray;
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
            userCompleteMiles = 0,
            userPartialMiles = 0;

        for (var i = 0; i < progress_data.users.length; i++) {
            userCompleteList = '';
            userPartialList = '';
            userCompleteMiles = 0;
            userPartialMiles = 0;

            userName = progress_data.users[i].user;
            userHTML += '<div class="user_container">';
            userHTML += '<h4>Hiker ' + progress_data.users[i].user + '</h4>';
            for (var j = 0; j < ice_age_data.length; j++) {


                for (var k = 0; k < progress_data.users[i].completedSegmentIds.length; k++) {
                    var id = progress_data.users[i].completedSegmentIds[k];
                    if (id == ice_age_data[j].segment_id) {

                        userCompleteList += '<div class="segment_name">' + ice_age_data[j].segment + '</div>';
                        userCompleteMiles += parseFloat(ice_age_data[j].iceagetraildistance);
                        break;
                    }
                }

                for (var l = 0; l < progress_data.users[i].partialSegments.length; l++) {
                    var id = progress_data.users[i].partialSegments[l].segmentId;
                    if (id == ice_age_data[j].segment_id) {
                        userPartialList += '<div class="user_segment_container">';
                        userPartialList += '<div class="segment_name">' + ice_age_data[j].segment + '</div>';
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
            userHTML += '</div>';

            userHTML += '</div>';
        } //END USER LOOP

        $('#progress_view').html(userHTML);
    },
    /*
    ******************
    Attach Event Listeners
    ******************
    */
    attachEventListeners: function() {
        //CHANGE SEGMENT ON CLICK
        $('#segment_filter').on('click', 'a', function(e) {
            e.preventDefault();

            var segment = $(this).attr('href');

            $('#segment_filter li').removeClass('selected');
            $(this).parent('li').addClass('selected');

            $('.county').hide();
            $('.county[data-index="' + segment + '"]').show();

            if(!$('.county[data-index="' + segment + '"]').attr('data-loaded')){
                $('.county[data-index="' + segment + '"]').find(".getDistance").each(function() {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.position.coords.latitude, iceAge.position.coords.longitude, $(this).attr('data-lat'),  $(this).attr('data-long') );
                });
            }

            $('.county[data-index="' + segment + '"]').attr('data-loaded', 'true');

            $('html, body').animate({
        	    scrollTop: 0 
        	});
        });

        //CHANGE SEGMENT SELECT BOX;
        $('body').on('change', '#segment_filter_container select', function(){ 
            var segment = $(this).val();

            $('.county').hide();
            $('[data-index="' + segment + '"]').show(); 

            if(!$('.county[data-index="' + segment + '"]').attr('data-loaded')){
                $('.county[data-index="' + segment + '"]').find(".getDistance").each(function() {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.position.coords.latitude, iceAge.position.coords.longitude, $(this).attr('data-lat'),  $(this).attr('data-long') );
                });
            }

            $('.county[data-index="' + segment + '"]').attr('data-loaded', 'true');
        });

        $('nav').on('click', '.nav_item', function(e){
            $('.view').hide();
            $('.nav_item').removeClass('selected');

            $(this).addClass('selected');
            $('#' + $(this).attr('id') + '_view').show();

        });

        //ARROW THROUGH COUNTIES ON SEGMENT VIEW
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
    },
};

$(document).ready(function() {
    //iceAge.init();
    
});