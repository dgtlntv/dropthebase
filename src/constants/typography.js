export const BASE_STYLES = {
    xSmall: {
        fontSize: "0.75rem",
        lineHeight: "1rem",
        label: "Extra Small",
    },
    small: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        label: "Small",
    },
    p: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        label: "Paragraph",
    },
    h6: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        label: "Heading 6",
    },
    h5: {
        fontSize: "1rem",
        lineHeight: "1.5rem",
        label: "Heading 5",
    },
    h4: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        label: "Heading 4",
    },
    h3: {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        label: "Heading 3",
    },
    h2: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
        label: "Heading 2",
    },
    h1: {
        fontSize: "2.5rem",
        lineHeight: "3rem",
        label: "Heading 1",
    },
    display: {
        fontSize: "5rem",
        lineHeight: "5.5rem",
        label: "Display",
    },
}

// Function to get px nudges based on root font size
export function getPxNudges(rootFontSize) {
    return {
        xSmall: {
            paddingTop: rootFontSize === "16" ? "4px" : "5px",
            marginBottom: "4px",
        },
        small: {
            paddingTop: "2px",
            marginBottom: rootFontSize === "16" ? "2px" : "2.5px",
        },
        p: {
            paddingTop: rootFontSize === "16" ? "7px" : "8px",
            marginBottom: "1px",
        },
        h6: {
            paddingTop: "7px",
            marginBottom: rootFontSize === "16" ? "1px" : "2px",
        },
        h5: {
            paddingTop: "7px",
            marginBottom: rootFontSize === "16" ? "1px" : "2px",
        },
        h4: {
            paddingTop: "0px",
            marginBottom: "0px",
        },
        h3: {
            paddingTop: "0px",
            marginBottom: "0px",
        },
        h2: {
            paddingTop: rootFontSize === "16" ? "2px" : "3px",
            marginBottom: "6px",
        },
        h1: {
            paddingTop: rootFontSize === "16" ? "2px" : "3px",
            marginBottom: "6px",
        },
        display: {
            paddingTop: "1px",
            marginBottom: rootFontSize === "16" ? "7px" : "8px",
        },
    }
}

export const DEFAULT_REM_NUDGES = {
    xSmall: { paddingTop: "0.25rem", marginBottom: "0.25rem" },
    small: { paddingTop: "0.125rem", marginBottom: "0.125rem" },
    p: { paddingTop: "0.4375rem", marginBottom: "0.0625rem" },
    h6: { paddingTop: "0.4375rem", marginBottom: "0.0625rem" },
    h5: { paddingTop: "0.4375rem", marginBottom: "0.0625rem" },
    h4: { paddingTop: "0rem", marginBottom: "0rem" },
    h3: { paddingTop: "0rem", marginBottom: "0rem" },
    h2: { paddingTop: "0.125rem", marginBottom: "0.375rem" },
    h1: { paddingTop: "0.125rem", marginBottom: "0.375rem" },
    display: { paddingTop: "0.0625rem", marginBottom: "0.4375rem" },
}
