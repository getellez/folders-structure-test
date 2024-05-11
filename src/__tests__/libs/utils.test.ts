import { groupFolders, validateOperation } from "../../libs/utils";
import { FolderTree } from "../../modules/tree";

describe("utils", () => {
  describe("groupFolders", () => {
    it("should transform the folder structure in an array", () => {
      const folders = {
        movies: { name: "movies" },
        foods: { name: "foods" },
        "foods/fruits": { name: "fruits" },
        "foods/fruits/oranges": { name: "oranges" },
      };
      const groupedFolders = groupFolders(folders);
      const output = [
        { name: "movies" },
        {
          name: "foods",
          subfolders: [{ name: "fruits", subfolders: [{ name: "oranges" }] }],
        },
      ];
      expect(groupedFolders).toEqual(output);
    });
  })
  describe("validateOperations", () => {
    it("should fail if the operation doesn't exist", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      const op: string[] = []
      validateOperation(op);
      expect(exitSpy).toHaveBeenCalled();
      exitSpy.mockRestore();
    })
    it("should fail if the command is not valid", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      const operation = `
        RUN movies/heroes
      `;
      validateOperation(operation.trim().split(" "));
      expect(exitSpy).toHaveBeenCalled();
      exitSpy.mockRestore();
    })
    it("should fail if CREATE receives invalid commands", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      const operation = `
        CREATE movies apples
      `;
      validateOperation(operation.trim().split(" "));
      expect(exitSpy).toHaveBeenCalled();
      exitSpy.mockRestore();
    })
    it("should fail if MOVE receives invalid commands", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      const operation = `
        MOVE movies
      `;
      validateOperation(operation.trim().split(" "));
      expect(exitSpy).toHaveBeenCalled();
      exitSpy.mockRestore();
    })
    it("should fail if DELETE receives invalid commands", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      const operation = `
        DELETE
      `;
      validateOperation(operation.trim().split(" "));
      expect(exitSpy).toHaveBeenCalled();
      exitSpy.mockRestore();
    })
    it("should fail if LIST receives invalid commands", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation();
      const operation = `
        LIST all folders
      `;
      validateOperation(operation.trim().split(" "));
      expect(exitSpy).toHaveBeenCalled();
      exitSpy.mockRestore();
    })
    it('should return the same command if it is valid', () => {
      const operation = `
        CREATE movies/heroes
      `;
      const [command] = validateOperation(operation.trim().split(" "));
      expect(command).toEqual("CREATE");
    })
  })
});
