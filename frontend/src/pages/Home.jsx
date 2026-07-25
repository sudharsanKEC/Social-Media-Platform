import { useState } from "react";
import { useSelector } from "react-redux";

// Custom hooks
import { useHomeData } from "../hooks/useHomeData";
import { usePostActions } from "../hooks/usePostActions";
import { useCommentsModal } from "../hooks/useCommentsModal";
import { useConnectionActions } from "../hooks/useConnectionActions";
import { useFlashMessage } from "../hooks/useFlashMessage";

// UI components
import { Header } from "../components/Common/Header";
import { UserProfileCard } from "../components/Dashboard/UserProfileCard";
import { CreatePostCard } from "../components/Common/CreatePostCard";
import { PostCard } from "../components/Common/PostCard";
import { PendingRequestsSidebar } from "../components/Dashboard/PendingRequestsSidebar";
import { DiscoverUsersCard } from "../components/Dashboard/DiscoverUsersCard";
import { CommentsModal } from "../components/Common/CommentsModal";
import { ShieldAlert, Clock } from "lucide-react";

export function Home() {
    const activeUsername = useSelector(state => state.auth.activeUsername);
    const [feedTab, setFeedTab] = useState("explore");

    const { message, triggerMessage } = useFlashMessage();

    const data = useHomeData();

    const posts = usePostActions({ likedPostIds: data.likedPostIds, setLikedPostIds: data.setLikedPostIds, loadAllData: data.loadAllData, triggerMessage });

    const comments = useCommentsModal({ loadAllData: data.loadAllData, triggerMessage });

    const connections = useConnectionActions({
        friends: data.friends, following: data.following,
        incomingFriendRequests: data.incomingFriendRequests,
        outgoingFriendRequests: data.outgoingFriendRequests,
        incomingFollowRequests: data.incomingFollowRequests,
        outgoingFollowRequests: data.outgoingFollowRequests,
        loadAllData: data.loadAllData, triggerMessage
    });

    const displayedPosts = feedTab === "explore" ? data.posts : data.myPosts;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none">
            <Header loadAllData={data.loadAllData} loadingData={data.loadingData} currentUser={data.currentUser} />

            {message.text && (
                <div className={`fixed bottom-4 left-4 z-50 px-4 py-3 rounded-xl border flex items-center gap-2 shadow-2xl transition-all duration-300 ${message.type === "error" ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-semibold">{message.text}</span>
                </div>
            )}

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

                {/* Left: mini profile */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    <UserProfileCard currentUser={data.currentUser} activeUsername={activeUsername} />
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" /> System Status
                        </h3>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{data.welcomeMsg || "Loading..."}</p>
                    </div>
                </div>

                {/* Centre: tabs + feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex border-b border-slate-200 bg-white p-1.5 rounded-xl border shadow-sm">
                        {["explore", "my-posts", "discover"].map(tab => (
                            <button key={tab} onClick={() => setFeedTab(tab)}
                                className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${feedTab === tab ? "bg-slate-100 text-indigo-600 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}>
                                {tab === "explore" ? "Explore Feed" : tab === "my-posts" ? "My Posts" : "Discover People"}
                            </button>
                        ))}
                    </div>

                    {feedTab === "discover" ? (
                        <DiscoverUsersCard
                            allUsers={data.allUsers} searchQuery={data.searchQuery} onSearchChange={data.handleSearchChange}
                            isFriend={connections.isFriend} hasIncomingFriendReq={connections.hasIncomingFriendReq}
                            hasOutgoingFriendReq={connections.hasOutgoingFriendReq} isFollowing={connections.isFollowing}
                            hasOutgoingFollowReq={connections.hasOutgoingFollowReq} getFriendReqId={connections.getFriendReqId}
                            getFollowReqId={connections.getFollowReqId} onSendFriendReq={connections.handleSendFriendReq}
                            onCancelFriendReq={connections.handleCancelFriendReq} onAcceptFriendReq={connections.handleAcceptFriendReq}
                            onRejectFriendReq={connections.handleRejectFriendReq} onUnfriend={connections.handleUnfriendUser}
                            onFollowUser={connections.handleFollowUser} onUnfollowUser={connections.handleUnfollowUser}
                            onCancelFollowReq={connections.handleCancelFollowReq}
                        />
                    ) : (
                        <div className="space-y-6">
                            <CreatePostCard
                                newPostContent={posts.newPostContent} setNewPostContent={posts.setNewPostContent}
                                newPostVisibility={posts.newPostVisibility} setNewPostVisibility={posts.setNewPostVisibility}
                                newPostType={posts.newPostType} setNewPostType={posts.setNewPostType}
                                newMediaUrl={posts.newMediaUrl} setNewMediaUrl={posts.setNewMediaUrl}
                                createLoading={posts.createLoading} onSubmit={posts.handleCreatePost}
                            />
                            <div className="space-y-6">
                                {data.loadingData ? (
                                    <div className="flex flex-col items-center justify-center py-12 gap-3 bg-white border border-slate-200 rounded-2xl">
                                        <span className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                                        <span className="text-xs text-slate-400 font-semibold uppercase">Fetching feed...</span>
                                    </div>
                                ) : displayedPosts.length === 0 ? (
                                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                                        <p className="font-bold text-slate-800">No posts yet</p>
                                        <p className="text-slate-500 text-xs mt-1">Be the first to share something!</p>
                                    </div>
                                ) : displayedPosts.map(post => (
                                    <PostCard key={post.postId} post={post} activeUsername={activeUsername}
                                        likedPostIds={data.likedPostIds} editingPostId={posts.editingPostId}
                                        editingContent={posts.editingContent} setEditingContent={posts.setEditingContent}
                                        editingVisibility={posts.editingVisibility} setEditingVisibility={posts.setEditingVisibility}
                                        onEdit={posts.handleEditPost} onSave={posts.handleSavePostEdit}
                                        onDelete={posts.handleDeletePost} onCancelEdit={posts.cancelPostEdit}
                                        onLikeToggle={posts.handleLikeToggle} onOpenComments={comments.openCommentsModal}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: pending requests only */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    <PendingRequestsSidebar
                        incomingFriendRequests={data.incomingFriendRequests}
                        outgoingFriendRequests={data.outgoingFriendRequests}
                        incomingFollowRequests={data.incomingFollowRequests}
                        outgoingFollowRequests={data.outgoingFollowRequests}
                        onAcceptFriend={connections.handleAcceptFriendReq}
                        onRejectFriend={connections.handleRejectFriendReq}
                        onCancelFriend={connections.handleCancelFriendReq}
                        onAcceptFollow={connections.handleAcceptFollowReq}
                        onRejectFollow={connections.handleRejectFollowReq}
                        onCancelFollow={connections.handleCancelFollowReq}
                    />
                </div>
            </main>

            {comments.modalPost && (
                <CommentsModal
                    post={comments.modalPost} onClose={comments.closeCommentsModal}
                    comments={comments.postComments[comments.modalPost.postId] || []}
                    commentText={comments.commentTexts[comments.modalPost.postId] || ""}
                    onCommentTextChange={text => comments.setCommentTexts(prev => ({ ...prev, [comments.modalPost.postId]: text }))}
                    onAddComment={comments.handleAddComment} onDeleteComment={comments.handleDeleteComment}
                    submittingComment={comments.submittingCommentId === comments.modalPost.postId}
                    activeUsername={activeUsername}
                />
            )}
        </div>
    );
}
