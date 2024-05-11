import { FolderStructure } from '../../interfaces';
import { groupFolders, printFolders } from '../../libs';

function createFolder(folders: FolderStructure, path: string): void {
  if (folders[path]) {
    console.error(`\nError: La carpeta "${path}" ya existe.\n`);
    return process.exit(1);
  }

  if (!path.includes('/')) {
    folders[path] = { name: path };
    return;
  }

  const parts = path.split('/');
  folders[path] = { name: parts[parts.length - 1] };
}

function listFolders(folders: FolderStructure) {
  console.log('folders :>> ', folders);
  const groupedFolders = groupFolders(folders);
  console.log('groupedFolders :>> ', JSON.stringify(groupedFolders, null, 2));
  console.log('\n');
  printFolders(groupedFolders);
}

function deleteFolder(folders: FolderStructure, targetPath: string): void {
  if (folders[targetPath]) {
    delete folders[targetPath];
  } else {
    console.error(`Error: La carpeta "${targetPath}" no existe.`);
    return process.exit(1);
  }
}

function moveFolders(
  folders: FolderStructure,
  fromPath: string,
  toPath: string
) {
  if (folders[toPath]) {
    console.error(`Error: La carpeta "${toPath}" ya existe.`);
    return process.exit(1);
  }
  folders[toPath] = folders[fromPath];
  delete folders[fromPath];
}

export const main = (operations: string[]) => {
  const folders: FolderStructure = {};
  for (const operation of operations) {
    const [command, ...args] = operation.trim().split(' ');
    switch (command) {
      case 'LIST':
        listFolders(folders);
        break;
      case 'CREATE':
        createFolder(folders, args[0]);
        break;
      case 'DELETE':
        deleteFolder(folders, args[0]);
        break;
      case 'MOVE':
        moveFolders(folders, args[0], args[1]);
        break;
      default:
        console.error(`Comando no reconocido: ${command}`);
        return process.exit(1);
    }
  }
};
