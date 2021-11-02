const path = require("path");
const Generator = require("objects-to-csv");

let maxSize = 60; // limit while loop
let randomNumber; // save random number

const maxNumber = 60; // max value of saved numbers
const minNumber = 0; // min value of saved numbers

const maxRaffle = 6; // max values per raffle
const numOfTests = 10 ** 5; // amount of tests

const generate = () => {
  while (randomNumber === maxSize) {
    const timestamp = new Date().getTime(); // get actual time

    randomNumber = (timestamp * Math.PI) % 1; // Format big number to decimals
  }

  return (maxSize = randomNumber);
};

const raffle = () => {
  let randomArray = []; // array to get max of numbers

  while (randomArray.length < maxRaffle) {
    const random = String(generate()).replace("0.", ""); // Change to int
    const formatted = random.substring(0, 2); // Fixed to two numbers

    const finalRandom = Number(formatted); // get number ref

    const isRepeat = randomArray.includes(finalRandom);

    if (finalRandom < maxNumber && finalRandom > minNumber && !isRepeat) {
      randomArray.push(finalRandom);
    }
  }

  randomArray = randomArray.sort((a, b) => (a > b ? 1 : -1)); // sort from min to max

  return randomArray;
};

try {
  (async () => {
    let raffles = [];

    for (let i = 0; i < numOfTests; i++) {
      const object = {
        ["Sorteio"]: i + 1,
        Valores: raffle().join(", "),
      };

      raffles.push(object);
    }

    await new Generator(raffles).toDisk(
      path.join(__dirname, "dist", "raffle.csv")
    );
  })();
} catch (err) {
  console.log(err);
}
