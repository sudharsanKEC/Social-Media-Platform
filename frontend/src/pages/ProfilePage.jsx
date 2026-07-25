import { useSelector } from "react-redux";

// Custom hooks
import { useProfileData } from "../hooks/useProfileData";
import { useFlashMessage } from "../hooks/useFlashMessage";

// Common subcomponents
import { Header } from "../components/Common/Header";
import { CommentsModal } from "../components/Common/CommentsModal";
import { PostDetailsModal } from "../components/Common/PostDetailsModal";

// Profile subcomponents
import { ProfileHeaderCard } from "../components/Profile/ProfileHeaderCard";
import { ProfileTabs } from "../components/Profile/ProfileTabs";
import { MyPostsTab } from "../components/Profile/MyPostsTab";
import { LikedPostsTab } from "../components/Profile/LikedPostsTab";
import { MyCommentsTab } from "../components/Profile/MyCommentsTab";
import { FriendsTab } from "../components/Profile/FriendsTab";
import { FollowersTab } from "../components/Profile/FollowersTab";

import { ShieldAlert } from "lucide-react";

export function ProfilePage() {
    const activeUsername = useSelector(state => state.auth.activeUsername);
    const { message, triggerMessage } = useFlashMessage();
    const data = useProfileData({ triggerMessage });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none">
            {/* Header */}
            <Header loadAllData={data.loadProfileData} loadingData={data.loadingData} currentUser={data.currentUser} />

            {/* Info Message Bar */}
            {message.text && (
                <div className={`fixed bottom-4 left-4 z-50 px-4 py-3 rounded-xl border flex items-center gap-2 shadow-2xl transition-all duration-300 ${
                    message.type === "error" 
                        ? "bg-rose-50 border-rose-200 text-rose-700" 
                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                }`}>
                    <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-semibold">{message.text}</span>
                </div>
            )}

            {/* Profile Content Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* Left Profile details block */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    <ProfileHeaderCard
                        currentUser={data.currentUser}
                        activeUsername={activeUsername}
                        editDescription={data.editDescription}
                        setEditDescription={data.setEditDescription}
                        editSummary={data.editSummary}
                        setEditSummary={data.setEditSummary}
                        editPrivacy={data.editPrivacy}
                        setEditPrivacy={data.setEditPrivacy}
                        isSavingProfile={data.isSavingProfile}
                        isEditingProfile={data.isEditingProfile}
                        setIsEditingProfile={data.setIsEditingProfile}
                        onSaveProfile={data.handleUpdateProfile}
                        onProfilePhotoUpdate={data.handleProfilePhotoUpdate}
                        followersCount={data.currentUser?.followersCount || data.followers.length}
                        friendsCount={data.currentUser?.friendsCount || data.friends.length}
                        postsCount={data.myPosts.length}
                    />
                </div>

                {/* Right Tabs Panel - Occupies remaining width (col-span-3) */}
                <div className="lg:col-span-3 space-y-6">
                    <ProfileTabs
                        activeTab={data.profileTab}
                        setActiveTab={data.setProfileTab}
                        postsCount={data.myPosts.length}
                        likedCount={data.likedPosts.length}
                        commentsCount={data.myComments.length}
                        friendsCount={data.friends.length}
                        followersCount={data.followers.length}
                    />

                    {/* Tab Render Switch */}
                    {data.loadingData ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 bg-white border border-slate-200 rounded-2xl">
                            <span className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></span>
                            <span className="text-xs text-slate-400 font-semibold uppercase">Loading profile tabs...</span>
                        </div>
                    ) : (
                        <>
                            {data.profileTab === "posts" && (
                                <MyPostsTab
                                    posts={data.myPosts}
                                    activeUsername={activeUsername}
                                    likedPostIds={data.likedPostIds}
                                    
                                    newPostContent={data.newPostContent}
                                    setNewPostContent={data.setNewPostContent}
                                    newPostVisibility={data.newPostVisibility}
                                    setNewPostVisibility={data.setNewPostVisibility}
                                    newPostType={data.newPostType}
                                    setNewPostType={data.setNewPostType}
                                    newMediaUrl={data.newMediaUrl}
                                    setNewMediaUrl={data.setNewMediaUrl}
                                    createLoading={data.createLoading}
                                    onCreatePost={data.handleCreatePost}

                                    editingPostId={data.editingPostId}
                                    editingContent={data.editingContent}
                                    setEditingContent={data.setEditingContent}
                                    editingVisibility={data.editingVisibility}
                                    setEditingVisibility={data.setEditingVisibility}
                                    onEditPost={data.handleEditPost}
                                    onSavePostEdit={data.handleSavePostEdit}
                                    onDeletePost={data.handleDeletePost}
                                    onCancelPostEdit={() => data.setEditingPostId(null)}
                                    onLikeToggle={data.handleLikeToggle}
                                    onOpenComments={data.handleOpenCommentsModal}
                                />
                            )}

                            {data.profileTab === "liked" && (
                                <LikedPostsTab
                                    posts={data.likedPosts}
                                    activeUsername={activeUsername}
                                    likedPostIds={data.likedPostIds}
                                    onLikeToggle={data.handleLikeToggle}
                                    onOpenComments={data.handleOpenCommentsModal}
                                />
                            )}

                            {data.profileTab === "comments" && (
                                <MyCommentsTab
                                    comments={data.myComments}
                                    onDeleteComment={data.handleDeleteOwnCommentFromList}
                                    onViewRelatedPost={data.viewPostDetails}
                                />
                            )}

                            {data.profileTab === "friends" && (
                                <FriendsTab
                                    friends={data.friends}
                                    onRemoveFriend={data.handleRemoveFriend}
                                />
                            )}

                            {data.profileTab === "followers" && (
                                <FollowersTab
                                    followers={data.followers}
                                    following={data.following}
                                    onRemoveFollower={data.handleRemoveFollower}
                                    onUnfollow={data.handleUnfollow}
                                />
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Related Post Details Modal */}
            {data.selectedPostDetails && (
                <PostDetailsModal
                    post={data.selectedPostDetails}
                    onClose={() => data.setSelectedPostDetails(null)}
                    likedPostIds={data.likedPostIds}
                    onLikeToggle={data.handleLikeToggle}
                    onOpenComments={data.handleOpenCommentsModal}
                />
            )}

            {/* Comments Modal Overlay */}
            {data.modalPost && (
                <CommentsModal
                    post={data.modalPost}
                    onClose={() => data.setModalPost(null)}
                    comments={data.postComments[data.modalPost.postId] || []}
                    commentText={data.commentTexts[data.modalPost.postId] || ""}
                    onCommentTextChange={(text) => data.setCommentTexts(prev => ({ ...prev, [data.modalPost.postId]: text }))}
                    onAddComment={data.handleAddComment}
                    onDeleteComment={data.handleDeleteComment}
                    submittingComment={data.submittingCommentId === data.modalPost.postId}
                    activeUsername={activeUsername}
                />
            )}
        </div>
    );
}

