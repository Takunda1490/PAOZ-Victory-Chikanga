import { useRef, useState } from "react";
import { Upload, ImageIcon, X, Loader } from "lucide-react";
import imageCompression from "browser-image-compression";
import { supabase } from "../lib/supabase";
import { bundledAssets } from "./fieldSpecs";

export default function ImageField({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!supabase) {
      setError("Connect Supabase to upload, or paste a URL.");
      return;
    }
    setError("");
    setUploading(true);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(path, compressedFile, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err.message || "Failed to compress/upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-40 h-28 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <img
              src={value}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={value ?? ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/assets/image.jpg or https://..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
            />
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-60 shrink-0"
            >
              {uploading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              Upload
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                aria-label="Clear image"
                className="px-2 text-gray-400 hover:text-red-600 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <select
            value=""
            onChange={(e) => e.target.value && onChange(e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-md bg-white text-gray-600 focus:outline-none focus:border-primary-600"
          >
            <option value="">Pick a bundled image…</option>
            {bundledAssets.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>

          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}