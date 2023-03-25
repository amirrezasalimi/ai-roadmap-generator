const { createTheme } = require("@nextui-org/react");

export const defaultTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        background: '#0C0C0C',
        paper: '#141414',
        primary: "#141414",
        secondary: "#343434",
        primaryText: '#fff',
        borderColor: "#343434",
        secondaryText: "#6987C6",
        tertiaryText: '#B0C4EF',
        gradient: "linear-gradient(268.81deg, #1A76DB 9.85%, #8A3BEF 99.6%)",
        gradientText: "268.81deg, #1A76DB 1.85%, #8A3BEF 80.6%",
      },
      lineHeights: {
        xs: 1,
        sm: 1.25,
        base: 1.25,
        md: 1.25,
        lg: 1.25,
        xl: 1.25,
      }
    },
  })
