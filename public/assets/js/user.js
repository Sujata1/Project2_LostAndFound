$(document).ready(function () {
  clickSingInButtonListener();
  clickSingupButtonListener();
  emailEntryBlurEvent();
  emailSignUpEntryBlurEvent();
});

function emailEntryBlurEvent() {
  $('#exampleDropdownFormEmail1').on('blur', function (event) {
    event.preventDefault();
   
    var signEmail = $('#exampleDropdownFormEmail1').val().trim().toLowerCase();
    if (signEmail.trim() === '') {
      $('#email-enter-error').text("Email cannot be blank");
      $('#exampleDropdownFormEmail1').focus();
    }
    else {
      $('#email-enter-error').text("");

      var emailToValidate = {
        email: signEmail
      };

      $.ajax('/api/emailValidate/', {
        type: 'POST',
        data: emailToValidate
      }).then(function (res) {
        if (res.validate) {
          $('#exampleDropdownFormPassword1').focus();
        }
        else {
          $('#email-enter-error').text('Email does not exist');
          $('#exampleDropdownFormEmail1').focus();
        }
      }
      );
    }
  });
};

function clickSingInButtonListener() {
  $('#signInButton').on('click', function (event) {
    event.preventDefault();
    
    var validated = true;

    var signEmail = $('#exampleDropdownFormEmail1').val().trim().toLowerCase();
    var signPass = $('#exampleDropdownFormPassword1').val().trim();
    console.log('user: ' + signEmail);
    console.log('pass: ' + signPass);

    if (signEmail.trim() === '') {
      validated = false;
      $('#email-enter-error').text("Email cannot be blank");
      $('#exampleDropdownFormEmail1').focus();
    }
    
    if (signPass.trim() === '') {
      validated = false;
      $('#pass-enter-error').text("Password cannot be blank");
      $('#exampleDropdownFormPassword1').focus();
    }
    
    if (validated){
    // var newUserDevoured = true;
    var newUser = {
      email: signEmail,
      pass: signPass
    };

    // Send the login request.
    $.ajax('/api/login/', {
      type: 'POST',
      data: newUser
    }).then(function (res) {
      if (res.validate) {
        console.log('token: ' + res.token);
        localStorage.setItem('session_token', res.token);
        localStorage.setItem('user_welcome', res.message);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('user_firstName', res.firstName);
        localStorage.setItem('user_lastName', res.lastName);
        localStorage.setItem('user_email', res.email);
        location.replace('/index');
      } else {
        $('#pass-enter-error').text(res.message);

      }
    }
    );
  };
  });
}

function emailSignUpEntryBlurEvent() {
  $('#exampleDropdownFormEmail3').on('blur', function (event) {
    event.preventDefault();
    console.log('enter emailEntryBlurEvent');
    var signEmail = $('#exampleDropdownFormEmail3').val().trim().toLowerCase();
    if (signEmail.trim() === '') {
      $('#email-enter-error').text("Email cannot be blank ");
      $('#exampleDropdownFormEmail3').focus();
    }
    else {
      $('#email-enter-error').text("");

      var emailToValidate = {
        email: signEmail
      };

      $.ajax('/api/emailValidate/', {
        type: 'POST',
        data: emailToValidate
      }).then(function (res) {
        if (res.validate) {
          $('#email-enter-error').text('Email already exists ');
          $('#exampleDropdownFormEmail3').focus();
        }
        else {
          $('#email-enter-error').text('');
          $('#exampleDropdownFormPassword4').focus();
        }
      }
      );
    }
  });
};


function clickSingupButtonListener() {
  $('#signUpButton').on('click', function (event) {
    event.preventDefault();
    console.log("enter clickSingUpButtonListenercc");
    var signFirst = $('#exampleDropdownFormFirst').val().trim();
    var signLast = $('#exampleDropdownFormLast').val().trim();
    var signEmail = $('#exampleDropdownFormEmail3').val().trim().toLowerCase();
    var signPass = $('#exampleDropdownFormPassword4').val().trim();
    var validated = true;

    if (signFirst.trim() === '') {
      validated = false;
      $('#first-enter-error').text("First Name  cannot be blank ");
      $('#exampleDropdownFormFirst').focus();
    }

    if (signLast.trim() === ''|| signLast.trim().length<3) {
      validated = false;
      $('#last-enter-error').text("Last Name cannot be blank or require minimum 3 characters ");
      $('#exampleDropdownFormLast').focus();
    }

    if (signEmail.trim() === '') {
      validated = false;
      $('#email-enter-error').text("Email  cannot be blank ");
      $('#exampleDropdownFormEmail3').focus();
    }
    
    if (signPass.trim() === '') {
      validated = false;
      $('#pass-enter-error').text("Password cannot be blank");
      $('#exampleDropdownFormPassword4').focus();
    }
    if (signPass.trim().length < 6) {
      validated = false;
      $('#pass-enter-error').text("Password should be minimum 6 characters long ");
      $('#exampleDropdownFormPassword4').focus();
    }
    // Send the login posts
    if (validated) {
      $('#first-enter-error').text('');
      $('#last-enter-error').text('');
      $('#email-enter-error').text('');
      $('#pass-enter-error').text('');
      var newUser = {
        firstname: signFirst,
        lastname: signLast,
        email: signEmail,
        password: signPass
      };
      $.ajax('/api/userpost/', {
        type: 'POST',
        data: newUser
      }).then(function (res) {
        if (res.validate) {

          console.log('token: ' + res.validate);
          localStorage.setItem('session_token', res.token);
          localStorage.setItem('user_welcome', res.message);
          localStorage.setItem('user_id', res.id);
          localStorage.setItem('user_firstName', res.firstName);
          localStorage.setItem('user_lastName', res.lastName);
          localStorage.setItem('user_email', res.email);
         
          location.replace('/index');
        } else {
          $('#signup-error').text("Sign Up was unsuccessful, Please try again");
        }
      }
      );
    };

  });
}



