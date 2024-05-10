import { Folder, FolderStructure } from '../../interfaces';

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

function groupFolders(obj: FolderStructure): Folder[] {
  const groupedFolders: Folder[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const folderPath = key.split('/');
      const folderName = folderPath.pop()!;
      const parentPath = folderPath.join('/');

      if (parentPath === '') {
        // Root folder
        groupedFolders.push({ name: folderName });
      } else {
        // Subfolder
        const parentFolder = groupedFolders.find(
          (folder) => folder.name === parentPath
        );
        if (parentFolder) {
          if (!parentFolder.subfolders) {
            parentFolder.subfolders = [];
          }
          parentFolder.subfolders.push({ name: folderName });
        }
      }
    }
  }

  return groupedFolders;
}
function printFolders(folders: Folder[], indent = 0) {
  folders.forEach((folder) => {
    // Imprimir el nombre del folder con la indentación adecuada
    console.log(' '.repeat(indent * 2) + folder.name);

    // Si el folder tiene subfolders, llamar recursivamente a la función con indent + 1
    if (folder.subfolders) {
      printFolders(folder.subfolders, indent + 1);
    }
  });
}
function listFolders(folders: FolderStructure) {
  const groupedFolders = groupFolders(folders);
  console.log('\n');
  printFolders(groupedFolders);
}

// Función para eliminar una carpeta
function deleteFolder(folders: FolderStructure, targetPath: string): void {
  if (folders[targetPath]) {
    delete folders[targetPath];
  } else {
    console.error(`Error: La carpeta "${targetPath}" no existe.`);
    return process.exit(1);
  }
}

const folders: FolderStructure = {};

export const main = (operations: string[]) => {
  for (const operation of operations) {
    const [command, ...args] = operation.trim().split(' ');
    switch (command) {
      case 'CREATE':
        createFolder(folders, args[0]);
        break;
      case 'DELETE':
        deleteFolder(folders, args[0]);
        break;
      case 'LIST':
        listFolders(folders);
        break;
      default:
        console.error(`Comando no reconocido: ${command}`);
    }
  }
};
