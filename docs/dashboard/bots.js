const bot_container = document.getElementById("botsContainer");
const empty_state = document.getElementById("emptyState");
const bot_card = document.getElementById("bot-card");
const user_name = document.getElementById("userName").textContent
async function GetUsersBots() {
  try {
    const data = await fetch(
      "https://api.thrd.xyz/get_user_servers?username=" +
        encodeURIComponent(user_name)
    );
    let res = await data.json();
    res = res.servers;
    if (res.length === 0) {
      empty_state.hidden = false;
    } else {
      res.forEach((bot) => {
        const new_bot_card = bot_card.cloneNode();
        new_bot_card.getElementById("name").textContent = bot.name;
        if (bot.status === "running") {
          new_bot_card.getElementById("status").textContent = "Online";
        } else {
          new_bot_card.getElementById("status").textContent = "Offline";
        }
        new_bot_card.getElementById("id").textContent = "Your Server ID Is " + bot.id;
        try {
            new_bot_card.hidden = false;
        } catch (e) {
            console.error(e);
        }
        bot_container.append(new_bot_card);
      });
    }
  } catch (e) {
    console.error("Failed to fetch bots:", e);
    empty_state.hidden = false;
  }
}

GetUsersBots();