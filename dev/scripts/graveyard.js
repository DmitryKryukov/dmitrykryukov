export function graveyardInit() {
  let canvas = document.querySelector('#js-grave-particles')
  let ctx = canvas.getContext('2d')

  class GraveParticle {
    constructor(x, y, radius, color, minVelocity, maxVelocity, ctx) {
      this.x = x || 0
      this.y = y || 0
      this.initialX = x
      this.initialY = y
      this.radius = radius || 10
      this.color = color || '#DECEAB'
      this.force = { x: (Math.random() * 20 - 10) * 0.35, y: Math.random() }
      this.minVelocity = minVelocity || 5
      this.maxVelocity = maxVelocity || 10
      this.velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity
      this.gravity = 2.5

      this.ctx = ctx
    }
    move() {
      this.x += this.force.x * this.velocity
      this.y += this.force.y * this.velocity + this.gravity
    }
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = this.color
      ctx.fill()
      if (this.y > canvas.offsetHeight * 2 + 20) {
        this.x = this.initialX
        this.y = this.initialY
      }
      this.move()
    }
  }

  class ParticleSystem {
    constructor(
      birthRate,
      minRadius,
      maxRadius,
      minVelocity,
      maxVelocity,
      ctx
    ) {
      this.particles = []
      this.birthRate = birthRate
      this.particleBirth(birthRate)
      this.minRadius = minRadius
      this.maxRadius = maxRadius
      this.minVelocity = minVelocity
      this.maxVelocity = maxVelocity
      this.ctx = ctx
    }
    particleBirth(birthRate = this.burthRate) {
      for (let i = 0; i < birthRate; i++) {
        let color = '#DECEAB'
        if (i % 3 == 0) {
          color = '#FFE5F2'
        }
        if (i % 11 == 0) {
          color = '#e73f19'
        }
        this.particles.push(
          new GraveParticle(
            Math.random() * canvas.offsetWidth * 2,
            Math.random() * -canvas.offsetHeight * 2,
            Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
            color,
            this.minVelocity,
            this.maxVelocity,
            this.ctx
          )
        )
      }
    }
    render(ctx) {
      ctx.clearRect(0, 0, 612, 880)
      this.particles.forEach((particle) => {
        particle.draw(ctx)
      })
    }
  }

  let particleSystem = new ParticleSystem(200, 2, 8, 0.1, 0.5, ctx)
  function Render() {
    window.requestAnimationFrame(Render)
    particleSystem.render(ctx)
  }
  function Burst() {
    particleSystem.particles = []
    particleSystem.particleBirth(100)
  }
  Burst()
  Render()
}
