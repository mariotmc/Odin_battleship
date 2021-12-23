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
  // turn based, player switch, init game with x ships, then rounds
  const gameInit = (playerName) => {
    const player1 = Player(playerName);
    const player2 = Player("Computer");
    player1.gameboard = Gameboard();
    player2.gameboard = Gameboard();

    let shipLength = 5;
    let coordinates = [];
    let axis = "horizontal";
    const cells = document.querySelectorAll(".player-cell");

    for (let i = 0; i < gameboard.board.length; i++) {
      cells[i].dataset.index = gameboard.board[i];
    }

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (shipLength > 0) {
          if (axis === "horizontal") {
            const cellsAsArray = Array.from(cells);
            const start = cellsAsArray.indexOf(e.target);
            const end = start + shipLength;
            const newArr = cellsAsArray.slice(start, end);
            newArr.forEach((element) => {
              element.style.backgroundColor = "red";
            });
            pushHorizontalCoordinates(e);
            player1.gameboard.placeShip(player1, coordinates);
            coordinates = [];
            shipLength -= 1;
          } else if (axis === "vertical") {
            const cellsAsArray = Array.from(cells);
            const first = cellsAsArray.indexOf(e.target);
            const firstCoordinate = cellsAsArray[first];
            const second = cellsAsArray.indexOf(e.target) + 10;
            const secondCoordinate = cellsAsArray[second];
            const third = cellsAsArray.indexOf(e.target) + 20;
            const thirdCoordinate = cellsAsArray[third];
            const fourth = cellsAsArray.indexOf(e.target) + 30;
            const fourthCoordinate = cellsAsArray[fourth];
            const fifth = cellsAsArray.indexOf(e.target) + 40;
            const fifthCoordinate = cellsAsArray[fifth];
            if (shipLength === 5) {
              let newArr = [
                firstCoordinate,
                secondCoordinate,
                thirdCoordinate,
                fourthCoordinate,
                fifthCoordinate,
              ];
              newArr.forEach((element) => {
                element.style.backgroundColor = "red";
              });
            } else if (shipLength === 4) {
              let newArr = [firstCoordinate, secondCoordinate, thirdCoordinate, fourthCoordinate];
              newArr.forEach((element) => {
                element.style.backgroundColor = "red";
              });
            } else if (shipLength === 3) {
              let newArr = [firstCoordinate, secondCoordinate, thirdCoordinate];
              newArr.forEach((element) => {
                element.style.backgroundColor = "red";
              });
            } else if (shipLength === 2) {
              let newArr = [firstCoordinate, secondCoordinate];
              newArr.forEach((element) => {
                element.style.backgroundColor = "red";
              });
            } else if (shipLength === 1) {
              let newArr = [firstCoordinate];
              newArr.forEach((element) => {
                element.style.backgroundColor = "red";
              });
            }
            pushVerticalCoordinates(e);
            player1.gameboard.placeShip(player1, coordinates);
            coordinates = [];
            shipLength -= 1;
          }
        }
      });
    });

    function pushHorizontalCoordinates(e) {
      const first = gameboard.board.indexOf(e.target.dataset.index);
      const firstCoordinate = gameboard.board[first];
      const second = gameboard.board.indexOf(e.target.dataset.index) + 1;
      const secondCoordinate = gameboard.board[second];
      const third = gameboard.board.indexOf(e.target.dataset.index) + 2;
      const thirdCoordinate = gameboard.board[third];
      const fourth = gameboard.board.indexOf(e.target.dataset.index) + 3;
      const fourthCoordinate = gameboard.board[fourth];
      const fifth = gameboard.board.indexOf(e.target.dataset.index) + 4;
      const fifthCoordinate = gameboard.board[fifth];
      if (shipLength === 5) {
        coordinates.push(
          firstCoordinate,
          secondCoordinate,
          thirdCoordinate,
          fourthCoordinate,
          fifthCoordinate
        );
      } else if (shipLength === 4) {
        coordinates.push(firstCoordinate, secondCoordinate, thirdCoordinate, fourthCoordinate);
      } else if (shipLength === 3) {
        coordinates.push(firstCoordinate, secondCoordinate, thirdCoordinate);
      } else if (shipLength === 2) {
        coordinates.push(firstCoordinate, secondCoordinate);
      } else if (shipLength === 1) {
        coordinates.push(firstCoordinate);
      }
    }

    function pushVerticalCoordinates(e) {
      const first = gameboard.board.indexOf(e.target.dataset.index);
      const firstCoordinate = gameboard.board[first];
      const second = gameboard.board.indexOf(e.target.dataset.index) + 10;
      const secondCoordinate = gameboard.board[second];
      const third = gameboard.board.indexOf(e.target.dataset.index) + 20;
      const thirdCoordinate = gameboard.board[third];
      const fourth = gameboard.board.indexOf(e.target.dataset.index) + 30;
      const fourthCoordinate = gameboard.board[fourth];
      const fifth = gameboard.board.indexOf(e.target.dataset.index) + 40;
      const fifthCoordinate = gameboard.board[fifth];
      if (shipLength === 5) {
        coordinates.push(
          firstCoordinate,
          secondCoordinate,
          thirdCoordinate,
          fourthCoordinate,
          fifthCoordinate
        );
      } else if (shipLength === 4) {
        coordinates.push(firstCoordinate, secondCoordinate, thirdCoordinate, fourthCoordinate);
      } else if (shipLength === 3) {
        coordinates.push(firstCoordinate, secondCoordinate, thirdCoordinate);
      } else if (shipLength === 2) {
        coordinates.push(firstCoordinate, secondCoordinate);
      } else if (shipLength === 1) {
        coordinates.push(firstCoordinate);
      }
    }

    const confirmButton = document.querySelector("#confirm-button");
    confirmButton.addEventListener("click", () => {
      if (shipLength === 0) {
        Display.gameInterface(player1, player2);
      }
    });

    const axisButtton = document.querySelector("#axis-button");
    axisButtton.addEventListener("click", () => {
      if (axis === "horizontal") {
        axis = "vertical";
      } else if (axis === "vertical") {
        axis = "horizontal";
      }
    });
  };

  const gameLoop = (player1, player2) => {
    // player 1 starts, marks a field, if hit, go again, if miss, player 2's turn
    let currentPlayer = player1;
    const main = document.querySelector("main");
    const playerCells = document.querySelectorAll(".player-cell");
    const computerCells = document.querySelectorAll(".computer-cell");
    const playerBoard = main.firstChild.lastChild.lastChild.lastChild;
    const computerBoard = main.lastChild.lastChild.lastChild.lastChild;

    for (let i = 0; i < gameboard.board.length; i++) {
      computerCells[i].dataset.index = gameboard.board[i];
    }

    computerCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (currentPlayer === player1) {
          console.log("player attack");
          const index = gameboard.board.indexOf(e.target.dataset.index);
          const coordinate = gameboard.board[index];
          player2.gameboard.receiveAttack(player2, coordinate);
          currentPlayer = player2;
        }
      });
    });

    playerCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (currentPlayer === player2) {
          console.log("computer attack");
          const index = gameboard.board.indexOf(e.target.dataset.index);
          const coordinate = gameboard.board[index];
          player1.gameboard.receiveAttack(player1, coordinate);
          currentPlayer = player1;
        }
      });
    });
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

  return { gameOver, gameInit, gameLoop };
})();

const Display = (() => {
  const main = document.querySelector("main");

  const removeChildren = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const namePrompt = () => {
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "text";
    input.id = "name";
    input.placeholder = "Enter your name";
    input.required = true;
    form.appendChild(label);
    form.appendChild(input);
    main.appendChild(form);

    form.onsubmit = (e) => {
      e.preventDefault();
      shipPlacementInterface(input.value);
    };
  };

  const displayPlayer = (name, player) => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player");
    const playerName = document.createElement("div");
    playerName.classList.add("player-name");
    playerName.textContent = name;
    playerContainer.appendChild(playerName);
    const playerBoard = board(playerContainer, player);
    main.appendChild(playerContainer);
  };

  const board = (toBeAppendedTo, player) => {
    const boardWrapper = document.createElement("div");
    boardWrapper.classList.add("board-container");
    const boardContainer = document.createElement("div");
    boardContainer.style.display = "flex";

    const board = document.createElement("div");
    board.classList.add("board");

    for (let i = 0; i < 10 * 10; i++) {
      const cell = document.createElement("div");
      cell.classList.add(`${player}-cell`);
      board.appendChild(cell);
    }

    const letterCoordinates = document.createElement("div");
    letterCoordinates.classList.add("letter-coordinates");
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    for (let i = 0; i < 10; i++) {
      const letter = document.createElement("div");
      letter.classList.add("letter-coordinate");
      letterCoordinates.appendChild(letter);
    }

    for (let i = 0; i < letterCoordinates.children.length; i++) {
      letterCoordinates.children[i].textContent = `${letters[i]}`;
    }

    const numberCoordinates = document.createElement("div");
    numberCoordinates.classList.add("number-coordinates");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    for (let i = 0; i < 10; i++) {
      const number = document.createElement("div");
      number.classList.add("number-coordinate");
      numberCoordinates.appendChild(number);
    }

    for (let i = 0; i < numberCoordinates.children.length; i++) {
      numberCoordinates.children[i].textContent = `${numbers[i]}`;
    }

    boardContainer.appendChild(numberCoordinates);
    boardContainer.appendChild(board);
    boardWrapper.appendChild(letterCoordinates);
    boardWrapper.appendChild(boardContainer);
    toBeAppendedTo.appendChild(boardWrapper);
  };

  const axisButton = () => {
    const button = document.createElement("button");
    button.textContent = "Horizontal";
    button.id = "axis-button";
    button.addEventListener("click", () => {
      if (button.textContent === "Horizontal") {
        button.textContent = "Vertical";
      } else if (button.textContent === "Vertical") {
        button.textContent = "Horizontal";
      }
    });
    main.appendChild(button);
  };

  const confirmButton = () => {
    const button = document.createElement("button");
    button.textContent = "Confirm";
    button.id = "confirm-button";
    main.appendChild(button);
  };

  const shipPlacementInterface = (playerName) => {
    removeChildren(main);
    displayPlayer(playerName, "player");
    axisButton();
    confirmButton();
    gameLogic.gameInit(playerName);
  };

  const gameInterface = (player1, player2) => {
    const axisButton = document.querySelector("#axis-button");
    const confirmButton = document.querySelector("#confirm-button");
    main.removeChild(axisButton);
    main.removeChild(confirmButton);
    displayPlayer("Computer", "computer");
    gameLogic.gameLoop(player1, player2);
  };

  return { namePrompt, gameInterface, shipPlacementInterface };
})();

const gameboard = Gameboard();

// window.onload = Display.namePrompt();
window.onload = Display.shipPlacementInterface("Selwyn");
