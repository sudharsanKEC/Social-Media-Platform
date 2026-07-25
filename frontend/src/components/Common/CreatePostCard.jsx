import { useState } from "react";
import { Paperclip, Film, Image as ImageIcon, Globe, Lock, Eye, Check, RefreshCw, Users, User, ChevronDown, Edit3 } from "lucide-react";
import { uploadFile } from "../../services/uploadService";

const visibilityConfig = {
    PUBLIC: { label: "Public", icon: Globe, color: "text-blue-500" },
    FRIENDS_ONLY: { label: "Friends Only", icon: Users, color: "text-emerald-500" },
    FOLLOWERS_ONLY: { label: "Followers Only", icon: User, color: "text-violet-500" },
    PRIVATE: { label: "Private", icon: Lock, color: "text-amber-500" }
};

const typeConfig = {
    TEXT: { label: "Text Post", icon: Edit3, color: "text-slate-500" },
    IMAGE: { label: "Image", icon: ImageIcon, color: "text-blue-500" },
    VIDEO: { label: "Video", icon: Film, color: "text-pink-500" }
};

export function CreatePostCard({
    newPostContent,
    setNewPostContent,
    newPostVisibility,
    setNewPostVisibility,
    newPostType,
    setNewPostType,
    newMediaUrl,
    setNewMediaUrl,
    createLoading,
    onSubmit,
    placeholder = "What is on your mind? Share something with the community..."
}) {
    const [uploadMode, setUploadMode] = useState("url"); // "url" or "file"
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadError("");
        try {
            const result = await uploadFile(file);
            setNewMediaUrl(result.url);
        } catch (err) {
            setUploadError(err.message || "Failed to upload file");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <div className="bg-white border border-slate-205 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Create a Post</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={placeholder}
                    maxLength={5000}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 rounded-xl p-4 outline-none placeholder:text-slate-400 text-sm font-medium resize-none min-h-[100px] transition-all duration-200"
                    required
                />
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                        {/* Custom Visibility Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowVisibilityDropdown(!showVisibilityDropdown);
                                    setShowTypeDropdown(false);
                                }}
                                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer select-none font-semibold"
                            >
                                {(() => {
                                    const cfg = visibilityConfig[newPostVisibility] || visibilityConfig.PUBLIC;
                                    const Icon = cfg.icon;
                                    return (
                                        <>
                                            <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                            <span>{cfg.label}</span>
                                        </>
                                    );
                                })()}
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                            {showVisibilityDropdown && (
                                <div className="absolute left-0 bottom-full mb-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-fade-in">
                                    {Object.entries(visibilityConfig).map(([key, cfg]) => {
                                        const Icon = cfg.icon;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => {
                                                    setNewPostVisibility(key);
                                                    setShowVisibilityDropdown(false);
                                                }}
                                                className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer font-medium"
                                            >
                                                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                                <span>{cfg.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Custom Post Type Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowTypeDropdown(!showTypeDropdown);
                                    setShowVisibilityDropdown(false);
                                }}
                                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer select-none font-semibold"
                            >
                                {(() => {
                                    const cfg = typeConfig[newPostType] || typeConfig.TEXT;
                                    const Icon = cfg.icon;
                                    return (
                                        <>
                                            <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                            <span>{cfg.label}</span>
                                        </>
                                    );
                                })()}
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                            {showTypeDropdown && (
                                <div className="absolute left-0 bottom-full mb-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-fade-in">
                                    {Object.entries(typeConfig).map(([key, cfg]) => {
                                        const Icon = cfg.icon;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => {
                                                    setNewPostType(key);
                                                    setNewMediaUrl("");
                                                    setUploadError("");
                                                    setShowTypeDropdown(false);
                                                }}
                                                className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer font-medium"
                                            >
                                                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                                <span>{cfg.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <span className="text-[10px] text-slate-450 font-bold">
                        {newPostContent.length}/5000 characters
                    </span>
                </div>

                {/* Optional Media upload section */}
                {newPostType !== "TEXT" && (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        {/* Selector between File and Link */}
                        <div className="flex gap-2 p-1 bg-slate-200/60 rounded-lg max-w-[220px] text-[10px] font-bold">
                            <button
                                type="button"
                                onClick={() => { setUploadMode("url"); setNewMediaUrl(""); }}
                                className={`flex-1 py-1 text-center rounded-md cursor-pointer transition-all ${
                                    uploadMode === "url" ? "bg-white text-indigo-650 shadow-xs" : "text-slate-500"
                                }`}
                            >
                                Paste URL Link
                            </button>
                            <button
                                type="button"
                                onClick={() => { setUploadMode("file"); setNewMediaUrl(""); }}
                                className={`flex-1 py-1 text-center rounded-md cursor-pointer transition-all ${
                                    uploadMode === "file" ? "bg-white text-indigo-650 shadow-xs" : "text-slate-500"
                                }`}
                            >
                                Upload File
                            </button>
                        </div>

                        {uploadMode === "url" ? (
                            <div className="space-y-1.5">
                                <label className="block text-slate-500 text-xs font-semibold">
                                    Paste {newPostType} Link URL
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-450">
                                        <Paperclip className="w-4 h-4" />
                                    </span>
                                    <input
                                        type="url"
                                        className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-slate-800 rounded-xl py-2 pl-9 pr-4 outline-none text-xs"
                                        placeholder="https://example.com/media.jpg"
                                        value={newMediaUrl}
                                        onChange={(e) => setNewMediaUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="block text-slate-550 text-xs font-semibold">
                                    Select {newPostType} Local File
                                </label>
                                <input
                                    type="file"
                                    accept={newPostType === "VIDEO" ? "video/*" : "image/*"}
                                    onChange={handleFileChange}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                                />
                                {isUploading && (
                                    <div className="flex items-center gap-1.5 text-xs text-indigo-650 font-semibold mt-1">
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                        Uploading to server...
                                    </div>
                                )}
                            </div>
                        )}

                        {uploadError && (
                            <p className="text-xs text-rose-600 font-semibold">{uploadError}</p>
                        )}

                        {newMediaUrl.trim() !== "" && (
                            <div className="mt-3 border border-slate-200 rounded-lg overflow-hidden max-h-40 flex justify-center bg-slate-100 relative">
                                {newPostType === "IMAGE" ? (
                                    <img src={newMediaUrl} alt="Preview" className="object-contain max-h-40" onError={(e) => { e.target.style.display='none'; }} />
                                ) : (
                                    <video src={newMediaUrl} className="object-contain max-h-40" controls muted playsInline />
                                )}
                                <span className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-0.5" title="Uploaded Successfully">
                                    <Check className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={createLoading || isUploading || newPostContent.trim() === ""}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {createLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Publishing...
                        </span>
                    ) : (
                        "Publish Post"
                    )}
                </button>
            </form>
        </div>
    );
}
