import { FolderTree } from "./modules/tree";

const folderTree = new FolderTree();
const fileName = "data.txt";
folderTree.readFile(fileName);
folderTree.runCommands();
