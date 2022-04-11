document.addEventListener('DOMContentLoaded', () => {
  const MAXSKILLSROTATION = 5
  const ROTATE = true
  if (ROTATE) {
    const skillItems = document
      .querySelectorAll('.skills-item')
      .forEach((skillItem) => {
        const randomRotation = Math.floor(
          Math.random() * MAXSKILLSROTATION * 2 - MAXSKILLSROTATION
        )
        skillItem.style.transform = `rotate(${randomRotation}deg)`
      })
  }

  const leftHand = document.querySelector('.project-hover-left')
  const rightHand = document.querySelector('.project-hover-right')

  const project = document.querySelector('.project')
  let projectHalfWidth = project.offsetWidth / 2

  window.addEventListener('resize', () => {
    projectHalfWidth = project.offsetWidth / 2
  })

  project.addEventListener('mousemove', (e) => {
    const relativeCoordX = Math.abs(
      Math.abs(projectHalfWidth - e.offsetX) - projectHalfWidth
    )
    const factorX = relativeCoordX / projectHalfWidth
    const x = relativeCoordX - leftHand.offsetWidth * factorX
    const y = e.offsetY - leftHand.offsetHeight / 2

    leftHand.style.setProperty('--x-position', x + 'px')
    leftHand.style.setProperty('--y-position', y + 25 + 'px')
    rightHand.style.setProperty('--x-position', x + 'px')
    rightHand.style.setProperty('--y-position', y + 'px')
  })
})
