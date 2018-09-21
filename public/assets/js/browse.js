$(document).ready(function () {
    $('#searchBarBtn').on('click', function (event) {
        event.preventDefault();
         var idObj = {
            id: $('#searchBarInput').val().trim()
        }
        browseID(idObj);
    });
    function browseID(idObj) {
        $.ajax("/browse-by-id", {
            type: 'GET',
            data: idObj
        }).then(function (data) {
            location.replace('/browse-by-id-result')
        });
    };

    $('#searchBtn').on('click', function (event) {
        event.preventDefault();
        getInputValues();
    });

    function getSwitchExp(searchObj, tableValue) {
        var switchExpression = '0';
        for (var property in searchObj) {
            if (searchObj[property] == 'Choose...') {
                switchExpression = switchExpression + property;
            }
        }
        console.log('Switch Expression: ' + switchExpression);
        getSearchValues(switchExpression, tableValue);
    };

    function getSearchValues(switchExpression, tableValue) {
        switch (switchExpression) {
            case '0color':
                console.log('Missing: color only');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0size':
                console.log('Missing: size only');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    color: $('#searchColorID').val(),
                    claimed: 0
                };
                break;
            case '0colorsize':
                console.log('Missing: Color and Size');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategory':
                console.log('Missing: Category and Subcategory');
                var searchData = {
                    color: $('#searchColorID').val(),
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0categorycolor':
                console.log('Missing: Categories, subcategories, color');
                var searchData = {
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategorycolor':
                console.log('Missing: Categories, subcategories, color');
                var searchData = {
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
            case '0categorysize':
                console.log('Missing: Categories, subcategories, size');
                var searchData = {
                    color: $('#searchColorID').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategorysize':
                console.log('Missing: Categories, subcategories, size');
                var searchData = {
                    color: $('#searchColorID').val(),
                    claimed: 0
                };
                break;
            case '0categorysubcategorycolorsize':
                console.log('No user inputs. All data will appear.');
                var searchData = {
                    claimed: 0
                };
                break;
            case '0categorycolorsize':
                console.log('No user inputs. All data will appear');
                var searchData = {
                    claimed: 0
                };
                break;
            case '0':
                console.log('All inputs are valid');
                var searchData = {
                    category: $('#searchCategoryID').val(),
                    subcategory: $('#categorySelect').val(),
                    color: $('#searchColorID').val(),
                    size: $('#searchSizeID').val(),
                    claimed: 0
                };
                break;
        };
        sendAjaxCall(searchData, tableValue);
    };

    function sendAjaxCall(searchData, tableValue) {
        console.log("This is searchData: " + JSON.stringify(searchData));
        console.log("The table: " + tableValue);

        if (tableValue == 'Lost Items') {
            $.ajax("/browse-lost-items", {
                type: 'GET',
                data: searchData
            }).then(function (data) {
                //console.log("data in browse-lost-items call back: " + JSON.stringify(data));
                location.replace('/browse-lost-items-result')
            });

        } else if (tableValue == 'Found Items') {
            $.ajax("/browse-found-items", {
                type: 'GET',
                data: searchData
            }).then(function (data) {
                //console.log("tableValue: " + tableValue);
                location.replace('/browse-found-items-result')
            });
        };
    };

    function getInputValues() {
        // Console.logged the values of the drop-downs to test
        console.log('Table type: ' + $('#searchTableID').val());
        console.log('Category: ' + $('#searchCategoryID').val());
        console.log('Color: ' + $('#searchColorID').val());
        console.log('Size: ' + $('#searchSizeID').val());
        console.log('Subcategory ' + $('#categorySelect').val());

        var tableValue = $('#searchTableID').val();
        var searchObj = {
            category: $('#searchCategoryID').val(),
            subcategory: $('#categorySelect').val(),
            color: $('#searchColorID').val(),
            size: $('#searchSizeID').val()
        };
        console.log('The searchObj: ' + JSON.stringify(searchObj));
        getSwitchExp(searchObj, tableValue);
    };

    function claimItemLost(itemID) {
        var uid = localStorage.getItem('user_id')
        var firstname = localStorage.getItem('user_firstName');
        var lastname = localStorage.getItem('user_lastName');
        var email = localStorage.getItem('user_email');

       // console.log(`Claiming ${itemType[1]} item ID: ${itemID}...`);
        var obj = {
            itemType: 'lost',
            UserId: uid,
            LostId: itemID,
            firstname: firstname,
            lastname: lastname,
            email: email
        };
      //  console.log(JSON.stringify(obj));
      addNewLostClaim(obj);
    };

    function claimItemFound(itemID) {
       // var itemID = $('#claim-btn-found').val();
        // btnText = $('#claim-btn-found').text().toLowerCase();
       // var itemType = btnText.split(' ');
        var uid = localStorage.getItem('user_id')
        var firstname = localStorage.getItem('user_firstName');
        var lastname = localStorage.getItem('user_lastName');
        var email = localStorage.getItem('user_email');

        //console.log(`Claiming ${itemType[1]} item ID: ${itemID}...`);
        var obj = {
            itemType: 'found',
            UserId: uid,
            FoundId: itemID,
            firstname: firstname,
            lastname: lastname,
            email: email
        };

        //console.log(JSON.stringify(obj));
        addNewFoundClaim(obj);
    };

    function addNewFoundClaim(data) {
        $.ajax('/api/claim/found', {
            type: 'POST',
            data: data
        }).then(function (res) {
            console.log('Item claimed.')
            location.replace('/browse-items')
        });
    };

    function addNewLostClaim(data) {
        $.ajax('/api/claim/lost', {
            type: 'POST',
            data: data
        }).then(function (res) {
            console.log('Item claimed.')
            location.replace('/browse-items')
        });
    };

    $('.claim-btn-lost').on('click', function (event) {
        console.log("enter claim lost claim");
        event.preventDefault();
        var lost_itemID = $(this).val();
        console.log("itemid in lost: "+lost_itemID);
        claimItemLost(lost_itemID);
    });

    $('.claim-btn-found').on('click', function (event) {
        console.log("enter claim found claim");
        event.preventDefault();
       var found_itemID = $(this).val();
        console.log("itemid in found: "+found_itemID);
        claimItemFound(found_itemID);
    });
});