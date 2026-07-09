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
    const time = new Date().toLocaleTimeString();
    const li = document.createElement("li");
    li.textContent = `${time} | ${name} rolled ${counter} (${rolls.join(", ")})`;
    document.getElementById("rollHistory").prepend(li);
    element.innerHTML = `count is ${counter}`;
     OBR.notification.show(`${name} just rolled a ${counter}, nice!`);
     const rollData = {
  name: name,
  roll: counter,
  time: new Date().toLocaleTimeString()
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
