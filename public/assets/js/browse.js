$(document).ready(function () {
  $('#searchBarBtn').on('click', function (event) {
    event.preventDefault();
    var idObj = {
      id: $('#searchBarInput').val().trim()
    };
    browseID(idObj);
  });
  
  function browseID(idObj) {
    $.ajax('/browse-by-id', {
      type: 'GET',
      data: idObj
    }).then(function () {
      location.replace('/browse-by-id-result');
    });
  }

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
    getSearchValues(switchExpression, tableValue);
  }

  function getSearchValues(switchExpression, tableValue) {
    switch (switchExpression) {
    case '0color':
      var searchData = {
        category: $('#searchCategoryID').val(),
        subcategory: $('#categorySelect').val(),
        size: $('#searchSizeID').val(),
        claimed: 0
      };
      break;
    case '0size':
      var searchData = {
        category: $('#searchCategoryID').val(),
        subcategory: $('#categorySelect').val(),
        color: $('#searchColorID').val(),
        claimed: 0
      };
      break;
    case '0colorsize':
      var searchData = {
        category: $('#searchCategoryID').val(),
        subcategory: $('#categorySelect').val(),
        claimed: 0
      };
      break;
    case '0categorysubcategory':
      var searchData = {
        color: $('#searchColorID').val(),
        size: $('#searchSizeID').val(),
        claimed: 0
      };
      break;
    case '0categorycolor':
      var searchData = {
        size: $('#searchSizeID').val(),
        claimed: 0
      };
      break;
    case '0categorysubcategorycolor':
      var searchData = {
        size: $('#searchSizeID').val(),
        claimed: 0
      };
      break;
    case '0categorysize':
      var searchData = {
        color: $('#searchColorID').val(),
        claimed: 0
      };
      break;
    case '0categorysubcategorysize':
      var searchData = {
        color: $('#searchColorID').val(),
        claimed: 0
      };
      break;
    case '0categorysubcategorycolorsize':
      var searchData = {
        claimed: 0
      };
      break;
    case '0categorycolorsize':
      var searchData = {
        claimed: 0
      };
      break;
    case '0':
      var searchData = {
        category: $('#searchCategoryID').val(),
        subcategory: $('#categorySelect').val(),
        color: $('#searchColorID').val(),
        size: $('#searchSizeID').val(),
        claimed: 0
      };
      break;
    }
    sendAjaxCall(searchData, tableValue);
  }

  function sendAjaxCall(searchData, tableValue) {
    if (tableValue === 'Lost Items') {
      $.ajax('/browse-lost-items', {
        type: 'GET',
        data: searchData
      }).then(function () {
        location.replace('/browse-lost-items-result');
      });

    } else if (tableValue === 'Found Items') {
      $.ajax('/browse-found-items', {
        type: 'GET',
        data: searchData
      }).then(function () {
        location.replace('/browse-found-items-result');
      });
    }
  }

  function getInputValues() {
    var tableValue = $('#searchTableID').val();
    var searchObj = {
      category: $('#searchCategoryID').val(),
      subcategory: $('#categorySelect').val(),
      color: $('#searchColorID').val(),
      size: $('#searchSizeID').val()
    };
    getSwitchExp(searchObj, tableValue);
  }

  function claimItemLost(itemID) {
    var uid = localStorage.getItem('user_id');
    var firstname = localStorage.getItem('user_firstName');
    var lastname = localStorage.getItem('user_lastName');
    var email = localStorage.getItem('user_email');
    var obj = {
      itemType: 'lost',
      UserId: uid,
      LostId: itemID,
      firstname: firstname,
      lastname: lastname,
      email: email
    };
    addNewLostClaim(obj);
  }

  function claimItemFound(itemID) {
    // var itemID = $('#claim-btn-found').val();
    // btnText = $('#claim-btn-found').text().toLowerCase();
    // var itemType = btnText.split(' ');
    var uid = localStorage.getItem('user_id');
    var firstname = localStorage.getItem('user_firstName');
    var lastname = localStorage.getItem('user_lastName');
    var email = localStorage.getItem('user_email');
    var obj = {
      itemType: 'found',
      UserId: uid,
      FoundId: itemID,
      firstname: firstname,
      lastname: lastname,
      email: email
    };
    addNewFoundClaim(obj);
  }

  function addNewFoundClaim(data) {
    $.ajax('/api/claim/found', {
      type: 'POST',
      data: data
    }).then(function () {
      location.replace('/browse-items');
    });
  }

  function addNewLostClaim(data) {
    $.ajax('/api/claim/lost', {
      type: 'POST',
      data: data
    }).then(function () {
      location.replace('/browse-items');
    });
  }

  $('.claim-btn-lost').on('click', function (event) {
    event.preventDefault();
    var losItemID = $(this).val();
    claimItemLost(losItemID);
  });

  $('.claim-btn-found').on('click', function (event) {
    event.preventDefault();
    var foundItemID = $(this).val();
    claimItemFound(foundItemID);
  });
});