var User = (() => {
    var getID = function() {
        let ID = "";
        let cookie = document.cookie.split(';')

        // console.log("DEBUG: " + cookie)
        cookie.forEach((field) => {
          if (field.includes("user_id")) {
            ID = field.slice(8);
            }
        })

        if (ID != "") {
            return ID;
        } else {
          return null;
        }
    };
  
    var setID = function(ID) { 
      // Also set this in cookie/localStorage
      // document.cookie = `user_id=${ID};max-age=60480;domain=antocade.github.io/simon-site`
      document.cookie = "user_id=" + encodeURIComponent(ID) + ";max-age=60480"
    };

    var clearCookies = function(ID) {
      document.cookie = "user_id=" + encodeURIComponent(ID) + ";max-age=0"
    }
  
    return {
      getID: getID,
      setID: setID,
      clearCookies: clearCookies
    }
  
  })();
  
  export default User;