import { groupFolders } from "../../libs/utils"

describe('utils', () => {
  it('groupFolders should transform the folder structure in an array', () => {
    const folders = {
      movies: { name: 'movies' },
      foods: { name: 'foods' },
      'foods/fruits': { name: 'fruits' },
      'foods/fruits/oranges': { name: 'oranges' }
    }
    const groupedFolders = groupFolders(folders)
    const output = [{name:"movies"}, {name:"foods", subfolders: [{name:"fruits",subfolders:[{name:"oranges"}]}]}]
    expect(groupedFolders).toEqual(output)
  })
})