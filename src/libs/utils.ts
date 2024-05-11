import { Folder, FolderStructure } from "../interfaces";

export const groupFolders = (folders: FolderStructure): Folder[] => {
  const rootFolders: Folder[] = [];
  const folderMap: { [key: string]: Folder } = {};

  for (const path in folders) {
    const pathParts = path.split("/");
    pathParts.pop();
    const parentPath = pathParts.join("/");
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
  const validCommands = ["LIST", "CREATE", "DELETE", "MOVE"];
  const [command, ...args] = operation;
  if (!validCommands.includes(command)) {
    console.error(`Command not found: ${command}`);
    return process.exit(1);
  }
  if (command === "CREATE" && args.length !== 1) {
    // OK
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  if (command === "DELETE" && args.length !== 1) {
    // OK
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  if (command === "MOVE" && args.length !== 2) {
    // OK
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  if (command === "LIST" && args.length !== 0) {
    // OK
    console.error(`Invalid number of arguments: ${args.length}`);
    return process.exit(1);
  }
  return [command, ...args];
};
