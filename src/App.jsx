import { useEffect, useMemo, useState } from "react"
import Controls from "./components/Controls"
import TextGrid from "./components/TextGrid"
import {
    BASE_STYLES,
    DEFAULT_REM_NUDGES,
    getPxNudges,
} from "./constants/typography"
import useFont from "./hooks/useFont"

function App() {
    const [rootFontSize, setRootFontSize] = useState("16")
    const [zoomLevel, setZoomLevel] = useState(1)
    const [customFont, setCustomFont] = useState(null)
    const [fontFamily, setFontFamily] = useState("Ubuntu Sans")
    const [currentStyle, setCurrentStyle] = useState("p")
    const [currentUnit, setCurrentUnit] = useState("px")
    const [pxNudgesStyles, setPxNudgeStyles] = useState(
        getPxNudges(rootFontSize)
    )
    const [remNudgesStyles, setRemNudgeStyles] = useState(DEFAULT_REM_NUDGES)

    useFont({
        customFont,
        rootFontSize,
        setFontFamily,
        setPxNudgeStyles,
        setRemNudgeStyles,
    })

    useEffect(() => {
        document.documentElement.style.fontSize = `${rootFontSize}px`
        if (!customFont) {
            setPxNudgeStyles(getPxNudges(rootFontSize))
        }
    }, [rootFontSize, customFont])

    const styles = useMemo(() => {
        const nudges = currentUnit === "px" ? pxNudgesStyles : remNudgesStyles
        return Object.entries(BASE_STYLES).reduce((acc, [key, style]) => {
            acc[key] = {
                ...style,
                fontFamily,
                ...nudges[key],
            }
            return acc
        }, {})
    }, [currentUnit, pxNudgesStyles, remNudgesStyles, fontFamily])

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
            <Controls
                currentUnit={currentUnit}
                setCurrentUnit={setCurrentUnit}
                currentStyle={currentStyle}
                styles={styles}
                setCurrentStyle={setCurrentStyle}
                rootFontSize={rootFontSize}
                handleRootFontSizeChange={handleRootFontSizeChange}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
                handleFontUpload={handleFontUpload}
                customFont={customFont}
                setCustomFont={setCustomFont}
                setFontFamily={setFontFamily}
            />
            <TextGrid
                zoomLevel={zoomLevel}
                styles={styles}
                currentStyle={currentStyle}
            />
        </div>
    )
}

export default App
