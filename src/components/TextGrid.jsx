export default function TextGrid({ zoomLevel, styles, currentStyle }) {
    return (
        <div
            className="u-baseline-grid"
            style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top left",
                width: `${100 / zoomLevel}%`,
            }}
        >
            {Array.from({ length: 5000 }, (_, index) => (
                <div key={index} style={styles[currentStyle]}>
                    Hello world
                </div>
            ))}
        </div>
    )
}
