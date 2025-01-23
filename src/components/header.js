export default function Header() {
  return `
  <div class="container-lg">
    <nav class="navbar navbar-expand-md navbar-dark fs-4 fst-italic fw-bold text-rimary">
      <div class="container-fluid">
        <span class="navbar-text d-none d-md-inline">Back to the...</span>
        <!-- toggle button for mobile-->
        <button class="navbar-toggler" type="button" 
        data-bs-toggle="collapse" data-bs-target="#main-nav" 
        aria-controls="main-nav" aria-expanded="false" aria-label="Toggle Navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse align-center justify-content-start text-primary" id="main-nav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
            <a href="/" class="nav-link ps-0">>Roots</a>
            </li>
            <li class="nav-item">
              <a href="productions.html" class="nav-link">>Productions</a>
            </li>
            <li class="nav-item">
              <a href="music.html" class="nav-link">>Music</a>
            </li>
            <li class="nav-item">
              <a href="graphics.html" class="nav-link">>Graphics</a>
            </li>
            <li class="nav-item">
              <a href="members.html" class="nav-link">>Members</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- navbar links-->
    </nav>
  </div>
  `;
}