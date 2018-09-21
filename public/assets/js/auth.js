
$(document).ready(function () {
  checkToken();
  loadUserInfo();
});

function checkToken() {
  $.ajax('/auth', {
    type: 'GET',
    beforeSend: function (xhr) {
      /* Authorization header */
      xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('session_token'));
    },
  }).then(function (res) {
    if (res.status === '200') {
      console.log('auth status: '+res.status);
    }
    else {
      localStorage.clear();
      loadUserInfo();
    }
  }
  );
}

function loadUserInfo() {
  if (document.getElementById('firstName') !== null) {
    document.getElementById('firstName').disabled = true;
    document.getElementById('lastName').disabled = true;
    document.getElementById('exampleFormControlInput1').disabled = true;
    document.getElementById('exampleFormControlInput2').disabled = true;
  }
  if (localStorage.session_token) {
    if (localStorage.user_welcome) {
      $('#welcomUser').html('<b>' + localStorage.getItem('user_welcome') + '</b>');
    }
    $('#firstName').val(localStorage.getItem('user_firstName'));
    $('#lastName').val(localStorage.getItem('user_lastName'));
    $('#exampleFormControlInput1').val(localStorage.getItem('user_email'));
  } else {
    $('#welcomUser').html('<b>Please <a href=/signin>sign in</a> or <a href=/signup> sign up</a> to continue</b>');
    $('.notSignedMessage').html('<b>Please <a href=/signin>sign in</a> or  <a href=/signup> sign up</a> if you are new around here</b>');

    if (document.getElementById('enterFoundItems') !== null) {
      document.getElementById('enterFoundItems').disabled = true; 
    }
    if (document.getElementById('enterLostItems') !== null) {
      document.getElementById('enterLostItems').disabled = true;
    }
    if (document.getElementById('searchBtn') !== null) {
      document.getElementById('searchBtn').disabled = true;
    }


  }
}