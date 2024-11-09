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

const pxNudgesStyles = {
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

const remNudgesStyles = {
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

export { pxNudgesStyles, remNudgesStyles }
