// script.js

const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

function toggleSidebar() {
  sidebar.classList.toggle('open');
}

document.addEventListener('click', (event)