// AOS animation setup
AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

// Back to Top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark Mode toggle and persist
const toggle = document.getElementById('darkModeToggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark-mode');
}
toggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Toast popup
function showToast(message, type = 'default') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor:
      type === 'success' ? "#28a745" :
      type === 'error' ? "#dc3545" :
      type === 'info' ? "#17a2b8" : "#333",
    stopOnFocus: true,
  }).showToast();
}

// Copy promo code
function copyPromoCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Promo code "${code}" copied!`, 'success');
  }).catch(() => {
    showToast("Failed to copy promo code.", 'error');
  });
}

// Radar chart for flavor profile
const tasteCtx = document.getElementById('tasteRadar');
if (tasteCtx) {
  const isDark = document.body.classList.contains('dark-mode');
  const tasteChart = new Chart(tasteCtx, {
    type: 'radar',
    data: {
      labels: ['Fruity', 'Floral', 'Earthy', 'Sweet', 'Spicy', 'Juicy', 'Caramel'],
      datasets: [
        {
          label: 'Columbia (Medium)',
          data: [1, 1, 4, 3, 3, 2, 5],
          backgroundColor: 'rgba(244, 164, 96, 0.2)',
          borderColor: 'rgba(244, 164, 96, 1)',
          pointBackgroundColor: 'rgba(244, 164, 96, 1)'
        },
        {
          label: 'Ethiopia (Medium)',
          data: [5, 4, 1, 3, 1, 4, 2],
          backgroundColor: 'rgba(135, 206, 250, 0.2)',
          borderColor: 'rgba(135, 206, 250, 1)',
          pointBackgroundColor: 'rgba(135, 206, 250, 1)'
        },
        {
          label: 'Guatemala (Light)',
          data: [4, 2, 1, 5, 1, 5, 2],
          backgroundColor: 'rgba(255, 192, 203, 0.2)',
          borderColor: 'rgba(255, 105, 180, 1)',
          pointBackgroundColor: 'rgba(255, 105, 180, 1)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: isDark ? '#eee' : '#111' }
        },
        title: {
          display: true,
          text: 'Flavor Profiles',
          color: isDark ? '#eee' : '#111'
        }
      },
      scales: {
        r: {
          angleLines: { color: isDark ? '#444' : '#ccc' },
          grid: { color: isDark ? '#444' : '#ccc' },
          pointLabels: {
            color: isDark ? '#eee' : '#111',
            font: { size: 12 }
          },
          ticks: {
            color: isDark ? '#bbb' : '#444',
            backdropColor: 'transparent',
            stepSize: 1,
            max: 5,
            min: 0
          }
        }
      }
    }
  });

  document.querySelector('.dark-toggle')?.addEventListener('click', () => {
    const dark = document.body.classList.contains('dark-mode');
    const color = dark ? '#eee' : '#111';
    const grid = dark ? '#444' : '#ccc';
    tasteChart.options.plugins.title.color = color;
    tasteChart.options.plugins.legend.labels.color = color;
    tasteChart.options.scales.r.angleLines.color = grid;
    tasteChart.options.scales.r.grid.color = grid;
    tasteChart.options.scales.r.pointLabels.color = color;
    tasteChart.options.scales.r.ticks.color = dark ? '#bbb' : '#444';
    tasteChart.update();
  });
}

// Show welcome toast on page load
window.addEventListener('load', () => {
  showToast("Welcome to KAWA Brew! Enjoy our coffee menu.", 'info');
});
