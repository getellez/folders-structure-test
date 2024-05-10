import { Folder } from '../../interfaces';
import { createFolder, listFolders } from '../../libs';

const inputData = `
CREATE papers
CREATE foods
CREATE foods/fruits
CREATE foods/fruits/apples
LIST
`;

const folders: Folder[] = [];

export const main = () => {
  // TODO: Validate inputData using joi
  const commands = inputData.trim().split('\n');

  for (const command of commands) {
    const [action, ...args] = command.split(' ');

    switch (action) {
      case 'CREATE':
        createFolder(folders, args[0]);
        break;
      case 'LIST':
        listFolders(folders);
        break;
      default:
        console.error(`Invalid command: ${action}`);
        return process.exit(1);
    }
  }
};
