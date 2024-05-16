export interface Folder {
  name: string;
  subfolders?: Folder[];
}

export interface FolderStructure {
  [key: string]: Folder;
}

export enum Separator {
  SLASH = "/",
}

export enum ValidCommands {
  LIST = "LIST",
  CREATE = "CREATE",
  DELETE = "DELETE",
  MOVE = "MOVE",
}
