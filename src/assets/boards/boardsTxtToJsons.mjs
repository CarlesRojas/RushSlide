import fs from "fs" //const fs = require("fs")

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

  for (const key in normal) {
    if (key && key !== "null")
      fs.writeFile(`normal/${parseInt(key)}.json`, JSON.stringify(normal[key]), function (err) {
        if (err) throw err
        console.log(`normal/${parseInt(key)}.json saved`)
      })
  }

  for (const key in oneWall) {
    if (key && key !== "null")
      fs.writeFile(`oneWall/${parseInt(key)}.json`, JSON.stringify(oneWall[key]), function (err) {
        if (err) throw err
        console.log(`oneWall/${parseInt(key)}.json saved`)
      })
  }

  for (const key in twoWalls) {
    if (key && key !== "null")
      fs.writeFile(`twoWalls/${parseInt(key)}.json`, JSON.stringify(twoWalls[key]), function (err) {
        if (err) throw err
        console.log(`twoWalls/${parseInt(key)}.json saved`)
      })
  }
})
