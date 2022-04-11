document.addEventListener("DOMContentLoaded", () => {
    const MAXSKILLSROTATION = 7;
    const ROTATE = false;
    if (ROTATE) {
        const skillItems = document.querySelectorAll(".skills-item").forEach((skillItem) => {
            const randomRotation = Math.floor(Math.random() * MAXSKILLSROTATION * 2 - MAXSKILLSROTATION);
            console.log(randomRotation);
            skillItem.style.transform = `rotate(${randomRotation}deg)`;
        })
    }
}
) 