export const colorByState = {
  HP: "bg-success",
  ATK: "bg-danger",
  DEF: "bg-primary",
  SpA: "bg-success-subtle",
  SpD: "bg-warning",
  SPD: "bg-warning-subtle",
};

const keyMap = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

export const getNormalizedKey = (key) => keyMap[key.toLowerCase()] || key.toUpperCase();
