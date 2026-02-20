import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  AlertCircle,
  FileText,
  Brain,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";

interface TumorResult {
  type: string;
  confidence: number;
  description: string;
}

const tumorTypes: Record<string, { description: string; color: string }> = {
  glioma: {
    description:
      "A type of tumor that occurs in the brain and spinal cord. Gliomas begin in the glial cells that surround and support nerve cells.",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  meningioma: {
    description:
      "A tumor that arises from the meninges — the membranes that surround your brain and spinal cord. Most meningiomas are noncancerous.",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  pituitary: {
    description:
      "A tumor that forms in the pituitary gland, a small gland located at the base of the brain. Most pituitary tumors are noncancerous.",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  no_tumor: {
    description: "No tumor detected in the provided MRI scan.",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
};

// 3D Brain model component
const BrainModel: React.FC = () => {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="relative w-48 h-48">
        {/* Brain 3D representation using CSS */}
        <div
          className="absolute w-40 h-32 bg-pink-200 rounded-full left-4 top-8 animate-pulse"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(15deg)" }}
        ></div>
        <div
          className="absolute w-36 h-28 bg-pink-300 rounded-full left-6 top-10 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="absolute w-32 h-24 bg-pink-400 rounded-full left-8 top-12 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div className="absolute w-full h-full flex items-center justify-center">
          <Brain className="h-24 w-24 text-pink-600" />
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TumorResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file type
      if (!selectedFile.type.includes("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Check file size (max 1GB)
      if (selectedFile.size > 1024 * 1024 * 1024) {
        setError("File size should be less than 1GB");
        return;
      }

      setFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select an image to upload");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      setResult({
        type: data.result.type,
        confidence: data.result.confidence,
        description: tumorTypes[data.result.type].description,
      });
    } catch (err: unknown) {
      const error = err as unknown as {
        response: { data: { message: string } };
      };
      setError(
        error.response?.data?.message ||
        "Failed to process the image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <Brain className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name || "User"}
            </h1>
          </div>

          <p className="text-gray-600 mb-4">
            Upload an MRI scan image to detect and classify brain tumors using
            our advanced AI model.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  For best results, upload a clear MRI scan image in JPEG, PNG,
                  or DICOM format.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload MRI Scan
            </h2>

            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!file ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2">
                    Drag and drop your MRI scan here
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    or click to browse files
                  </p>
                  <p className="text-gray-400 text-xs">
                    Supported formats: JPEG, PNG, DICOM (max 5MB)
                  </p>

                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    title="Upload MRI scan"
                  />
                </div>
              ) : (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={preview!}
                      alt="MRI Preview"
                      className="w-full h-64 object-contain border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200 transition-colors"
                      title="Remove file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || isUploading}
                className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Analyzing..." : "Analyze MRI Scan"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Analysis Results
            </h2>

            {!result && !isUploading ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <BrainModel />
                <p className="text-gray-500 mt-4">
                  Upload an MRI scan to see the analysis results here
                </p>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-700">Analyzing your MRI scan...</p>
                <p className="text-gray-500 text-sm mt-2">
                  This may take a few moments
                </p>
              </div>
            ) : (
              <div>
                <div
                  className={`p-4 rounded-lg border mb-6 ${tumorTypes[result!.type].color
                    }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium capitalize">
                        {result!.type.replace("_", " ")}
                      </h3>
                      <p className="mt-1 text-sm">
                        {tumorTypes[result!.type].description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Confidence Score
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${result!.confidence * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-right text-sm text-gray-500">
                    {(result!.confidence * 100).toFixed(1)}%
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Recommendations
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Consult with a neurologist to discuss these results</li>
                    <li>
                      Consider additional diagnostic tests for confirmation
                    </li>
                    <li>Download the report for your medical records</li>
                  </ul>

                  <button className="mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* 3D Brain Visualization */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            3D Brain Visualization
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                {/* 3D Brain model using CSS and SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div
                      className="absolute w-56 h-48 bg-pink-200 rounded-full left-4 top-8 animate-pulse"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "rotateX(15deg) rotateY(15deg)",
                      }}
                    ></div>
                    <div
                      className="absolute w-52 h-44 bg-pink-300 rounded-full left-6 top-10 animate-pulse"
                      style={{
                        animationDelay: "0.2s",
                        transformStyle: "preserve-3d",
                        transform: "rotateX(15deg) rotateY(15deg)",
                      }}
                    ></div>
                    <div
                      className="absolute w-48 h-40 bg-pink-400 rounded-full left-8 top-12 animate-pulse"
                      style={{
                        animationDelay: "0.4s",
                        transformStyle: "preserve-3d",
                        transform: "rotateX(15deg) rotateY(15deg)",
                      }}
                    ></div>

                    {/* Brain lobes */}
                    <div
                      className="absolute w-24 h-20 bg-blue-300 rounded-full left-4 top-8 animate-pulse"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "rotateX(15deg) rotateY(-25deg)",
                      }}
                    ></div>
                    <div
                      className="absolute w-24 h-20 bg-green-300 rounded-full right-4 top-8 animate-pulse"
                      style={{
                        animationDelay: "0.3s",
                        transformStyle: "preserve-3d",
                        transform: "rotateX(15deg) rotateY(25deg)",
                      }}
                    ></div>
                    <div
                      className="absolute w-24 h-20 bg-yellow-300 rounded-full left-20 top-28 animate-pulse"
                      style={{
                        animationDelay: "0.6s",
                        transformStyle: "preserve-3d",
                        transform: "rotateX(-15deg)",
                      }}
                    ></div>

                    {/* Brain stem */}
                    <div
                      className="absolute w-8 h-16 bg-pink-500 rounded-b-full left-28 bottom-0 animate-pulse"
                      style={{ animationDelay: "0.8s" }}
                    ></div>

                    <div className="absolute w-full h-full flex items-center justify-center">
                      <Brain className="h-32 w-32 text-pink-600" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-md">
                  <p className="text-sm font-medium">
                    Interactive 3D Brain Model
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Frontal Lobe
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Parietal Lobe
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Temporal Lobe
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      Brain Stem
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
