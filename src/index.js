import "./styles/index.scss";

const testJamie = {
    name: "Jamie",
    location: "london",
    abc: 1,
};

const two = {
    ...testJamie,
    location2: "Canterbury",
    postcode: 2,
}

console.log(testJamie);
console.log(two);