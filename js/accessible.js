function toggleTheme() {
    const container = document.querySelector('.container');
    const body = document.querySelector('body');
    const button = document.getElementById('theme-toggle');
    const icon = button.querySelector('i');
    const text = button.querySelector('span');
    
    container.classList.toggle('dark');
    body.classList.toggle('dark');
    
    if (container.classList.contains('dark')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = 'Dark Mode';
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = 'Light Mode';
    }
}

const searchInput = document.getElementById('searchInput');

function scaleUp() {
    searchInput.classList.add('active');
}

function scaleDown() {
    searchInput.classList.remove('active');
}

searchInput.addEventListener('focus', scaleUp);
searchInput.addEventListener('blur', scaleDown);