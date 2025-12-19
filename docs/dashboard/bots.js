const bot_container = document.getElementById("botsContainer");
const empty_state = document.getElementById("emptyState");

async function GetUsersBots() {
  bot_container.innerHTML = '<div class="bot-card" id="bot-card" hidden><h3 id="bot-name">Bot Name</h3><h2 id="bot-status">Bot Status</h2><p id="bot-id">BotID</p></div>';
  const user_name = document.getElementById("userName").textContent;
  const bot_card = document.getElementById("bot-card");
  try {
    const data = await fetch(
      "https://api.thrd.xyz/get_user_servers?username=" + encodeURIComponent(user_name));
    let res = await data.json();
    // console.log(res.servers);
    if (res.amount === 0) {
      empty_state.hidden = false;
    } else {
      empty_state.hidden = true;
      res.servers.forEach((bot) => {
        const new_bot_card = bot_card.cloneNode(true);
        let botName = bot.name;
        if (botName.startsWith("thrdbot-")) {
          botName = botName.replace("thrdbot-", "");
        }
        new_bot_card.querySelector("#bot-name").textContent = botName;
        if (bot.status === "running") {
          new_bot_card.querySelector("#bot-status").textContent = "Online";
        } else {
          new_bot_card.querySelector("#bot-status").textContent = "Offline";
        }
        new_bot_card.querySelector("#bot-id").textContent = "Bot ID: " + bot.id;
        new_bot_card.hidden = false;
        //new_bot_card.id = "bot-card-" + bot.id;
        //new_bot_card.className = "bot-card-" + bot.id; // Can't change the name otherwise CSS doesn't apply
        new_bot_card.onclick = () => {
          window.location.href = `https://panel.thrd.xyz/servers/view/${bot.id}`;
        };
        bot_container.appendChild(new_bot_card);
      });
    }
  } catch (e) {
    console.error("Failed to fetch bots:", e);
    empty_state.hidden = true;
    const new_bot_card = bot_card.cloneNode(true);
        let botName = "Thrd Status";
        new_bot_card.querySelector("#bot-name").textContent = botName;
        new_bot_card.querySelector("#bot-status").textContent = "Click Here To Check The Thrd Status Page For More info!";
        new_bot_card.querySelector("#bot-id").textContent = "Bot ID: NaN";
        new_bot_card.hidden = false;
        new_bot_card.onclick = () => {
          window.location.href = `https://status.thrd.xyz`;
        };
        bot_container.appendChild(new_bot_card);
  }
}
// setTimeout(()=>{GetUsersBots();},3500); // We don't need to wait anymore since it updates every 5 seconds :)
GetUsersBots();
setInterval(GetUsersBots, 5000);
