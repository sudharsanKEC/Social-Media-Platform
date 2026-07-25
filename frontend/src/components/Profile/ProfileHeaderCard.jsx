import { useState } from "react";
import { Camera, RefreshCw, LockOpen, Lock, ChevronDown } from "lucide-react";
import { uploadFile } from "../../services/uploadService";

const privacyConfig = {
    PUBLIC: { label: "Public", icon: LockOpen, color: "text-blue-500" },
    REVIEW_AND_SUPPORT: { label: "Review & Support Only", icon: Lock, color: "text-amber-500" }
};

export function ProfileHeaderCard({
    currentUser,
    activeUsername,
    editDescription,
    setEditDescription,
    editSummary,
    setEditSummary,
    editPrivacy,
    setEditPrivacy,
    isSavingProfile,
    isEditingProfile,
    setIsEditingProfile,
    onSaveProfile,
    onProfilePhotoUpdate,
    followersCount = 0,
    friendsCount = 0,
    postsCount = 0
}) {
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [uploadPhotoError, setUploadPhotoError] = useState("");
    const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingPhoto(true);
        setUploadPhotoError("");
        try {
            const result = await uploadFile(file);
            await onProfilePhotoUpdate(result.url);
        } catch (err) {
            setUploadPhotoError(err.message || "Failed to upload photo");
        } finally {
            setIsUploadingPhoto(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <div className="relative pt-8 flex flex-col items-center text-center">
                
                {/* Avatar with Camera upload trigger overlay */}
                <div className="relative group">
                    {currentUser?.profilePhotoUrl ? (
                        <img
                            src={currentUser.profilePhotoUrl}
                            alt="Profile Avatar"
                            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                            {getInitials(activeUsername)}
                        </div>
                    )}
                    
                    <label className="absolute inset-0 w-20 h-20 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-4 border-transparent">
                        <Camera className="w-5 h-5 text-white" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            disabled={isUploadingPhoto}
                        />
                    </label>
                </div>

                {isEditingProfile && currentUser?.profilePhotoUrl && (
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                setIsUploadingPhoto(true);
                                setUploadPhotoError("");
                                await onProfilePhotoUpdate("");
                            } catch (err) {
                                setUploadPhotoError("Failed to delete photo");
                            } finally {
                                setIsUploadingPhoto(false);
                            }
                        }}
                        className="mt-2 text-xs text-rose-600 hover:text-rose-700 font-bold transition-colors cursor-pointer"
                    >
                        Delete Profile Photo
                    </button>
                )}

                {isUploadingPhoto && (
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-indigo-650 font-bold">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Uploading photo...
                    </div>
                )}

                {uploadPhotoError && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1">{uploadPhotoError}</p>
                )}

                <h2 className="mt-3 font-bold text-lg text-slate-900">{activeUsername}</h2>
                <p className="text-slate-500 text-xs">{currentUser?.userEmail || "Loading email..."}</p>

                {/* Privacy settings and Bios */}
                <div className="w-full mt-4 text-left border-t border-slate-100 pt-4 space-y-3">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            Biography / Description
                        </span>
                        <p className="text-xs text-slate-700 bg-slate-55/40 p-2.5 rounded-xl border border-slate-100 min-h-12 whitespace-pre-wrap font-medium leading-relaxed">
                            {currentUser?.description || "No description set yet."}
                        </p>
                    </div>

                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            Instagram Summary Bio
                        </span>
                        <p className="text-xs text-slate-750 bg-slate-55/40 p-2.5 rounded-xl border border-slate-100 min-h-12 whitespace-pre-wrap font-medium">
                            {currentUser?.summary || "No summary set yet."}
                        </p>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-1">
                        <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Follow Privacy</span>
                        <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            {currentUser?.followPrivacy || "PUBLIC"}
                        </span>
                    </div>
                </div>

                {/* Editing Trigger */}
                {!isEditingProfile ? (
                    <button
                        onClick={() => setIsEditingProfile(true)}
                        className="w-full mt-5 bg-indigo-605 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-colors cursor-pointer text-xs"
                    >
                        Edit Biography & Settings
                    </button>
                ) : (
                    <form onSubmit={onSaveProfile} className="w-full mt-5 border-t border-slate-200 pt-4 text-left space-y-4">
                        <h3 className="font-bold text-xs text-slate-900 uppercase">Update Settings</h3>
                        
                        <div>
                            <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Description</label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Write something about yourself..."
                                className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-slate-900 rounded-xl p-2.5 text-xs outline-none resize-none font-medium"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Summary (Insta Bio)</label>
                            <textarea
                                value={editSummary}
                                onChange={(e) => setEditSummary(e.target.value)}
                                placeholder="A short summary that appears in lists..."
                                maxLength={150}
                                className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-slate-900 rounded-xl p-2.5 text-xs outline-none resize-none font-medium"
                                rows={2}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Follow Privacy</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowPrivacyDropdown(!showPrivacyDropdown)}
                                    className="flex items-center justify-between w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 transition-colors cursor-pointer select-none font-semibold"
                                >
                                    {(() => {
                                        const cfg = privacyConfig[editPrivacy] || privacyConfig.PUBLIC;
                                        const Icon = cfg.icon;
                                        return (
                                            <span className="flex items-center gap-2">
                                                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                                <span>{cfg.label}</span>
                                            </span>
                                        );
                                    })()}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                                {showPrivacyDropdown && (
                                    <div className="absolute left-0 bottom-full mb-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-fade-in">
                                        {Object.entries(privacyConfig).map(([key, cfg]) => {
                                            const Icon = cfg.icon;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => {
                                                        setEditPrivacy(key);
                                                        setShowPrivacyDropdown(false);
                                                    }}
                                                    className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer font-medium"
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

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsEditingProfile(false)}
                                className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-55 text-slate-500 rounded-xl text-xs cursor-pointer font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSavingProfile}
                                className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50"
                            >
                                {isSavingProfile ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                )}

                {/* Counter Stats */}
                <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-5 border-t border-slate-200">
                    <div className="flex flex-col items-center">
                        <span className="text-slate-805 font-extrabold text-sm">{followersCount}</span>
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Followers</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-slate-805 font-extrabold text-sm">{friendsCount}</span>
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Friends</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-slate-805 font-extrabold text-sm">{postsCount}</span>
                        <span className="text-slate-400 text-[9px] uppercase font-bold">Posts</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
