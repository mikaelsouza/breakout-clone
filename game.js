var canvas
var canvasContext
var framesPerSecond = 60
var player
var ball
var mousePos

// Classes a serem utilizadas definidas aqui

class Paddle{
    constructor(paddleX, paddleY){
        this.x = paddleX
        this.y = paddleY
        this.width = 100
        this.height = 30
    }
}

class Ball{
    constructor(radius){
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.radius = radius
        this.ballSpeedX = 5
        this.ballSpeedY = 5
    }

    checkPaddle(){
        console.log(this.x, player.x, player.width)
        if(this.x >= player.x && this.x <= player.width + player.x){
            if(this.y >= player.y && this.y <= player.height + player.y){
                this.changeDirection()
            }
        }
    }

    changeDirection(){
        this.ballSpeedY = -this.ballSpeedY
    }
    checkColision(){
        if(this.x <= 0 || this.x > canvas.width){
            this.ballSpeedX = -this.ballSpeedX
        }
        if(this.y <= 0 || this.y > canvas.height){
            this.ballSpeedY = -this.ballSpeedY
        }
    }
    moveBall(){
        this.checkColision()
        this.checkPaddle()
        this.x += this.ballSpeedX
        this.y += this.ballSpeedY
    }
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
    ball = new Ball(10)


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