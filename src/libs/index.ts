import { Folder, FolderStructure } from '../interfaces';

export function groupFolders(folders: FolderStructure): Folder[] {
  const rootFolders: Folder[] = [];
  const folderMap: { [key: string]: Folder } = {};

  for (const path in folders) {
    const pathParts = path.split('/');
    const folderName = pathParts.pop() as string;
    const parentPath = pathParts.join('/');
    const folder: Folder = { ...folders[path] };

    folderMap[path] = folder;

    if (parentPath && folderMap[parentPath]) {
      const parentFolder = folderMap[parentPath];
      if (parentFolder.subfolders) {
        parentFolder.subfolders.push(folder);
      } else {
        parentFolder.subfolders = [folder];
      }
    } else {
      rootFolders.push(folder);
    }
  }

  return rootFolders;
}
export const printFolders = (folders: Folder[], indent = 0) => {
  folders.forEach((folder) => {
    // Imprimir el nombre del folder con la indentación adecuada
    console.log(' '.repeat(indent * 2) + folder.name);

    // Si el folder tiene subfolders, llamar recursivamente a la función con indent + 1
    if (folder.subfolders) {
      printFolders(folder.subfolders, indent + 1);
    }
  });
};
