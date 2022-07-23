let user = {};
function checkUser() {
    if(localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.getItem('user'));
        displayUser();
    }
    else {
        googleSignOut();
    }
}

function googleSignOut() {
    document.getElementById('googleInfo').style.display = "none";
    document.getElementById('signInBtn').hidden = false;
    window.localStorage.clear();
}

function displayUser() {
    document.getElementById('googleInfo').style.display = "flex";
    document.getElementById('googlePic').src = user.img;
    document.getElementById('googleName').innerHTML = user.name;
    document.getElementById('signInBtn').hidden = true;
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userInfo = jwt_decode(response.credential);
    user = {
        'img': userInfo.picture,
        'name': userInfo.name,
        'email': userInfo.email
    }
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    displayUser();
}

window.onload = function () {
    google.accounts.id.initialize({
    client_id: "594234124010-23ugaco82t1moqsuuco1nahdi8sv0adf.apps.googleusercontent.com",
    callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
    document.getElementById("signInBtn"),
    { theme: "outline", size: "medium" }  // customization attributes
    );
    checkUser();
}



