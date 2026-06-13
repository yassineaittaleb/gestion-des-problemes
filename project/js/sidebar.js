function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const toggleBtn = sidebar.querySelector('.sidebar-toggle');
  const state = localStorage.getItem('sidebarCollapsed');

  if (state === 'true') {
    sidebar.classList.add('collapsed');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
  }
}

document.addEventListener('DOMContentLoaded', initSidebar);
