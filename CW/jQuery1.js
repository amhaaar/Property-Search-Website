//Using Jquery for Min bedrooms
$(function() {
    $("#spinner").spinner({
        min: 0,
        max: 12,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

//Using Jquery for Max bedrooms
$(function() {
    $("#spinner2").spinner({
        min: 0,
        max: 12,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

//Using Jquery for Property Type
$(function() {
    $("#property").selectmenu();
});


//Using JQuery for Date Added
$(function() {
    $("#time").selectmenu();
});

//Using Jquery slider for price range
$(function() {
    $("#slider-range").slider({
        range:true,
        min:200000,
        max:5000000,
        values: [75, 300],
        slide: function(event, ui){
            $("#amount").val("£" + ui.values[0] + " - £" + ui.values[1]);
        }
    });
    $("#amount").val(" £" + $(" #slider-range").slider("values", 0) + " - £" + $("#slider-range").slider("values", 1));
});



// Search function for the button
$(function() {
    $("#Search").on("click",function() {

        var propType = $("#property").val();                                            //Creating variables for each data the user is gonna input to search
        var maxBed = $("#spinner").val();
        var minBed = $("#spinner2").val();
        var date = $("#time").val();
        var minPrice = $("#slider-range").slider("option", "values")[0];
        var maxPrice = $("#slider-range").slider("option", "values")[1];

        var output = `<div class="container text-center">
                        <div class="row">`;

             for (var i in data.properties) {                                               //Using for loop to loop through the array and check whether each element is matching the searched reults
                if (( propType == data.properties[i].type) || (propType == "Any"))
                if (( minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms))
                if (( date == data.properties[i].added.month) || (date == "Anytime"))
                if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice))
                {
                    {
                        {
                            {
                                output += `  <div class="col p-2 "> 
                                <div class="card border border-3 rounded" style="width: 18rem;"> 
                                <img height="250px" width="250px" src="${data.properties[i].picture}"  class="card-img-top" alt="...">
                                <div class="card-body">
                                  <h5 class="card-title"> £ ${data.properties[i].price}</h5>
                                  <p class="card-text text-truncate">${data.properties[i].description}</p>
                                  <a href="${data.properties[i].url}" class="btn btn-primary">Visit Page</a>
                                </div>
                                </div>
                            </div>`

                            } } } }  }
            output+=`</div> </div>`;
            document.getElementById("Placeholder").innerHTML = output;    //Displaying the result to the  placeholder in  main.html

    });
});

// Add to favourites function 
$(function() {
	$( "#addFavourites" ).on("click", function(){
		
		try {
			$(this).attr('disabled', true);                  //When add to favourite is clicked the button will be disabled
			
			var propIdToAdd = $(this).closest("p").attr("id");     //The program will find the first <p> with an attribute called "id"
			
			var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			if(myFavouriteProp == null) {
				myFavouriteProp = [];
			}
			
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					if ( propIdToAdd == myFavouriteProp[j]) {
						
						alert("This property is already in your favourites"); 
						myFavouriteProp = [];
					}
				}
			}
			
			myFavouriteProp.push(propIdToAdd);
			
			localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
			
		}
		
		catch (e) {
			if (e==QUOTA_EXCEEDED_ERR) {
				console.log("Error: Local storage limit exceeds");
			}
			
			else {
				console.log("ERROR: Saving to local storge.");
			}
		}
	});
});

// Remove from favourites function 
$(function() {
	$( "#removeFavourites" ).on("click", function(){
		
			$(this).attr('disabled', true);
			
			var propIdToRemove = $(this).closest("p").attr("id");
			
			 myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
			
			
			if(myFavouriteProp != null) {
				for ( var j = 0; j < myFavouriteProp.length; j++) {
					
					if ( propIdToRemove == myFavouriteProp[j]) {
						
						alert("This Property has been removed");
						
						delete myFavouriteProp[j];
						
						localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
						
						myFavouriteProp[j] = [];
					}
				}
			}
			
			if(myFavouriteProp == null) {
				alert("You have no favourite items");
			}
		});
	});

// Function to view all the favourite properties
$(function() {
        $( "#viewFavourites" ).on("click", function(){
            
            console.log("Restoring array data from local storage");
            
            myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
            
            var output = `<div class="container text-center">
                        <div class="row">`;
            
            if (myFavouriteProp != null) {
                
                for (var i = 0; i < data.properties.length; i++) {
                    for (j = 0; j < myFavouriteProp.length; j++) {
                        
                        if (data.properties[i].id == myFavouriteProp[j]) {
                            
                                output += `<div class="col p-2"> 
                                <div class="card border border-3 rounded" style="width: 18rem;"> 
                                <img height="250px" width="250px" src="${data.properties[i].picture}"  class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> £ ${data.properties[i].price}</h5>
                                    <p class="card-text text-truncate">${data.properties[i].description}</p>
                                    <a href="${data.properties[i].url}" class="btn btn-primary">Visit Page</a>
                                </div>
                                </div>
                            </div>`
                        }
                    }
                }
            }
            output+=`</div> </div>`;
            
            document.getElementById( "Placeholder2" ).innerHTML = output;
        
    });
});

// Remove all favourite items
$(function() {
	$( "#clearFavourites" ).on("click", function(){
		
		$("#Placeholder2").remove();
		
		myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
		
		localStorage.clear();
		
	});
	
});