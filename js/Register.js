
window.onload = () => {
  setTimeout(() => {
    document.querySelector(".background").style.display = "none";
  }, 400);
};

let formInp = document.getElementById("myForm");

formInp.addEventListener("submit", function (e) {
  e.preventDefault();

  let nameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,9}$/;
  let emailRegex = /^[a-z]{3,}[0-9]*@(gmail|yahoo|hotmail).(com|net)$/;
  let mobileNumberRegex = /^(010|011|012|015)\d{8}$/;
  let passwordRegex = /^[A-z]{2,}[0-9]{2,}$/;

  var nameInput = document.getElementById("nameValue").value;
  var emailPhoneInput = document.getElementById("emailPhoneValue").value;
  var passwordInput = document.getElementById("passValue").value;
  var rePasswordInput = document.getElementById("rePassValue").value;

  if (
    nameRegex.test(nameInput) == false ||
    (mobileNumberRegex.test(emailPhoneInput) == false &&
      emailRegex.test(emailPhoneInput) == false) ||
    passwordInput !== rePasswordInput ||
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
      Swal.close();
    }, 1333);
    return;
  }

  const formObjects = {
    userName: nameInput,
    userEmailPhone: emailPhoneInput,
    userPassword: cipherRot13(passwordInput),
  };


  let storedData = JSON.parse(localStorage.getItem("account")) || [];

  const isDuplicate = storedData.some(
    (account) => account.userEmailPhone === formObjects.userEmailPhone
  );
  console.log(isDuplicate);

  if (!isDuplicate) {
    storedData.push(formObjects);
    localStorage.setItem("account", JSON.stringify(storedData));
    Swal.fire({
      text: "Thank you for registering with Us. You will be redirected to the Home Page. 😃",
      icon: "success",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
      location.href = "LogIn.html";
    }, 1333);
  }
  else {
    Swal.fire({
      text: "You already have an account. You will be redirected to the Home Page. 😃",
      icon: "success",
      timer: 1333,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
    setTimeout(function () {
      Swal.close();
      location.href = "LogIn.html";
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
  bottom: "86px",
  right: "unset",
  left: "32px",
  time: "0.5s",
  mixColor: "#fff",
  backgroundColor: "#fff",
  buttonColorDark: "#000000",
  buttonColorLight: "#fff",
  saveInCookies: true,
  label: "🌓",
  autoMatchOsTheme: true,
};
const darkmode = new Darkmode(options);
darkmode.showWidget();

/* -------------------------------------------------------------------------- */
/*                           END Of Adding DarkMode                           */
/* -------------------------------------------------------------------------- */
