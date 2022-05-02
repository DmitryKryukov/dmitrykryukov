export function graveyardInit() {
  class TP {
    constructor(text, x, y, z, speed, type, sr, er, container) {
      this.text = text
      this.x = x
      this.y = y
      this.z = z
      this.sr = sr
      this.er = er

      this.speed = speed
      this.type = type
      this.container = container
      this.born()
    }
    born() {
      const el = document.createElement('span')
      el.classList.add('grave-particle')
      el.innerHTML = this.text
      this.container.append(el)
      el.style.setProperty('--grave-particle-x', this.x + 'px')
      el.style.setProperty('--grave-particle-y', this.y + 'px')
      el.style.setProperty('--grave-particle-z', this.z)
      el.style.setProperty('--grave-particle-speed', this.speed + 's')
      el.style.setProperty(
        '--grave-particle-color',
        this.type > 0.5 ? '#FFE5F2' : '#DECEAB'
      )
      el.style.setProperty('--grave-particle-start-rot', this.sr + 'deg')
      el.style.setProperty('--grave-particle-end-rot', this.er + 'deg')
    }
  }
  const grave = document.querySelector('#js-grave-particles')
  console.log(grave.innerWidth)
  const Q = 40
  for (var i = 0; i < Q; i++) {
    let tp = new TP(
      Math.random() > 0.5 ? 'Ура' : 'Еах!',
      Math.random() * 100 - 200,
      Math.random() * grave.offsetWidth,
      Math.random() * 0.9 + 0.1,
      Math.random() * 5 + 5,
      Math.random(),
      Math.random() * 90 - 45,
      Math.random() * 90 - 45,
      grave
    )
  }
}
