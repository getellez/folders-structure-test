import { Folder } from '../interfaces';

export const createFolder = (folders: Folder[], folderPath: string) => {
  const pathSegments = folderPath.split('/');
  let currentFolder = folders;
  for (const segment of pathSegments) {
    const existingFolder = currentFolder.find((f) => f.name === segment);
    const currentFolderPath = currentFolder[0]?.path;
    const subfolderPath = currentFolderPath + '/' + segment;
    if (!existingFolder) {
      const newFolder: Folder = {
        name: segment,
        path: `${currentFolderPath ? subfolderPath : segment}`
      };
      currentFolder.push(newFolder);
      currentFolder = newFolder.subfolders = [];
    } else {
      currentFolder = existingFolder.subfolders || [];
    }
  }
};

export const listFolders = (folders: Folder[], indentation: string = '') => {
  for (const folder of folders) {
    console.log(`${indentation}${folder.name}`);
    if (folder.subfolders) {
      listFolders(folder.subfolders, `${indentation}  `);
    }
  }
};
