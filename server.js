const system = require("os");
const file = require("fs");
const http = require("http");
const toRupiah = require("rupiah-format");

console.log("memory: ", system.freemem());

const myName = "Adam Wisnu";

function getName() {
  return myName;
}

const player = {
  //  key : value
  id: 1,
  name: getName(),
  total_match: 90,
  win: 70,
  lose: 30,
  age: 20,
  saldo: 2832327343935,
};

const items = [
  {
    item_id: 111,
    item_name: "butterfly",
    item_damage: 450,
    item_drop: true,
  },
  {
    item_id: 133,
    item_name: "dagon",
    item_damage: 600,
    item_drop: false,
  },
];

const playerItems = Object.assign(player, items[1]);

function generateAge() {
  if (player.age >= 6 && player.age <= 10) {
    return "Anak - anak";
  } else if (player.age >= 11 && player.age <= 17) {
    return "Remaja";
  } else if (player.age >= 18 && player.age <= 30) {
    return "Dewasa";
  } else if (player.age >= 31 && player.age <= 60) {
    return "Orang Tua";
  } else if (player.age > 100) {
    return "Dewa";
  } else {
    return "Balita";
  }
}

function generateWinRate() {
  const win_rate = (player.win / player.total_match) * 100;
  return win_rate;
}

function hero(id, name, atk, def) {
  return { id, name, atk, def };
}

function interaction(request, response) {
  console.log("url yang diakses", request.url);
  if (request.url == "/player") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(`<html>
  <head>
  <title>DEACOURSE NODE JS</title>
  </head>
  <body  style="background: #555;color: #fff; height: 100vh;width: 100%;"
  >
  <h1>
  <marquee>DATA PLAYER</h1>marquee>
  </h1>
  <h3>id ${player.id}</h3>
  <h3>nama pemain ${player.name}</h3>
  <h3>total match ${player.total_match}</h3>
  <h3>total win ${player.win}</h3>
  <h3>total lose ${player.lose}</h3>
  <h3>winrate ${generateWinRate()}</h3>
  <h3>saldo user ${toRupiah.convert(player.saldo)}</h3>
  </body>
  </html>`);
  } else if (request.url == "/items") {
    response.writeHead(300, { "Content-Type": "application/json" });
    const itemList = JSON.stringify(items);
    response.write(itemList);
  } else if (request.url == "/hero") {
    response.writeHead(200, { "Content-Type": "application/json" });
    const heroList = JSON.stringify(hero(1, "balmond", 80, 60));
    response.write(heroList);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<html><body><h1>404 BRO SORRY MU NGAPEN LO?</h1></body></html>");
  }
  return response.end();
}

const port = 3000;
const server = http.createServer(interaction);

server.listen(port, function (err) {
  if (err) {
    return console.error("error bro");
  }
  console.log("server udah nyala");
});
