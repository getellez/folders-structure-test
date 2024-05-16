import {
  Folder,
  FolderStructure,
  Separator,
  ValidCommands,
} from "../interfaces";

export const groupFolders = (folders: FolderStructure): Folder[] => {
  const rootFolders: Folder[] = [];
  const folderMap: FolderStructure = {};

  for (const path in folders) {
    const pathParts = path.split(Separator.SLASH);
    pathParts.pop();
    const parentPath = pathParts.join(Separator.SLASH);
    const folder: Folder = { ...folders[path] };
    folderMap[path] = folder;
    if (parentPath && folderMap[parentPath]) {
      const parentFolder: Folder = folderMap[parentPath];
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
};
export const printFolders = (folders: Folder[], indent = 0) => {
  folders.forEach((folder) => {
    console.log(" ".repeat(indent * 2) + folder.name);
    if (folder.subfolders) {
      printFolders(folder.subfolders, indent + 1);
    }
  });
};

export const validateOperation = (operation: string[]) => {
  if (!operation || operation.length === 0) {
    console.error(`Invalid number of arguments: ${operation.length}`);
    return process.exit(1);
  }
  const validCommands = [
    ValidCommands.LIST,
    ValidCommands.CREATE,
    ValidCommands.DELETE,
    ValidCommands.MOVE,
  ];

  const [command, ...args] = operation;
  if (!Object.values(validCommands).includes(command as ValidCommands)) {
    console.error(`Command not found: ${command}`);
    return process.exit(1);
  }
  if (command === ValidCommands.CREATE && args.length !== 1) {
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  if (command === ValidCommands.DELETE && args.length !== 1) {
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  if (command === ValidCommands.MOVE && args.length !== 2) {
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  if (command === ValidCommands.LIST && args.length !== 0) {
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  return [command, ...args];
};
