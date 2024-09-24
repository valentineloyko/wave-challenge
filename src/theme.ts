import { theme as antdTheme } from "antd";

export const getAntdTheme = (mode: "light" | "dark") => ({
  algorithm:
    mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
});
