import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../services/postService";
import { Header } from "../components/Common/Header";
import { PostCard } from "../components/Common/PostCard";
import { CreatePostCard } from "../components/Common/CreatePostCard";
import { X, Compass, Clock, ShieldAlert, Users, Award, Zap, LogIn, UserPlus } from "lucide-react";

export function LandingPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const [feedTab, setFeedTab] = useState("explore");

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const fetched = await getAllPosts();
                setPosts(fetched);
            } catch (err) {
                console.error("Failed to load public posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const triggerWarning = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowWarning(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none relative">
            {/* Header in Guest Mode */}
            <Header loadAllData={null} loadingData={false} isGuest={true} />

            {/* Warning Popup Centered Modal */}
            {showWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-905/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setShowWarning(false)}
                    />
                    
                    {/* Modal Body */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
                        {/* Close button with cross mark */}
                        <button 
                            onClick={() => setShowWarning(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-0 outline-none bg-transparent"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center mt-2">
                            <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl mb-4 shadow-xs">
                                <ShieldAlert className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Authentication Required
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mb-6">
                                You need an account to like posts, submit comments, publish content, or connect with other creators on the platform.
                            </p>

                            <div className="flex flex-col w-full gap-2.5">
                                <button
                                    onClick={() => {
                                        setShowWarning(false);
                                        navigate("/login");
                                    }}
                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-750 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors border border-slate-200"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login to Account
                                </button>
                                <button
                                    onClick={() => {
                                        setShowWarning(false);
                                        navigate("/send-otp");
                                    }}
                                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors shadow-md shadow-indigo-650/10 border-0"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Create New Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Layout Grid */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* Left Sidebar: Guest Info & System Status */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    {/* Welcome Guest Profile Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-slate-100 to-indigo-50 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-400 text-2xl shadow-inner mb-4">
                            G
                        </div>
                        <h2 className="text-base font-extrabold text-slate-900">Welcome, Guest!</h2>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                            Join Antigravity Social to interact with people, post updates, and customize your experience.
                        </p>
                        <div className="mt-5 space-y-2">
                            <button 
                                onClick={() => navigate("/send-otp")}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm shadow-indigo-600/10 border-0"
                            >
                                Register Now
                            </button>
                            <button 
                                onClick={() => navigate("/login")}
                                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer bg-white"
                            >
                                Log In
                            </button>
                        </div>
                    </div>

                    {/* App Guidelines / Highlight card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-indigo-500" /> Platform Guidelines
                        </h3>
                        <ul className="text-xs text-slate-600 space-y-3 font-semibold leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-0.5">•</span>
                                Read public feeds from members worldwide
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-0.5">•</span>
                                Login to share articles, images, and videos
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 mt-0.5">•</span>
                                Engage safely within our friendly guidelines
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Center Column: Composer (mocked/restricted) & Public Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs Panel */}
                    <div className="flex border-b border-slate-200 bg-white p-1.5 rounded-xl border shadow-sm">
                        {["explore", "my-posts", "discover"].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => {
                                    if (tab === "explore") {
                                        setFeedTab(tab);
                                    } else {
                                        triggerWarning();
                                    }
                                }}
                                className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer border-0 outline-none ${
                                    feedTab === tab 
                                        ? "bg-slate-100 text-indigo-600 shadow-xs" 
                                        : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                {tab === "explore" ? "Explore Feed" : tab === "my-posts" ? "My Posts" : "Discover People"}
                            </button>
                        ))}
                    </div>

                    {/* Compose Card restricted to warning popup on click */}
                    <div onClickCapture={triggerWarning}>
                        <CreatePostCard
                            newPostContent=""
                            setNewPostContent={() => {}}
                            newPostVisibility="PUBLIC"
                            setNewPostVisibility={() => {}}
                            newPostType="TEXT"
                            setNewPostType={() => {}}
                            newMediaUrl=""
                            setNewMediaUrl={() => {}}
                            createLoading={false}
                            onSubmit={() => {}}
                            placeholder="Sign in or register to publish a post..."
                        />
                    </div>

                    {/* Public Feed */}
                    <div className="space-y-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-3 bg-white border border-slate-200 rounded-2xl">
                                <span className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                                <span className="text-xs text-slate-400 font-semibold uppercase">Fetching public feed...</span>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                                <p className="font-bold text-slate-850">No public posts yet</p>
                                <p className="text-slate-500 text-xs mt-1">Be the first to share something!</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <PostCard 
                                    key={post.postId} 
                                    post={post} 
                                    activeUsername="" 
                                    likedPostIds={new Set()} 
                                    editingPostId={null}
                                    editingContent="" 
                                    setEditingContent={() => {}}
                                    editingVisibility="PUBLIC" 
                                    setEditingVisibility={() => {}}
                                    onEdit={() => {}} 
                                    onSave={() => {}}
                                    onDelete={() => {}} 
                                    onCancelEdit={() => {}}
                                    onLikeToggle={triggerWarning} 
                                    onOpenComments={triggerWarning}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Right Sidebar: Quick Registration Promo Card */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-slate-705">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-indigo-500" /> Community Hub
                        </h3>
                        <p className="text-xs font-medium leading-relaxed mb-4">
                            Connect with developers, designers, and creatives globally. Over thousands of posts shared.
                        </p>
                        
                        <div className="space-y-4 pt-3 border-t border-slate-100 text-xs">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-650 rounded-lg">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Real-time Updates</p>
                                    <p className="text-slate-405 text-[10px]">Instant likes & comment notifications</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Award className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Earn Connections</p>
                                    <p className="text-slate-405 text-[10px]">Follow creators & build relationships</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                            <p className="text-[11px] font-bold text-indigo-950 leading-relaxed">
                                Join now and build your network! It only takes 2 minutes.
                            </p>
                            <button
                                onClick={() => navigate("/send-otp")}
                                className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer border-0 outline-none"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
