// Code from https://codepen.io/rojo2/pen/NWRKMEe

// Inspired by the great Amelia Wattenberger (https://wattenberger.com/)
// Please, go visit her website
const canvas = document.querySelector('canvas')
canvas.width = 300
canvas.height = 150
const cx = canvas.getContext('2d')
cx.globalCompositeOperation = 'source-over'
cx.imageSmoothingEnabled = true
cx.imageSmoothingQuality = 'low'

const palette = [
  [255, 255, 255],
  [161, 200, 214],
  [45, 208, 148],
  [138, 230, 166],
  [56, 166, 166],
  [212, 226, 182]
]

/*
x0 	The x-coordinate of the starting circle of the gradient
y0 	The y-coordinate of the starting circle of the gradient
r0 	The radius of the starting circle
x1 	The x-coordinate of the ending circle of the gradient
y1 	The y-coordinate of the ending circle of the gradient
r1 	The radius of the ending circle
*/

const gradients = palette.map(([r, g, b]) => {
  const gradient = cx.createRadialGradient(0, 0, 1, 0, 0, 50)
  gradient.addColorStop(0, `rgba(${r},${g},${b},1)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
  return gradient
})

const watercolors = []

class Watercolor {
  constructor(time) {
    const colorIndex = Math.floor(Math.random() * palette.length)
    this.color = gradients[colorIndex]
    this.radius = 50
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.dx = (Math.random() * 2) - 1
    this.dy = (Math.random() * 2) - 1
    this.startTime = time
    this.currentTime = time
    this.duration = Math.ceil(Math.random() * 4000)
  }

  update(time) {
    this.currentTime = time
    if (this.currentTime - this.startTime >= this.duration) {
      return false
    }
    this.x += this.dx
    this.y += this.dy
    return true
  }

  render(cx) {
    cx.save()
    cx.globalAlpha = (this.currentTime - this.startTime) / this.duration
    cx.translate(this.x, this.y)
    cx.beginPath()
    cx.arc(0, 0, this.radius, 0, Math.PI * 2)
    cx.fillStyle = this.color
    cx.fill()
    cx.restore()
  }
}

let frameId
function frame(time) {
  const multiplier = 0.25
  const expectedWidth = Math.floor(canvas.clientWidth * multiplier)
  /*if (canvas.width !== expectedWidth) {
    canvas.width = expectedWidth
  }*/
  const expectedHeight = Math.floor(canvas.clientHeight * multiplier)
  /*if (canvas.height !== expectedHeight) {
    canvas.height = expectedHeight
  }*/

  if (watercolors.length < 2) {
    watercolors.push(new Watercolor(time))
  }

  for (let index = watercolors.length - 1; index >= 0; index--) {
    const watercolor = watercolors[index]
    if (!watercolor.update(time)) {
      console.log(watercolors.splice(index, 1))
    }
  }

  for (const watercolor of watercolors) {
    watercolor.render(cx)
  }

  frameId = window.requestAnimationFrame(frame)
}

function start() {
  frameId = window.requestAnimationFrame(frame)
}

function stop() {
  window.cancelAnimationFrame(frameId)
}

start()
