export interface Folder {
  name: string;
  path: string;
  subfolders?: Folder[];
}
