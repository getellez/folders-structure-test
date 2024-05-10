import { main } from './modules/tree';
// Define el tipo para la estructura de las carpetas

(() => {
  const data = `
  CREATE foods
  CREATE movies
  CREATE movies/horror
  CREATE movies/drama
  CREATE foods/fruits
  CREATE foods/fruits/oranges
  CREATE foods/fruits/bananas
  CREATE foods/fruits/guayabas
  LIST
  `;

  const commands = data.trim().split('\n');
  main(commands);
})();
