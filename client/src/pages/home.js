export function Home() {
  return `
    <h1>Mini SQL Client</h1>
    <textarea id="sql-input" placeholder="Escribe tu SELECT aquí" rows="5" cols="50"></textarea><br>
    <button id="send-btn">Ejecutar</button>
  `;
}