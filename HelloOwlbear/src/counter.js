import OBR from "@owlbear-rodeo/sdk";

export async function setupCounter(element,name) {
  let counter = 0;
  let currentName=name;
  const setCounter = async (name) => {
    counter=0;
    const rolls = [];
    for(let i = 0; i < 4; i++) {
      const roll = Math.floor(Math.random() * 3) - 1;
      rolls.push(roll);
      counter += roll;
    }
    const modifier = Number(document.getElementById("modifier").value);
    counter += modifier;
      function getRollRank(counter) {
  if (counter > 8) return "Beyond Legendary";

  switch (counter) {
    case 8: return "Legendary";
    case 7: return "Epic";
    case 6: return "Fantastic";
    case 5: return "Superb";
    case 4: return "Great";
    case 3: return "Good";
    case 2: return "Fair";
    case 1: return "Average";
    case 0: return "Mediocre";
    case -1: return "Poor";
    case -2: return "Terrible";

    default:
      return "Below Terrible";
  }
}
   const rollRank = getRollRank(counter);
    const time = new Date().toISOString().slice(0, 19).replace("T", " ");
    const li = document.createElement("li");
    li.textContent = `${time} | ${name} rolled ${counter} (${rolls.join(", ")})`;
    document.getElementById("rollHistory").prepend(li);
    element.innerHTML = `count is ${counter}`;
     OBR.notification.show(`${name} just rolled a ${counter}, ${rollRank}!`);
     const rollData = {
  name: name,
  roll: counter,
  time: new Date().toISOString()
};
const data = await OBR.room.getMetadata();
let history = data["com.HelloOwlbear.diceroller"]?.diceHistory || [];

history.unshift(rollData);

await OBR.room.setMetadata({
  "com.HelloOwlbear.diceroller": {
    diceHistory: history
  }
});
console.log("Saved:", history);
  };
  
  element.addEventListener("click", () => setCounter(name));
  setCounter(name);
}
