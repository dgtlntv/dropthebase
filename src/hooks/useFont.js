import { load } from "opentype.js"
import { useEffect, useRef } from "react"
import {
    BASE_STYLES,
    DEFAULT_REM_NUDGES,
    getPxNudges,
} from "../constants/typography"
import { calculateStylesForFont } from "../utils/fontUtils"

export default function useFont({
    customFont,
    rootFontSize,
    setFontFamily,
    setPxNudgeStyles,
    setRemNudgeStyles,
}) {
    const styleElementRef = useRef(null)

    useEffect(() => {
        const loadFont = async (file) => {
            try {
                const fontUrl = URL.createObjectURL(file)

                const font = await load(fontUrl)
                const metrics = {
                    ascenderScale: font.ascender / font.unitsPerEm,
                    intrinsicLineHeightScale:
                        (font.ascender - font.descender) / font.unitsPerEm,
                }

                const { pxStyles, remStyles } = calculateStylesForFont(
                    BASE_STYLES,
                    metrics,
                    parseInt(rootFontSize)
                )

                if (styleElementRef.current) {
                    document.head.removeChild(styleElementRef.current)
                }

                const style = document.createElement("style")
                style.textContent = `
                    @font-face {
                        font-family: 'CustomFont';
                        src: url('${fontUrl}') format('truetype');
                    }
                `
                document.head.appendChild(style)
                styleElementRef.current = style

                setPxNudgeStyles(pxStyles)
                setRemNudgeStyles(remStyles)
                setFontFamily("CustomFont")

                return fontUrl
            } catch (err) {
                console.error("Error loading font:", err)
                alert("Error loading font: " + err.message)
                return null
            }
        }

        if (customFont) {
            loadFont(customFont)
        } else {
            setFontFamily("Ubuntu Sans")
            setPxNudgeStyles(getPxNudges(rootFontSize))
            setRemNudgeStyles(DEFAULT_REM_NUDGES)
        }

        return () => {
            if (styleElementRef.current) {
                document.head.removeChild(styleElementRef.current)
                styleElementRef.current = null
            }
        }
    }, [
        customFont,
        rootFontSize,
        setFontFamily,
        setPxNudgeStyles,
        setRemNudgeStyles,
    ])
}
