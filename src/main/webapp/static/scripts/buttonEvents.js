var EVENTS = {
    
};

$(document).ready(function() {
    
    EVENTS.viewArea = $("#ResultsView");
    
    var updateViewProducts = function(data){
        EVENTS.viewArea.empty();
        EVENTS.viewArea.append("<div class='col-xs-2'>Product ID</div>");
        EVENTS.viewArea.append("<div class='col-xs-4'>Product Name</div>");
        EVENTS.viewArea.append("<div class='col-xs-6'>Categories</div>");
        var i = 0;
        var n = 0;
        for (i=0; i<data.length; i++) {
            EVENTS.viewArea.append("<div class='col-xs-2'>"+data[i].id+"</div>");
            EVENTS.viewArea.append("<div class='col-xs-4'>"+data[i].name+"</div>");
            EVENTS.viewArea.append("<div id='categories"+i+"' class='col-xs-6'></div>");
            var a = $("#categories"+i);
            console.log(a); 
            if (data[i].categories.length === 0) {
                a.html("&ltNone&gt");
            } else {
                for (n=0; n<data[i].categories.length; n++) {
                    a.html(a.html()+data[i].categories[n].c_name);
                    if (n<data[i].categories.length-1) {
                        a.html(a.html()+", ");
                    }
            }
            };
        }
        
    };
    
    var updateViewCategories = function(data){
        EVENTS.viewArea.empty();
        EVENTS.viewArea.append("<div class='col-xs-2'>Category ID</div>");
        EVENTS.viewArea.append("<div class='col-xs-4'>Category Name</div>");
        EVENTS.viewArea.append("<div class='col-xs-6'>Products</div>");
        var i = 0;
        var n = 0;
        for (i=0; i<data.length; i++) {
            EVENTS.viewArea.append("<div class='col-xs-2'>"+data[i].id+"</div>");
            EVENTS.viewArea.append("<div class='col-xs-4'>"+data[i].name+"</div>");
            EVENTS.viewArea.append("<div id='products"+i+"' class='col-xs-6'></div>");
            var a = $("#products"+i);
            console.log(a); 
            if (data[i].products.length === 0) {
                a.html("&ltNone&gt");
            } else {
                for (n=0; n<data[i].products.length; n++) {
                    a.html(a.html()+data[i].products[n].name);
                    if (n<data[i].products.length-1) {
                        a.html(a.html()+", ");
                    }
            }
            };
        }
        
    };
    
    var updateViewRetailers = function(data) {
    	
    	EVENTS.viewArea.empty();
    	EVENTS.viewArea.append("<div class='col-xs-2'>Retailer ID</div>");
    	EVENTS.viewArea.append("<div class='col-xs-4'>Retailer Name</div>");
        EVENTS.viewArea.append("<div class='col-xs-6'>Address</div>");
        var i = 0;
        var n = 0;
        var fullAddr = "";
        
        for (i=0; i<data.length; i++) {
        	 EVENTS.viewArea.append("<div class='col-xs-2'>"+data[i].id+"</div>");
             EVENTS.viewArea.append("<div class='col-xs-4'>"+data[i].name+"</div>");
             EVENTS.viewArea.append("<div id='address"+i+"' class='col-xs-6'></div>");
             
             var a = $("#address"+i);
             console.log(a);
             if(data[i].address.length === 0) {
            	 a.html("&ltNone&gt");            	 
             } else {
            	
            	fullAddr = data[i].address.street + " " + data[i].address.city + " " +
            		 	   data[i].address.state + " " + data[i].address.zip;
            	a.html(a.html() + fullAddr);
            	 
             };
        }    	
    };
    
    var updateViewSales = function(data) {
    	
    	EVENTS.viewArea.empty();
    	EVENTS.viewArea.append("<div class='col-sm-2'>Sale ID</div>");
    	EVENTS.viewArea.append("<div class='col-sm-3'>Retailer Name</div>");
        EVENTS.viewArea.append("<div class='col-sm-3'>Product Name</div>");
        EVENTS.viewArea.append("<div class='col-sm-1'>Quantity</div>");
        EVENTS.viewArea.append("<div class='col-sm-1'>Cost</div>");
        EVENTS.viewArea.append("<div class='col-sm-2'>Sale Date</div>");
    	
        for (i=0; i<data.length; i++) {
        	
        	 EVENTS.viewArea.append("<div class='col-sm-2'>"+data[i].id+"</div>");
        	 EVENTS.viewArea.append("<div id='retailer"+i+"' class='col-sm-3'></div>");
        	 EVENTS.viewArea.append("<div id='product"+i+"' class='col-sm-3'></div>");
        	 EVENTS.viewArea.append("<div class='col-sm-1'>"+data[i].productQuantity+"</div>");
        	 EVENTS.viewArea.append("<div class='col-sm-1'>"+data[i].cost+"</div>");
        	 EVENTS.viewArea.append("<div class='col-sm-2'>"+data[i].saleDate+"</div>");
        	 
        	 var r = $("#retailer"+i);
        	 console.log(r);
        	 var p = $("#product"+i);
        	 console.log(p);
        	 
        	 r.html(r.html()+data[i].retailer.name);
        	 p.html(p.html()+data[i].product.name);
        	 
        }
    }

    
    var sendRequest = function (group,id) {
        var tempUrl = "/ims/"+group+"/";
        
        if (id) {
            tempUrl += id;
        }
        
        $.ajax({
            method: "GET",
            url: tempUrl,

            success: function(data) {
                console.log(data);
                if (group === "product") {
                    updateViewProducts(data);
                } else if (group === "category") {
                    updateViewCategories(data);
                } else if(group === "retailer") {
                	updateViewRetailers(data);
                } else if(group === "sale") {
                	updateViewSales(data);
                }

            },

            failure: function() {
                setTimeout(function(){productRequest(group,id);},2000);
            }
        });
    };
    
    $("#prodById").click(function(){
        var input = $("#idInput").val();
        console.log(input);
        if ($.isNumeric(input)) {
            var id = input;
            sendRequest("product",id);
        } else console.log("Invalid Entry");
    });
    
    $("#productsButton").click(function(){
        sendRequest("product");
    });
    
    $("#catById").click(function(){
        var input = $("#idInput").val();
        console.log(input);
        if ($.isNumeric(input)) {
            var id = input;
            sendRequest("category",id);
        } else console.log("Invalid Entry");
    });
    
    $("#categoriesButton").click(function(){
        sendRequest("category");
    });
    
    $("#retailersButton").click(function(){
    	sendRequest("retailer");
    });
    
    $("#salesButton").click(function(){
    	sendRequest("sale");
    });
});