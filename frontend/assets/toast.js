// Show a toast message
function showToast(message, type = "success") {
    const existing = document.getElementById("custom-toast");
    if (existing) existing.remove();
  
    const toast = document.createElement("div");
    toast.id = "custom-toast";
    toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 m-4 show`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
  
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
  
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
  
  // Show a full-page loading spinner
  function showLoader(show = true) {
    let loader = document.getElementById("loader-overlay");
  
    if (show) {
      if (!loader) {
        loader = document.createElement("div");
        loader.id = "loader-overlay";
        loader.innerHTML = `
          <div class="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1050;">
            <div class="spinner-border text-light" role="status" style="width: 3rem; height: 3rem;">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `;
        document.body.appendChild(loader);
      }
    } else {
      if (loader) loader.remove();
    }
  }
  