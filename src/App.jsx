import { load } from "opentype.js"
import { useEffect, useRef, useState } from "react"

function App() {
    const [rootFontSize, setRootFontSize] = useState("16")
    const [zoomLevel, setZoomLevel] = useState(1)
    const [customFont, setCustomFont] = useState(null)
    const [fontFamily, setFontFamily] = useState("Ubuntu Sans")
    const [customFontUrl, setCustomFontUrl] = useState(null)
    const [currentStyle, setCurrentStyle] = useState("p")
    const [currentUnit, setCurrentUnit] = useState("rem")
    const baseStyles = {
        xSmall: {
            fontFamily,
            fontSize: "0.875rem",
            lineHeight: "1.5rem",
            label: "Extra Small",
        },
        small: {
            fontFamily,
            fontSize: "0.75rem",
            lineHeight: "1.5rem",
            label: "Small",
        },
        p: {
            fontFamily,
            fontSize: "1rem",
            lineHeight: "1.5rem",
            label: "Paragraph",
        },
        h6: {
            fontFamily,
            fontSize: "1rem",
            lineHeight: "1.5rem",
            label: "Heading 6",
        },
        h5: {
            fontFamily,
            fontSize: "1rem",
            lineHeight: "1.5rem",
            label: "Heading 5",
        },
        h4: {
            fontFamily,
            fontSize: "1.5rem",
            lineHeight: "2rem",
            label: "Heading 4",
        },
        h3: {
            fontFamily,
            fontSize: "1.5rem",
            lineHeight: "2rem",
            label: "Heading 3",
        },
        h2: {
            fontFamily,
            fontSize: "2.5rem",
            lineHeight: "3rem",
            label: "Heading 2",
        },
        h1: {
            fontFamily,
            fontSize: "2.5rem",
            lineHeight: "3rem",
            label: "Heading 1",
        },
        display: {
            fontFamily,
            fontSize: "5rem",
            lineHeight: "5.5rem",
            label: "Display",
        },
    }

    const pxNudges = {
        xSmall: {
            ...baseStyles.xSmall,
            paddingTop: "4px",
            marginBottom: rootFontSize === "16" ? "4px" : "5px",
        },
        small: {
            ...baseStyles.small,
            paddingTop: "1px",
            marginBottom: rootFontSize === "16" ? "3px" : "4px",
        },
        p: {
            ...baseStyles.p,
            paddingTop: rootFontSize === "16" ? "7px" : "8px",
            marginBottom: "1px",
        },
        h6: {
            ...baseStyles.h6,
            paddingTop: "7px",
            marginBottom: rootFontSize === "16" ? "1px" : "2px",
        },
        h5: {
            ...baseStyles.h5,
            paddingTop: "7px",
            marginBottom: rootFontSize === "16" ? "1px" : "2px",
        },
        h4: {
            ...baseStyles.h4,
            paddingTop: "0px",
            marginBottom: "0px",
        },
        h3: {
            ...baseStyles.h3,
            paddingTop: "0px",
            marginBottom: "0px",
        },
        h2: {
            ...baseStyles.h2,
            paddingTop: rootFontSize === "16" ? "2px" : "3px",
            marginBottom: "6px",
        },
        h1: {
            ...baseStyles.h1,
            paddingTop: rootFontSize === "16" ? "2px" : "3px",
            marginBottom: "6px",
        },
        display: {
            ...baseStyles.display,
            paddingTop: "1px",
            marginBottom: rootFontSize === "16" ? "7px" : "8px",
        },
    }

    const remNudges = {
        xSmall: {
            ...baseStyles.xSmall,
            paddingTop: "0.25rem",
            marginBottom: "0.25rem",
        },
        small: {
            ...baseStyles.small,
            paddingTop: "0.0625rem",
            marginBottom: "0.1875rem",
        },
        p: {
            ...baseStyles.p,
            paddingTop: "0.4375rem",
            marginBottom: "0.0625rem",
        },
        h6: {
            ...baseStyles.h6,
            paddingTop: "0.4375rem",
            marginBottom: "0.0625rem",
        },
        h5: {
            ...baseStyles.h5,
            paddingTop: "0.4375rem",
            marginBottom: "0.0625rem",
        },
        h4: {
            ...baseStyles.h4,
            paddingTop: "0rem",
            marginBottom: "0rem",
        },
        h3: {
            ...baseStyles.h3,
            paddingTop: "0rem",
            marginBottom: "0rem",
        },
        h2: {
            ...baseStyles.h2,
            paddingTop: "0.125rem",
            marginBottom: "0.375rem",
        },
        h1: {
            ...baseStyles.h1,
            paddingTop: "0.125rem",
            marginBottom: "0.375rem",
        },
        display: {
            ...baseStyles.display,
            paddingTop: "0.0625rem",
            marginBottom: "0.4375rem",
        },
    }

    const [pxNudgesStyles, setPxNudgeStyles] = useState(pxNudges)
    const [remNudgesStyles, setRemNudgeStyles] = useState(remNudges)

    const styles = currentUnit === "px" ? pxNudgesStyles : remNudgesStyles
    const styleElementRef = useRef(null)

    function nextDivisibleByHalfRem(num, rootFontSize) {
        const halfRemInPixels = rootFontSize / 2
        let remainder = num % halfRemInPixels
        if (remainder === 0) {
            return 0
        } else {
            return halfRemInPixels - remainder
        }
    }

    function calculateStylesForFont(baseStyles, metrics, currentRootFontSize) {
        const pxStyles = {}
        const remStyles = {}

        Object.entries(baseStyles).forEach(([key, style]) => {
            const fontSize = parseFloat(style.fontSize) * currentRootFontSize
            const lineHeight =
                parseFloat(style.lineHeight) * currentRootFontSize

            const baselinePos =
                lineHeight -
                (metrics.intrinsicLineHeightScale * fontSize) / 2 +
                fontSize * metrics.ascenderScale

            const addOnTop = nextDivisibleByHalfRem(
                baselinePos,
                parseInt(currentRootFontSize)
            )
            const addOnBottom = nextDivisibleByHalfRem(
                lineHeight + addOnTop,
                parseInt(currentRootFontSize)
            )

            // Create px version
            pxStyles[key] = {
                ...style,
                paddingTop: `${addOnTop}px`,
                marginBottom: `${addOnBottom}px`,
            }

            // Create rem version
            remStyles[key] = {
                ...style,
                paddingTop: `${addOnTop / currentRootFontSize}rem`,
                marginBottom: `${addOnBottom / currentRootFontSize}rem`,
            }
        })
        console.log(pxStyles, remStyles)

        return { pxStyles, remStyles }
    }

    useEffect(() => {
        // Apply root font size whenever it changes
        document.documentElement.style.fontSize = `${rootFontSize}px`
    }, [rootFontSize])

    useEffect(() => {
        const loadFont = async (file) => {
            try {
                const fontUrl = URL.createObjectURL(file)
                setCustomFontUrl(fontUrl)

                const font = await load(fontUrl)
                console.log("OpenType.js font object:", font)

                const metrics = {
                    ascenderScale: font.ascender / font.unitsPerEm,
                    intrinsicLineHeightScale:
                        (font.ascender - font.descender) / font.unitsPerEm,
                }

                // Calculate both px and rem styles
                const { pxStyles, remStyles } = calculateStylesForFont(
                    baseStyles,
                    metrics,
                    parseInt(rootFontSize)
                )

                // Update both style states
                setPxNudgeStyles(pxStyles)
                setRemNudgeStyles(remStyles)

                // Clean up previous style element
                if (styleElementRef.current) {
                    document.head.removeChild(styleElementRef.current)
                    styleElementRef.current = null
                }

                // Create and inject @font-face
                const style = document.createElement("style")
                style.textContent = `
                    @font-face {
                        font-family: 'CustomFont';
                        src: url('${fontUrl}') format('truetype');
                    }
                `
                document.head.appendChild(style)
                styleElementRef.current = style
                setFontFamily("CustomFont")
            } catch (err) {
                console.error("Error loading font:", err)
                alert("Error loading font: " + err.message)
            }
        }

        if (customFontUrl) {
            URL.revokeObjectURL(customFontUrl)
        }

        if (customFont) {
            loadFont(customFont)
            return () => {
                if (styleElementRef.current) {
                    document.head.removeChild(styleElementRef.current)
                    styleElementRef.current = null
                }
                if (customFontUrl) {
                    URL.revokeObjectURL(customFontUrl)
                }
            }
        } else {
            // Reset to default Ubuntu Sans styles
            setFontFamily("Ubuntu Sans")
            setPxNudgeStyles(pxNudges)
            setRemNudgeStyles(remNudges)
        }
    }, [customFont, rootFontSize])

    function handleFontUpload(e) {
        const file = e.target.files[0]
        if (file && file.type === "font/ttf") {
            setCustomFont(file)
        } else {
            alert("Please upload a valid TTF font file")
            e.target.value = null
        }
    }

    function handleRootFontSizeChange(e) {
        setRootFontSize(e.target.value)
    }

    return (
        <div>
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                    }}
                >
                    <label>Should nudges be defined in px or rem?</label>
                    <select
                        value={currentUnit}
                        onChange={(e) => setCurrentUnit(e.target.value)}
                    >
                        <option value="rem">rem</option>
                        <option value="px">px</option>
                    </select>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                    }}
                >
                    <label>Which text style do you want to test?</label>
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
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                    }}
                >
                    <label>What should be the root font size?</label>
                    <select
                        value={rootFontSize}
                        onChange={handleRootFontSizeChange}
                    >
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                    </select>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                    }}
                >
                    <label>Zoom Level: {(zoomLevel * 100).toFixed(0)}%</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={zoomLevel}
                        onChange={(e) => setZoomLevel(Number(e.target.value))}
                        style={{ width: "100%" }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                    }}
                >
                    <label>Upload Custom Font (TTF)</label>
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
                </div>
            </div>

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
        </div>
    )
}

export default App
