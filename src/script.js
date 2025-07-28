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
  renderRadarCharts(); // <- update charts on theme toggle
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

// Store radar chart instances
let radarCharts = [];

function renderRadarCharts() {
  // Destroy previous charts
  radarCharts.forEach(chart => chart.destroy());
  radarCharts = [];

  const isDark = document.body.classList.contains('dark-mode');

  const chartOptions = {
    type: 'radar',
    options: {
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            display: false // hides score numbers
          },
          pointLabels: {
            font: {
              size: 10,
            },
            color: isDark ? '#eee' : '#111'
          },
          grid: {
            color: isDark ? '#555' : '#ccc'
          },
          angleLines: {
            color: isDark ? '#555' : '#ccc'
          }
        }
      }
    }
  };

  const beans = [
    {
      id: "chart-colombia",
      label: "COLOMBIA BLEND (Medium Roasted)",
      data: [1, 1, 4, 3, 3, 2, 5],
      color: "rgba(244, 164, 96, 1)"
    },
    {
      id: "chart-ethiopia",
      label: "ETHIOPIA BLEND (Medium Roasted)",
      data: [5, 4, 1, 3, 1, 4, 2],
      color: "rgba(135, 206, 250, 1)"
    },
    {
      id: "chart-thailand",
      label: "GUATEMALA - Anaerobic fermented (Light Roasted)",
      data: [3, 2, 2, 4, 3, 3, 1],
      color: "rgba(100, 200, 100, 1)"
    }
  ];

  beans.forEach(bean => {
    const ctx = document.getElementById(bean.id)?.getContext('2d');
    if (ctx) {
      const chart = new Chart(ctx, {
        ...chartOptions,
        data: {
          labels: ['Fruity', 'Floral', 'Earthy', 'Sweet', 'Spicy', 'Juicy', 'Caramel'],
          datasets: [{
            label: bean.label,
            data: bean.data,
            backgroundColor: bean.color.replace("1)", "0.2)"),
            borderColor: bean.color,
            pointBackgroundColor: bean.color
          }]
        }
      });
      radarCharts.push(chart);
    }
  });
}

// On DOM ready
document.addEventListener("DOMContentLoaded", function () {
  renderRadarCharts();
});

// Welcome toast
window.addEventListener('load', () => {
  showToast("Welcome to KAWA Brew! Enjoy our coffee menu.", 'info');
});
