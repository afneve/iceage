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
    **Retrive Data and put on page
    */
    displayProgress: function(){
        var multiplier = 100;

        var efnIceAgePercentage = (iceAge.efnComplete + iceAge.efnPartial) / iceAge.totalTrailDistance;
        var afnIceAgePercentage = (iceAge.afnComplete + iceAge.afnPartial) / iceAge.totalTrailDistance;

       // while( ((efnIceAgePercentage * multiplier) < 25 ) || ((afnIceAgePercentage * multiplier) < 25 ) ){
        //   multiplier += 1;
        //}

        setTimeout(function(){
            $("#efn_bar .complete").css("width", (iceAge.efnComplete / iceAge.totalTrailDistance) * multiplier + '%' );
            $("#afn_bar .complete").css("width", (iceAge.afnComplete / iceAge.totalTrailDistance) * multiplier + '%' );
        }, 500);

        setTimeout(function(){
            $("#efn_bar .partial").css("width", (iceAge.efnPartial / iceAge.totalTrailDistance) * multiplier + '%' );
            $("#afn_bar .partial").css("width", (iceAge.afnPartial / iceAge.totalTrailDistance) * multiplier + '%' );
            $("#efn_bar .miles_left").text(iceAge.totalTrailDistance - iceAge.efnComplete + " miles to go");
            $("#afn_bar .miles_left").text(iceAge.totalTrailDistance - iceAge.afnComplete + " miles to go");
        }, 1000);
               
    },

    calculatePercentage: function(amount, multiplier){

    }, 

    /*
    **Retrive Data and put on page
    */
    displaySegmentList: function(){
        var segmentHTML = '',
            previousSection = '';
    
        for(var i=0; i < ice_age_data.length; i++){
            var efnProgress = '',
            afnProgress = '',
            notes = '';

            /*for(var j=0; j < progress_data.length; j++){
                if(progress_data[j].Segment == ice_age_data[i].Segment){

                    efnProgress = progress_data[j].efnStatus;
                    afnProgress = progress_data[j].afnStatus;

                    if(typeof progress_data[j].notes != 'undefined'){
                        notes = progress_data[j].notes;
                    }
                    progress_data.splice(j,1);
                    
                }
            }*/

            if(ice_age_data[i].booksection != previousSection){
                segmentHTML += '<div class="county"><h3>' + ice_age_data[i].booksection + '</h3>';
            }




            segmentHTML += '<div class="segment_container">';
            segmentHTML += '<div class="segment" data-index="'+i+'">';
                segmentHTML += '<h4 class="segment_name">' + ice_age_data[i].segment + '</h4>';
                segmentHTML += '<div class="icons">';

                for(var l = 0; l < iceAge.iconArray.length; l++){
                    var type = iceAge.iconArray[l];
                    console.log(type);
                    console.log(ice_age_data[i]);
                    if(ice_age_data[i][type].trim() != ''){
                        var className = iceAge.iconArray[l].toLowerCase();
                        segmentHTML += '<span data-icon="'+className+'" class="icon"><img src="icons/'+className+'.png" /></span>';
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
                segmentHTML += '</div>'; //END COUNTY DIV
            }

            previousSection = ice_age_data[i].booksection;

           // segmentHTML += '<div class="segment">';
           // segmentHTML += '<span class="segment_name">' + ice_age_data[i].Segment + '</span>';
            //segmentHTML += '<span data-efnprogress="' + efnProgress + '" data-notes="'+notes+'"></span><span data-afnprogress="' + afnProgress + '" data-notes="'+notes+'"></span>';
           // segmentHTML += '</div>';

         /*   iceAge.totalTrailDistance += parseFloat(ice_age_data[i].IceAgeTrailDistance);

            if(efnProgress == 'done'){
                iceAge.efnComplete += parseFloat(ice_age_data[i].IceAgeTrailDistance);
            }
            else if(efnProgress == 'partial'){
                iceAge.efnPartial += parseFloat(ice_age_data[i].IceAgeTrailDistance);
            }

            if(afnProgress == 'done'){
                iceAge.afnComplete += parseFloat(ice_age_data[i].IceAgeTrailDistance);
            }
            else if(afnProgress == 'partial'){
                iceAge.afnPartial += parseFloat(ice_age_data[i].IceAgeTrailDistance); 
            }*/
        }

        $('#segment_list').html(segmentHTML);

        $('.segment .icon').on('click', function(){
            var iconType = $(this).attr('data-icon');

            var index = $(this).closest('.segment').attr('data-index');

            $('#footnote').html(ice_age_data[index][iconType]);
				$('#footnote').css('bottom', 0);
				$('#footnote').addClass('show');
				
				setTimeout(function(){

				    $('#footnote').css('bottom', -100);
				}, 4000);

            /*
            if($(this).attr('data-notes') != ''){
                
            }*/
        });
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
});