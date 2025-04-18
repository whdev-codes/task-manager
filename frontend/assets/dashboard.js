//#region Previous Dashboard.js

// const token = localStorage.getItem("token");
// if (!token) {
//   showToast("Please login first.", "danger");
//   window.location.href = "login.html";
// }

// const apiUrl = "http://localhost:5000/api/tasks";
// const taskList = document.getElementById("taskList");
// const searchInput = document.getElementById("searchInput");
// const categoryFilter = document.getElementById("categoryFilter");

// let allTasks = [];

// window.onload = async () => {
//   showLoader(true);
//   const res = await fetch(apiUrl, {
//     headers: { Authorization: token }
//   });
//   allTasks = await res.json();
//   showLoader(false);
//   renderTasks(allTasks);
//   updateSummary(allTasks);
// };

// document.getElementById("taskForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const title = document.getElementById("title").value;
//   const priority = document.getElementById("priority").value;
//   const category = document.getElementById("category").value;
//   const dueDate = document.getElementById("dueDate").value;

//   showLoader(true);
//   const res = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token
//     },
//     body: JSON.stringify({ title, priority, category, dueDate })
//   });

//   const newTask = await res.json();
//   showLoader(false);

//   if (res.ok) {
//     allTasks.push(newTask);
//     renderTasks(allTasks);
//     updateSummary(allTasks);
//     showToast("Task added!", "success");
//     e.target.reset();
//   } else {
//     showToast("Failed to add task", "danger");
//   }
// });

// function renderTasks(tasks) {
//   taskList.innerHTML = "";
//   const filtered = applySearchAndFilters(tasks);

//   filtered.forEach(task => {
//     const li = document.createElement("li");
//     const dueDateFormatted = task.dueDate ? formatDate(task.dueDate) : "No due date";
//     const isDueSoon = isTaskDueSoon(task.dueDate);

//     li.className = `list-group-item d-flex justify-content-between align-items-center ${isDueSoon && !task.isCompleted ? 'border-start border-5 border-warning' : ''}`;
//     li.innerHTML = `
//       <div>
//         <strong>${task.title}</strong>
//         <br/>
//         <small class="text-muted">${task.priority} | ${task.category || 'No Category'} | ${dueDateFormatted}</small><br>
//         ${task.isCompleted ? '<span class="badge bg-success">Completed</span>' : ''}
//       </div>
//       <div>
//         <button class="btn btn-sm btn-outline-success me-2" onclick="toggleComplete('${task._id}', ${task.isCompleted})">${task.isCompleted ? 'Undo' : 'Complete'}</button>
//         <button class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task._id}')">Delete</button>
//       </div>
//     `;
//     taskList.appendChild(li);
//   });
// }

// function updateSummary(tasks) {
//   const total = tasks.length;
//   const completed = tasks.filter(t => t.isCompleted).length;
//   const pending = total - completed;

//   document.getElementById("totalCount").textContent = total;
//   document.getElementById("completedCount").textContent = completed;
//   document.getElementById("pendingCount").textContent = pending;
// }

// async function toggleComplete(id, currentStatus) {
//   showLoader(true);
//   const res = await fetch(`${apiUrl}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token
//     },
//     body: JSON.stringify({ isCompleted: !currentStatus })
//   });

//   const updatedTask = await res.json();
//   showLoader(false);

//   if (res.ok) {
//     const index = allTasks.findIndex(t => t._id === id);
//     allTasks[index] = updatedTask;
//     renderTasks(allTasks);
//     updateSummary(allTasks);
//     showToast("Task updated!", "success");
//   } else {
//     showToast("Failed to update task", "danger");
//   }
// }

// async function deleteTask(id) {
//   showLoader(true);
//   const res = await fetch(`${apiUrl}/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: token }
//   });
//   showLoader(false);

//   if (res.ok) {
//     allTasks = allTasks.filter(t => t._id !== id);
//     renderTasks(allTasks);
//     updateSummary(allTasks);
//     showToast("Task deleted!", "success");
//   } else {
//     showToast("Failed to delete task", "danger");
//   }
// }

// function filterTasks(type) {
//   let filtered;
//   if (type === "completed") {
//     filtered = allTasks.filter(task => task.isCompleted);
//   } else if (type === "pending") {
//     filtered = allTasks.filter(task => !task.isCompleted);
//   } else {
//     filtered = [...allTasks];
//   }
//   renderTasks(filtered);
// }

// function applySearchAndFilters(tasks) {
//   const keyword = searchInput.value.toLowerCase().trim();
//   const category = categoryFilter.value;
//   return tasks.filter(task => {
//     const matchesTitle = task.title.toLowerCase().includes(keyword);
//     const matchesCategory = category ? task.category === category : true;
//     return matchesTitle && matchesCategory;
//   });
// }

// searchInput.addEventListener("input", () => renderTasks(allTasks));
// categoryFilter.addEventListener("change", () => renderTasks(allTasks));

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-GB");
// }

// function isTaskDueSoon(date) {
//   if (!date) return false;
//   const now = new Date();
//   const due = new Date(date);
//   const diff = (due - now) / (1000 * 60 * 60 * 24);
//   return diff <= 3 && diff >= 0;
// }

// function logout() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   window.location.href = "login.html";
// }

//#endregion

const baseUrl = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://task-manager-backend-3sq9.onrender.com";

const apiUrl = `${baseUrl}/api/tasks`;

const token = localStorage.getItem("token");
if (!token) {
  showToast("Please login first.", "danger");
  window.location.href = "login.html";
}

const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allTasks = [];

window.onload = async () => {
  showLoader(true);
  const res = await fetch(apiUrl, {
    headers: { Authorization: token }
  });
  allTasks = await res.json();
  showLoader(false);
  renderTasks(allTasks);
  updateSummary(allTasks);
};

document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;
  const dueDate = document.getElementById("dueDate").value;

  showLoader(true);
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title, priority, category, dueDate })
  });

  const newTask = await res.json();
  showLoader(false);

  if (res.ok) {
    allTasks.push(newTask);
    renderTasks(allTasks);
    updateSummary(allTasks);
    showToast("Task added!", "success");
    e.target.reset();
  } else {
    showToast("Failed to add task", "danger");
  }
});

function renderTasks(tasks) {
  taskList.innerHTML = "";
  const filtered = applySearchAndFilters(tasks);

  filtered.forEach(task => {
    const li = document.createElement("li");
    const dueDateFormatted = task.dueDate ? formatDate(task.dueDate) : "No due date";
    const isDueSoon = isTaskDueSoon(task.dueDate);

    li.className = `list-group-item d-flex justify-content-between align-items-center ${isDueSoon && !task.isCompleted ? 'border-start border-5 border-warning' : ''}`;
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <br/>
        <small class="text-muted">${task.priority} | ${task.category || 'No Category'} | ${dueDateFormatted}</small><br>
        ${task.isCompleted ? '<span class="badge bg-success">Completed</span>' : ''}
      </div>
      <div>
        <button class="btn btn-sm btn-outline-success me-2" onclick="toggleComplete('${task._id}', ${task.isCompleted})">${task.isCompleted ? 'Undo' : 'Complete'}</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function updateSummary(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.isCompleted).length;
  const pending = total - completed;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("completedCount").textContent = completed;
  document.getElementById("pendingCount").textContent = pending;
}

async function toggleComplete(id, currentStatus) {
  showLoader(true);
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ isCompleted: !currentStatus })
  });

  const updatedTask = await res.json();
  showLoader(false);

  if (res.ok) {
    const index = allTasks.findIndex(t => t._id === id);
    allTasks[index] = updatedTask;
    renderTasks(allTasks);
    updateSummary(allTasks);
    showToast("Task updated!", "success");
  } else {
    showToast("Failed to update task", "danger");
  }
}

async function deleteTask(id) {
  showLoader(true);
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });
  showLoader(false);

  if (res.ok) {
    allTasks = allTasks.filter(t => t._id !== id);
    renderTasks(allTasks);
    updateSummary(allTasks);
    showToast("Task deleted!", "success");
  } else {
    showToast("Failed to delete task", "danger");
  }
}

function filterTasks(type) {
  let filtered;
  if (type === "completed") {
    filtered = allTasks.filter(task => task.isCompleted);
  } else if (type === "pending") {
    filtered = allTasks.filter(task => !task.isCompleted);
  } else {
    filtered = [...allTasks];
  }
  renderTasks(filtered);
}

function applySearchAndFilters(tasks) {
  const keyword = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  return tasks.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(keyword);
    const matchesCategory = category ? task.category === category : true;
    return matchesTitle && matchesCategory;
  });
}

searchInput.addEventListener("input", () => renderTasks(allTasks));
categoryFilter.addEventListener("change", () => renderTasks(allTasks));

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
}

function isTaskDueSoon(date) {
  if (!date) return false;
  const now = new Date();
  const due = new Date(date);
  const diff = (due - now) / (1000 * 60 * 60 * 24);
  return diff <= 3 && diff >= 0;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
