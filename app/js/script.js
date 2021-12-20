const Player = (name) => {
  return { name, ships: [] };
};

const Ship = (coordinates) => {
  return {
    position: coordinates,
    length: coordinates.length,
    isSunk: false,
  };
};

const Gameboard = () => {
  // prettier-ignore
  board = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1",
    "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "J2",
    "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "J3",
    "A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "J4",
    "A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5", "I5", "J5",
    "A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6", "I6", "J6",
    "A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7", "I7", "J7",
    "A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8", "J8",
    "A9", "B9", "C9", "D9", "E9", "F9", "G9", "H9", "I9", "J9",
    "A10", "B10", "C10", "D10", "E10", "F10", "G10", "H10", "I10", "J10"
    ];

  const placeShip = (player, coordinates) => {
    const ship = Ship(coordinates);
    player.ships.push(ship);

    coordinates.forEach((coordinate) => {
      const element = gameboard.board.find((element) => element === coordinate);
      const index = gameboard.board.indexOf(element);

      player.gameboard.board[index] = "Ship";
    });
  };

  const receiveAttack = (player, coordinate) => {
    const index = gameboard.board.indexOf(coordinate);

    if (player.gameboard.board[index] !== "Hit") {
      if (player.gameboard.board[index] === "Ship") {
        player.ships.forEach((ship) => {
          ship.position.forEach((element) => {
            if (element === coordinate) {
              ship.length--;
              markField(player, coordinate);
              if (ship.length === 0) {
                ship.isSunk = true;
                gameLogic.gameOver(player);
              }
            }
          });
        });
      } else {
        markField(player, coordinate);
      }
    } else {
      // needs logic on preventing player from making duplicate guess
      console.log(`${player.name} you already guessed ${coordinate}`);
    }
  };

  const markField = (player, coordinate) => {
    const index = gameboard.board.indexOf(coordinate);
    player.gameboard.board[index] = "Hit";
  };

  return { board, placeShip, receiveAttack, markField };
};

const gameLogic = (() => {
  // here comes the game logic, turn based, player switch, init game with x ships, then rounds
  const gameInit = () => {
    // prompt players to place ships until ships.length === 5
  };

  const gameOver = (player) => {
    let sunkenShips = 0;

    player.ships.forEach((ship) => {
      if (ship.isSunk === true) {
        sunkenShips += 1;
      }
    });

    if (sunkenShips === player.ships.length) {
      console.log(`${player.name} lost`);
    }
  };

  return { gameOver };
})();

const player1 = Player("Selwyn");
const player2 = Player("Computer");

const gameboard = Gameboard();
player1.gameboard = Gameboard();
player2.gameboard = Gameboard();

player1.gameboard.placeShip(player1, ["A1", "B1", "C1"]);
player1.gameboard.placeShip(player1, ["A2", "B2", "C2"]);
player1.gameboard.placeShip(player1, ["A3", "B3", "C3"]);

player2.gameboard.placeShip(player2, ["A1", "B1", "C1"]);
player2.gameboard.placeShip(player2, ["A2", "B2", "C2"]);
player2.gameboard.placeShip(player2, ["A3", "B3", "C3"]);

player1.gameboard.receiveAttack(player1, "A1");
player1.gameboard.receiveAttack(player1, "B1");
player1.gameboard.receiveAttack(player1, "C1");

player2.gameboard.receiveAttack(player2, "A2");
player2.gameboard.receiveAttack(player2, "B2");
player2.gameboard.receiveAttack(player2, "C2");
player2.gameboard.receiveAttack(player2, "C2");
player2.gameboard.receiveAttack(player2, "C3");
