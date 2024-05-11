import { FolderStructure } from "../../interfaces";
import { groupFolders, printFolders } from "../../libs/utils";

export class FolderTree {
  folders: FolderStructure = {};
  private commands: string[];
  constructor() {
    this.commands = [];
    this.folders = {};
  }
  runCommands(data: string) {
    this.commands = data.trim().split("\n");
    for (const operation of this.commands) {
      const [command, ...args] = operation.trim().split(" ");
      switch (command) {
        case "LIST":
          this.listFolders(this.folders);
          break;
        case "CREATE":
          this.createFolder(this.folders, args[0]);
          break;
        case "DELETE":
          this.deleteFolder(this.folders, args[0]);
          break;
        case "MOVE":
          this.moveFolders(this.folders, args[0], args[1]);
          break;
        default:
          console.error(`Command not found: ${command}`);
          return process.exit(1);
      }
    }
  }
  private createFolder(folders: FolderStructure, path: string): void {
    if (folders[path]) {
      console.error(`\nError: The folder "${path}" already exists.\n`);
      return process.exit(1);
    }

    if (!path.includes("/")) {
      folders[path] = { name: path };
      return;
    }

    const parts = path.split("/");
    let currentPath: string = "";
    for (const segment of parts) {
      currentPath += segment + "/";
      if (!folders[currentPath.slice(0, -1)]) {
        folders[currentPath.slice(0, -1)] = { name: segment };
      }
    }
  }

  private listFolders(folders: FolderStructure) {
    const groupedFolders = groupFolders(folders);
    console.log("\n");
    printFolders(groupedFolders);
  }

  private deleteFolder(folders: FolderStructure, targetPath: string): void {
    if (folders[targetPath]) {
      delete folders[targetPath];
    } else {
      console.error(`Error: The folder "${targetPath}" does not exist.`);
      return process.exit(1);
    }
  }

  private moveFolders(
    folders: FolderStructure,
    fromPath: string,
    toPath: string
  ) {
    if (folders[toPath]) {
      console.error(`Error: The folder "${toPath}" already exists.`);
      return process.exit(1);
    }
    folders[toPath] = folders[fromPath];
    delete folders[fromPath];
  }
}
