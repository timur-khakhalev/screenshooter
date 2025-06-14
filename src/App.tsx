import { useState, useRef, useEffect } from "react";
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
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editorState, setEditorState] = useState({
    padding: 64,
    cornerRadius: 16,
    shadow: 8,
    backgroundType: "gradient" as "color" | "gradient" | "image",
    backgroundColor: "#3b82f6",
    backgroundGradient: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    backgroundImageUrl:
      "https://512pixels.net/wp-content/uploads/2025/06/15-Sequoia-Light-thumbnail.jpg",
    backgroundBlur: 2,
  });

  const handleStateChange = (
    key: keyof typeof editorState,
    value: number | string | boolean
  ) => {
    setEditorState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setScreenshot(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result as string;
              setScreenshot(result);
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const onDownload = async () => {
    if (!previewRef.current) return;

    try {
      // Set export state to temporarily scale to 1
      setIsExporting(true);

      // Very brief wait for re-render
      await new Promise((resolve) => setTimeout(resolve, 50));

      const dataUrl = await htmlToImage.toPng(previewRef.current);
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      // Reset export state
      setIsExporting(false);
    }
  };

  const onCopy = async () => {
    if (!previewRef.current) return;

    try {
      // Set export state to temporarily scale to 1
      setIsExporting(true);

      // Very brief wait for re-render
      await new Promise((resolve) => setTimeout(resolve, 50));

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
    } finally {
      // Reset export state
      setIsExporting(false);
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
    <div className="flex h-screen bg-background">
      {/* Sidebar for Editor Controls */}
      <aside className="w-72 bg-card border-r border-border overflow-y-auto">
        <div className="p-4">
          {/* Logo and Title Header */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">
                Screenshooter
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 mb-4">
            <Button onClick={takeScreenshot} className="w-full" size="sm">
              Take Screenshot
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
              >
                Upload
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Focus the document to ensure paste events are captured
                  document.body.focus();
                }}
              >
                Paste
              </Button>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          {/* Editor Controls - Only show when screenshot exists */}
          {screenshot && (
            <div className="space-y-4">
              {/* Style Controls Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Padding Control */}
                <div className="space-y-1">
                  <Label htmlFor="padding-slider" className="text-xs">
                    Padding
                  </Label>
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
                <div className="space-y-1">
                  <Label htmlFor="corner-radius-slider" className="text-xs">
                    Radius
                  </Label>
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
                <div className="space-y-1">
                  <Label htmlFor="shadow-slider" className="text-xs">
                    Shadow
                  </Label>
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
                    {editorState.shadow}
                  </div>
                </div>

                {/* Background Blur Control */}
                <div className="space-y-1">
                  <Label htmlFor="blur-slider" className="text-xs">
                    Blur
                  </Label>
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
              </div>

              {/* Background Controls */}
              <div className="space-y-2">
                <Label className="text-xs">Background</Label>
                <Tabs
                  value={editorState.backgroundType}
                  onValueChange={(value) =>
                    handleStateChange("backgroundType", value)
                  }
                >
                  <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="color" className="text-xs">
                      Color
                    </TabsTrigger>
                    <TabsTrigger value="gradient" className="text-xs">
                      Gradient
                    </TabsTrigger>
                    <TabsTrigger value="image" className="text-xs">
                      Image
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="color" className="space-y-1 mt-2">
                    <input
                      type="color"
                      value={editorState.backgroundColor}
                      onChange={(e) =>
                        handleStateChange("backgroundColor", e.target.value)
                      }
                      className="w-full h-8 rounded border border-border cursor-pointer"
                    />
                  </TabsContent>

                  <TabsContent value="gradient" className="space-y-1 mt-2">
                    <div className="grid grid-cols-3 gap-1">
                      {GRADIENTS.map((gradient, index) => (
                        <div
                          key={index}
                          className={`h-8 rounded cursor-pointer border-2 transition-colors ${
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

                  <TabsContent value="image" className="space-y-1 mt-2">
                    <Input
                      id="image-url"
                      type="url"
                      placeholder="Enter image URL..."
                      value={editorState.backgroundImageUrl}
                      onChange={(e) =>
                        handleStateChange("backgroundImageUrl", e.target.value)
                      }
                      className="h-8 text-xs"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Export Buttons */}
              <div className="space-y-2">
                <Label className="text-xs">Export</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={onCopy} variant="outline" size="sm">
                    {copyButtonText}
                  </Button>
                  <Button onClick={onDownload} size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
        {screenshot ? (
          <div className="w-full h-full flex items-center justify-center">
            <Preview
              ref={previewRef}
              screenshot={screenshot}
              editorState={editorState}
              isExporting={isExporting}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {/* Logo */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">
                Screenshooter
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Capture, customize, and share beautiful screenshots with style
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-muted-foreground">
              Click "Take Screenshot" to get started
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
