const PASSWORD = "bank123"; // You can change this

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  } else {
    alert("Incorrect password");
  }
}
