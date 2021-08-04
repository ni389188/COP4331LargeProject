const app_name = 'cop4331din';
function buildPath(route) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://' + app_name + '.herokuapp.com/' + route;
  }
  else {
    return 'http://10.0.2.2:5000/' + route;
  }
};

const verifiedAccount = (email, password) => {
    // let veriry = false;

    // // var obj = { Email: email, Password: password };
    // // var js = JSON.stringify(obj);
    // // try {
    // //   const response = await fetch(buildPath('api/login'), { method: 'post', body: js, headers: { 'Content-Type': 'application/json' } });
    // //   var res = JSON.parse(await response.text());
    // //   if(res.LoggedIn)            
    // //   {                
    // //     if(res.IsVerified)
    // //     {
    // //       veriry = true;  
    // //       console.log("Hello")
    // //     }
    // //   }            
    // //   else
    // //   {
    // //     veriry = false;
    // //   }        
    // // }        
    // // catch(e)        
    // // {            
    // //     veriry = false;              
    // // }

    // return veriry;

    return true;
}

// function unVerifiedAccount(email, password) {
//     return true;
// }

// function noAccount(email, password) {
//     return false;
// }

module.exports = verifiedAccount;