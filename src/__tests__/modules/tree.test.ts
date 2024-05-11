import { FolderTree } from "../../modules/tree";

describe("FolderTree", () => {
  let folderTree: FolderTree;

  beforeEach(() => {
    folderTree = new FolderTree();
  });

  it("should create a folder", () => {
    const data = `CREATE movies`;
    folderTree.runCommands(data);
    expect(folderTree.folders).toEqual({
      movies: { name: "movies" },
    });
  });

  it("should list folders", () => {
    const data = `
      CREATE movies
      CREATE foods
      CREATE foods/fruits
      LIST
    `;
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    folderTree.runCommands(data);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("should delete a folder", () => {
    const data = `
      CREATE movies
      CREATE foods
      DELETE movies
    `;
    folderTree.runCommands(data);
    expect(folderTree.folders).toEqual({
      foods: { name: "foods" },
    });
  });

  it("should fail if is deleting a folder that does not exist", () => {
    const data = `
      CREATE foods
      DELETE movies
    `;
    const exitSpy = jest.spyOn(process, "exit").mockImplementation();
    folderTree.runCommands(data);
    expect(exitSpy).toHaveBeenCalled();
    exitSpy.mockRestore();
  });

  it("should move a folder", () => {
    const data = `
      CREATE foods
      CREATE foods/grains
      CREATE foods/grains/deadpool
      MOVE foods/grains/deadpool movies/deadpool
    `;
    folderTree.runCommands(data);
    expect(folderTree.folders["movies/deadpool"]).toBeDefined();
  });

  it("should fail if is moving a folder that already exists", () => {
    const data = `
      CREATE movies
      CREATE movies/deadpool
      CREATE heroes/deadpool
      MOVE heroes/deadpool movies/deadpool
    `;
    const exitSpy = jest.spyOn(process, "exit").mockImplementation();
    folderTree.runCommands(data);
    expect(exitSpy).toHaveBeenCalled();
  });

  it("should fail if is creating a folder that already exists", () => {
    const data = `
      CREATE fruits
      CREATE fruits
    `;
    const exitSpy = jest.spyOn(process, "exit").mockImplementation();
    folderTree.runCommands(data);
    expect(exitSpy).toHaveBeenCalled();
    exitSpy.mockRestore();
  });
});
