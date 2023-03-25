import { globalCss } from '@nextui-org/react';

const globalStyles = globalCss({
    '.card': {
        display: "flex !important",
        flexDirection: "column !important",
        gap: "12px !important",
        padding: "16px !important",
        borderRadius: "10px !important",
        height: "100% !important",
        border: `2px solid #343434`,
        borderWidth: "2px !important",
        background: "$paper !important"
    },
    '.react-flow__attribution': {
        background: "$background !important"
    }
});

export default globalStyles;