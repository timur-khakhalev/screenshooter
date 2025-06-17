import { forwardRef } from "react";
import type { EditorState } from "@/types";
import { BlurryBackground } from "./BlurryBackground";

interface PreviewProps {
  screenshot: string;
  editorState: EditorState;
  scale?: number;
  isExporting?: boolean;
}


const getShadowStyle = (shadowValue: number): React.CSSProperties => {
  if (shadowValue === 0) return {};

  // Create custom shadow based on the shadow value
  const shadowIntensity = shadowValue / 40; // Normalize to 0-1
  const shadowBlur = shadowValue * 2;
  //const shadowSpread = shadowValue * 0.5;

  return {
    boxShadow: `0 ${shadowValue}px ${shadowBlur}px rgba(0, 0, 0, ${
      0.1 + shadowIntensity * 0.4
    })`,
  };
};

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ screenshot, editorState, scale = 0.8, isExporting }, ref) => {
    const actualScale = isExporting ? 1 : scale;

    return (
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "fit-content",
          height: "fit-content",
          transform: `scale(${actualScale})`,
          transformOrigin: "center",
        }}
      >
        <div
          ref={ref}
          className="relative flex items-center justify-center rounded-lg overflow-hidden"
          style={{
            width: "auto",
            height: "auto",
          }}
        >
          {/* Background Layer with Blur */}
          <BlurryBackground editorState={editorState} />

          {/* Content Layer with Screenshot */}
          <div
            className="relative z-10"
            style={{ padding: `${editorState.padding}px` }}
          >
            <img
              src={screenshot}
              alt="Captured screenshot"
              className="object-contain"
              style={{
                borderRadius: `${editorState.cornerRadius}px`,
                ...getShadowStyle(editorState.shadow),
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

Preview.displayName = "Preview";
