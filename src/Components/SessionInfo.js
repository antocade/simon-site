var User = (() => {
    var ID = "";
  
    var getID = function() {
        let cookie = "";
        cookie = document.cookie.split(';')
        console.log("DEBUG: " + cookie)
        if (cookie) {
            return cookie;
        } else {
            return ID;
        }
    // Or pull this from cookie/localStorage
    };
  
    var setID = function(inp) {
      ID = inp;     
      // Also set this in cookie/localStorage
      document.cookie = `user_id=${ID};max-age=604800;domain=antocade.github.io/simon-site`
    };
  
    return {
      getID: getID,
      setID: setID
    }
  
  })();
  
  export default User;