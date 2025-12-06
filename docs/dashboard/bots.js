const bot_container = document.getElementById("botsContainer");
const empty_state = document.getElementById("emptyState");
const bot_card = document.getElementById("bot-card");

async function GetUsersBots() {
    const user_name = document.getElementById("userName").textContent
  try {
    const data = await fetch(
      "https://api.thrd.xyz/get_user_servers?username=" +
        encodeURIComponent(user_name)
    );
    let res = await data.json();
    console.log(res.servers);
    console.log(res.servers[0]);
    if (res.length === 0) {
      empty_state.hidden = false;
    } else {
      res.servers.forEach(bot => {
        const new_bot_card = bot_card.cloneNode(true);
        new_bot_card.querySelector("#bot-name").textContent = bot.name;
        if (bot.status === "running") {
          new_bot_card.querySelector("#bot-status").textContent = "Online";
        } else {
          new_bot_card.querySelector("#bot-status").textContent = "Offline";
        }
        new_bot_card.querySelector("#bot-id").textContent = "Your Server ID Is " + bot.id;
        new_bot_card.hidden = false;
        new_bot_card.id = "bot-card-" + bot.id;
        new_bot_card.className = "bot-card-" + bot.id;
        bot_container.appendChild(new_bot_card);
      });
    }
  } catch (e) {
    console.error("Failed to fetch bots:", e);
    empty_state.hidden = false;
  }
}
setTimeout(()=>{GetUsersBots();},2000);