import React, { useMemo } from "react";
import type { EditorState } from "@/types";

interface BlurryBackgroundProps {
  editorState: EditorState;
}

export const BlurryBackground: React.FC<BlurryBackgroundProps> = ({ editorState }) => {
  const style = useMemo(() => {
    const blur = editorState.backgroundBlur;
    const offset = blur * 2;

    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: -offset,
      bottom: -offset,
      left: -offset,
      right: -offset,
      willChange: "filter",
      filter: blur > 0 ? `blur(${blur}px)` : "none",
    };

    switch (editorState.backgroundType) {
      case "gradient":
        return {
          ...baseStyle,
          background: editorState.backgroundGradient,
        } as React.CSSProperties;
      case "image":
        return {
          ...baseStyle,
          backgroundImage: editorState.backgroundImageUrl
            ? `url(${editorState.backgroundImageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        } as React.CSSProperties;
      case "color":
      default:
        return {
          ...baseStyle,
          backgroundColor: editorState.backgroundColor,
        } as React.CSSProperties;
    }
  }, [editorState]);

  return <div style={style} />;
};
