//#region Previous Signup.js

// document.getElementById("signupForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   showLoader(true);

//   const res = await fetch("http://localhost:5000/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password })
//   });

//   const data = await res.json();
//   showLoader(false);

//   if (res.ok) {
//     showToast("Signup successful! Please login.", "success");
//     setTimeout(() => window.location.href = "login.html", 1500);
//   } else {
//     showToast(data.message || "Signup failed", "danger");
//   }
// });

//#endregion

const baseUrl = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://task-manager-backend-3sq9.onrender.com";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  showLoader(true);

  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  showLoader(false);

  if (res.ok) {
    showToast("Signup successful! Please login.", "success");
    setTimeout(() => window.location.href = "login.html", 1500);
  } else {
    showToast(data.message || "Signup failed", "danger");
  }
});
