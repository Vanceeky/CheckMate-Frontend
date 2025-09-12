"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { openDB, IDBPDatabase } from "idb";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Page {
  id: number;
  image: string;
  timestamp?: number;
}

interface ScannerProps {
  onPagesUploaded?: (pages: Page[]) => void;
}

const DB_NAME = "CheckMateScanner";
const STORE_NAME = "offlinePages";

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

const Scanner: React.FC<ScannerProps> = ({ onPagesUploaded }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedPages, setCapturedPages] = useState<Page[]>([]);
  const [db, setDb] = useState<IDBPDatabase | null>(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    initDB().then(setDb);
  }, []);

  // Load OpenCV dynamically
  useEffect(() => {
    if ((window as any).cv?.Mat) {
      console.log("OpenCV already loaded");
      return;
    }

    const scriptId = "opencv-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://docs.opencv.org/4.x/opencv.js";
      script.async = true;
      script.onload = () => console.log("OpenCV loaded");
      document.body.appendChild(script);
    }
  }, []);

  // Improved webcam readiness detection
  useEffect(() => {
    const checkVideoReady = () => {
      const video = webcamRef.current?.video;
      if (video && video.videoWidth > 0 && video.videoHeight > 0) {
        setIsWebcamReady(true);
        setCameraError(null);
      } else {
        setTimeout(checkVideoReady, 500);
      }
    };

    const timer = setTimeout(checkVideoReady, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle camera errors
  const handleUserMediaError = (error: string | DOMException) => {
    console.error("Camera error:", error);
    setCameraError("Camera access denied or not available. Please check permissions.");
    setIsWebcamReady(false);
  };

  // --- OpenCV helper functions ---
  const preprocessImage = (imageData: ImageData) => {
    const src = cv.matFromImageData(imageData);
    const gray = new cv.Mat();
    const dst = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
    cv.Canny(gray, dst, 75, 200);
    gray.delete();
    src.delete();
    return dst;
  };

  const findPaperContour = (edges: any) => {
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    let maxArea = 0;
    let maxContour: any = null;
    for (let i = 0; i < contours.size(); i++) {
      const cnt = contours.get(i);
      const area = cv.contourArea(cnt);
      if (area > maxArea) {
        maxArea = area;
        maxContour = cnt;
      }
    }
    hierarchy.delete();
    contours.delete();
    return maxContour;
  };

  const deskewAndCrop = (imageData: ImageData) => {
    const src = cv.matFromImageData(imageData);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
    cv.Canny(gray, gray, 50, 150);

    const contour = findPaperContour(gray);
    let dst = src.clone();
    if (contour) {
      const rect = cv.boundingRect(contour);
      dst = src.roi(rect);
    }

    const canvas = document.createElement("canvas");
    canvas.width = dst.cols;
    canvas.height = dst.rows;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const imgData = new ImageData(new Uint8ClampedArray(dst.data), dst.cols, dst.rows);
    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");

    gray.delete();
    src.delete();
    dst.delete();

    return dataUrl;
  };

  // --- Capture page ---
  const capturePage = async () => {
    const video = webcamRef.current?.video;
    if (!video || !isWebcamReady) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const processed = deskewAndCrop(imageData);
    const page: Page = { id: Date.now(), image: processed };

    setCapturedPages((prev) => [...prev, page]);
    if (db) await db.add(STORE_NAME, { ...page, timestamp: Date.now() });
  };

  // --- Drag & Drop Reorder ---
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(capturedPages);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setCapturedPages(items);
  };

  // --- Remove page ---
  const removePage = async (index: number) => {
    const page = capturedPages[index];
    setCapturedPages((prev) => prev.filter((_, i) => i !== index));
    if (db && page.id) await db.delete(STORE_NAME, page.id);
  };

  // --- Upload pages ---
  const uploadPages = async () => {
    if (!db) return;
    const allPages = await db.getAll(STORE_NAME);
    for (const page of allPages) await db.delete(STORE_NAME, page.id);
    setCapturedPages([]);
    if (onPagesUploaded) onPagesUploaded(allPages);
  };

  // --- Auto-upload when back online ---
  useEffect(() => {
    const handleOnline = () => uploadPages();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [db]);

  return (
    <div className="scanner-container relative w-full h-full">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
videoConstraints={{
  facingMode: { ideal: "environment" },
  width: { ideal: 1280 },
  height: { ideal: 720 }
}}
        className="w-full h-full"
        autoPlay
        playsInline
        mirrored={false}
        onUserMediaError={handleUserMediaError}
        onUserMedia={() => console.log("Camera accessed successfully")}
      />

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      {cameraError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-2">
          {cameraError}
        </div>
      )}

      <div className="controls mt-2 flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={capturePage}
          disabled={!isWebcamReady || !!cameraError}
        >
          {cameraError ? "Camera Error" : isWebcamReady ? "Capture Page" : "Loading Camera..."}
        </button>
        {capturedPages.length > 0 && (
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={uploadPages}>
            Finish / Upload
          </button>
        )}
      </div>

      {capturedPages.length > 0 && (
        <div className="mt-2">
          <h4>Captured Pages: {capturedPages.length}</h4>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="pages" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-2 overflow-x-auto mt-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {capturedPages.map((page, idx) => (
                    <Draggable key={page.id} draggableId={page.id.toString()} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative"
                        >
                          <img src={page.image} className="w-20 h-28 object-contain border" />
                          <button
                            className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
                            onClick={() => removePage(idx)}
                          >
                            X
                          </button>
                          <div className="absolute bottom-0 left-0 bg-black text-white text-xs px-1 rounded">
                            Page {idx + 1}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default Scanner;