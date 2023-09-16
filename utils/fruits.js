const mango = { id: 1, name: 'fruit.mango', image: '' }
const berry = { id: 2, name: 'fruit.berry', image: '' }
const jackfruit = { id: 3, name: 'fruit.jackfruit', image: '' }
const banana = { id: 4, name: 'fruit.banana', image: '' }
const grapefruit = { id: 5, name: 'fruit.grapefruit', image: '' }
const amalaki = { id: 6, name: 'fruit.amalaki', image: '' }
const palm = { id: 7, name: 'fruit.palm', image: '' }
const pomegranate = { id: 8, name: 'fruit.pomegranate', image: '' }
const currant = { id: 9, name: 'fruit.currant', image: '' }
const carambola = { id: 10, name: 'fruit.carambola', image: '' }
const woodApple = { id: 11, name: 'fruit.woodApple', image: '' }
const jujube = { id: 12, name: 'fruit.jujube', image: '' }
const custardApple = { id: 13, name: 'fruit.custardApple', image: '' }
const velvetApple = { id: 14, name: 'fruit.velvetApple', image: '' }
const sapodilla = { id: 15, name: 'fruit.sapodilla', image: '' }
const papaya = { id: 16, name: 'fruit.papaya', image: '' }
const coconut = { id: 17, name: 'fruit.coconut', image: '' }

export const firstPageFruits = [
  grapefruit,
  amalaki,
  woodApple,
  papaya,
  coconut,
  currant,
  velvetApple,
  jujube,
  banana,
  palm,
]

export const secondPageFruits = [
  jackfruit,
  palm,
  currant,
  custardApple,
  sapodilla,
  papaya,
  velvetApple,
  berry,
]

export const thirdPageFruits = [
  banana,
  mango,
  pomegranate,
  currant,
  carambola,
  jujube,
  coconut,
]

export const fourthPageFruits = [
  jackfruit,
  amalaki,
  woodApple,
  berry,
  sapodilla,
  velvetApple,
]

export const fifthPageFruits = [
  mango,
  grapefruit,
  amalaki,
  custardApple,
  carambola,
  palm,
  berry,
]

export const sixthPageFruits = [
  grapefruit,
  pomegranate,
  jujube,
  currant,
  mango,
  custardApple,
  papaya,
]

export const seventhPageFruits = [
  palm,
  jackfruit,
  grapefruit,
  pomegranate,
  banana,
  custardApple,
  jujube,
  berry,
]

export const fruits = [
  mango,
  berry,
  jackfruit,
  banana,
  grapefruit,
  amalaki,
  palm,
  pomegranate,
  currant,
  carambola,
  woodApple,
  jujube,
  custardApple,
  velvetApple,
  sapodilla,
  papaya,
  coconut,
]

export const fruitsMap = new Map([
  [0, fruits],
  [1, firstPageFruits],
  [2, secondPageFruits],
  [3, thirdPageFruits],
  [4, fourthPageFruits],
  [5, fifthPageFruits],
  [6, sixthPageFruits],
  [7, seventhPageFruits],
])
