export interface Folder {
  name: string;
  subfolders?: Folder[];
}

export interface FolderStructure {
  [key: string]: Folder;
}
