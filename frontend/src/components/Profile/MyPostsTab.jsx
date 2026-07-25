import { CreatePostCard } from "../Common/CreatePostCard";
import { PostCard } from "../Common/PostCard";

export function MyPostsTab({
    posts = [],
    activeUsername,
    likedPostIds = new Set(),
    
    // Create post props
    newPostContent,
    setNewPostContent,
    newPostVisibility,
    setNewPostVisibility,
    newPostType,
    setNewPostType,
    newMediaUrl,
    setNewMediaUrl,
    createLoading,
    onCreatePost,

    // Post edit/delete props
    editingPostId,
    editingContent,
    setEditingContent,
    editingVisibility,
    setEditingVisibility,
    onEditPost,
    onSavePostEdit,
    onDeletePost,
    onCancelPostEdit,
    onLikeToggle,
    onOpenComments
}) {
    return (
        <div className="space-y-6">
            <CreatePostCard
                newPostContent={newPostContent}
                setNewPostContent={setNewPostContent}
                newPostVisibility={newPostVisibility}
                setNewPostVisibility={setNewPostVisibility}
                newPostType={newPostType}
                setNewPostType={setNewPostType}
                newMediaUrl={newMediaUrl}
                setNewMediaUrl={setNewMediaUrl}
                createLoading={createLoading}
                onSubmit={onCreatePost}
                placeholder="Share a thought directly on your profile page..."
            />

            <div className="space-y-5">
                {posts.length === 0 ? (
                    <p className="text-slate-500 text-xs text-center py-8 bg-white border border-slate-200 rounded-2xl">
                        You haven't written any posts yet.
                    </p>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.postId}
                            post={post}
                            activeUsername={activeUsername}
                            likedPostIds={likedPostIds}
                            editingPostId={editingPostId}
                            editingContent={editingContent}
                            setEditingContent={setEditingContent}
                            editingVisibility={editingVisibility}
                            setEditingVisibility={setEditingVisibility}
                            onEdit={onEditPost}
                            onSave={onSavePostEdit}
                            onDelete={onDeletePost}
                            onCancelEdit={onCancelPostEdit}
                            onLikeToggle={onLikeToggle}
                            onOpenComments={onOpenComments}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
