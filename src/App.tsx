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
          {/* Logo and Title Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="w-5 h-5 text-white"
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
              <h2 className="text-xl font-semibold text-card-foreground">
                Screenshooter
              </h2>
              <p className="text-xs text-muted-foreground">Editor Controls</p>
            </div>
          </div>

          {/* Take Screenshot Button */}
          <Button onClick={takeScreenshot} className="w-full mb-3">
            Take Screenshot
          </Button>

          {/* Upload from File Button */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full mb-3"
          >
            Upload from File
          </Button>

          {/* Paste Image Button */}
          <Button
            variant="outline"
            className="w-full mb-6"
            onClick={() => {
              // Focus the document to ensure paste events are captured
              document.body.focus();
            }}
          >
            Paste Image (Ctrl+V)
          </Button>

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
