export function projectCartoneInit() {
  const container = document.querySelector('.project--cartone')
  const instagramPostImage = document.getElementById(
    'js-cartone__instagram-post'
  )
  const things = document.getElementById('js-cartone__things')

  const projectCartoneOnScroll = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        projectCartoneParallax(entry)
        window.addEventListener('scroll', (e) => {
          projectCartoneParallax(entry)
        })
        window.addEventListener('resize', (e) => {
          projectCartoneParallax(entry)
        })
      }
    })
    function projectCartoneParallax(entry) {
      const ratio = Math.max(
        Math.min(
          (window.scrollY + window.innerHeight - entry.target.offsetTop) /
            entry.target.offsetTop,
          1
        ),
        0
      )

      things.style.opacity = 1
      things.style.setProperty(
        '--things-y',
        ratio * (-entry.target.offsetHeight / 4) + 'px'
      )
      things.style.setProperty('--things-rotation', ratio * -3 + 3 + 'deg')
      console.log(entry.target.offsetHeight)
      instagramPostImage.style.opacity = 1
      instagramPostImage.style.setProperty(
        '--instagram-post-y',
        ratio * (-entry.target.offsetHeight / 1.5) + 'px'
      )
      instagramPostImage.style.setProperty(
        '--instagram-post-rotation',
        ratio * 15 - 10 + 'deg'
      )
    }
  }

  const target = container
  const observer = new IntersectionObserver(projectCartoneOnScroll, {
    threshold: 0,
  })
  observer.observe(target)
}
