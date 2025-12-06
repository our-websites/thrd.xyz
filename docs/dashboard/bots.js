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
        document.getElementById("bot-name").textContent = bot.name;
        if (bot.status === "running") {
          document.getElementById("bot-status").textContent = "Online";
        } else {
          document.getElementById("bot-status").textContent = "Offline";
        }
        document.getElementById("bot-id").textContent = "Your Server ID Is " + bot.id;
        new_bot_card.hidden = false;
        bot_container.appendChild(new_bot_card);
      });
    }
  } catch (e) {
    console.error("Failed to fetch bots:", e);
    empty_state.hidden = false;
  }
}
setTimeout(()=>{GetUsersBots();},8000);