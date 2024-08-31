
window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};

const formInp = document.getElementById("signInBorder");

formInp.addEventListener("submit", function (e) {
  
  e.preventDefault();

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let mobileNumberRegex = /^(010|011|012|015)\d{8}$/;
  let passwordRegex = /^[A-z]{2,}[0-9]{2,}$/;

  var emailPhoneInput = document.getElementById("emailPhoneValue").value;
  var passwordInput = document.getElementById("passValue").value;

  if (
    (mobileNumberRegex.test(emailPhoneInput) == false &&
      emailRegex.test(emailPhoneInput) == false) ||
    passwordRegex.test(passwordInput) == false
  ) {
    
    Swal.fire({
      text: "You have entered wrong data.😞",
      icon: "error",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      // e.target.reset();
      Swal.close();
    }, 1333);
    return;
  }

  const formObjects = {
    userEmailPhone: emailPhoneInput,
    userPassword: cipherRot13(passwordInput),
  };

  let storedData = JSON.parse(localStorage.getItem("account")) || [];
  let Duplicate = storedData.filter(
    (user) =>
      user.userEmailPhone === formObjects.userEmailPhone &&
      user.userPassword === formObjects.userPassword
  );
  console.log(Duplicate);
  if (Duplicate.length > 0) {
    
    const cookieName = `account`;
    const cookieValue = `userName=${Duplicate[0].userName}`;
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    document.cookie = `${cookieName}=${cookieValue}; expires=${expireDate.toUTCString()}`;

    
    Swal.fire({
      text: "Thank you for Signing Up. You will be redirected to the Home Page. 😃",
      icon: "success",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
      location.href = "index.html";
    }, 1333);
  } else {
    Swal.fire({
      text: "Please Enter Valid Password 😞",
      icon: "error",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
    }, 1333);
  }
});

function cipherRot13(str) {
  str = str.toUpperCase();
  return str.replace(/[A-Z0-9]/g, rot13);
  function rot13(correspondance) {
    const charCode = correspondance.charCodeAt();
    return String.fromCharCode(
      charCode + 13 <= 90 ? charCode + 13 : ((charCode + 13) % 90) + 64
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                          START Of Adding DarkMode                          */
/* -------------------------------------------------------------------------- */

const options = {
  bottom: "136px", // default: '32px'
  right: "unset", // default: '32px'
  left: "32px", // default: 'unset'
  time: "0.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#000000", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: true, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true, // default: true
};
const darkmode = new Darkmode(options);
darkmode.showWidget();

/* -------------------------------------------------------------------------- */
/*                           END Of Adding DarkMode                           */
/* -------------------------------------------------------------------------- */
