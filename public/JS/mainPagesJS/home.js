$(document).ready(function () {

    $(".searchIcon").click(function () {
        // get tex that user would to find in site
        let userTextSearch = $(".searchBox").val();
        //send req to server for find my search an show that
        if(userTextSearch !== "")
        {
            $.ajax({
                /**
                 * server side filter
                 */
                type: "GET",
                url: `home/search/${userTextSearch}`,// send user text searched to server for filter products in server
                success: function (searchResponse) {
                    $("body").html( searchResponse );
                }
            });
        }
    })
    
});