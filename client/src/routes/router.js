import { Home } from "../pages/home";
import { DashBoard } from "../pages/dashboard";

const routes = {
  '/': Home,
  '/home': Home,
  '/dashboard': DashBoard
};

export function router() {
  const path = window.location.pathname;
  const page = routes[path] || Home;

  const app = document.getElementById('app');
  app.innerHTML = page();

 
  if (path === '/' || path === '/home') addHomeListeners();
  if (path === '/dashboard') addDashboardListeners();

  window.scrollTo(0, 0);
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  router();
}

window.addEventListener('popstate', router);



function addHomeListeners() {
  const btn = document.getElementById('send-btn');
  const textarea = document.getElementById('sql-input');

  if (!btn || !textarea) return;

  btn.addEventListener('click', async () => {
    const sql = textarea.value.trim();

    if (!sql) {
      alert('Por favor, ingresa una sentencia SQL.');
      return;
    }

    try {
      const res = await fetch(
        'http://localhost:3000/api/query-table',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sql })
        }
      );

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem(
          'sqlResults',
          JSON.stringify(data.results)
        );

        navigate('/dashboard');
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
      alert('Error de conexión con el servidor');
    }
  });
}


function addDashboardListeners() {
  const btn = document.getElementById('go-home');

  if (!btn) return;

  btn.addEventListener('click', () => navigate('/home'));
}

router();