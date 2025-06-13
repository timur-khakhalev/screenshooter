import { useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Preview } from "./components/Preview";
import { GRADIENTS } from "./lib/constants";
import * as htmlToImage from "html-to-image";

function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy Image");
  const previewRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState({
    padding: 64,
    cornerRadius: 16,
    shadow: 8,
    backgroundType: "color" as "color" | "gradient" | "image",
    backgroundColor: "#3b82f6",
    backgroundGradient: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    backgroundImageUrl:
      "https://512pixels.net/wp-content/uploads/2025/06/15-Sequoia-Light-thumbnail.jpg",
    backgroundBlur: 0,
  });

  const handleStateChange = (
    key: keyof typeof editorState,
    value: number | string | boolean
  ) => {
    setEditorState((prevState) => ({ ...prevState, [key]: value }));
  };

  const onDownload = async () => {
    if (!previewRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(previewRef.current);
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const onCopy = async () => {
    if (!previewRef.current) return;

    try {
      const blob = await htmlToImage.toBlob(previewRef.current);
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopyButtonText("Copied!");
        setTimeout(() => setCopyButtonText("Copy Image"), 2000);
      }
    } catch (error) {
      console.error("Error copying image:", error);
    }
  };

  const takeScreenshot = async () => {
    try {
      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Create a video element to capture the frame
      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.muted = true;

      // Wait for video to load metadata
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve();
        };
      });

      // Wait for the first frame to be available
      await new Promise<void>((resolve) => {
        video.onplaying = () => {
          resolve();
        };
      });

      // Create canvas and capture the frame
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to data URL
        const dataUrl = canvas.toDataURL("image/png");
        setScreenshot(dataUrl);
      }

      // Stop all tracks to turn off screen sharing
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      // Handle the error gracefully - user might have cancelled or denied permission
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for Editor Controls */}
      <aside className="w-80 bg-card border-r border-border overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Editor Controls
          </h2>

          {/* Take Screenshot Button */}
          <Button onClick={takeScreenshot} className="w-full mb-6">
            Take Screenshot
          </Button>

          {/* Editor Controls - Only show when screenshot exists */}
          {screenshot && (
            <div className="space-y-6">
              {/* Padding Control */}
              <div className="space-y-2">
                <Label htmlFor="padding-slider">Padding</Label>
                <Slider
                  id="padding-slider"
                  defaultValue={[editorState.padding]}
                  max={128}
                  step={1}
                  onValueChange={(value: number[]) =>
                    handleStateChange("padding", value[0])
                  }
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  {editorState.padding}px
                </div>
              </div>

              {/* Corner Radius Control */}
              <div className="space-y-2">
                <Label htmlFor="corner-radius-slider">Corner Radius</Label>
                <Slider
                  id="corner-radius-slider"
                  defaultValue={[editorState.cornerRadius]}
                  max={64}
                  step={1}
                  onValueChange={(value: number[]) =>
                    handleStateChange("cornerRadius", value[0])
                  }
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  {editorState.cornerRadius}px
                </div>
              </div>

              {/* Shadow Control */}
              <div className="space-y-2">
                <Label htmlFor="shadow-slider">Shadow</Label>
                <Slider
                  id="shadow-slider"
                  defaultValue={[editorState.shadow]}
                  max={40}
                  step={1}
                  onValueChange={(value: number[]) =>
                    handleStateChange("shadow", value[0])
                  }
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  Intensity: {editorState.shadow}
                </div>
              </div>

              {/* Background Blur Control */}
              <div className="space-y-2">
                <Label htmlFor="blur-slider">Background Blur</Label>
                <Slider
                  id="blur-slider"
                  defaultValue={[editorState.backgroundBlur]}
                  max={20}
                  step={1}
                  onValueChange={(value: number[]) =>
                    handleStateChange("backgroundBlur", value[0])
                  }
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  {editorState.backgroundBlur}px
                </div>
              </div>

              {/* Background Controls */}
              <div className="space-y-2">
                <Label>Background</Label>
                <Tabs
                  value={editorState.backgroundType}
                  onValueChange={(value) =>
                    handleStateChange("backgroundType", value)
                  }
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="color">Color</TabsTrigger>
                    <TabsTrigger value="gradient">Gradient</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                  </TabsList>

                  <TabsContent value="color" className="space-y-2">
                    <input
                      type="color"
                      value={editorState.backgroundColor}
                      onChange={(e) =>
                        handleStateChange("backgroundColor", e.target.value)
                      }
                      className="w-full h-10 rounded border border-border cursor-pointer"
                    />
                  </TabsContent>

                  <TabsContent value="gradient" className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {GRADIENTS.map((gradient, index) => (
                        <div
                          key={index}
                          className={`h-12 rounded cursor-pointer border-2 transition-colors ${
                            editorState.backgroundGradient === gradient.value
                              ? "border-primary"
                              : "border-transparent hover:border-primary"
                          }`}
                          style={{ background: gradient.value }}
                          onClick={() =>
                            handleStateChange(
                              "backgroundGradient",
                              gradient.value
                            )
                          }
                          title={gradient.name}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="image" className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="image-url">Image URL</Label>
                      <Input
                        id="image-url"
                        type="url"
                        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        value={editorState.backgroundImageUrl}
                        onChange={(e) =>
                          handleStateChange(
                            "backgroundImageUrl",
                            e.target.value
                          )
                        }
                      />
                      {editorState.backgroundImageUrl && (
                        <div className="text-xs text-muted-foreground">
                          Preview: The image will be used as background when you
                          switch to image mode
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Export Buttons */}
              <div className="space-y-2">
                <Label>Export</Label>
                <div className="space-y-2">
                  <Button onClick={onCopy} variant="outline" className="w-full">
                    {copyButtonText}
                  </Button>
                  <Button onClick={onDownload} className="w-full">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 overflow-auto">
        {screenshot ? (
          <div className="w-full h-full min-w-fit min-h-fit">
            <Preview
              ref={previewRef}
              screenshot={screenshot}
              editorState={editorState}
            />
          </div>
        ) : (
          <div className="text-muted-foreground text-lg">
            Your screenshot will appear here
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
