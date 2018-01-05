var canvas
var canvasContext
var framesPerSecond = 60
var player
var ball
var mousePos
var block
var blocks
var BLOCK_WIDTH = 50
var BLOCK_HEIGHT = 20

// Classes a serem utilizadas definidas aqui

function map(value, in_min, in_max, out_min, out_max){
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

class Blocks{
    constructor(blocks){
        this.blocks = blocks
    }
    checkBlocks(){
        for(var i = this.blocks.length - 1; i >= 0; i--){
            if(this.blocks[i].touchingBall()){
                this.blocks.splice(i, 1)
                ball.ballSpeedY = -ball.ballSpeedY
            }
        }
    }
}

class Block{
    constructor(blockX, blockY){
        this.x = blockX
        this.y = blockY
        this.height = BLOCK_HEIGHT
        this.width = BLOCK_WIDTH
    }
    touchingBall(){
        if(ball.x >= this.x && ball.x <= this.x + this.width){
            if(ball.y >= this.y && ball.y <= this.y + this.height){
                return true
            }
        }
    }
}

class Paddle{
    constructor(paddleX, paddleY){
        this.x = paddleX
        this.y = paddleY
        this.width = 100
        this.height = 5
    }
}

class Ball{
    constructor(){
        this.resetPosition()
        this.radius = 5
        this.ballSpeedX = Math.floor(Math.random() * 10) - 5
        this.ballSpeedY = 5
    }

    resetPosition(){

        // Reseta posição da bola

        this.ballSpeedX = Math.floor(Math.random() * 10) - 5
        this.x = canvas.width / 2
        this.y = canvas.height / 2
    }

    checkPaddle(){

        // Verifica se a bola encostou no paddle/

        if(this.x >= player.x && this.x <= player.width + player.x){
            if(this.y >= player.y && this.y <= player.height + player.y){
                this.ballSpeedX = map(this.x, player.x, player.x + player.width, -10, 10)
                this.ballSpeedY = -this.ballSpeedY
            }
        }
    }
    checkColision(){

        // Verifica se a bola encostou nas paredes ou no chão.

        if(this.x <= 0 || this.x > canvas.width){
            this.ballSpeedX = -this.ballSpeedX
        }
        if(this.y <= 0){
            this.ballSpeedY = -this.ballSpeedY
        }
        if(this.y >= canvas.height){
            this.resetPosition()
            resetBlocks()
        }
    }
    moveBall(){

        // Método para movimento da bola

        this.checkColision()
        this.checkPaddle()
        this.x += this.ballSpeedX
        this.y += this.ballSpeedY
    }
}

function resetBlocks(){

    
    block = []
    for(var j = 3; j < 9; j++){
        for(var i = 0; i < 14; i++){
            var n = new Block(i * (BLOCK_WIDTH + 1) + 42, (BLOCK_HEIGHT + 1) * j)
            block.splice(0, 0, n)
        }
    }
    blocks = new Blocks(block)
}

window.onload = function(){

    // Inicializar objetos necessários aqui:

    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')

    mousePos = {
        x: canvas.width / 2 - 50,
        y: 0
    }
    player = new Paddle(canvas.width / 2 - 50, canvas.height - 50)
    ball = new Ball()
    resetBlocks()


    // Adiciona leitor de eventos para o mouse.

    canvas.addEventListener('mousemove', function(evt){
        mousePos = getMousePosition(evt)
    })


    // Define loop do jogo

    setInterval(function(){

        update()
        draw()

    }, 1000 / framesPerSecond)
}

function update(){

    // Atualiza posição do Paddle do mouse.

    player.x = mousePos.x - player.width / 2

    // Atualiza a posicao da bola

    ball.moveBall()
    blocks.checkBlocks()
}

function draw(){

    // Pintando o fundo

    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    //Pinta o jogador na tela

    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(player.x, player.y, player.width, player.height)

    //Pinta bola

    canvasContext.fillStyle = 'white'
    canvasContext.beginPath()
    canvasContext.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
    canvasContext.fill()

    //Pinta bloco na tela
    for(var i = 0; i < blocks.blocks.length; i++){
        canvasContext.fillRect(blocks.blocks[i].x, blocks.blocks[i].y, blocks.blocks[i].width, blocks.blocks[i].height)
    }

    

}

function getMousePosition(evt){


    //TODO: Mudar o uso dessas variáveis para nao gerar novas variaveis o tempo todo
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement
    var mouseX = evt.clientX - rect.left - root.scrollLeft
    var mouseY = evt.clientY - rect.top - root.scrollTop

    return {
        x: mouseX,
        y: mouseY
    }
}