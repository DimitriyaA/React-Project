import { useEffect } from "react";

const MagicStars = () => {
    const stars = Array.from({ length: 500 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 5,
        left: Math.random() * 100,
        top: Math.random() * 100,
    }));

    return (
        <div className="star-field">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        animationDelay: `${star.delay}s`,
                        left: `${star.left}vw`,
                        top: `${star.top}vh`,
                    }}
                />
            ))}
            <div className="fog-effect" />
        </div>
    );
};

export default MagicStars;