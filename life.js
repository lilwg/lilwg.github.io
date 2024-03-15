life.js
function life(canvasName, squareSize, updateInterval){
    var canvas = document.getElementById(canvasName);
    var w = ~~(canvas.width/squareSize);
    var h = ~~(canvas.height/squareSize);
    var ctx = canvas.getContext('2d');
    var black = colorSquare(squareSize, ctx, 0, 0, 0);
    var white = colorSquare(squareSize, ctx, 255, 255, 255);
    var boards = [[], []];
    initialize(boards, h, w);
    fillRandom(boards[0], h, w);
    setInterval(function() { step(boards, h, w, ctx, white, black, squareSize) }, updateInterval);
  }
  
  function initialize(boards, h, w){
    for(var i=0; i<h; i++) {
      boards[0][i] = new Array(w);
      boards[1][i] = new Array(w);
    }
  }
  
  function fillRandom(board, h, w){
    for(var i=0; i<h; i++) {
      for (var j=0; j<w; j++){
        board[i][j]=Math.random() < .5 ? 0 : 1;
      }
    }
  }
  
  function step(boards, h, w, ctx, white, black, size){
    update(boards, h , w);
    draw(boards[0], ctx, white, black, size, h, w);
  }
  
  function update(boards, h, w){
    for(var i=0; i<h; i++) {
      for (var j=0; j<w; j++){
        var n = neighbors(boards[0], h, w, i, j);
        if (n==3 || (n==2 && boards[0][i][j]==1)){
          boards[1][i][j]=1;
        }
        else{
          boards[1][i][j]=0;
        }
      }
    }
    var t = boards[0];
    boards[0] = boards[1];
    boards[1] = t;
  }
  
  function draw(board, ctx, white, black, size, h, w){
    for (var x = 0; x < w; x++){
      for (var y = 0; y < h; y++){
        if (board[y][x] == 0){
          ctx.putImageData(white, x*size, y*size);
        }
        else{
          ctx.putImageData(black, x*size, y*size);
        }
      }
    }
  }
  
  function neighbors(board, h, w, i, j){
    return board[(i-1+h)%h][(j-1+w)%w] +
    board[i][(j-1+w)%w] +
    board[(i+1)%h][(j-1+w)%w] +
    board[(i-1+h)%h][j] +
    board[(i+1)%h][j] +
    board[(i-1+h)%h][(j+1)%w] +
    board[i][(j+1)%w] +
    board[(i+1)%h][(j+1)%w];
  }
  
  function colorSquare(size, ctx, r, g, b){
    square = ctx.createImageData(size,size);
    var d  = square.data;
    for (var i=0; i<d.length; i+=4){
      d[i] = r;
      d[i+1] = g;
      d[i+2] = b;
      d[i+3] = 255;
    }
  
    return square;
  }
  