export function DashBoard() {
  const results = JSON.parse(sessionStorage.getItem('sqlResults') || '[]');

  let html = '<h2>Resultados</h2>';
  if (results.length) {
    html += '<table border="1"><tr>';
    Object.keys(results[0]).forEach(key => html += `<th>${key}</th>`);
    html += '</tr>';

    results.forEach(row => {
      html += '<tr>';
      Object.values(row).forEach(val => html += `<td>${val}</td>`);
      html += '</tr>';
    });
    html += '</table>';
  } else {
    html += '<p>No hay resultados</p>';
  }

  html += '<button id="go-home">Volver</button>';
  return html;
}