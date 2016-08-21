
  function checkLoginState(response) {

      if (response.status === 'connected') {
        loadParams(response);
      } else if (response.status === 'not_authorized') {
        $('#status').html('Unauthorized to use this application');
      } else {
        $('#status').html('Use Facebook to login.');
      }
  }

window.fbAsyncInit = function() {

  FB.init({
    appId      : '578124792359941',
    cookie     : true,
    xfbml      : true,
    status     : true,
    version    : 'v2.7'
  });

  FB.Event.subscribe('auth.login', function(response){
    checkLoginState(response);
  });

  FB.getLoginStatus(checkLoginState);

}

function loadParams(response){

  var authResp = response.authResponse;
  var uid = authResp.userID;
  var accessToken = authResp.accessToken;
  console.log(uid)
  console.log(accessToken)
  FB.api('/me', function(response) {
    $('#status').html('Welcome back, ' + response.name + '!');
  });   
}
