export interface EditorState {
  padding: number;
  cornerRadius: number;
  shadow: number;
  backgroundType: "color" | "gradient" | "image";
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImageUrl: string;
  backgroundBlur: number;
}
