import ControlGroup from "./ControlGroup"

export default function Controls({
    currentUnit,
    setCurrentUnit,
    currentStyle,
    styles,
    setCurrentStyle,
    rootFontSize,
    handleRootFontSizeChange,
    zoomLevel,
    setZoomLevel,
    handleFontUpload,
    customFont,
    setCustomFont,
    setFontFamily,
}) {
    return (
        <div
            style={{
                display: "flex",
                gap: "25px",
                backgroundColor: "white",
                position: "sticky",
                left: "0px",
                top: "0px",
                padding: "25px",
                zIndex: "999",
                fontSize: "16px",
            }}
        >
            <ControlGroup label="Should nudges be defined in px or rem?">
                <select
                    value={currentUnit}
                    onChange={(e) => setCurrentUnit(e.target.value)}
                >
                    <option value="px">px</option>
                    <option value="rem">rem</option>
                </select>
            </ControlGroup>

            <ControlGroup label="Which text style do you want to test?">
                <select
                    value={currentStyle}
                    onChange={(e) => setCurrentStyle(e.target.value)}
                >
                    {Object.entries(styles).map(([key, style]) => (
                        <option key={key} value={key}>
                            {style.label}
                        </option>
                    ))}
                </select>
            </ControlGroup>

            <ControlGroup label="What should be the root font size?">
                <select
                    value={rootFontSize}
                    onChange={handleRootFontSizeChange}
                >
                    <option value="16">16px</option>
                    <option value="18">18px</option>
                </select>
            </ControlGroup>

            <ControlGroup
                label={`Zoom Level: ${(zoomLevel * 100).toFixed(0)}%`}
            >
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    style={{ width: "100%" }}
                />
            </ControlGroup>

            <ControlGroup label="Upload Custom Font (TTF)">
                <input
                    type="file"
                    accept=".ttf"
                    onChange={handleFontUpload}
                    style={{ marginTop: "8px" }}
                />
                {customFont && (
                    <button
                        onClick={() => {
                            setCustomFont(null)
                            setFontFamily(null)
                        }}
                        style={{ marginTop: "8px" }}
                    >
                        Reset to Ubuntu Sans
                    </button>
                )}
            </ControlGroup>
        </div>
    )
}
