import { FolderTree } from './modules/tree';

const data = `
  CREATE movies
  CREATE foods
  CREATE foods/fruits
  CREATE movies/drama
  CREATE foods/fruits/oranges
  CREATE foods/fruits/apples
  CREATE foods/fruits/bananas/yellow
  LIST
  DELETE foods/fruits/apples
  MOVE foods/fruits/oranges movies/drama/oranges
  LIST
  `;

const folderTree = new FolderTree();
folderTree.runCommands(data);
