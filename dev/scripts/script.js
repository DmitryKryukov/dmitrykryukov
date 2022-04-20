document.addEventListener('DOMContentLoaded', () => {
  const MAXSKILLSROTATION = 5
  const skillItems = document
    .querySelectorAll('.info-skills__item')
    .forEach((skillItem) => {
      const randomRotation = Math.floor(
        Math.random() * MAXSKILLSROTATION * 2 - MAXSKILLSROTATION
      )
      skillItem.style.transform = `rotate(${randomRotation}deg)`
    })

  const leftHand = document.getElementById('js-hand-left')
  const rightHand = document.getElementById('js-hand-right')
  const project = document.getElementById('js-project-hand')
  let projectHalfWidth = project.offsetWidth / 2

  window.addEventListener('resize', () => {
    projectHalfWidth = project.offsetWidth / 2
  })

  project.addEventListener('mousemove', (e) => {
    //Магические математические выкрутасы, чтобы анимация работала плавно. Скорее всего в формулах можно что-то сократить или написать нормально. Но я тупой.
    const relativeCoordX = Math.abs(
      Math.abs(projectHalfWidth - e.offsetX) - projectHalfWidth
    )
    const factorPi = Math.sin(
      (Math.PI * e.offsetX) / (project.offsetWidth * 2 - projectHalfWidth)
    )
    const factor = relativeCoordX / projectHalfWidth
    const x = (relativeCoordX - 450 * factor) * factorPi
    const y = e.offsetY - leftHand.offsetHeight / 2

    leftHand.style.setProperty('--x-position', x + 'px')
    leftHand.style.setProperty('--y-position', y + 25 + 'px')

    rightHand.style.setProperty('--x-position', x + 'px')
    rightHand.style.setProperty('--y-position', y + 'px')

    //Хотел добавить поворот руки при движении, но рендеринг браузера некорректно работает с backdrop-filter
    //const rotation = (1 - factor) * 20
    //leftHand.style.setProperty('--rotation', -rotation + 'deg')
    //rightHand.style.setProperty('--rotation', rotation + 'deg')
  })
})
