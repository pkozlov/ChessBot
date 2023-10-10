import { useMemo } from "react";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";

const useStyles = () => {
  const [colorScheme, themeParams] = useThemeParams();
  const style = useMemo(() => {
    return {
      text_color: themeParams.text_color || (colorScheme === "dark" ? "#ffffff" : "#000000"),
      button_color: themeParams.button_color || (colorScheme === "dark" ? "#2ea6ff" : "#2481cc"),
      bg_color: themeParams.bg_color || (colorScheme === "dark" ? "#18222d" : "#ffffff"),
    }
  }, [colorScheme, themeParams]);

  return style;
}

export default useStyles;
