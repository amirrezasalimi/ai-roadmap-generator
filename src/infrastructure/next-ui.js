const { createTheme } = require("@nextui-org/react");

export const defaultTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        background: '#000',
        primary: "#000",
        secondary: "",
        primaryText: '#fff',
        borderColor: "#001E38",
        inputBorderColor: "red",
        secondaryText: "#6987C6",
        tertiaryText: '#B0C4EF',
        gradient: "linear-gradient(268.81deg, #1A76DB 9.85%, #8A3BEF 99.6%)",
        gradientText: "268.81deg, #1A76DB 1.85%, #8A3BEF 80.6%"
      },
    },
  })
  