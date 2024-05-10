// Define los tipos necesarios
interface Folder {
  name: string;
}

type FolderStructure = { [key: string]: Folder };

// Función para procesar las instrucciones
const processInstructions = (
  instructions: string[],
  folders: FolderStructure
): FolderStructure => {
  return instructions.reduce((acc, instruction) => {
    const [action, path] = instruction.split(' ');
    const parts = path.split('/');
    let currentPath = '';

    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      if (action === 'CREATE' && !acc[currentPath]) {
        acc[currentPath] = { name: part };
      } else if (action === 'MOVE' && acc[currentPath]) {
        const newPath = parts.slice(index + 1).join('/');
        acc[newPath] = acc[currentPath];
        delete acc[currentPath];
      } else if (action === 'DELETE' && acc[currentPath]) {
        delete acc[currentPath];
      }
    });

    return acc;
  }, folders);
};

// Función principal
export const main = (instructions: string[]): FolderStructure => {
  const initialFolders: FolderStructure = {};
  return processInstructions(instructions, initialFolders);
};
