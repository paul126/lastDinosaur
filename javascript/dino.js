(function(){
  if(typeof window.LastDinosaur === "undefined"){
    window.LastDinosaur = {};
  }

  var BOARD_WIDTH = 20;
  var BOARD_HEIGHT = 10;

  var Dino = LastDinosaur.Dino = function (board) {
    this.board = board;
    this.pos = [7,0];
    this.board.earth[7][0] = 2;
  };

  Dino.prototype.move = function (direction) {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    if (direction === 'right' && this.pos[1] < 20) {
      this.pos[1] += 1;
    } else if (direction === 'left' && this.pos[1] > 0) {
      this.pos[1] -= 1;
    }
    if (this.board.earth[this.pos[0]][this.pos[1]] === 3) {
      this.board.collision();
    } else {
      this.board.earth[this.pos[0]][this.pos[1]] = 2;
    }
  };

  var Meteor = LastDinosaur.Meteor = function (board) {
    this.board = board;
    posX = Math.floor(Math.random() * 20);
    this.pos = [0, posX];
  };

  Meteor.prototype.fall = function () {
    this.board.earth[this.pos[0]][this.pos[1]] = 0;
    this.pos[0] += 1;
    if (this.board.earth[this.pos[0]][this.pos[1]] === 2) {
      this.board.collision();
    } else if (this.board.earth[this.pos[0]][this.pos[1]] === 1) {
      if (this.board.counter >= 600) {
        this.board.earth[this.pos[0]][this.pos[1] + 1] = 0;
        this.board.earth[this.pos[0]][this.pos[1] - 1] = 0;
      }
      this.board.generateMeteor();
    } else {
      if (this.board.earth[this.pos[0] + 1][this.pos[1]] === 1 && this.board.counter >= 600) {
        this.board.earth[this.pos[0]][this.pos[1] + 1] = 3;
        this.board.earth[this.pos[0]][this.pos[1] - 1] = 3;
      }
      this.board.earth[this.pos[0]][this.pos[1]] = 3;
    }
  };

  var Board = LastDinosaur.Board = function () {
    this.counter = 1;
    this.earth = Board.freshEarth();
    this.dino = new LastDinosaur.Dino(this);
    this.meteor = new LastDinosaur.Meteor(this);
  };

  Board.freshEarth = function () {
    var earth = [];

    for (var i = 0; i < BOARD_HEIGHT; i++) {
      earth.push([]);
      for (var j = 0; j < BOARD_WIDTH; j++) {
        if (i > BOARD_HEIGHT - 3) {
          earth[i].push(1);
        } else {
          earth[i].push(0);
        }
      }
    }

    return earth;
  };

  Board.prototype.collision = function () {
    alert("Ouch!");
  };

  Board.prototype.generateMeteor = function () {
    this.meteor = new Meteor(this);
  };

})();
