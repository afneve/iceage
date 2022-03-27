var segments = window._datasourceManager.map['_layers'].IAT_Segments1_449['_graphicsVal'];
var html = '';
var segmentObj = {};
var segmentArray = [];
var name = '';

segments.forEach(val => {
    var segment = val.attributes.Segment;
    var iceagetraildistance = val.attributes.length_mi;

    name = segment.toLowerCase().replace(/ +/g, "");

    if (segmentObj && !segmentObj[name]) {
        segmentObj[name] = {
            "name": segment,
            "iceagetraildistance": iceagetraildistance
        };
        segmentArray.push(segment);
    } else if (segmentObj[name]) {
        segmentObj[name].iceagetraildistance += iceagetraildistance;
    }
});

Object.keys(segmentObj).forEach((val) => {
console.log(segmentObj[val]);
html += '{';
html += '"segment":' + '"' + segmentObj[val].name + '"' + ',';
html += '"iceagetraildistance":' + '"' + parseFloat(segmentObj[val].iceagetraildistance).toFixed(1) + '"' + ',';
html += '},';
});

console.log(segmentObj);
console.log(html);


/* Paste HTML from above here
    Then copy and paste everything below on your site */
var new_segment_data = [{"segment":"Janesville to Milton","iceagetraildistance":"1.7",},{"segment":"Cross Plains","iceagetraildistance":"6.9",},{"segment":"Albany","iceagetraildistance":"9.4",},{"segment":"Alta Junction","iceagetraildistance":"1.2",},{"segment":"Arbor Ridge","iceagetraildistance":"2.1",},{"segment":"Averill-Kelly Creek Wilderness","iceagetraildistance":"4.9",},{"segment":"Baraboo","iceagetraildistance":"4.0",},{"segment":"Bear Lake","iceagetraildistance":"5.4",},{"segment":"Blackhawk","iceagetraildistance":"7.0",},{"segment":"Blue Spring Lake","iceagetraildistance":"7.1",},{"segment":"Bohn Lake","iceagetraildistance":"1.8",},{"segment":"Brooklyn Wildlife","iceagetraildistance":"3.4",},{"segment":"Camp 27","iceagetraildistance":"2.9",},{"segment":"Cedar Lakes","iceagetraildistance":"2.4",},{"segment":"Chaffee Creek","iceagetraildistance":"2.5",},{"segment":"Chippewa Moraine","iceagetraildistance":"7.9",},{"segment":"Chippewa River","iceagetraildistance":"1.8",},{"segment":"City of Lodi","iceagetraildistance":"2.2",},{"segment":"City of Manitowoc","iceagetraildistance":"7.5",},{"segment":"City of Two Rivers","iceagetraildistance":"3.0",},{"segment":"Clover Valley","iceagetraildistance":"1.6",},{"segment":"Deerfield","iceagetraildistance":"3.7",},{"segment":"Delafield","iceagetraildistance":"3.2",},{"segment":"Dells of the Eau Claire","iceagetraildistance":"2.6",},{"segment":"Devil's Lake","iceagetraildistance":"10.9",},{"segment":"Devil's Staircase","iceagetraildistance":"1.8",},{"segment":"Dunes","iceagetraildistance":"2.7",},{"segment":"Eagle","iceagetraildistance":"5.6",},{"segment":"East Lake","iceagetraildistance":"6.5",},{"segment":"East Twin River","iceagetraildistance":"1.4",},{"segment":"Eastern Lodi Marsh","iceagetraildistance":"3.2",},{"segment":"Emmons Creek","iceagetraildistance":"2.6",},{"segment":"Fern Glen","iceagetraildistance":"1.3",},{"segment":"Firth Lake","iceagetraildistance":"5.2",},{"segment":"Forestville","iceagetraildistance":"9.8",},{"segment":"Gandy Dancer","iceagetraildistance":"15.1",},{"segment":"Gibraltar Rock","iceagetraildistance":"4.0",},{"segment":"Grandfather Falls","iceagetraildistance":"4.0",},{"segment":"Grassy Lake","iceagetraildistance":"8.5",},{"segment":"Greenbush","iceagetraildistance":"8.5",},{"segment":"Greenwood","iceagetraildistance":"4.5",},{"segment":"Harrison Hills","iceagetraildistance":"14.5",},{"segment":"Hartland","iceagetraildistance":"5.7",},{"segment":"Hartman Creek","iceagetraildistance":"5.5",},{"segment":"Harwood Lakes","iceagetraildistance":"6.2",},{"segment":"Hemlock Creek","iceagetraildistance":"7.0",},{"segment":"Highland Lakes","iceagetraildistance":"8.2",},{"segment":"Holy Hill","iceagetraildistance":"6.8",},{"segment":"Indian Creek","iceagetraildistance":"5.4",},{"segment":"Indian Lake","iceagetraildistance":"3.5",},{"segment":"Janesville","iceagetraildistance":"10.3",},{"segment":"Jerry Lake","iceagetraildistance":"15.2",},{"segment":"John Muir Park","iceagetraildistance":"1.8",},{"segment":"Kettlebowl","iceagetraildistance":"10.2",},{"segment":"Kewaskum","iceagetraildistance":"2.1",},{"segment":"Kewaunee River","iceagetraildistance":"12.5",},{"segment":"LaBudde Creek","iceagetraildistance":"3.0",},{"segment":"Lake Eleven","iceagetraildistance":"15.6",},{"segment":"Lapham Peak","iceagetraildistance":"7.7",},{"segment":"Lodi Marsh","iceagetraildistance":"1.8",},{"segment":"Loew Lake","iceagetraildistance":"4.3",},{"segment":"Lumbercamp","iceagetraildistance":"12.0",},{"segment":"Madison","iceagetraildistance":"3.1",},{"segment":"McKenzie Creek","iceagetraildistance":"9.4",},{"segment":"Mecan River","iceagetraildistance":"7.1",},{"segment":"Merrimac","iceagetraildistance":"3.7",},{"segment":"Merton","iceagetraildistance":"2.7",},{"segment":"Milton","iceagetraildistance":"4.3",},{"segment":"Milwaukee River (Fond du Lac Co)","iceagetraildistance":"4.3",},{"segment":"Milwaukee River (Washington Co)","iceagetraildistance":"6.8",},{"segment":"Mishicot","iceagetraildistance":"2.9",},{"segment":"Monches","iceagetraildistance":"3.1",},{"segment":"Mondeaux Esker","iceagetraildistance":"11.7",},{"segment":"Monticello","iceagetraildistance":"6.5",},{"segment":"Montrose","iceagetraildistance":"7.5",},{"segment":"New Hope-Iola Ski Hill","iceagetraildistance":"5.6",},{"segment":"Newwood","iceagetraildistance":"7.1",},{"segment":"Northern Blue Hills","iceagetraildistance":"9.6",},{"segment":"Parnell","iceagetraildistance":"13.9",},{"segment":"Parrish Hills","iceagetraildistance":"12.4",},{"segment":"Timberland Wilderness","iceagetraildistance":"3.9",},{"segment":"Pike Lake","iceagetraildistance":"3.3",},{"segment":"Pine Lake","iceagetraildistance":"2.9",},{"segment":"Pine Line","iceagetraildistance":"0.9",},{"segment":"Plover River","iceagetraildistance":"5.9",},{"segment":"Point Beach","iceagetraildistance":"10.0",},{"segment":"Portage Canal","iceagetraildistance":"3.0",},{"segment":"Rib Lake","iceagetraildistance":"2.7",},{"segment":"Ringle","iceagetraildistance":"8.8",},{"segment":"Sand Creek","iceagetraildistance":"5.7",},{"segment":"Sauk Point","iceagetraildistance":"3.9",},{"segment":"Scuppernong","iceagetraildistance":"5.6",},{"segment":"Skunk and Foster Lakes","iceagetraildistance":"3.6",},{"segment":"Slinger","iceagetraildistance":"2.1",},{"segment":"Southern Blue Hills","iceagetraildistance":"7.3",},{"segment":"Southern Kewaskum","iceagetraildistance":"1.1",},{"segment":"Springfield Hill","iceagetraildistance":"1.6",},{"segment":"St. Croix Falls","iceagetraildistance":"9.0",},{"segment":"Stony Ridge","iceagetraildistance":"3.1",},{"segment":"Storrs Lake","iceagetraildistance":"1.8",},{"segment":"Straight Lake","iceagetraildistance":"3.6",},{"segment":"Straight River","iceagetraildistance":"3.4",},{"segment":"Sturgeon Bay","iceagetraildistance":"13.7",},{"segment":"Summit Moraine","iceagetraildistance":"12.4",},{"segment":"Table Bluff","iceagetraildistance":"3.6",},{"segment":"Thornapple Creek","iceagetraildistance":"3.0",},{"segment":"Timberland Hills","iceagetraildistance":"10.9",},{"segment":"Tisch Mills","iceagetraildistance":"1.8",},{"segment":"Trade River","iceagetraildistance":"3.9",},{"segment":"Turtle Rock","iceagetraildistance":"5.1",},{"segment":"Tuscobia","iceagetraildistance":"11.2",},{"segment":"Underdown","iceagetraildistance":"6.3",},{"segment":"Valley View","iceagetraildistance":"3.1",},{"segment":"Verona","iceagetraildistance":"6.4",},{"segment":"Walla Hi","iceagetraildistance":"2.3",},{"segment":"Waterville","iceagetraildistance":"3.3",},{"segment":"Waupaca River","iceagetraildistance":"2.3",},{"segment":"Wedde Creek","iceagetraildistance":"1.2",},{"segment":"West Bend","iceagetraildistance":"6.7",},{"segment":"Whitewater Lake","iceagetraildistance":"4.6",},{"segment":"Wood Lake","iceagetraildistance":"13.4",}];
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


// var new_segment_data = [{"segment":"Janesville to Milton","iceagetraildistance":"1.7",},{"segment":"Cross Plains","iceagetraildistance":"7.0",},{"segment":"Albany","iceagetraildistance":"9.4",},{"segment":"Alta Junction","iceagetraildistance":"1.2",},{"segment":"Arbor Ridge","iceagetraildistance":"2.1",},{"segment":"Averill-Kelly Creek Wilderness","iceagetraildistance":"4.9",},{"segment":"Baraboo","iceagetraildistance":"4.0",},{"segment":"Bear Lake","iceagetraildistance":"5.4",},{"segment":"Blackhawk","iceagetraildistance":"7.0",},{"segment":"Blue Spring Lake","iceagetraildistance":"7.1",},{"segment":"Bohn Lake","iceagetraildistance":"1.8",},{"segment":"Brooklyn Wildlife","iceagetraildistance":"3.4",},{"segment":"Camp 27","iceagetraildistance":"2.9",},{"segment":"Cedar Lakes","iceagetraildistance":"2.4",},{"segment":"Chaffee Creek","iceagetraildistance":"2.5",},{"segment":"Chippewa Moraine","iceagetraildistance":"7.9",},{"segment":"Chippewa River","iceagetraildistance":"1.8",},{"segment":"City of Lodi","iceagetraildistance":"2.2",},{"segment":"City of Manitowoc","iceagetraildistance":"7.5",},{"segment":"City of Two Rivers","iceagetraildistance":"3.0",},{"segment":"Clover Valley","iceagetraildistance":"1.6",},{"segment":"Deerfield","iceagetraildistance":"3.7",},{"segment":"Delafield","iceagetraildistance":"3.2",},{"segment":"Dells of the Eau Claire","iceagetraildistance":"2.6",},{"segment":"Devil's Lake","iceagetraildistance":"10.9",},{"segment":"Devil's Staircase","iceagetraildistance":"1.8",},{"segment":"Dunes","iceagetraildistance":"2.7",},{"segment":"Eagle","iceagetraildistance":"5.6",},{"segment":"East Lake","iceagetraildistance":"6.5",},{"segment":"East Twin River","iceagetraildistance":"1.4",},{"segment":"Eastern Lodi Marsh","iceagetraildistance":"3.2",},{"segment":"Emmons Creek","iceagetraildistance":"2.6",},{"segment":"Fern Glen","iceagetraildistance":"1.3",},{"segment":"Firth Lake","iceagetraildistance":"5.2",},{"segment":"Forestville","iceagetraildistance":"9.8",},{"segment":"Gandy Dancer","iceagetraildistance":"15.1",},{"segment":"Gibraltar Rock","iceagetraildistance":"4.0",},{"segment":"Grandfather Falls","iceagetraildistance":"4.0",},{"segment":"Grassy Lake","iceagetraildistance":"8.5",},{"segment":"Greenbush","iceagetraildistance":"8.8",},{"segment":"Greenwood","iceagetraildistance":"4.5",},{"segment":"Harrison Hills","iceagetraildistance":"14.5",},{"segment":"Hartland","iceagetraildistance":"5.7",},{"segment":"Hartman Creek","iceagetraildistance":"5.6",},{"segment":"Harwood Lakes","iceagetraildistance":"6.2",},{"segment":"Hemlock Creek","iceagetraildistance":"7.0",},{"segment":"Highland Lakes","iceagetraildistance":"8.2",},{"segment":"Holy Hill","iceagetraildistance":"6.8",},{"segment":"Indian Creek","iceagetraildistance":"5.4",},{"segment":"Indian Lake","iceagetraildistance":"3.5",},{"segment":"Janesville","iceagetraildistance":"10.3",},{"segment":"Jerry Lake","iceagetraildistance":"15.2",},{"segment":"John Muir Park","iceagetraildistance":"1.8",},{"segment":"Kettlebowl","iceagetraildistance":"10.2",},{"segment":"Kewaskum","iceagetraildistance":"2.1",},{"segment":"Kewaunee River","iceagetraildistance":"12.5",},{"segment":"LaBudde Creek","iceagetraildistance":"3.0",},{"segment":"Lake Eleven","iceagetraildistance":"15.6",},{"segment":"Lapham Peak","iceagetraildistance":"7.7",},{"segment":"Lodi Marsh","iceagetraildistance":"1.8",},{"segment":"Loew Lake","iceagetraildistance":"4.3",},{"segment":"Lumbercamp","iceagetraildistance":"12.0",},{"segment":"Madison","iceagetraildistance":"3.1",},{"segment":"McKenzie Creek","iceagetraildistance":"9.4",},{"segment":"Mecan River","iceagetraildistance":"7.1",},{"segment":"Merrimac","iceagetraildistance":"3.7",},{"segment":"Merton","iceagetraildistance":"2.7",},{"segment":"Milton","iceagetraildistance":"4.3",},{"segment":"Milwaukee River (Fond du Lac Co)","iceagetraildistance":"4.3",},{"segment":"Milwaukee River (Washington Co)","iceagetraildistance":"6.8",},{"segment":"Mishicot","iceagetraildistance":"2.9",},{"segment":"Monches","iceagetraildistance":"3.1",},{"segment":"Mondeaux Esker","iceagetraildistance":"11.7",},{"segment":"Monticello","iceagetraildistance":"6.5",},{"segment":"Montrose","iceagetraildistance":"7.5",},{"segment":"New Hope-Iola Ski Hill","iceagetraildistance":"5.6",},{"segment":"Newwood","iceagetraildistance":"7.1",},{"segment":"Northern Blue Hills","iceagetraildistance":"9.6",},{"segment":"Parnell","iceagetraildistance":"13.9",},{"segment":"Parrish Hills","iceagetraildistance":"12.0",},{"segment":"Pike Lake","iceagetraildistance":"3.3",},{"segment":"Timberland Wilderness","iceagetraildistance":"3.9",},{"segment":"Pine Lake","iceagetraildistance":"2.9",},{"segment":"Pine Line","iceagetraildistance":"0.9",},{"segment":"Plover River","iceagetraildistance":"5.9",},{"segment":"Point Beach","iceagetraildistance":"10.0",},{"segment":"Portage Canal","iceagetraildistance":"3.0",},{"segment":"Rib Lake","iceagetraildistance":"2.7",},{"segment":"Ringle","iceagetraildistance":"8.8",},{"segment":"Sand Creek","iceagetraildistance":"5.7",},{"segment":"Sauk Point","iceagetraildistance":"3.9",},{"segment":"Scuppernong","iceagetraildistance":"5.6",},{"segment":"Skunk and Foster Lakes","iceagetraildistance":"3.6",},{"segment":"Slinger","iceagetraildistance":"2.1",},{"segment":"Southern Blue Hills","iceagetraildistance":"7.3",},{"segment":"Southern Kewaskum","iceagetraildistance":"1.1",},{"segment":"Springfield Hill","iceagetraildistance":"1.6",},{"segment":"St. Croix Falls","iceagetraildistance":"9.0",},{"segment":"Stony Ridge","iceagetraildistance":"3.1",},{"segment":"Storrs Lake","iceagetraildistance":"1.8",},{"segment":"Straight Lake","iceagetraildistance":"3.6",},{"segment":"Straight River","iceagetraildistance":"3.4",},{"segment":"Sturgeon Bay","iceagetraildistance":"13.7",},{"segment":"Summit Moraine","iceagetraildistance":"12.4",},{"segment":"Table Bluff","iceagetraildistance":"3.6",},{"segment":"Thornapple Creek","iceagetraildistance":"3.0",},{"segment":"Timberland Hills","iceagetraildistance":"10.9",},{"segment":"Tisch Mills","iceagetraildistance":"1.8",},{"segment":"Trade River","iceagetraildistance":"3.9",},{"segment":"Turtle Rock","iceagetraildistance":"5.1",},{"segment":"Tuscobia","iceagetraildistance":"11.2",},{"segment":"Underdown","iceagetraildistance":"6.3",},{"segment":"Valley View","iceagetraildistance":"3.1",},{"segment":"Verona","iceagetraildistance":"6.4",},{"segment":"Walla Hi","iceagetraildistance":"2.3",},{"segment":"Waterville","iceagetraildistance":"3.3",},{"segment":"Waupaca River","iceagetraildistance":"2.3",},{"segment":"Wedde Creek","iceagetraildistance":"1.2",},{"segment":"West Bend","iceagetraildistance":"6.7",},{"segment":"Whitewater Lake","iceagetraildistance":"4.6",},{"segment":"Wood Lake","iceagetraildistance":"13.4"}];

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








// var segments = window._datasourceManager.map['_layers'].IAT_Segments1_449['_graphicsVal'];
// var html = '';
// var segmentObj = {};
// var segmentArray = [];
// var name = '';

// var geoArray = [];


// segments.forEach(val => {

//     var segment = val.attributes.Segment;
//     var iceagetraildistance = val.attributes.length_mi;

//     var geoObject = {};
//     geoObject.segment = segment;
//     geoObject.distance = iceagetraildistance;

//  var testArray = [];

//     for (var i = 0; i < val.geometry.paths[0].length; i++) {
//         var newArray = [];
//         newArray[0] = (val.geometry.paths[0][i][0] + 1000000) / 100000;
//         newArray[1] = (val.geometry.paths[0][i][1] - 1000000) / 100000;

//         testArray.push(newArray)
//     }

//     geoObject.coords = testArray;

// geoArray.push(geoObject);



    

//     if (segment.includes('Janesville to Milton')) {
//         console.log(val.geometry.paths[0])
// console.log(val)
//         console.log('^^^^^^^^^^^^^^^')
       
        


// }

//     name = segment.toLowerCase().replace(/ +/g, "");

//     if (segmentObj && !segmentObj[name]) {
//         segmentObj[name] = {
//             "name": segment,
//             "iceagetraildistance": iceagetraildistance
//         };
//         segmentArray.push(segment);
//     } else if (segmentObj[name]) {
//         segmentObj[name].iceagetraildistance += iceagetraildistance;
//     }
// });

// console.log(geoArray);