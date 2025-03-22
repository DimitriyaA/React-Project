import { useEffect } from "react";

const MagicStars = () => {
    useEffect(() => {
        // Създаване на поле за звездите
        const starField = document.createElement("div");
        starField.classList.add("star-field");
        document.body.appendChild(starField);

        // Добавяме 500 случайни звезди с ефекти
        for (let i = 0; i < 500; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.animationDelay = `${Math.random() * 5}s`;  // Забавяне на анимацията
            star.style.left = `${Math.random() * 100}vw`;         // Случайна позиция по ширина
            star.style.top = `${Math.random() * 100}vh`;           // Случайна позиция по височина
            starField.appendChild(star);
        }

        // Добавяне на мъгла ефект
        const fogEffect = document.createElement("div");
        fogEffect.classList.add("fog-effect");
        document.body.appendChild(fogEffect);
    }, []);

    return null;
};

export default MagicStars;
