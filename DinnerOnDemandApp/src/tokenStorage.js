exports.storeToken = function ( tok )
{
    try
    {
      localStorage.setItem('user_data', tok.accessToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
}

exports.retrieveToken = function ()
{
    var ud;
    try
    {
      ud = localStorage.getItem('user_data');
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}

exports.removeToken = function ()
{
    var ud;
    try
    {
      ud = localStorage.removeItem('user_data');
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}

exports.saveDarkMode = function (val)
{
  var ud;
  try
  {
    ud = localStorage.setItem('darkMode', val);
  }
  catch(e)
  {
    console.log(e.message)
  }
  return ud;
}

exports.getDarkMode = function ()
{
  var ud;
  try
  {
    ud = localStorage.getItem('darkMode');
  }
  catch(e)
  {
    console.log(e.message)
  }
  return ud;
}