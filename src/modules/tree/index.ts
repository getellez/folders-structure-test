import { readFileSync } from "fs";
import { FolderStructure, Separator, ValidCommands } from "../../interfaces";
import {
  groupFolders,
  printFolders,
  validateOperation,
} from "../../libs/utils";
import path from "path";

export class FolderTree {
  commands: string[];
  content: string;
  folders: FolderStructure = {};
  constructor() {
    this.commands = [];
    this.folders = {};
    this.content = "";
  }
  readFile(fileName: string) {
    this.content = readFileSync(
      path.resolve(__dirname, "../../../", fileName),
      {
        encoding: "utf-8",
        flag: "r",
      }
    );
  }
  runCommands(data?: string) {
    if (!data && !this.content) {
      console.error(
        "You must use the readFile method or pass the commands as a parameter."
      );
      return process.exit(1);
    }

    const source = data ? data : this.content;
    this.commands = source.trim().split("\n");

    for (const operation of this.commands) {
      const op = operation.trim().split(" ");
      const [command, ...args] = validateOperation(op);
      const folderPath = args[0];
      const toPath = command === ValidCommands.MOVE ? String(args[1]) : "";
      switch (command) {
        case ValidCommands.LIST:
          this.listFolders(this.folders);
          break;
        case ValidCommands.CREATE:
          this.createFolder(this.folders, folderPath);
          break;
        case ValidCommands.DELETE:
          this.deleteFolder(this.folders, folderPath);
          break;
        case ValidCommands.MOVE:
          this.moveFolders(this.folders, folderPath, toPath);
          break;
      }
    }
  }
  private createFolder(folders: FolderStructure, path: string): void {
    if (folders[path]) {
      console.error(`\nError: The folder "${path}" already exists.\n`);
      return process.exit(1);
    }

    if (!path.includes(Separator.SLASH)) {
      folders[path] = { name: path };
      return;
    }

    const parts = path.split(Separator.SLASH);
    let currentPath: string = "";
    for (const segment of parts) {
      currentPath += segment + Separator.SLASH;
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
    this.deleteFolder(folders, fromPath);
  }
}
