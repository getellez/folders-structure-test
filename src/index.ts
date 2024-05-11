import { main } from './modules/tree';
// Define el tipo para la estructura de las carpetas

(() => {
  const data = `
  CREATE movies
  CREATE foods
  CREATE foods/fruits
  CREATE movies/drama
  CREATE foods/fruits/oranges
  CREATE foods/fruits/apples
  CREATE foods/fruits/bananas
  LIST
  `;

  const commands = data.trim().split('\n');
  main(commands);
})();
