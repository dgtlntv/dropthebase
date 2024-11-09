export function nextDivisibleByHalfRem(num, rootFontSize) {
    const halfRemInPixels = rootFontSize / 2
    let remainder = num % halfRemInPixels
    return remainder === 0 ? 0 : halfRemInPixels - remainder
}

export function calculateStylesForFont(
    baseStyles,
    metrics,
    currentRootFontSize
) {
    const pxStyles = {}
    const remStyles = {}

    Object.entries(baseStyles).forEach(([key, style]) => {
        const fontSize = parseFloat(style.fontSize) * currentRootFontSize
        const lineHeight = parseFloat(style.lineHeight) * currentRootFontSize

        /** 
        const baselinePos =
            lineHeight -
            (metrics.intrinsicLineHeightScale * fontSize) / 2 +
            fontSize * metrics.ascenderScale
        */

        const baselinePos =
            Math.floor(
                Math.round(
                    lineHeight -
                        Math.round(metrics.intrinsicLineHeightScale * fontSize)
                ) / 2
            ) + Math.round(fontSize * metrics.ascenderScale)

        const addOnTop = nextDivisibleByHalfRem(
            baselinePos,
            parseInt(currentRootFontSize)
        )
        const addOnBottom = nextDivisibleByHalfRem(
            lineHeight + addOnTop,
            parseInt(currentRootFontSize)
        )

        pxStyles[key] = {
            ...style,
            paddingTop: `${addOnTop}px`,
            marginBottom: `${addOnBottom}px`,
        }

        remStyles[key] = {
            ...style,
            paddingTop: `${addOnTop / currentRootFontSize}rem`,
            marginBottom: `${addOnBottom / currentRootFontSize}rem`,
        }
    })

    return { pxStyles, remStyles }
}
