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
    init: function () {
        let loc = window.location.host,
            parameters = window.location.search;

        if (('webkitSpeechRecognition' in window)) {
            $('#microphone').show();
        }

        //IF NOT WORKING LOCALLY
        if (loc.includes('afneve')) {
            iceAge.useGeo = true;

            if (parameters.includes('disableData')) {
                iceAge.usingTrelloData = false;
            }
        }
        else {
            iceAge.usingTrelloData = false;
        }

        if (iceAge.usingTrelloData) {
            iceAge.AuthenticateTrello();
            if (!iceAge.usingTrelloData) {
                iceAge.loadApp();
            }
        } else {
            iceAge.loadApp();
        }
    },
    AuthenticateTrello: function () {
        iceAge.usingTrelloData = false;
        if (typeof Trello != 'undefined') {
            Trello.authorize({
                name: "Ice Age",
                type: "redirect",
                expiration: "never",
                persist: true,
                iteractive: true,
                return_url: "https://afneve.github.io/iceage/",
                callback_method: "fragment",
                key: "a4e071c48e784cee49ab732a869095d6",
                success: function () {
                    iceAge.usingTrelloData = true;
                    iceAge.updateLoggedIn();
                    var token = Trello.token();
                    iceAge.loadTrelloData();
                },
                error: function (e) {
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
    updateLoggedIn: function () {
        //Trello.unauthorize();
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);
    },
    loadTrelloData: function () {
        Trello.get("lists/" + iceAge.completeListId + "/cards", function (cl) {
            for (var i = 0; i < cl.length; i++) {
                var complete = iceAge.cleanTrelloData(cl[i]);

                iceAge.trelloCompleteArray.push(complete);
            }

            Trello.get("lists/" + iceAge.partialListId + "/cards", function (pl) {
                for (var j = 0; j < pl.length; j++) {
                    iceAge.trelloPartialArray.push(iceAge.cleanTrelloData(pl[j]));
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
    cleanTrelloData: function (currentListItem) {
        var tempArray = [],
            id = '',
            extra = '';

        tempArray = currentListItem.desc.split('|');
        id = tempArray[0];
        extra = tempArray[1];

        if (id !== "") {
            id = id.split(':')[1].trim();
        }

        if (extra !== "") {
            extra = extra.trim();
        }

        return {
            segmentId: id,
            extraInfo: extra
        }
    },
    loadApp: function () {
        var parameters = window.location.search;
        if (navigator.geolocation && iceAge.useGeo) {
            navigator.geolocation.getCurrentPosition(function (position) {
                iceAge.position = position;

                if (parameters.includes('lat') && parameters.includes('long')) {
                    var lat = parseFloat(parameters.substring(parameters.indexOf('lat=') + 4, parameters.indexOf('&long')));
                    var long = parseFloat(parameters.substring(parameters.indexOf('long=') + 5, parameters.length));
                    var latLongObj = { 'latitude': lat, 'longitude': long };

                    iceAge.secondaryPosition = latLongObj;
                }
                iceAge.dataCollection();
                iceAge.getIceAgeData();
                iceAge.displaySegmentList();
            }, function () {
                iceAge.dataCollection();
                iceAge.getIceAgeData();
                iceAge.displaySegmentList();
            });
        } else {
            iceAge.dataCollection();
            iceAge.getIceAgeData();
            iceAge.displaySegmentList();
        }

        iceAge.attachEventListeners();
    },

    /*
    ******************
    Organize Trail Data into Arrays
    ******************
    */
    dataCollection: function () {
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
    getAverage: function (array, object) {
        var average = 0;

        for (var i = 0; i < array.length; i++) {
            average += array[i];
        }

        average = (average / array.length).toFixed(2);

        object.average = parseFloat(average);

        array.sort(function (a, b) {
            return a - b;
        });

        object.lowest = array[0];
        object.highest = array[array.length - 1];
        object.shortCutoff = parseFloat(((object.average + object.lowest) / 2).toFixed(2));
        object.midCutoff = parseFloat(((object.average + object.highest) / 2).toFixed(2));
    },

    getIceAgeData: function () {
        iceAge.totalSegments = ice_age_data.length;

        for (var i = 0; i < ice_age_data.length; i++) {
            ice_age_data[i].segment_id = i + 1;
            iceAge.totalTrailDistance += parseFloat(ice_age_data[i].iceagetraildistance);
        }
    },

    /*
    ******************
    Retrieves data and put it on the page
    ******************
    */
    displaySegmentList: function () {
        var segmentHTML = '',
            progressHTML = '',
            filterHTML = '',
            selectHTML = '',
            weatherHTML = '',
            difficulty = '',
            usersCompleteArray = [],
            usersPartialArray = [],
            countyCompleteArray = [],
            countyCounter = 1,
            countyHTML = '',
            allComplete = true;

        selectHTML += '<select>';

        //LOOP THROUGH COUNTIES
        for (var a = 0; a < county_data.length; a++) {
            segmentHTML = '';

            var countyDistance = 0,
                countyCompletedDistance = 0,
                countySegmentMatch = [],
                countyComplete = false;

            var segmentsInCounty = ice_age_data.filter(function (curVal) {
                return curVal.countyId == county_data[a].countyId;
            });

            for (var q = 0; q < segmentsInCounty.length; q++) {
                progressHTML = '';
                for (var c = 0; c < progress_data.users.length; c++) {
                    for (var d = 0; d < progress_data.users[c].completedSegments.length; d++) {
                        if (segmentsInCounty[q].segment_id == progress_data.users[c].completedSegments[d].segmentId) {

                            countySegmentMatch.push(segmentsInCounty[q]);

                            progressHTML += `<div class="progressBarContainer" data-complete="true">
                                                <div class="progressBar" style="width:100%"></div>
                                            </div>`;
                        }
                    }
                    for (var e = 0; e < progress_data.users[c].partialSegments.length; e++) {
                        if (segmentsInCounty[q].segment_id == progress_data.users[c].partialSegments[e].segmentId) {
                            progressHTML += `<div class="progressBarContainer">
                                                <div class="progressBar" style="width:50%"></div>
                                            </div>`;
                        }
                    }

                }


                if (segmentsInCounty[q].booksection.includes('/')) {
                    weatherHTML = segmentsInCounty[q].booksection.split('/')[1];
                }
                else if (segmentsInCounty[q].booksection.includes('&')) {
                    weatherHTML = segmentsInCounty[q].booksection.split('&')[1];
                }
                else {
                    weatherHTML = segmentsInCounty[q].booksection;
                }

                segmentHTML += '<div class="segment-container">';
                segmentHTML += '<div class="segment" data-index="' + segmentsInCounty[q].segment_id + '">';
                segmentHTML += '<h3 class="segment-name">' + segmentsInCounty[q].segment + '</h3>';
                segmentHTML += progressHTML;

                segmentHTML += '<div class="segment-summary">' + segmentsInCounty[q].summary + '</div>';

                segmentHTML += '<div class="segment-info">';

                difficulty = iceAge.getDifficultyLevel(parseFloat(segmentsInCounty[q].iceagetraildistance), iceAge.distanceObject.shortCutoff, iceAge.distanceObject.midCutoff);
                segmentHTML += '<div class="' + difficulty + '">Distance: ' + segmentsInCounty[q].iceagetraildistance + '</div>';

                difficulty = iceAge.getDifficultyLevel(parseFloat(segmentsInCounty[q].elevation), iceAge.elevationObject.shortCutoff, iceAge.elevationObject.midCutoff);
                segmentHTML += '<div class="' + difficulty + '">Elevation: ' + segmentsInCounty[q].elevation + '</div>';

                difficulty = iceAge.getDifficultyLevel(parseFloat(segmentsInCounty[q].ruggedness), iceAge.ruggednessObject.shortCutoff, iceAge.ruggednessObject.midCutoff);
                segmentHTML += '<div class="' + difficulty + '">Ruggedness: ' + segmentsInCounty[q].ruggedness + '</div>';

                
                segmentHTML += '<div>Connecting route distance: ' + segmentsInCounty[q].connectingroutedistance + '</div>';

                segmentHTML += '<div class="atlas">Atlas Map: ' + segmentsInCounty[q].atlasmap + '</div>';

                for (var j = 0; j < segment_id_location_data.length; j++) {
                    if (segment_id_location_data[j].segment_id == segmentsInCounty[q].segment_id) {
                        var eastLat = iceAge.convertCoord(segment_id_location_data[j].eastLat),
                            eastLong = iceAge.convertCoord(segment_id_location_data[j].eastLong),
                            westLat = iceAge.convertCoord(segment_id_location_data[j].westLat),
                            westLong = iceAge.convertCoord(segment_id_location_data[j].westLong);

                        segmentHTML += '<div class="map">';
                        if (westLat !== '') {
                            segmentHTML += '<div class="terminus-container">Western Terminus: <a class="location" target="_blank" href="https://www.google.com/maps/place/' + westLat + 'N+' + westLong + 'W" >' + segmentsInCounty[q].westernterminus + ' ( ' + segment_id_location_data[j].west_gps_id + ' )</a></div>';
                        }
                        if (eastLat !== '') {
                            segmentHTML += '<div class="terminus-container">Eastern Terminus: <a class="location" target="_blank" href="https://www.google.com/maps/place/' + eastLat + 'N+' + eastLong + 'W" >' + segmentsInCounty[q].easternterminus + ' ( ' + segment_id_location_data[j].east_gps_id + ' )</a></div>';
                        }
                        if (eastLat !== '' && westLat !== '') {
                            segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + eastLat + 'N+' + eastLong + 'W/' + westLat + 'N+' + westLong + 'W">Beginning to End</a>';
                        }

                        if (iceAge.position !== '') {
                            if (westLat !== '') {
                                segmentHTML += '<div class="location-based-info">';
                                segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + westLat + 'N+' + westLong + 'W">Directions to West End</a>';
                                segmentHTML += '<div class="getDistance" data-lat="' + westLat + '" data-long="' + westLong + '"></div>';
                                if (iceAge.secondaryPosition !== '') {
                                    segmentHTML += '<div class="secondary-location">'
                                    segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.secondaryPosition.latitude + '+' + iceAge.secondaryPosition.longitude + '/' + westLat + 'N+' + westLong + 'W">Secondary Directions to West End</a>';
                                    segmentHTML += '<div class="getSecondaryDistance" data-lat="' + westLat + '" data-long="' + westLong + '"></div>';
                                    segmentHTML += '</div>';
                                }
                                segmentHTML += '</div>';
                            }

                            if (eastLat !== '') {
                                segmentHTML += '<div class="location-based-info">';
                                segmentHTML += '<a class="location" target="_blank" href="https://www.google.com/maps/dir/' + iceAge.position.coords.latitude + '+' + iceAge.position.coords.longitude + '/' + eastLat + 'N+' + eastLong + 'W">Directions to East End</a>';
                                segmentHTML += '<div class="getDistance" data-lat="' + eastLat + '" data-long="' + eastLong + '"></div>';
                                if (iceAge.secondaryPosition !== '') {
                                    segmentHTML += '<div class="secondary-location">'
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

                segmentHTML += '<div class="extra-info">';
                segmentHTML += iceAge.displayInfoWithIcon('potablewater', segmentsInCounty[q].potablewater);
                segmentHTML += iceAge.displayInfoWithIcon('restrooms', segmentsInCounty[q].restrooms);
                segmentHTML += '</div>';

                if (segmentsInCounty[q].nohiking.trim() !== '') {
                    segmentHTML += '<div class="no-hiking">Hiking Restrictions: </div><div>' + segmentsInCounty[q].nohiking + '</div>';
                }

                segmentHTML += '</div>';
                segmentHTML += '</div>';
            }

            if (segmentsInCounty.length === countySegmentMatch.length) {
                countyComplete = true;
            }

            if (a === 0) {
                if (countyComplete) {
                    filterHTML += '<li class="selected complete">';
                }
                else {
                    filterHTML += '<li class="selected">';
                }

            } else {
                if (countyComplete) {
                    filterHTML += '<li class="complete">';
                }
                else {
                    filterHTML += '<li>';
                }
            }
            selectHTML += '<option value="' + county_data[a].countyId + '">' + county_data[a].countyName + '</option>';
            filterHTML += '<a data-index="' + county_data[a].countyId + '" href="' + county_data[a].countyId + '">' + county_data[a].countyName + '</a>';
            filterHTML += '</li>';

            if (a === 0) {
                countyHTML += '<div class="county" data-index="' + county_data[a].countyId + '">';
            } else {
                countyHTML += '<div class="county hide" data-index="' + county_data[a].countyId + '">';
            }

            countyHTML += '<h2 class="county-name"><a target="_blank" href ="https://www.google.com/#q=' + weatherHTML + '+wi+weather">' + county_data[a].countyName + '</a></h2>';
            countyHTML += segmentHTML;
            countyHTML += '</div>';
        }
        selectHTML += '</select>';
        $('#segment-list').html(countyHTML);
        $('#segment-filter ul').html(filterHTML);
        $('#segment-filter-container').append(selectHTML);

        iceAge.displayUserProgress();
    },

    displayInfoWithIcon: function (stringValue, value) {
        var readableType = stringValue,
            className = stringValue.toLowerCase(),
            html = '';

        /*
        if (stringValue == 'potablewater') {
            readableType = 'potable water';
        }
        */

        if (value.trim() !== '') {
            html += '<div data-icon="' + className + '" class="yes segment-details">';
            if(stringValue == 'potablewater') {
                html += '<i class="fas fa-tint"></i>';
            } else if (stringValue == 'restrooms') {
                html += '<i class="fas fa-restroom"></i>';
            }
            html += '</div>';
        } else {
            html += '<div data-icon="' + className + '" class="no segment-details">';
            if(stringValue == 'potablewater') {
                html += '<i class="fas fa-tint"></i>';
            } else if (stringValue == 'restrooms') {
                html += '<i class="fas fa-restroom"></i>';
            }
            html += '</div>';
        }

        return html;
    },

    getDistanceFromCurrentLocation: function (htmlElement, currentPosLat, currentPosLong, destLat, destLong, secondary) {

        var origin = new google.maps.LatLng(currentPosLat, currentPosLong),
            destination = new google.maps.LatLng(destLat, -(destLong)),
            service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function (response, status) {
            if (status == 'OK') {
                var origins = response.originAddresses,
                    destinations = response.destinationAddresses;

                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;

                    for (var j = 0; j < results.length; j++) {
                        var element = results[j],
                            distance = element.distance.text,
                            duration = element.duration.text,
                            from = origins[i],
                            to = destinations[j];

                        if (!secondary) {
                            $(htmlElement).html("<div>Drive Distance: " + distance + "</div><div>Drive Time: " + duration + "</div>");
                        }
                        else {
                            $(htmlElement).html("<div>Other Drive Distance: " + distance + "</div><div>Other Drive Time: " + duration + "</div>");
                        }
                    }
                }
            }
        });
    },

    convertCoord: function (coord) {
        var degree = 0,
            min = 0;

        if (coord !== '') {
            coord = coord.split(' ');
            degree = parseFloat(coord[0]);
            min = parseFloat(coord[1]);

            return degree + (min / 60);
        }
    },

    getDifficultyLevel: function (iceAgeDistance, shortCutoff, midCutoff) {
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

    usersWhoHaveCompletedSegment: function (segmentId) {
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

    usersWhoHavePartialSegment: function (segmentId) {
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
    displayUserProgress: function () {
        var progressHTML = '',
            countyHTML = '',
            segmentHTML = '',
            layoutHTML = '',
            userCompleteMiles = 0,
            userPartialMiles = 0,
            userCompleteSegments = 0,
            countyComplete = false,

            users = progress_data.users;

        //LOOP THROUGH USERS
        for (var i = 0; i < users.length; i++) {
            userCompleteMiles = 0;
            userPartialMiles = 0;
            userCompleteSegments = 0;
            countyComplete = false;

            //LOOP THROUGH COUNTIES
            for (var a = 0; a < county_data.length; a++) {
                segmentHTML = '';
                var countyDistance = 0,
                    countyCompletedDistance = 0,
                    countySegmentMatch = [],
                    segmentComplete = false;
                    countyComplete = false;

                var segmentsInCounty = ice_age_data.filter(function (curVal) {
                    return curVal.countyId == county_data[a].countyId;
                });

                //Push any completed segments to new array
                for (var q = 0; q < segmentsInCounty.length; q++) {
                    
                    for (var c = 0; c < users[i].completedSegments.length; c++) {
                        if (segmentsInCounty[q].segment_id == users[i].completedSegments[c].segmentId) {
                            countySegmentMatch.push(segmentsInCounty[q]);
                        }
                    }
                }

                if (segmentsInCounty.length === countySegmentMatch.length) {
                    countyComplete = true;
                }

                // LOOP THROUGH SEGMENTS
                for (var b = 0; b < segmentsInCounty.length; b++) {
                    var segmentCompleteHTML = '',
                        segmentPartialHTML = '';
                        segmentComplete = false;

                    // KEEP TRACK OF MILES IN COUNTY
                    countyDistance += parseFloat(segmentsInCounty[b].iceagetraildistance);

                    // LOOP THROUGH USERS COMPLETED SEGMENTS TO SEE IF THEY COMPLETED CURRENT SEGMENT
                    for (var c = 0; c < users[i].completedSegments.length; c++) {
                        if (users[i].completedSegments[c].segmentId == segmentsInCounty[b].segment_id) {
                            userCompleteMiles += parseFloat(segmentsInCounty[b].iceagetraildistance);
                            countyCompletedDistance += parseFloat(segmentsInCounty[b].iceagetraildistance);
                            segmentCompleteHTML += '<span class="completion-data"> (' + users[i].completedSegments[c].extraInfo + ')</span>';
                            userCompleteSegments++;
                            segmentComplete = true;

                            break;
                        }
                    }
                    for (var d = 0; d < users[i].partialSegments.length; d++) {
                        if (users[i].partialSegments[d].segmentId == segmentsInCounty[b].segment_id) {
                            userPartialMiles += parseFloat(segmentsInCounty[b].iceagetraildistance);
                            segmentPartialHTML += '<div class="segment-notes">' + users[i].partialSegments[d].extraInfo + '</div>'
                            break;
                        }
                    }

                    segmentHTML += '<div class="segment">';
                    if(segmentComplete) {
                        segmentHTML += '<div class="segment-name complete"><i class="fas fa-check-circle"></i>' + segmentsInCounty[b].segment + segmentCompleteHTML + '</div>';
                    }
                    else {
                        segmentHTML += '<div class="segment-name">' + segmentsInCounty[b].segment + segmentCompleteHTML + '</div>';
                    }
                    
                    segmentHTML += segmentPartialHTML;
                    segmentHTML += '</div>';
                }

                countyHTML += '<div class="county" data-complete="' + countyComplete + '">';
                countyHTML += '<h3>' + county_data[a].countyName + '</h3>';
                countyHTML += '<div class="progressBarContainer">';
                countyHTML += '<div class="progressBar" style="width:' + parseFloat(countyCompletedDistance) / countyDistance * 100 + '%"></div>';
                countyHTML += '</div>'
                countyHTML += '<div class=segments>';
                countyHTML += segmentHTML;
                countyHTML += '<div class="more-info" data-index="' + county_data[a].countyId + '">View county details <i class="fas fa-arrow-alt-circle-right"></i></div>'
                countyHTML += '</div>';
                countyHTML += '</div>'; //END County HTML

            } //END COUNTY LOOP

            progressHTML += '<h2 class="user-miles-remaining">' + (parseFloat(iceAge.totalTrailDistance) - parseFloat(userCompleteMiles.toFixed(2))) + ' miles to go</h2>';

            progressHTML += '<div>' + parseFloat(userCompleteMiles.toFixed(2)) + ' of ' + iceAge.totalTrailDistance + ' miles completed</div>';
            progressHTML += '<div>' + (iceAge.totalSegments - users[i].completedSegments.length) + ' segments remaining</div>';
            progressHTML += '<div>' + parseFloat(userPartialMiles.toFixed(2)) + ' miles of partially completed segments</div>';

            layoutHTML += '<div class="user-container">';
            layoutHTML += '<div class="progress-info container">' + progressHTML + '</div>';
            layoutHTML += '<div class="counties container">' + countyHTML + '</div>';
            layoutHTML += '</div>';
        } //END USER LOOP

        $('#progress-view').html(layoutHTML);
    },
    enableSpeech: function () {
        console.log("enabled");
        var ignore_onend;

        // new instance of speech recognition
        var recognition = new webkitSpeechRecognition();
        // set params
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.start();
        $('#microphone').addClass('active');

        recognition.onresult = function (event) {
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

            // alert(saidWord);

            for (var i = 0; i < ice_age_data.length; i++) {
                if (ice_age_data[i].booksection.toLowerCase().includes(saidWord)) {
                    // alert(saidWord);
                }

                if (ice_age_data[i].segment.toLowerCase().includes(saidWord)) {
                    $('#segments').click();
                    $('#segment-filter a[data-index="' + ice_age_data[i].countyId + '"]').click();
                    $('select').val(ice_age_data[i].countyId);

                    $('html, body').animate({
                        scrollTop: $('#segments-view .segment[data-index="' + (i + 1) + '"]').position().top - $('nav').height() - 20
                    }, 0);
                    // alert(saidWord);
                }
            }
        }

        // speech error handling
        recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                ignore_onend = true;
            }
            console.log(event);
        }

        recognition.onend = function (event) {
            var ignore_onend = true;

            $('#microphone').removeClass('active');

            if (ignore_onend) {
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
    attachEventListeners: function () {
        $('#segment-list').on('click', '[data-icon="restrooms"].yes', function () {
            var segmentIndex = $(this).closest('.segment').attr('data-index');
            var heading = '<h4 class="overlay-heading">' + ice_age_data[segmentIndex - 1].segment + ' ' + $(this).text() + '</h4>';
            iceAge.openOverlay(heading + ice_age_data[segmentIndex - 1].restrooms);
        });

        $('#segment-list').on('click', '[data-icon="potablewater"].yes', function () {
            var segmentIndex = $(this).closest('.segment').attr('data-index');
            var heading = '<h4 class="overlay-heading">' + ice_age_data[segmentIndex - 1].segment + ' ' + $(this).text() + '</h4>';
            iceAge.openOverlay(heading + ice_age_data[segmentIndex - 1].potablewater);
        });

        //CHANGE SEGMENT ON CLICK
        $('#segment-filter').on('click', 'a', function (e) {
            e.preventDefault();

            var segment = $(this).attr('href');

            $('#segment-filter li').removeClass('selected');
            $(this).parent('li').addClass('selected');

            $('#segment-list .county').hide();
            $('#segment-list .county[data-index="' + segment + '"]').show();

            if (!$('#segment-list .county[data-index="' + segment + '"]').attr('data-loaded')) {
                $('#segment-list .county[data-index="' + segment + '"]').find(".getDistance").each(function () {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.position.coords.latitude, iceAge.position.coords.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), false);
                });
                $('#segment-list .county[data-index="' + segment + '"]').find(".getSecondaryDistance").each(function () {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.secondaryPosition.latitude, iceAge.secondaryPosition.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), true);
                });
            }

            $('#segment-list .county[data-index="' + segment + '"]').attr('data-loaded', 'true');

            $('html, body').animate({
                scrollTop: 0
            });
        });

        //CHANGE SEGMENT SELECT BOX;
        $('body').on('change', '#segment-filter-container select', function () {
            var segment = $(this).val();

            $('#segments-view .county').hide();
            $('#segments-view .county[data-index="' + segment + '"]').show();

            $('#segment-filter li').removeClass('selected');
            $('#segment-filter li a[data-index="' + segment + '"]').parent('li').addClass('selected');

            if (!$('.county[data-index="' + segment + '"]').attr('data-loaded')) {
                $('.county[data-index="' + segment + '"]').find(".getDistance").each(function () {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.position.coords.latitude, iceAge.position.coords.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), false);
                });
                $('.county[data-index="' + segment + '"]').find(".getSecondaryDistance").each(function () {
                    iceAge.getDistanceFromCurrentLocation($(this), iceAge.secondaryPosition.latitude, iceAge.secondaryPosition.longitude, $(this).attr('data-lat'), $(this).attr('data-long'), true);
                });
            }

            $('.county[data-index="' + segment + '"]').attr('data-loaded', 'true');
        });

        $('#ice-age').on('click', '.county h3', function () {
            $(this).parent().find('.segments').toggle();
        });

        $('#ice-age').on('click', '.more-info', function () {
            $('#segments').click();
            $('html, body').animate({
                scrollTop: 0
            }, 0);

            $('select').val($(this).attr('data-index'));
            $('#segment-filter a[data-index="' + $(this).attr('data-index') + '"]').click();
        });

        $('nav').on('click', '.nav-item', function (e) {

            if ($(this).attr('id') == 'microphone') {
                iceAge.enableSpeech();
                return false;
            }
            $('.view').hide();
            $('.nav-item').removeClass('selected');

            $(this).addClass('selected');
            $('#' + $(this).attr('id') + '-view').show();

        });

        //ARROW THROUGH COUNTIES ON SEGMENT VIEW
        $('body').on('keyup', function (e) {
            var nextElement = null;
            if (e.keyCode == 39) {
                nextElement = $('#segment-filter li.selected');

                if ($(nextElement).next().length > 0) {
                    $('#segment-filter li').removeClass('selected');
                    $(nextElement).next().addClass('selected');
                    $('#segment-filter li.selected a').click();
                }

            } else if (e.keyCode == 37) {
                nextElement = $('#segment-filter li.selected');

                if ($(nextElement).prev().length > 0) {
                    $('#segment-filter li').removeClass('selected');
                    $(nextElement).prev().addClass('selected');
                    $('#segment-filter li.selected a').click();
                }

            }
        });
    },
    openOverlay: function (overlayHTML) {
        var $overlay = $('#ice-age-overlay');

        $('body').prepend('<div id="overlay-screen"></div>');
        $overlay.html(overlayHTML);

        var overlayHeight = $overlay.height();

        $('#overlay-screen').height($(window).height())
        $overlay.css("top", $(window).height() / 2 - overlayHeight / 2);
        $overlay.show();

        $('#overlay-screen').one('click', iceAge.closeOverlay);
    },
    closeOverlay: function () {
        $('#overlay-screen').remove();
        $('#ice-age-overlay').hide();
    }
};