import fs from "fs"

const normal = {}
const oneWall = {}
const twoWalls = {}

fs.readFile("puzzles.txt", function (err, data) {
  if (err) throw err
  const array = data.toString().split("\n")

  for (i in array) {
    let numberOfX = 0
    if (i % 1000 === 0) console.log(i)

    for (let j = 0; j < array[i].length; j++) if (array[i][j] === "X" || array[i][j] === "x") numberOfX++

    const [numMoves, board] = array[i].split(" ")

    if (numberOfX === 0) {
      if (!(numMoves in normal)) normal[numMoves] = []
      normal[numMoves].push(board)
    } else if (numberOfX === 1) {
      if (!(numMoves in oneWall)) oneWall[numMoves] = []
      oneWall[numMoves].push(board)
    } else if (numberOfX === 2) {
      if (!(numMoves in twoWalls)) twoWalls[numMoves] = []
      twoWalls[numMoves].push(board)
    } else {
      throw new Error("Too many walls")
    }
  }

  // save each object to a file json
  fs.writeFile("normal.json", JSON.stringify(normal), function (err) {
    if (err) throw err
    console.log("normal.json saved")
  })

  fs.writeFile("oneWall.json", JSON.stringify(oneWall), function (err) {
    if (err) throw err
    console.log("oneWall.json saved")
  })

  fs.writeFile("twoWalls.json", JSON.stringify(twoWalls), function (err) {
    if (err) throw err
    console.log("twoWalls.json saved")
  })
})
