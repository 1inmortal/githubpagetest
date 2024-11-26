// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Button Click Alert Example
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('More details will be available soon!');
  });
});

  