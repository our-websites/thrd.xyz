const page = window.location.pathname.split('/')[1];
    const returnDiv = document.getElementsByName('return')[0];
    const returnredirect = document.querySelector('.btn');

    if (page == "dashboard") {
      returnDiv.innerText = "Back To Dashboard";
      returnredirect.href = "https://beta.thrd.xyz/dashboard";
    } else {
      returnDiv.innerText = "Back To Home";
      returnredirect.href = "https://beta.thrd.xyz";
    }