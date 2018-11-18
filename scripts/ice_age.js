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
    secondaryPosition: '',
    usingTrelloData: true,
    boardId: "DVxLVaPD",
    unfinishedListId: "58af2c5dd7bafea5adf572d4",
    partialListId: "58af2c61471ef75d38fc78d4",
    completeListId: "58af2c62a582aace8e45d928",
    trelloCompleteArray: [],
    trelloPartialArray: [],
    trelloCounter: 0,
    useGeo: false,

    /*
    ******************
    Start of App
    ******************
    */
    init: function() {
        var loc = window.location.host,
            parameters = window.location.search;

        if (('webkitSpeechRecognition' in window)) {
            $('#microphone').show();
        }

        //IF NOT WORKING LOCALLY
        if (loc.includes('afneve')) {
            iceAge.useGeo = true;

            if(parameters.includes('disableData')){
                iceAge.usingTrelloData = false;
            }
        }
        else{
            iceAge.usingTrelloData = false
        }

        if (iceAge.usingTrelloData) {
            iceAge.AuthenticateTrello();
            if(!iceAge.usingTrelloData){
                iceAge.loadApp();
            }
        } else {
            iceAge.loadApp();
        }

    },
    AuthenticateTrello: function() {
        iceAge.usingTrelloData = false;
		if(typeof Trello != 'undefined'){
			Trello.authorize({
				name: "Ice Age",
				type: "redirect",
				expiration: "never",
				persist: true,
				iteractive: true,
                return_url: "https://afneve.github.io/iceage/",
                callback_method: "fragment", 
				key: "a4e071c48e784cee49ab732a869095d6",
				success: function() {
					iceAge.usingTrelloData = true;
					iceAge.updateLoggedIn();
					var token = Trello.token();
					iceAge.loadTrelloData();
				},
				error: function(e) {
                    alert("ERROR");
					iceAge.usingTrelloData = false;
					console.log(e);
					iceAge.loadApp();
				},
				scope: {
					read: true
				},
			});
		}
    },
    updateLoggedIn: function() {
        //Trello.unauthorize();
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);
    },
    loadTrelloData: function() {
        var completeId = '',
            completeExtra = '',
            partialId = '',
            partialExtra = '';

        Trello.get("lists/" + iceAge.completeListId + "/cards", function(cl) {
            var tempArray = [];

            iceAge.trelloCompleteArray = [];

            for (var i = 0; i < cl.length; i++) {
                tempArray = cl[i].desc.split('|');
                completeId = tempArray[0];
                completeExtra = tempArray[1];

                if (completeId !== "") {
                    completeId = completeId.split(':')[1].trim();
                }
                if (completeExtra !== "") {
                    completeExtra = completeExtra.trim();
                }

                var complete = {
                    segmentId: completeId,
                    dateOfCompletion: completeExtra
                };
                iceAge.trelloCompleteArray.push(complete);
            }


            Trello.get("lists/" + iceAge.partialListId + "/cards", function(pl) {
                var tempArray = [];

                iceAge.trelloPartialArray = [];

                for (var j = 0; j < pl.length; j++) {
                    tempArray = pl[j].desc.split('|');
                    partialId = tempArray[0];
                    partialExtra = tempArray[1];
                    if (partialId !== "") {
                        partialId = partialId.split(':')[1].trim();
                    }
                    if (partialExtra !== "") {
                        partialExtra = partialExtra.trim();
                    }

                    var partial = {
                        segmentId: partialId,
                        notes: partialExtra
                    };
                    iceAge.trelloPartialArray.push(partial);

                }

                for (var u = 0; u < progress_data.users.length; u++) {
                    if (progress_data.users[u].userId == 2) {
                        progress_data.users[u].completedSegments = iceAge.trelloCompleteArray;
                        progress_data.users[u].partialSegments = iceAge.trelloPartialArray;
                    }
                }

                iceAge.loadApp();
            });

        });

    },
    loadApp: function() {
        var parameters = window.location.search;
        if (navigator.geolocation && iceAge.useGeo) {
            navigator.geolocation.getCurrentPosition(function(position) {
                iceAge.position = position;

                if(parameters.includes('lat') && parameters.includes('long')){
                    var lat = parseFloat(parameters.substring(parameters.indexOf('lat=') + 4, parameters.indexOf('&long')));
                    var long = parseFloat(parameters.substring(parameters.indexOf('long=') + 5, parameters.length));
                    var latLongObj = {'latitude': lat, 'longitude': long};

                    iceAge.secondaryPosition = latLongObj;
                }
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
            weatherHTML = '',
            previousSection = '',
            nextSection = '',
            difficulty = '',
            usersCompleteArray = [],
            usersPartialArray = [],
            countyCompleteArray = [],
            countyCounter = 1,
            allComplete = true;

        selectHTML += '<select>';

        iceAge.totalSegments = ice_age_data.length;

        for (var i = 0; i < ice_age_data.length; i++) {
            ice_age_data[i].segment_id = i + 1;

            
            usersCompleteArray = iceAge.usersWhoHaveCompletedSegment(i + 1);
            usersPartialArray = iceAge.usersWhoHavePartialSegment(i + 1);

            iceAge.totalTrailDistance += parseFloat(ice_age_data[i].iceagetraildistance);
            
            if ($.inArray('E', usersCompleteArray) > -1 && allComplete) {
                allComplete = true;
            }
            else{
                allComplete = false;
            }

            //console.log(allComplete);

            //IF NEW COUNTY
            if (ice_age_data[i].booksection != previousSection) {

                if (usersCompleteArray.length == 1) {
                    allComplete = true;
                }
                if (i === 0) {
                    segmentHTML += '<div class="county" data-index="' + countyCounter + '">';
                } else {
                    segmentHTML += '<div class="county hide" data-index="' + countyCounter + '">';
                }

                if(ice_age_data[i].booksection.includes('/')){
                    weatherHTML = ice_age_data[i].booksection.split('/')[1];
                }
                else if(ice_age_data[i].booksection.includes('&')){
                    weatherHTML = ice_age_data[i].booksection.split('&')[1];
                }
                else{
                    weatherHTML = ice_age_data[i].booksection;
                }

                segmentHTML += '<h2 class="county_name"><a target="_blank" href ="https://www.google.com/#q=' + weatherHTML + '+wi+weather">' + ice_age_data[i].booksection + '</a></h2>';

                if (i === 0) {
                    filterHTML += '<li class="selected">';
                } else {
                    filterHTML += '<li>';
                }
                selectHTML += '<option value="' + countyCounter + '">' + ice_age_data[i].booksection + '</option>';
                filterHTML += '<a data-index="' + countyCounter + '" href="' + countyCounter + '">' + ice_age_data[i].booksection + '</a>';
                filterHTML += '</li>';

                countyCounter++;
            }

            segmentHTML += '<div class="segment_container">';
            segmentHTML += '<div class="segment" data-index="' + (i + 1) + '">';
            segmentHTML += '<h3 class="segment_name">' + ice_age_data[i].segment + '</h3>';
            for (var u = 0; u < usersCompleteArray.length; u++) {
                segmentHTML += '<div class="progressBarContainer">';
                segmentHTML += '<div class="progressBar" style="width:100%"></div>';
                segmentHTML += '</div>';
            }
            for (var up = 0; up < usersPartialArray.length; up++) {
                segmentHTML += '<div class="progressBarContainer">';
                segmentHTML += '<div class="progressBar" style="width:50%"></div>';
                segmentHTML += '</div>';
            }
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
            segmentHTML += '<div>Connecting route distance: ' + ice_age_data[i].connectingroutedistance + '</div>';

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
                        segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + eastLat + 'N+' + eastLong + 'W/' + westLat + 'N+' + westLong + 'W">Beginning to End</a>';
                    }

                    if (iceAge.position !== '') {
                        if (westLat !== '') {
                            segmentHTML += '<div class="location_based_info">';
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + westLat + 'N+' + westLong + 'W">Directions to West End</a>';
                            segmentHTML += '<div class="getDistance" data-lat="' + westLat + '" data-long="' + westLong + '"></div>';
                            if(iceAge.secondaryPosition !== ''){
                                segmentHTML += '<div class="secondary_location">'
                                segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.secondaryPosition.latitude + '+' + iceAge.secondaryPosition.longitude + '/' + westLat + 'N+' + westLong + 'W">Secondary Directions to West End</a>';
                                segmentHTML += '<div class="getSecondaryDistance" data-lat="' + westLat + '" data-long="' + westLong + '"></div>';
                                segmentHTML += '</div>';
                            }
                            segmentHTML += '</div>';
                        }

                        if (eastLat !== '') {
                            segmentHTML += '<div class="location_based_info">';
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + eastLat + 'N+' + eastLong + 'W">Directions to East End</a>';
                            segmentHTML += '<div class="getDistance" data-lat="' + eastLat + '" data-long="' + eastLong + '"></div>';
                            if(iceAge.secondaryPosition !== ''){
                                segmentHTML += '<div class="secondary_location">'
                                segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.secondaryPosition.latitude + '+' + iceAge.secondaryPosition.longitude + '/' + eastLat + 'N+' + eastLong + 'W">Secondary Directions to East End</a>';
                                segmentHTML += '<div class="getSecondaryDistance" data-lat="' + eastLat + '" data-long="' + eastLong + '"></div>';
                                segmentHTML += '</div>';
                            }
                            segmentHTML += '</div>';
                        }
                        
                    }

                    segmentHTML += '</div>';
                }
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

                if (allComplete) {
                    countyCompleteArray.push(countyCounter - 1);
                }
            }

            previousSection = ice_age_data[i].booksection;
            usersCompleteArray = [];
        }

        selectHTML += '</select>';

        $('#segment_list').html(segmentHTML);
        $('#segment_filter ul').html(filterHTML);
        $('#segment_filter_container').append(selectHTML);
        
        for (var cc = 0; cc < countyCompleteArray.length; cc++) {
            $('#segment_filter li a[data-index="' + countyCompleteArray[cc] + '"]').parent('li').addClass('complete');
            $('#segment_list .county[data-index="' + countyCompleteArray[cc] + '"]').addClass('complete');
        }

        iceAge.displayUserProgress();
    },

    displayInfoWithIcon: function(stringValue, value) {
        var readableType = stringValue,
            className = stringValue.toLowerCase(),
            html = '';

        if (stringValue == 'potablewater') {
            readableType = 'potable water';
        }
        if (value.trim() !== '') {
            html += '<div data-icon="' + className + '" class="yes segment_details">';
            html += '<span>' + readableType + '</span><i class="fas fa-check-circle"></i>';
            html += '</div>';
        } else {
            html += '<div data-icon="' + className + '" class="no segment_details">';
            html += '<span>' + readableType + '</span><i class="fas fa-times-circle"></i>';
            html += '</div>';
        }

        return html;
    },

    getDistanceFromCurrentLocation: function(htmlElement, currentPosLat, currentPosLong, destLat, destLong, secondary) {

        var origin = new google.maps.LatLng(currentPosLat, currentPosLong);
        var destination = new google.maps.LatLng(destLat, -(destLong));
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function(response, status) {
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

                        if(!secondary){
                            $(htmlElement).html("<div>Drive Distance: " + distance + "</div><div>Drive Time: " + duration + "</div>");      
                        }
                        else{
                            $(htmlElement).html("<div>Other Drive Distance: " + distance + "</div><div>Other Drive Time: " + duration + "</div>");
                        }
                        
                    }
                }
            }
        });
    },

    convertCoord: function(coord) {
        var decimalCoord;
        var degree = 0,
            min = 0;

        if (coord !== '') {
            coord = coord.split(' ');
            degree = parseFloat(coord[0]);
            min = parseFloat(coord[1]);

            decimalCoord = degree + (min / 60);

            return decimalCoord;
        }
    },

    getDifficultyLevel: function(iceAgeDistance, shortCutoff, midCutoff) {
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

    usersWhoHaveCompletedSegment: function(segmentId) {
        var userArray = [],
            users = progress_data.users;



        for (var i = 0; i < users.length; i++) {
            for (var k = 0; k < users[i].completedSegments.length; k++) {
                var id = users[i].completedSegments[k].segmentId;

                if (id == segmentId) {
                    userArray.push(users[i].user);
                    break;
                }
            }
        }

        return userArray;
    },

    usersWhoHavePartialSegment: function(segmentId) {
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
        var progressHTML = '',
            userCompleteList = '',
            userPartialList = '',
            userCompleteMiles = 0,
            userPartialMiles = 0,
            userCompleteSegments = 0,
            countyComplete = false,
            countyHTML = '',
            users = progress_data.users;

        //LOOP THROUGH USERS
        for (var i = 0; i < users.length; i++) {
            userCompleteList = '';
            userPartialList = '';
            userCompleteMiles = 0;
            userPartialMiles = 0;
            userCompleteSegments = 0;
            countyComplete = false;
            
            progressHTML += '<div class="user_container">';

            //LOOP THROUGH COUNTIES
            for (var a = 0; a < county_data.length; a++) {
                var segmentHTML = '',
                    countyDistance = 0,
                    countyCompletedDistance = 0;

                segmentHTML += '<div class="countySegments">';

                // LOOP THROUGH SEGMENTS
                for (var b = 0; b < ice_age_data.length; b++) {

                    // ONLY LOOP THROUGH SEGMENTS THAT ARE IN THE CURRENT COUNTY
                    if(ice_age_data[b].countyId == county_data[a].countyId) {
                        countyComplete = true;
                        
                        // KEEP TRACK OF MILES IN COUNTY
                        countyDistance += parseFloat(ice_age_data[b].iceagetraildistance);
                        segmentHTML += '<div class="segment_name">' + ice_age_data[b].segment;
                        

                        // [1, 2]
                        // [1, 3, 5]
                        // LOOP THROUGH USERS COMPLETED SEGMENTS TO SEE IF THEY COMPLETED CURRENT SEGMENT
                        for(var c = 0; c < users[i].completedSegments.length; c++) {
                            if(users[i].completedSegments[c].segmentId == ice_age_data[b].segment_id){
                                userCompleteMiles += parseFloat(ice_age_data[b].iceagetraildistance);
                                countyCompletedDistance += parseFloat(ice_age_data[b].iceagetraildistance);
                                segmentHTML += '<span class="completion_data"> (' + users[i].completedSegments[c].dateOfCompletion + ')</span>';
                                userCompleteSegments++;

                                countyComplete = countyComplete ? true : false;
                                break;
                            } else {
                                countyComplete = false;
                            }
                        }
                        for(var d = 0; d < users[i].partialSegments.length; d++) {
                            if(users[i].partialSegments[d].segmentId == ice_age_data[b].segment_id){
                                userPartialMiles += parseFloat(ice_age_data[b].iceagetraildistance);
                                segmentHTML += '<div class="seg_notes">' + users[i].partialSegments[d].notes + '</div>'
                                break;
                            }
                        }

                        segmentHTML += '</div>';
                        
                       
                    }
                    
                }
                segmentHTML += '<div class="more_info" data-index="' + county_data[a].countyId + '">View county details <i class="fas fa-arrow-alt-circle-right"></i></div>'
                segmentHTML += '</div>';
                // segmentHTML += "countComplete- " + countyComplete;

                countyHTML += '<div class="countyContainer">';
                countyHTML += '<h3>' + county_data[a].countyName + '</h3>';
                // countyHTML += countyDistance + ' miles';
                countyHTML += '<div class="progressBarContainer">';
                countyHTML += '<div class="progressBar" style="width:' + parseFloat(countyCompletedDistance) / countyDistance * 100 + '%"></div>';
                countyHTML += '</div>';
                countyHTML += segmentHTML;
                countyHTML += '</div>';
                
            }

            progressHTML += '<div class="user_segments">';
            progressHTML += '<h2 class="user_miles_remaining">' + (parseFloat(iceAge.totalTrailDistance) - parseFloat(userCompleteMiles.toFixed(2))) + ' miles to go</h2>';
           
            progressHTML += '<div>' + parseFloat(userCompleteMiles.toFixed(2)) + ' of ' + iceAge.totalTrailDistance + ' miles completed</div>';
            progressHTML += '<div>' + (iceAge.totalSegments - users[i].completedSegments.length) + ' segments remaining</div>';
            progressHTML += '<div>' + parseFloat(userPartialMiles.toFixed(2)) + ' miles of partially completed segments</div>';
            
            progressHTML += '</div>';

            progressHTML += '<div class="user_segments">';
            progressHTML += '<div class="counties">' + countyHTML + '</div>';
            progressHTML += '</div>';
            
            progressHTML += '</div>';
        } //END USER LOOP

        $('#progress_view').html(progressHTML);
    },
    enableSpeech: function() {
        console.log("enabled");
        var ignore_onend;

        // new instance of speech recognition
        var recognition = new webkitSpeechRecognition();
        // set params
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.start();
        $('#microphone').addClass('active');

        recognition.onresult = function(event) {
            $('#microphone').removeClass('active');
            // delve into words detected results & get the latest
            // total results detected
            console.log(event.results);
            
            var resultsLength = event.results.length - 1;

            // get length of latest results
            var ArrayLength = event.results[resultsLength].length - 1;

            // get last word detected
            var saidWord = event.results[resultsLength][ArrayLength].transcript;
            saidWord = saidWord.trim().toLowerCase();

            console.log(saidWord);

            for (var i = 0; i < ice_age_data.length; i++) {
                //console.log(ice_age_data[i].booksection);
                // console.log(ice_age_data[i].segment);
                if(ice_age_data[i].booksection.toLowerCase().includes(saidWord)) {
                    // alert(saidWord);
                }

                if(ice_age_data[i].segment.toLowerCase().includes(saidWord)) {
                    console.log(ice_age_data[i].countyId);
                    $('#segments').click();
                    $('#segment_filter a[data-index="' + ice_age_data[i].countyId + '"]').click();
                    $('select').val(ice_age_data[i].countyId);
                    console.log(i);
                    $('html, body').animate({
                        scrollTop: $('#segments_view .segment[data-index="' + (i+1) + '"]').position().top - $('nav').height() - 20
                    }, 0);
                    // alert(saidWord);
                }
            }
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
            $('#microphone').removeClass('active');
            var ignore_onend = true; 
        console.log(ignore_onend);
            if (ignore_onend) {
                console.log("RETURN");
                // recognition.start();
            return false;
            }
        }
    },
    /*
    ******************
    Attach Event Listeners
    ******************
    */
    attachEventListeners: function() {
        $('#segment_list').on('click', '[data-icon="restrooms"].yes', function() {
            var segmentIndex = $(this).closest('.segment').attr('data-index');
            var heading = '<h4 class="overlay_heading">' + ice_age_data[segmentIndex - 1].segment + ' ' + $(this).text() + '</h4>';
            iceAge.openOverlay(heading + ice_age_data[segmentIndex - 1].restrooms);
        });

        $('#segment_list').on('click', '[data-icon="potablewater"].yes', function() {
            var segmentIndex = $(this).closest('.segment').attr('data-index');
            var heading = '<h4 class="overlay_heading">' + ice_age_data[segmentIndex - 1].segment + ' ' + $(this).text() + '</h4>';
            iceAge.openOverlay(heading + ice_age_data[segmentIndex - 1].potablewater); 
        });

        //CHANGE SEGMENT ON CLICK
        $('#segment_filter').on('click', 'a', function(e) {
            e.preventDefault();

            var segment = $(this).attr('href');

            $('#segment_filter li').removeClass('selected');
            $(this).parent('li').addClass('selected');

            $('.county').hide();
            $('.county[data-index="' + segment + '"]').show();

            if (!$('.county[data-index="' + segment + '"]').attr('data-loaded')) {
                $('.county[data-index="' + segment + '"]').find(".getDistance").each(function() {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.position.coords.latitude, iceAge.position.coords.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), false);
                });
                $('.county[data-index="' + segment + '"]').find(".getSecondaryDistance").each(function() {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.secondaryPosition.latitude, iceAge.secondaryPosition.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), true);
                });

            }

            $('.county[data-index="' + segment + '"]').attr('data-loaded', 'true');

            //$('#segment_filter_container select option[value="' + segment + '"]')

            $('html, body').animate({
                scrollTop: 0
            });
        });

        //CHANGE SEGMENT SELECT BOX;
        $('body').on('change', '#segment_filter_container select', function() {
            var segment = $(this).val();

            $('.county').hide();
            $('[data-index="' + segment + '"]').show();

            $('#segment_filter li').removeClass('selected');
            $('#segment_filter li a[data-index="' + segment + '"]').parent('li').addClass('selected');

            if (!$('.county[data-index="' + segment + '"]').attr('data-loaded')) {
                $('.county[data-index="' + segment + '"]').find(".getDistance").each(function() {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.position.coords.latitude, iceAge.position.coords.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), false);
                });
                $('.county[data-index="' + segment + '"]').find(".getSecondaryDistance").each(function() {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.secondaryPosition.latitude, iceAge.secondaryPosition.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), true);
                });
            }

            $('.county[data-index="' + segment + '"]').attr('data-loaded', 'true');
        });

        $('#ice_age').on('click', '.countyContainer h3', function() {
            $(this).parent().find('.countySegments').toggle();
        });

        $('#ice_age').on('click', '.more_info', function() {
            $('#segments').click();
            $('html, body').animate({
                scrollTop: 0
            }, 0);
            $('#segment_filter a[data-index="' + $(this).attr('data-index') + '"]').click();
        });

        $('nav').on('click', '.nav-item', function(e) {

            if($(this).attr('id') == 'microphone'){
                iceAge.enableSpeech();
                return false;
            }
            $('.view').hide();
            $('.nav-item').removeClass('selected');

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
        });
    },
    openOverlay: function(overlayHTML){
        var $overlay = $('#ice_age_overlay');

        $('body').prepend('<div id="overlay_screen"></div>');
        $overlay.html(overlayHTML);
        
        var overlayHeight = $overlay.height();

        $('#overlay_screen').height($(window).height())
        $overlay.css("top", $(window).height() / 2 - overlayHeight / 2);
        $overlay.show();

        $('#overlay_screen').one('click', iceAge.closeOverlay);
    },
    closeOverlay: function(){
        $('#overlay_screen').remove();
        $('#ice_age_overlay').hide();
    }
};