const PASSWORD = "bank123"; // Change this if you want

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  } else {
    alert("Incorrect password");
  }
}
