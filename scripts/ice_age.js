"use strict";

var iceAge = {
    iconArray: ["potablewater", "restrooms"],
    totalTrailDistance: 0,
    months: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
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
    newSegments: 0,
    trelloCounter: 0,
    useGeo: false,

    /*
    ******************
    Start of App
    ******************
    */
    init: function () {
        console.time('APP');

        var new_segment_data = [{ "segment": "Janesville to Milton", "iceagetraildistance": "1.7", }, { "segment": "Cross Plains", "iceagetraildistance": "7.0", }, { "segment": "Albany", "iceagetraildistance": "9.4", }, { "segment": "Alta Junction", "iceagetraildistance": "1.2", }, { "segment": "Arbor Ridge", "iceagetraildistance": "2.1", }, { "segment": "Averill-Kelly Creek Wilderness", "iceagetraildistance": "4.9", }, { "segment": "Baraboo", "iceagetraildistance": "4.0", }, { "segment": "Bear Lake", "iceagetraildistance": "5.4", }, { "segment": "Blackhawk", "iceagetraildistance": "7.0", }, { "segment": "Blue Spring Lake", "iceagetraildistance": "7.1", }, { "segment": "Bohn Lake", "iceagetraildistance": "1.8", }, { "segment": "Brooklyn Wildlife", "iceagetraildistance": "3.4", }, { "segment": "Camp 27", "iceagetraildistance": "2.9", }, { "segment": "Cedar Lakes", "iceagetraildistance": "2.4", }, { "segment": "Chaffee Creek", "iceagetraildistance": "2.5", }, { "segment": "Chippewa Moraine", "iceagetraildistance": "7.9", }, { "segment": "Chippewa River", "iceagetraildistance": "1.8", }, { "segment": "City of Lodi", "iceagetraildistance": "2.2", }, { "segment": "City of Manitowoc", "iceagetraildistance": "7.5", }, { "segment": "City of Two Rivers", "iceagetraildistance": "3.0", }, { "segment": "Clover Valley", "iceagetraildistance": "1.6", }, { "segment": "Deerfield", "iceagetraildistance": "3.7", }, { "segment": "Delafield", "iceagetraildistance": "3.2", }, { "segment": "Dells of the Eau Claire", "iceagetraildistance": "2.6", }, { "segment": "Devil's Lake", "iceagetraildistance": "10.9", }, { "segment": "Devil's Staircase", "iceagetraildistance": "1.8", }, { "segment": "Dunes", "iceagetraildistance": "2.7", }, { "segment": "Eagle", "iceagetraildistance": "5.6", }, { "segment": "East Lake", "iceagetraildistance": "6.5", }, { "segment": "East Twin River", "iceagetraildistance": "1.4", }, { "segment": "Eastern Lodi Marsh", "iceagetraildistance": "3.2", }, { "segment": "Emmons Creek", "iceagetraildistance": "2.6", }, { "segment": "Fern Glen", "iceagetraildistance": "1.3", }, { "segment": "Firth Lake", "iceagetraildistance": "5.2", }, { "segment": "Forestville", "iceagetraildistance": "9.8", }, { "segment": "Gandy Dancer", "iceagetraildistance": "15.1", }, { "segment": "Gibraltar Rock", "iceagetraildistance": "4.0", }, { "segment": "Grandfather Falls", "iceagetraildistance": "4.0", }, { "segment": "Grassy Lake", "iceagetraildistance": "8.5", }, { "segment": "Greenbush", "iceagetraildistance": "8.8", }, { "segment": "Greenwood", "iceagetraildistance": "4.5", }, { "segment": "Harrison Hills", "iceagetraildistance": "14.5", }, { "segment": "Hartland", "iceagetraildistance": "5.7", }, { "segment": "Hartman Creek", "iceagetraildistance": "5.6", }, { "segment": "Harwood Lakes", "iceagetraildistance": "6.2", }, { "segment": "Hemlock Creek", "iceagetraildistance": "7.0", }, { "segment": "Highland Lakes", "iceagetraildistance": "8.2", }, { "segment": "Holy Hill", "iceagetraildistance": "6.8", }, { "segment": "Indian Creek", "iceagetraildistance": "5.4", }, { "segment": "Indian Lake", "iceagetraildistance": "3.5", }, { "segment": "Janesville", "iceagetraildistance": "10.3", }, { "segment": "Jerry Lake", "iceagetraildistance": "15.2", }, { "segment": "John Muir Park", "iceagetraildistance": "1.8", }, { "segment": "Kettlebowl", "iceagetraildistance": "10.2", }, { "segment": "Kewaskum", "iceagetraildistance": "2.1", }, { "segment": "Kewaunee River", "iceagetraildistance": "12.5", }, { "segment": "LaBudde Creek", "iceagetraildistance": "3.0", }, { "segment": "Lake Eleven", "iceagetraildistance": "15.6", }, { "segment": "Lapham Peak", "iceagetraildistance": "7.7", }, { "segment": "Lodi Marsh", "iceagetraildistance": "1.8", }, { "segment": "Loew Lake", "iceagetraildistance": "4.3", }, { "segment": "Lumbercamp", "iceagetraildistance": "12.0", }, { "segment": "Madison", "iceagetraildistance": "3.1", }, { "segment": "McKenzie Creek", "iceagetraildistance": "9.4", }, { "segment": "Mecan River", "iceagetraildistance": "7.1", }, { "segment": "Merrimac", "iceagetraildistance": "3.7", }, { "segment": "Merton", "iceagetraildistance": "2.7", }, { "segment": "Milton", "iceagetraildistance": "4.3", }, { "segment": "Milwaukee River (Fond du Lac Co)", "iceagetraildistance": "4.3", }, { "segment": "Milwaukee River (Washington Co)", "iceagetraildistance": "6.8", }, { "segment": "Mishicot", "iceagetraildistance": "2.9", }, { "segment": "Monches", "iceagetraildistance": "3.1", }, { "segment": "Mondeaux Esker", "iceagetraildistance": "11.7", }, { "segment": "Monticello", "iceagetraildistance": "6.5", }, { "segment": "Montrose", "iceagetraildistance": "7.5", }, { "segment": "New Hope-Iola Ski Hill", "iceagetraildistance": "5.6", }, { "segment": "Newwood", "iceagetraildistance": "7.1", }, { "segment": "Northern Blue Hills", "iceagetraildistance": "9.6", }, { "segment": "Parnell", "iceagetraildistance": "13.9", }, { "segment": "Parrish Hills", "iceagetraildistance": "12.0", }, { "segment": "Pike Lake", "iceagetraildistance": "3.3", }, { "segment": "Timberland Wilderness", "iceagetraildistance": "3.9", }, { "segment": "Pine Lake", "iceagetraildistance": "2.9", }, { "segment": "Pine Line", "iceagetraildistance": "0.9", }, { "segment": "Plover River", "iceagetraildistance": "5.9", }, { "segment": "Point Beach", "iceagetraildistance": "10.0", }, { "segment": "Portage Canal", "iceagetraildistance": "3.0", }, { "segment": "Rib Lake", "iceagetraildistance": "2.7", }, { "segment": "Ringle", "iceagetraildistance": "8.8", }, { "segment": "Sand Creek", "iceagetraildistance": "5.7", }, { "segment": "Sauk Point", "iceagetraildistance": "3.9", }, { "segment": "Scuppernong", "iceagetraildistance": "5.6", }, { "segment": "Skunk and Foster Lakes", "iceagetraildistance": "3.6", }, { "segment": "Slinger", "iceagetraildistance": "2.1", }, { "segment": "Southern Blue Hills", "iceagetraildistance": "7.3", }, { "segment": "Southern Kewaskum", "iceagetraildistance": "1.1", }, { "segment": "Springfield Hill", "iceagetraildistance": "1.6", }, { "segment": "St. Croix Falls", "iceagetraildistance": "9.0", }, { "segment": "Stony Ridge", "iceagetraildistance": "3.1", }, { "segment": "Storrs Lake", "iceagetraildistance": "1.8", }, { "segment": "Straight Lake", "iceagetraildistance": "3.6", }, { "segment": "Straight River", "iceagetraildistance": "3.4", }, { "segment": "Sturgeon Bay", "iceagetraildistance": "13.7", }, { "segment": "Summit Moraine", "iceagetraildistance": "12.4", }, { "segment": "Table Bluff", "iceagetraildistance": "3.6", }, { "segment": "Thornapple Creek", "iceagetraildistance": "3.0", }, { "segment": "Timberland Hills", "iceagetraildistance": "10.9", }, { "segment": "Tisch Mills", "iceagetraildistance": "1.8", }, { "segment": "Trade River", "iceagetraildistance": "3.9", }, { "segment": "Turtle Rock", "iceagetraildistance": "5.1", }, { "segment": "Tuscobia", "iceagetraildistance": "11.2", }, { "segment": "Underdown", "iceagetraildistance": "6.3", }, { "segment": "Valley View", "iceagetraildistance": "3.1", }, { "segment": "Verona", "iceagetraildistance": "6.4", }, { "segment": "Walla Hi", "iceagetraildistance": "2.3", }, { "segment": "Waterville", "iceagetraildistance": "3.3", }, { "segment": "Waupaca River", "iceagetraildistance": "2.3", }, { "segment": "Wedde Creek", "iceagetraildistance": "1.2", }, { "segment": "West Bend", "iceagetraildistance": "6.7", }, { "segment": "Whitewater Lake", "iceagetraildistance": "4.6", }, { "segment": "Wood Lake", "iceagetraildistance": "13.4" }];

        /* 
        Get New segments
        */
        var newSegments = new_segment_data.filter(function (newSeg) {
            var notInData = ice_age_data.every(function (oldSeg) {
                return oldSeg.segment != newSeg.segment;
            });

            return notInData
        });

        console.log(newSegments);

        var oldSegments = ice_age_data.filter(function (oldSeg) {
            var notInData = new_segment_data.every(function (newSeg) {
                return newSeg.segment != oldSeg.segment;
            });

            return notInData
        });

        console.log(oldSegments);


        var new_segment_data = [{ "segment": "Janesville to Milton", "iceagetraildistance": "1.7", }, { "segment": "Cross Plains", "iceagetraildistance": "7.0", }, { "segment": "Albany", "iceagetraildistance": "9.4", }, { "segment": "Alta Junction", "iceagetraildistance": "1.2", }, { "segment": "Arbor Ridge", "iceagetraildistance": "2.1", }, { "segment": "Averill-Kelly Creek Wilderness", "iceagetraildistance": "4.9", }, { "segment": "Baraboo", "iceagetraildistance": "4.0", }, { "segment": "Bear Lake", "iceagetraildistance": "5.4", }, { "segment": "Blackhawk", "iceagetraildistance": "7.0", }, { "segment": "Blue Spring Lake", "iceagetraildistance": "7.1", }, { "segment": "Bohn Lake", "iceagetraildistance": "1.8", }, { "segment": "Brooklyn Wildlife", "iceagetraildistance": "3.4", }, { "segment": "Camp 27", "iceagetraildistance": "2.9", }, { "segment": "Cedar Lakes", "iceagetraildistance": "2.4", }, { "segment": "Chaffee Creek", "iceagetraildistance": "2.5", }, { "segment": "Chippewa Moraine", "iceagetraildistance": "7.9", }, { "segment": "Chippewa River", "iceagetraildistance": "1.8", }, { "segment": "City of Lodi", "iceagetraildistance": "2.2", }, { "segment": "City of Manitowoc", "iceagetraildistance": "7.5", }, { "segment": "City of Two Rivers", "iceagetraildistance": "3.0", }, { "segment": "Clover Valley", "iceagetraildistance": "1.6", }, { "segment": "Deerfield", "iceagetraildistance": "3.7", }, { "segment": "Delafield", "iceagetraildistance": "3.2", }, { "segment": "Dells of the Eau Claire", "iceagetraildistance": "2.6", }, { "segment": "Devil's Lake", "iceagetraildistance": "10.9", }, { "segment": "Devil's Staircase", "iceagetraildistance": "1.8", }, { "segment": "Dunes", "iceagetraildistance": "2.7", }, { "segment": "Eagle", "iceagetraildistance": "5.6", }, { "segment": "East Lake", "iceagetraildistance": "6.5", }, { "segment": "East Twin River", "iceagetraildistance": "1.4", }, { "segment": "Eastern Lodi Marsh", "iceagetraildistance": "3.2", }, { "segment": "Emmons Creek", "iceagetraildistance": "2.6", }, { "segment": "Fern Glen", "iceagetraildistance": "1.3", }, { "segment": "Firth Lake", "iceagetraildistance": "5.2", }, { "segment": "Forestville", "iceagetraildistance": "9.8", }, { "segment": "Gandy Dancer", "iceagetraildistance": "15.1", }, { "segment": "Gibraltar Rock", "iceagetraildistance": "4.0", }, { "segment": "Grandfather Falls", "iceagetraildistance": "4.0", }, { "segment": "Grassy Lake", "iceagetraildistance": "8.5", }, { "segment": "Greenbush", "iceagetraildistance": "8.8", }, { "segment": "Greenwood", "iceagetraildistance": "4.5", }, { "segment": "Harrison Hills", "iceagetraildistance": "14.5", }, { "segment": "Hartland", "iceagetraildistance": "5.7", }, { "segment": "Hartman Creek", "iceagetraildistance": "5.6", }, { "segment": "Harwood Lakes", "iceagetraildistance": "6.2", }, { "segment": "Hemlock Creek", "iceagetraildistance": "7.0", }, { "segment": "Highland Lakes", "iceagetraildistance": "8.2", }, { "segment": "Holy Hill", "iceagetraildistance": "6.8", }, { "segment": "Indian Creek", "iceagetraildistance": "5.4", }, { "segment": "Indian Lake", "iceagetraildistance": "3.5", }, { "segment": "Janesville", "iceagetraildistance": "10.3", }, { "segment": "Jerry Lake", "iceagetraildistance": "15.2", }, { "segment": "John Muir Park", "iceagetraildistance": "1.8", }, { "segment": "Kettlebowl", "iceagetraildistance": "10.2", }, { "segment": "Kewaskum", "iceagetraildistance": "2.1", }, { "segment": "Kewaunee River", "iceagetraildistance": "12.5", }, { "segment": "LaBudde Creek", "iceagetraildistance": "3.0", }, { "segment": "Lake Eleven", "iceagetraildistance": "15.6", }, { "segment": "Lapham Peak", "iceagetraildistance": "7.7", }, { "segment": "Lodi Marsh", "iceagetraildistance": "1.8", }, { "segment": "Loew Lake", "iceagetraildistance": "4.3", }, { "segment": "Lumbercamp", "iceagetraildistance": "12.0", }, { "segment": "Madison", "iceagetraildistance": "3.1", }, { "segment": "McKenzie Creek", "iceagetraildistance": "9.4", }, { "segment": "Mecan River", "iceagetraildistance": "7.1", }, { "segment": "Merrimac", "iceagetraildistance": "3.7", }, { "segment": "Merton", "iceagetraildistance": "2.7", }, { "segment": "Milton", "iceagetraildistance": "4.3", }, { "segment": "Milwaukee River (Fond du Lac Co)", "iceagetraildistance": "4.3", }, { "segment": "Milwaukee River (Washington Co)", "iceagetraildistance": "6.8", }, { "segment": "Mishicot", "iceagetraildistance": "2.9", }, { "segment": "Monches", "iceagetraildistance": "3.1", }, { "segment": "Mondeaux Esker", "iceagetraildistance": "11.7", }, { "segment": "Monticello", "iceagetraildistance": "6.5", }, { "segment": "Montrose", "iceagetraildistance": "7.5", }, { "segment": "New Hope-Iola Ski Hill", "iceagetraildistance": "5.6", }, { "segment": "Newwood", "iceagetraildistance": "7.1", }, { "segment": "Northern Blue Hills", "iceagetraildistance": "9.6", }, { "segment": "Parnell", "iceagetraildistance": "13.9", }, { "segment": "Parrish Hills", "iceagetraildistance": "12.0", }, { "segment": "Pike Lake", "iceagetraildistance": "3.3", }, { "segment": "Timberland Wilderness", "iceagetraildistance": "3.9", }, { "segment": "Pine Lake", "iceagetraildistance": "2.9", }, { "segment": "Pine Line", "iceagetraildistance": "0.9", }, { "segment": "Plover River", "iceagetraildistance": "5.9", }, { "segment": "Point Beach", "iceagetraildistance": "10.0", }, { "segment": "Portage Canal", "iceagetraildistance": "3.0", }, { "segment": "Rib Lake", "iceagetraildistance": "2.7", }, { "segment": "Ringle", "iceagetraildistance": "8.8", }, { "segment": "Sand Creek", "iceagetraildistance": "5.7", }, { "segment": "Sauk Point", "iceagetraildistance": "3.9", }, { "segment": "Scuppernong", "iceagetraildistance": "5.6", }, { "segment": "Skunk and Foster Lakes", "iceagetraildistance": "3.6", }, { "segment": "Slinger", "iceagetraildistance": "2.1", }, { "segment": "Southern Blue Hills", "iceagetraildistance": "7.3", }, { "segment": "Southern Kewaskum", "iceagetraildistance": "1.1", }, { "segment": "Springfield Hill", "iceagetraildistance": "1.6", }, { "segment": "St. Croix Falls", "iceagetraildistance": "9.0", }, { "segment": "Stony Ridge", "iceagetraildistance": "3.1", }, { "segment": "Storrs Lake", "iceagetraildistance": "1.8", }, { "segment": "Straight Lake", "iceagetraildistance": "3.6", }, { "segment": "Straight River", "iceagetraildistance": "3.4", }, { "segment": "Sturgeon Bay", "iceagetraildistance": "13.7", }, { "segment": "Summit Moraine", "iceagetraildistance": "12.4", }, { "segment": "Table Bluff", "iceagetraildistance": "3.6", }, { "segment": "Thornapple Creek", "iceagetraildistance": "3.0", }, { "segment": "Timberland Hills", "iceagetraildistance": "10.9", }, { "segment": "Tisch Mills", "iceagetraildistance": "1.8", }, { "segment": "Trade River", "iceagetraildistance": "3.9", }, { "segment": "Turtle Rock", "iceagetraildistance": "5.1", }, { "segment": "Tuscobia", "iceagetraildistance": "11.2", }, { "segment": "Underdown", "iceagetraildistance": "6.3", }, { "segment": "Valley View", "iceagetraildistance": "3.1", }, { "segment": "Verona", "iceagetraildistance": "6.4", }, { "segment": "Walla Hi", "iceagetraildistance": "2.3", }, { "segment": "Waterville", "iceagetraildistance": "3.3", }, { "segment": "Waupaca River", "iceagetraildistance": "2.3", }, { "segment": "Wedde Creek", "iceagetraildistance": "1.2", }, { "segment": "West Bend", "iceagetraildistance": "6.7", }, { "segment": "Whitewater Lake", "iceagetraildistance": "4.6", }, { "segment": "Wood Lake", "iceagetraildistance": "13.4" }];

        var newArray = []

        new_segment_data.forEach(function (newSeg) {
            ice_age_data.forEach(function (oldSeg) {
                if (oldSeg.segment == newSeg.segment && parseFloat(oldSeg.iceagetraildistance) != parseFloat(newSeg.iceagetraildistance)) {
                    newArray.push({
                        ...newSeg,
                        "oldDistance": oldSeg.iceagetraildistance
                    });
                }
            });
        });

        console.log(newArray);

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
        console.time('AuthenTrello');
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
        console.timeEnd('AuthenTrello');
    },
    updateLoggedIn: function () {
        //Trello.unauthorize();
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);
    },
    loadTrelloData: function () {
        console.time('LoadTrello');
        Trello.get("lists/" + iceAge.completeListId + "/cards", function (cl) {
            for (var i = 0; i < cl.length; i++) {
                console.log(cl[i]);
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
                console.timeEnd('LoadTrello');
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
            if (!isNaN(ice_age_data[i].iceagetraildistance)) {
                iceAge.distanceArray.push(parseFloat(ice_age_data[i].iceagetraildistance));
            }
            if (!isNaN(ice_age_data[i].elevation)) {
                iceAge.elevationArray.push(parseFloat(ice_age_data[i].elevation));
            }
            if (!isNaN(ice_age_data[i].ruggedness)) {
                iceAge.ruggednessArray.push(parseFloat(ice_age_data[i].ruggedness));
            }
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
        var newSegmentCounter = 0;

        for (var i = 0; i < ice_age_data.length; i++) {
            if (ice_age_data[i].newSegment) {
                /*
                    1. old seg - id:1
                    2. old seg - id:2
                    3. new seg - id:2.1
                    4. old seg - id:3
                    5. new seg - id:4.2
                    6. old seg - id:4

                */
                newSegmentCounter++;
                ice_age_data[i].segment_id = ice_age_data.length + newSegmentCounter;
            }
            else {
                ice_age_data[i].segment_id = i + 1 - newSegmentCounter;
            }

            ice_age_data[i].order_id = i + 1;

            iceAge.totalTrailDistance += parseFloat(ice_age_data[i].iceagetraildistance);
        }
    },

    /*
    ******************
    Retrieves data and put it on the page
    ******************
    */
    displaySegmentList: function () {
        console.time('DisplaySegList');
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
            countyMilesRemaining = 0,
            segmentsRemaining = new Set(),
            completedSegment = false,
            countyHTML = '',
            allComplete = true;

        selectHTML += '<select>';

        //LOOP THROUGH COUNTIES
        for (var a = 0; a < county_data.length; a++) {
            segmentHTML = '';
            segmentsRemaining = new Set();
            countyMilesRemaining = 0;

            var countyDistance = 0,
                countyCompletedDistance = 0,
                countySegmentMatch = [],
                countyComplete = false;

            var segmentsInCounty = ice_age_data.filter(function (curVal) {
                return curVal.countyId == county_data[a].countyId;
            });

            for (var q = 0; q < segmentsInCounty.length; q++) {
                progressHTML = '';
                completedSegment = false;
                for (var c = 0; c < progress_data.users.length; c++) {
                    for (var d = 0; d < progress_data.users[c].completedSegments.length; d++) {
                        if (segmentsInCounty[q].segment_id == progress_data.users[c].completedSegments[d].segmentId) {
                            completedSegment = true;
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

                if (!completedSegment) {
                    segmentsRemaining.add(segmentsInCounty[q]);
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
                segmentHTML += '<div class="segment" data-index="' + segmentsInCounty[q].order_id + '">';
                segmentHTML += '<h3 class="segment-name">' + segmentsInCounty[q].segment + '</h3>';
                segmentHTML += progressHTML;

                if (segmentsInCounty[q].summary) {
                    segmentHTML += '<div class="segment-summary">' + segmentsInCounty[q].summary + '</div>';
                }

                segmentHTML += '<div class="segment-info">';

                difficulty = iceAge.getDifficultyLevel(parseFloat(segmentsInCounty[q].iceagetraildistance), iceAge.distanceObject.shortCutoff, iceAge.distanceObject.midCutoff);
                segmentHTML += '<div class="' + difficulty + '">Distance: ' + segmentsInCounty[q].iceagetraildistance + '</div>';

                if (segmentsInCounty[q].elevation) {
                    difficulty = iceAge.getDifficultyLevel(parseFloat(segmentsInCounty[q].elevation), iceAge.elevationObject.shortCutoff, iceAge.elevationObject.midCutoff);
                    segmentHTML += '<div class="' + difficulty + '">Elevation: ' + segmentsInCounty[q].elevation + '</div>';
                }

                if (segmentsInCounty[q].ruggedness) {
                    difficulty = iceAge.getDifficultyLevel(parseFloat(segmentsInCounty[q].ruggedness), iceAge.ruggednessObject.shortCutoff, iceAge.ruggednessObject.midCutoff);
                    segmentHTML += '<div class="' + difficulty + '">Ruggedness: ' + segmentsInCounty[q].ruggedness + '</div>';
                }

                if (segmentsInCounty[q].connectingroutedistance) {
                    segmentHTML += '<div>Connecting route distance: ' + segmentsInCounty[q].connectingroutedistance + '</div>';
                }

                if (segmentsInCounty[q].atlasmap) {
                    segmentHTML += '<div class="atlas">Atlas Map: ' + segmentsInCounty[q].atlasmap + '</div>';
                }

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

                if (segmentsInCounty[q].nohiking && segmentsInCounty[q].nohiking.trim() !== '') {
                    segmentHTML += '<div class="no-hiking">Hiking Restrictions: </div><div>' + segmentsInCounty[q].nohiking + '</div>';
                }

                segmentHTML += '</div>';
                segmentHTML += '</div>';
            }

            for (var item of segmentsRemaining) {
                countyMilesRemaining += parseFloat(item.iceagetraildistance);
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

            countyHTML += '<h2 class="county-name"><a target="_blank" href ="https://www.google.com/#q=' + weatherHTML + '+wi+weather">' + county_data[a].countyName + ' - ' + countyMilesRemaining.toFixed(2) + ' miles left</a></h2>';
            countyHTML += segmentHTML;
            countyHTML += '</div>';
        }
        selectHTML += '</select>';
        $('#segment-list').html(countyHTML);
        $('#segment-filter ul').html(filterHTML);
        $('#segment-filter-container').append(selectHTML);

        console.timeEnd('DisplaySegList');

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

        if (value && value.trim() !== '') {
            html += '<div data-icon="' + className + '" class="yes segment-details">';
            if (stringValue == 'potablewater') {
                html += '<i class="fas fa-tint"></i>';
            } else if (stringValue == 'restrooms') {
                html += '<i class="fas fa-restroom"></i>';
            }
            html += '</div>';
        } else {
            html += '<div data-icon="' + className + '" class="no segment-details">';
            if (stringValue == 'potablewater') {
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

    getDifficultyLevel: function (iceAgeValue, shortCutoff, midCutoff) {
        var difficulty = '';

        if (iceAgeValue <= shortCutoff) {
            difficulty = 'easy';
        } else if (iceAgeValue <= midCutoff) {
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
        console.time('DisplayUserProg');
        var progressHTML = '',
            countyHTML = '',
            segmentHTML = '',
            layoutHTML = '',
            yearlyHTML = '',
            userCompleteMiles = 0,
            userPartialMiles = 0,
            userCompleteSegments = 0,
            countyComplete = false,
            monthTotals = {},
            yearTotals = {},
            yearTotalsProps = [],
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
                        var date, year, month, distance;

                        if (segmentsInCounty[q].segment_id == users[i].completedSegments[c].segmentId) {
                            countySegmentMatch.push(segmentsInCounty[q]);

                            distance = parseFloat(segmentsInCounty[q].iceagetraildistance).toFixed(2);
                            distance = parseFloat(distance);

                            date = users[i].completedSegments[c].extraInfo;

                            if (date) {
                                if (date.includes('/')) {
                                    date = date.split('/');
                                } else if (date.includes('-')) {
                                    date = date.split('-');
                                }

                                if (date[0].length === 4) {
                                    year = date[0];
                                    month = parseInt(date[1]);
                                } else {
                                    year = date[2];
                                    month = parseInt(date[0]);
                                }


                                if (monthTotals.hasOwnProperty(month)) {
                                    monthTotals[month] += distance;
                                } else {
                                    monthTotals[month] = distance;
                                }

                                if (yearTotals.hasOwnProperty(year)) {
                                    yearTotals[year] += distance;
                                } else {
                                    yearTotals[year] = distance;
                                }

                                yearTotalsProps = Object.keys(yearTotals).reverse();
                            }

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
                    if (segmentComplete) {
                        segmentHTML += '<div class="segment-name complete"><i class="fas fa-check-circle"></i>' + segmentsInCounty[b].segment + segmentCompleteHTML + '</div>';
                    }
                    else {
                        segmentHTML += '<div class="segment-name">' + segmentsInCounty[b].segment + segmentCompleteHTML + '</div>';
                    }

                    segmentHTML += segmentPartialHTML;

                    if (segmentsInCounty[b].gallery) {
                        console.log(segmentsInCounty[b].gallery);
                        segmentHTML += '<div class="gallery" style="margin-left:20px"><a target="_blank" href="' + segmentsInCounty[b].gallery + '">View images</a></div>';
                    }
                    segmentHTML += '</div>';
                }

                countyHTML += '<div class="county" data-complete="' + countyComplete + '">';
                countyHTML += '<h3>' + county_data[a].countyName + '</h3>';
                countyHTML += '<div class="progressBarContainer">';
                countyHTML += '<div class="progressBar" style="width:' + parseFloat(countyCompletedDistance) / countyDistance * 100 + '%"></div>';
                countyHTML += '</div>';
                countyHTML += '<div class=segments>';
                countyHTML += segmentHTML;
                countyHTML += '<div class="more-info" data-index="' + county_data[a].countyId + '">View county details <i class="fas fa-arrow-alt-circle-right"></i></div>'
                countyHTML += '</div>';
                countyHTML += '</div>'; //END County HTML

            } //END COUNTY LOOP

            progressHTML += '<h2 class="user-miles-remaining">' + parseFloat((iceAge.totalTrailDistance - userCompleteMiles).toFixed(2)) + ' miles to go</h2>';

            progressHTML += '<div>' + parseFloat(userCompleteMiles.toFixed(2)) + ' of ' + iceAge.totalTrailDistance + ' miles completed</div>';
            progressHTML += '<div>' + (iceAge.totalSegments - users[i].completedSegments.length) + ' segments remaining</div>';
            progressHTML += '<div>' + parseFloat(userPartialMiles.toFixed(2)) + ' miles of partially completed segments</div>';

            layoutHTML += '<div class="user-container">';
            layoutHTML += '<div class="progress-info container">' + progressHTML + '</div>';
            layoutHTML += '<div class="counties container">' + countyHTML + '</div>';
            layoutHTML += '</div>';

            layoutHTML += '<div class="stats">';
            layoutHTML += '<div class="miles miles-by-year">';
            layoutHTML += '<h3>Miles per year</h3>';

            yearTotalsProps.forEach(function (key) {
                if (yearTotals.hasOwnProperty(key)) {
                    layoutHTML += '<div class="year">';
                    layoutHTML += '<h4>' + key + '</h4>';
                    layoutHTML += '<p>' + yearTotals[key].toFixed(1) + '</p>';
                    layoutHTML += '</div>';
                }
            });
            //  => console.log(`PropertyName: ${prop}, its Value: ${test[prop]}`));

            layoutHTML += '</div>';

            layoutHTML += '<div class="miles miles-by-month">';
            layoutHTML += '<h3>Miles per month</h3>';

            for (let i = 0; i < iceAge.months.length; i++) {
                layoutHTML += '<div class="month">';
                layoutHTML += '<h4>' + iceAge.months[i] + '</h4>';
                if (monthTotals.hasOwnProperty(i + 1)) {
                    layoutHTML += '<p>' + monthTotals[i + 1].toFixed(1) + '</p>';
                } else {
                    layoutHTML += '<p>0</p>';
                }
                layoutHTML += '</div>';
            }
            /*
            for (var key in monthTotals) {
                if (monthTotals.hasOwnProperty(key)) {
                    layoutHTML += '<div class="month">';
                    layoutHTML += '<h4>' + iceAge.months[key - 1] + '</h4>';
                    layoutHTML += '<p>' + monthTotals[key].toFixed(1) + '</p>';
                    layoutHTML += '</div>';
                }
            }
            */
            layoutHTML += '</div>';
            layoutHTML += '</div>';
        } //END USER LOOP

        $('#progress-view').html(layoutHTML);

        console.timeEnd('DisplayUserProg');
        console.timeEnd("APP");
    },
    enableSpeech: function () {
        console.log("enabled");
        var ignore_onend;

        // new instance of speech recognition
        var recognition = new webkitSpeechRecognition();
        // set params
        recognition.continuous = true;
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
            saidWord = saidWord.trim().toLowerCase().split(" ").join("");

            // alert(saidWord);

            for (var i = 0; i < ice_age_data.length; i++) {
                var currentSegment = ice_age_data[i].segment.toLowerCase().split(" ").join("");
                if (ice_age_data[i].booksection.toLowerCase().includes(saidWord)) {
                    // alert(saidWord);
                }

                if (currentSegment.includes(saidWord)) {
                    iceAge.scroll(0);
                    $('#segments').click();
                    $('#segment-filter a[data-index="' + ice_age_data[i].countyId + '"]').click();
                    $('select').val(ice_age_data[i].countyId);

                    iceAge.scroll($('#segments-view .segment[data-index="' + (i + 1) + '"]').position().top - $('nav').height() - 2);
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

    scroll: function (value) {
        $('html, body').animate({ scrollTop: value }, 0);
    },
    /*
    ******************
    Attach Event Listeners
    ******************
    */
    attachEventListeners: function () {
        $('#segment-list').on('click', '[data-icon="restrooms"].yes', function () {
            var segmentIndex = parseInt($(this).closest('.segment').attr('data-index'));
            console.log(segmentIndex);
            var heading = '<h4 class="overlay-heading">' + ice_age_data[parseInt(segmentIndex - 1)].segment + ' ' + $(this).text() + '</h4>';
            iceAge.openOverlay(heading + ice_age_data[segmentIndex - 1].restrooms);
        });

        $('#segment-list').on('click', '[data-icon="potablewater"].yes', function () {
            var segmentIndex = parseInt($(this).closest('.segment').attr('data-index'));
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

            iceAge.scroll(0);
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

            iceAge.scroll(0);

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