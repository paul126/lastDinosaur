(function(){
  if(typeof window.LastDinosaur === 'undefined'){
    window.LastDinosaur = {};
  }

  var View = LastDinosaur.View = function ($el) {
    this.$el = $el;
    this.bestScore = 0;
    this.speed = 0;

    $(window).on('keydown', this.moveDino.bind(this));

    this.updateScore(0);
    this.selectDifficulty();
  };

  View.EASY_SPEED = 100
  View.NORMAL_SPEED = 80;
  View.HARD_SPEED = 60;

  View.prototype.moveDino = function (event) {
    if (event.keyCode === 37) {
      this.board.dino.move('left');
    } else if (event.keyCode === 39) {
      this.board.dino.move('right');
    }
  };

  View.prototype.renderEarth = function (board) {
    var html = '';

    for (var i = 1; i < board.earth.length; i++) {
      html += '<ul class="board group">';
      for (var j = 0; j < board.earth[0].length; j++) {
        if (board.earth[i][j] === 2) {
          html += '<li class="dino"></li>';
        } else if (board.earth[i][j] === 3){
            html += '<li class="meteor"></li>';
        } else {
          html += '<li></li>';
        }
      }
      html += '</ul>';
    }
    this.$el.html(html);
  };

  View.prototype.updateScore = function (score) {
    if (this.speed === View.EASY_SPEED) {
      this.score = Math.floor(score * .7);
    } else if (this.speed === View.HARD_SPEED){
      this.score = Math.floor(score * 1.3);
    } else {
      this.score = score;
    }

    if (this.score >= this.bestScore) { this.bestScore = this.score; }

    $('.score').html('<li class="current">Current Score: ' + this.score + '</li>');
    $('.score').append('<li class="best">Best Score: ' + this.bestScore + '</li>');
  };

  View.prototype.resetGame = function () {
    this.board = new LastDinosaur.Board();
    this.score = 0;
    this.renderEarth(this.board);

    this.intervalId = window.setInterval(this.step.bind(this), this.speed);
  };

  View.prototype.selectDifficulty = function () {
    this.$el.html(this.difficultyMessage());

    $(".diff").click(this.userDifficulty.bind(this));
    this.intervalId = window.setInterval(function () {}, 100);
  };

  View.prototype.userDifficulty = function (event) {
    var diff = $(event.currentTarget).html()

      if (diff === "Easy") {
        this.speed = View.EASY_SPEED;
      } else if (diff === "Normal") {
        this.speed = View.NORMAL_SPEED;
      } else if (diff === "Hard") {
        this.speed = View.HARD_SPEED;
      }

      window.clearInterval(this.intervalId);
      this.resetGame();
  };

  View.prototype.gameOver = function () {
    window.clearInterval(this.intervalId);
    var html = '<ul class="game-over">';
    html += this.endMessage();
    html += '<li><p class="play">Play Again</p></li>';
    html += '</ul>';
    this.$el.html(html);

    $(".play").click(this.userRestart.bind(this));

    this.intervalId = window.setInterval(function(){}, 100);
  };

  View.prototype.userRestart = function (event) {
    window.clearInterval(this.intervalId);
    this.selectDifficulty();
  };

  View.prototype.endMessage = function () {
    var html = '<li>';
    if (this.score < 300) {
      html += 'Try harder.';
    } else if (this.score < 450) {
      html += 'You must improve!';
    } else if (this.score < 750) {
      html += 'This is why there are no more dinosaurs.';
    } else if (this.score < 1000) {
      html += "Littlefoot's mom still did better than you.";
    } else {
      html += 'Paleontologists will sing of your endeavors. Rejoice!';
      if ( this.speed > View.HARD_SPEED ) {
        html += '</li><li>Now try a harder mode.</li>';
      }
    }

    html += '</li>';
    return html;
  };

  View.prototype.difficultyMessage = function () {
    var html = '<ul class="game-over">'
    html += '<li>Select your difficulty:</li>';
    html += '<li><p class="diff">Easy</p> | '
    html += '<p class="diff">Normal</p> | '
    html +='<p class="diff">Hard</p></li>';
    html += '</ul>'
    return html;
  };

  View.prototype.step = function () {

    if (!this.board.dino.alive) {
      this.gameOver();
    } else {
      this.board.step();
      this.updateScore(this.board.counter);
      this.renderEarth(this.board);
    }
  };

})();
