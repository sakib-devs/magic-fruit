const mango = { id: 1, name: 'fruit.mango', image: '1.png' }
const berry = { id: 2, name: 'fruit.berry', image: '2.png' }
const jackfruit = { id: 3, name: 'fruit.jackfruit', image: '3.png' }
const banana = { id: 4, name: 'fruit.banana', image: '4.png' }
const grapefruit = { id: 5, name: 'fruit.grapefruit', image: '5.png' }
const amalaki = { id: 6, name: 'fruit.amalaki', image: '6.png' }
const palm = { id: 7, name: 'fruit.palm', image: '7.png' }
const pomegranate = { id: 8, name: 'fruit.pomegranate', image: '8.png' }
const lychee = { id: 9, name: 'fruit.lychee', image: '9.png' }
const carambola = { id: 10, name: 'fruit.carambola', image: '10.png' }
const woodApple = { id: 11, name: 'fruit.woodApple', image: '11.png' }
const jujube = { id: 12, name: 'fruit.jujube', image: '12.png' }
const custardApple = { id: 13, name: 'fruit.custardApple', image: '13.png' }
const velvetApple = { id: 14, name: 'fruit.velvetApple', image: '14.png' }
const sapodilla = { id: 15, name: 'fruit.sapodilla', image: '15.png' }
const papaya = { id: 16, name: 'fruit.papaya', image: '16.png' }
const coconut = { id: 17, name: 'fruit.coconut', image: '17.png' }

export const firstPageFruits = [
  grapefruit,
  amalaki,
  woodApple,
  papaya,
  coconut,
  lychee,
  velvetApple,
  jujube,
  banana,
  palm,
]

export const secondPageFruits = [
  jackfruit,
  palm,
  lychee,
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
  lychee,
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
  lychee,
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
  lychee,
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

export const answer = new Map([
  [4, coconut],
  [5, woodApple],
  [6, sapodilla],
  [7, velvetApple],
  [8, carambola],
  [9, papaya],
  [10, amalaki],
  [11, banana],
  [12, lychee],
  [13, jackfruit],
  [14, mango],
  [15, palm],
  [16, pomegranate],
  [17, jujube],
  [18, berry],
  [19, grapefruit],
  [20, custardApple],
])
