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
html += '"iceagetraildistance":' + '"' + segmentObj[val].iceagetraildistance + '"' + ',';
html += '},';
});

console.log(segmentObj);
console.log(html);


/* Paste HTML from above here
    Then copy and paste everything below on your site */
var new_segment_data = []


/* 
Get New segments
*/
var newSegments = new_segment_data.filter(function (curVal) {
    var notInData = ice_age_data.every(function (iceVal) {
        // return !iceVal.segment.includes(curVal.segment);
        return iceVal.segment != curVal.segment;
    });

    return notInData
});

console.log(newSegments);

var oldSegments = ice_age_data.filter(function (curVal) {
    var notInData = new_segment_data.every(function (iceVal) {
        // return !iceVal.segment.includes(curVal.segment);
        return iceVal.segment != curVal.segment;
    });

    return notInData
});

console.log(oldSegments);