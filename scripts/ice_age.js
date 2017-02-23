"use strict";

var iceAge = {
    iconArray: ["potablewater", "restrooms"],
    totalTrailDistance: 0,
    totalSegments: 0,
    distanceArray: [],
    distanceObject: {},
    elevationArray: [],
    elevationObject: {},
    ruggednessArray: [],
    ruggednessObject: {},
    position: '',
	usingTrelloData: false,
	boardId: "DVxLVaPD", 
    unfinishedListId: "58af2c5dd7bafea5adf572d4",   
    permissionId: ["id1", "id2"], 
    trelloCounter: 0,
    useGeo: false,

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
		
		iceAge.AuthenticateTrello();

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
	
	AuthenticateTrello: function(){
		Trello.authorize({
            name: "Ice Age",
            type: "popup",
            expiration: "never",
            persist: true,
            iteractive: true,
            key: "a4e071c48e784cee49ab732a869095d6",
            success: function() {
                iceAge.onAuthorizeSuccessful();
            },
            error: function(e) {
                console.log(e);
            },
            scope: {

                write: true,
                read: true
            },
        });
	},
	
	onAuthorizeSuccessful: function(){
		iceAge.updateLoggedIn();
        var token = Trello.token();

        iceAge.usingTrelloData = true;
	},

	updateLoggedIn: function(){
		 //Trello.unauthorize();
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);
	}, 
	createTrelloCards: function() {
            ///var id = idFromData;
			//var segment = segmentFromData;
            //var desc = "";

            
            if(iceAge.trelloCounter < ice_age_data.length){
                var segment = ice_age_data[iceAge.trelloCounter].segment;
                var id = ice_age_data[iceAge.trelloCounter].segment_id;
                
                Trello.post("cards?name=" + segment + "&idList=" + iceAge.unfinishedListId + "&desc=ID: " + id + " |", function(d) {  
                        iceAge.trelloCounter++;
						iceAge.createTrelloCards();
			    });
            }
     },
	 debug: function(){
			 $("#title").text("Debugging");

                Trello.get("boards/" + iceAge.boardId + "/lists/", function(d) {
                    console.log("LIST ID | LIST NAME")
                    for (s in d) {
                        console.log(d[s].id + " | " + d[s].name);
                    }

                    Trello.get("lists/" + iceAge.unfinishedListId + "/cards", function(d) {
                        //Get cards in completed lists	
                        console.log(d);

                    });
                });
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
            usersCompleteArray = [],
            usersPartialArray = [],
            countyCompleteArray = [],
            countyCounter = 1;

        selectHTML += '<select>';

        iceAge.totalSegments = ice_age_data.length;

        for (var i = 0; i < ice_age_data.length; i++) {
            ice_age_data[i].segment_id = i + 1;

            usersCompleteArray = iceAge.usersWhoHaveCompletedSegment(i + 1);
            usersPartialArray = iceAge.usersWhoHavePartialSegment(i + 1);

            iceAge.totalTrailDistance += parseFloat(ice_age_data[i].iceagetraildistance);

            //IF NEW COUNTY
            if (ice_age_data[i].booksection != previousSection) {
                if (i === 0) {
                    segmentHTML += '<div class="county" data-index="' + countyCounter + '">';
                } else {
                    segmentHTML += '<div class="county hide" data-index="' + countyCounter + '">';
                }
                
                segmentHTML += '<h2 class="county_name">' + ice_age_data[i].booksection + '</h2>';

                if (i === 0) {
                    filterHTML += '<li class="selected">';
                } else {
                    filterHTML += '<li>';
                }
                selectHTML += '<option value="' + countyCounter + '">' + ice_age_data[i].booksection + '</option>';
                filterHTML += '<a data-index="'+ countyCounter +'" href="' + countyCounter + '">' + ice_age_data[i].booksection + '</a>';
                filterHTML += '</li>';

                countyCounter++;
            }

            segmentHTML += '<div class="segment_container">';
            segmentHTML += '<div class="segment" data-index="' + ( i + 1 ) + '">';
            segmentHTML += '<h3 class="segment_name">' + ice_age_data[i].segment + '</h3>';
            segmentHTML += '<div class="segment_summary">' + ice_age_data[i].summary + '</div>';

            
            segmentHTML += '<div class="segment_info">';

            difficulty = iceAge.getDifficultyLevel(parseFloat(ice_age_data[i].iceagetraildistance), iceAge.distanceObject.shortCutoff, iceAge.distanceObject.midCutoff);          
            segmentHTML += '<div class="' + difficulty + '">Distance: ' + ice_age_data[i].iceagetraildistance + '</div>';

            difficulty = iceAge.getDifficultyLevel(parseFloat(ice_age_data[i].elevation), iceAge.elevationObject.shortCutoff, iceAge.elevationObject.midCutoff);          
            segmentHTML += '<div class="' + difficulty + '">Elevation: ' + ice_age_data[i].elevation + '</div>';

            difficulty = iceAge.getDifficultyLevel(parseFloat(ice_age_data[i].ruggedness), iceAge.ruggednessObject.shortCutoff, iceAge.ruggednessObject.midCutoff);          
            segmentHTML += '<div class="' + difficulty + '">Ruggedness: ' + ice_age_data[i].ruggedness + '</div>';

            segmentHTML += iceAge.displayInfoWithIcon('potablewater', ice_age_data[i].potablewater);
            segmentHTML += iceAge.displayInfoWithIcon('restrooms', ice_age_data[i].restrooms);

            

            segmentHTML += '<div class="atlas">Atlas Map: ' + ice_age_data[i].atlasmap + '</div>';
            
            /*
            *Loop to get Coordinates for Segment and display links
            */
            for (var j = 0; j < segment_id_location_data.length; j++) {
                if (segment_id_location_data[j].segment_id == ice_age_data[i].segment_id) {
                    var eastLat = iceAge.convertCoord(segment_id_location_data[j].eastLat),
                        eastLong = iceAge.convertCoord(segment_id_location_data[j].eastLong),
                        westLat = iceAge.convertCoord(segment_id_location_data[j].westLat),
                        westLong = iceAge.convertCoord(segment_id_location_data[j].westLong);

                    segmentHTML += '<div class="map">';
                    if (westLat !== '') {
                        segmentHTML += '<div class="terminus_container">Western Terminus: <a class="location" target="_blank" href="https://www.google.com/maps/place/' + westLat + 'N+' + westLong + 'W" >' + ice_age_data[i].westernterminus + ' ( ' + segment_id_location_data[j].west_gps_id + ' )</a></div>';
                    }
                    if (eastLat !== '') {
                        segmentHTML += '<div class="terminus_container">Eastern Terminus: <a class="location" target="_blank" href="https://www.google.com/maps/place/' + eastLat + 'N+' + eastLong + 'W" >' + ice_age_data[i].easternterminus + ' ( ' + segment_id_location_data[j].east_gps_id + ' )</a></div>';
                    }
                    if (eastLat !== '' && westLat !== '') {
                        //egmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + eastLat + 'N+' + eastLong + 'W/' + westLat + 'N+' + westLong + 'W">Beginning to End</a>';
                    }

                    if (iceAge.position !== '') {
                        if (westLat !== '') {
                            segmentHTML += '<div class="location_based_info">';
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + westLat + 'N+' + westLong + 'W">Directions to West End</a>';
                            segmentHTML += '<div class="getDistance" data-lat="' + westLat + '" data-long="' + westLong + '"></div>';
                            segmentHTML += '</div>';
                        }
                        if (eastLat !== '') {
                            segmentHTML += '<div class="location_based_info">';
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

            for(var u = 0; u < usersCompleteArray.length; u++){
                segmentHTML += '<div class="badge" data-complete="'+ usersCompleteArray[u] +'"><img src="./images/' + usersCompleteArray[u] + '-complete.svg" alt="" /><span class="badge_label">' + usersCompleteArray[u] + '</span></div>';
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

                if(usersCompleteArray.length == 2){
                    countyCompleteArray.push(countyCounter - 1);
                }
            }

            previousSection = ice_age_data[i].booksection;
        }

        selectHTML += '</select>';

        $('#segment_list').html(segmentHTML);
        $('#segment_filter ul').html(filterHTML);
        $('#segment_filter_container').append(selectHTML);

        for(var cc = 0; cc < countyCompleteArray.length; cc++){
             $('#segment_filter li a[data-index="' + countyCompleteArray[cc] + '"]').parent('li').addClass('complete');
        }
                   

        iceAge.displayUserProgress();
    },

    displayInfoWithIcon: function(stringValue, value){
                var readableType = stringValue,
                    className = stringValue.toLowerCase(),
                    html = '';

                if (stringValue == 'potablewater') {
                    readableType = 'potable water';
                }
                if (value.trim() !== '') {
                    html += '<div data-icon="' + className + '" class="segment_details">';
                    html += '<span class="yes">' + readableType + ':</span>';
                    html += '</div>';
                } else {
                    html += '<div data-icon="' + className + '" class="segment_details">';
                    html += '<span class="no">' + readableType + ':</span>';
                    html += '</div>';
                }

                return html;
    }, 

    getDistanceFromCurrentLocation : function(htmlElement, currentPosLat, currentPosLong, destLat, destLong){
        var origin = new google.maps.LatLng(currentPosLat,currentPosLong);
        var destination = new google.maps.LatLng(destLat,-(destLong));
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
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
            coord = coord.split(' ');
            degree = parseFloat(coord[0]);
            min = parseFloat(coord[1]);

            decimalCoord = degree + (min/60);
            
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
                for (var k = 0; k < progress_data.users[i].completedSegments.length; k++) {
                    var id = progress_data.users[i].completedSegments[k].segmentId;
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
            userPartialMiles = 0,
            userCompleteSegments = 0;

        for (var i = 0; i < progress_data.users.length; i++) {
            userCompleteList = '';
            userPartialList = '';
            userCompleteMiles = 0;
            userPartialMiles = 0;
            userCompleteSegments = 0;

            userName = progress_data.users[i].user;
            userHTML += '<div class="user_container">';
            userHTML += '<h2>Hiker ' + progress_data.users[i].user + '</h2>';
            for (var j = 0; j < ice_age_data.length; j++) {

                for (var k = 0; k < progress_data.users[i].completedSegments.length; k++) {
                    var id = progress_data.users[i].completedSegments[k].segmentId;
                    if (id == ice_age_data[j].segment_id) {
                        userCompleteList += '<div class="segment_name">' + ice_age_data[j].segment + ' <span class="completion_data">( ' + progress_data.users[i].completedSegments[k].dateOfCompletion + ' )</span></div>';
                        userCompleteMiles += parseFloat(ice_age_data[j].iceagetraildistance);
                        userCompleteSegments++;

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
            userHTML += '<div>Distance of partially completed segments: ' + userPartialMiles + ' miles</div>';
            userHTML += '<div>' + parseFloat(userCompleteMiles.toFixed(2)) + ' of ' + iceAge.totalTrailDistance + ' miles completed</div>';
            userHTML += '<div>' + (iceAge.totalSegments - userCompleteSegments) + ' segments remaining</div>';

            userHTML += '<div class="user_miles_remaining">' + (parseFloat(iceAge.totalTrailDistance) - parseFloat(userCompleteMiles.toFixed(2))) + ' miles remaining</div>';
            userHTML += '</div>';



            userHTML += '<div class="user_segments">';
            userHTML += '<h3 class="user_header">Completed Segments ( ' + progress_data.users[i].completedSegments.length + ' )</h3>';
            userHTML += userCompleteList;
            userHTML += '</div>';

            userHTML += '<div class="user_segments">';
            userHTML += '<h3 class="user_header">Partially Completed Segments ( ' + progress_data.users[i].partialSegments.length + ' )</h3>';
            userHTML += userPartialList;
            userHTML += '</div>';
/*
            userHTML += '<div class="user_segments">';
            userHTML += '<h3 class="user_header">Distance:</h3>';
            userHTML += '<div>Distance of partially completed segments: ' + userPartialMiles + ' miles</div>';
            userHTML += '<div>' + parseFloat(userCompleteMiles.toFixed(2)) + ' of ' + iceAge.totalTrailDistance + ' miles completed</div>';
            userHTML += '<div>' + (iceAge.totalSegments - userCompleteSegments) + ' segments remaining</div>';

            userHTML += '<div class="user_miles_remaining">' + (parseFloat(iceAge.totalTrailDistance) - parseFloat(userCompleteMiles.toFixed(2))) + ' miles remaining!</div>';
            userHTML += '</div>';
*/
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
        $('#segment_list').on('click', '[data-icon="restrooms"] .yes', function(){
            var segmentIndex = $(this).closest('.segment').attr('data-index');
            alert(ice_age_data[segmentIndex - 1].restrooms);
        });

        $('#segment_list').on('click', '[data-icon="potablewater"] .yes', function(){
            var segmentIndex = $(this).closest('.segment').attr('data-index');
            alert(ice_age_data[segmentIndex - 1].potablewater);
        });
        
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

            //$('#segment_filter_container select option[value="' + segment + '"]')

            $('html, body').animate({
        	    scrollTop: 0 
        	});
        });

        //CHANGE SEGMENT SELECT BOX;
        $('body').on('change', '#segment_filter_container select', function(){ 
            var segment = $(this).val();

            $('.county').hide();
            $('[data-index="' + segment + '"]').show(); 

            $('#segment_filter li').removeClass('selected');
            $('#segment_filter li a[data-index="' + segment + '"]').parent('li').addClass('selected');

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
            var nextElement = null;
            if (e.keyCode == 39) {
                nextElement = $('#segment_filter li.selected');

                if ($(nextElement).next().length > 0) {
                    $('#segment_filter li').removeClass('selected');
                    $(nextElement).next().addClass('selected');
                    $('#segment_filter li.selected a').click();
                }

            } else if (e.keyCode == 37) {
                nextElement = $('#segment_filter li.selected');

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