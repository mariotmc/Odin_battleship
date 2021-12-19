const Player = () => {
  return { ships: [], markedFields: [], score: 0 };
};

const Ship = (coordinates) => {
  return {
    position: coordinates,
    length: coordinates.length,
    isSunk: () => {
      if (length === 0) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const Gameboard = (() => {
  // prettier-ignore
  const Board = () => {
    return ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1",
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
  }

  const gameboard = Board();
  const player1board = Board();
  const player2board = Board();

  const placeShip = (player, coordinates) => {
    const currentPlayer = player;

    const ship = Ship(coordinates);
    currentPlayer.ships.push(ship);

    coordinates.forEach((coordinate) => {
      const element = gameboard.find((element) => element === coordinate);
      const index = gameboard.indexOf(element);

      if (currentPlayer === player1) {
        player1board[index] = "Ship";
      } else if (currentPlayer === player2) {
        player2board[index] = "Ship";
      }
    });
  };

  const receiveAttack = (player, coordinate) => {
    const currentPlayer = player;

    const index = gameboard.indexOf(coordinate);

    if (currentPlayer === player1) {
      if (!currentPlayer.markedFields.includes(coordinate)) {
        if (player1board[index] === "Ship") {
          currentPlayer.ships.forEach((ship) => {
            ship.position.forEach((element) => {
              if (element === coordinate) {
                ship.length--;
                // call gameOver() to check if either player won/lost the game
              }
            });
          });
        } else {
          markField(currentPlayer, coordinate);
        }
      } else {
        // needs logic on preventing player from making repeated guess
        console.log("you already guessed this");
      }
    } else if (currentPlayer === player2) {
      if (!currentPlayer.markedFields.includes(coordinate)) {
        if (player2board[index] === "Ship") {
          currentPlayer.ships.forEach((ship) => {
            ship.position.forEach((element) => {
              if (element === coordinate) {
                ship.length--;
                // call gameOver() to check if either player won/lost the game
              }
            });
          });
        } else {
          markField(currentPlayer, coordinate);
        }
      } else {
        // needs logic on preventing player from making repeated guess
        console.log("you already guessed this");
      }
    }
  };

  const markField = (player, coordinate) => {
    player.markedFields.push(coordinate);
    console.log(player.markedFields);
  };

  return { Board, placeShip, receiveAttack, gameboard, player1board, player2board };
})();

const gameLogic = (() => {
  // here comes the game logic, turn based, currentPlayer switch, init game with x ships, then rounds

  const gameOver = () => {
    // if all ships of any player have sunk game is over and message should appear
    // maybe forEach Ship if isSunk === true
  };

  return { gameOver };
})();

const player1 = Player();
const player2 = Player();

Gameboard.placeShip(player1, ["A1", "B1", "C1"]);
Gameboard.placeShip(player1, ["A2", "B2", "C2"]);
Gameboard.receiveAttack(player1, "A1");
Gameboard.receiveAttack(player1, "B1");
Gameboard.receiveAttack(player1, "D1");
Gameboard.receiveAttack(player1, "E5");
Gameboard.receiveAttack(player1, "C4");
Gameboard.receiveAttack(player1, "J1");
Gameboard.receiveAttack(player1, "D7");
Gameboard.receiveAttack(player1, "D7");
Gameboard.receiveAttack(player2, "D7");
Gameboard.receiveAttack(player2, "D7");
