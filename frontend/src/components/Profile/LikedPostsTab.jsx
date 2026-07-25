import { PostCard } from "../Common/PostCard";

export function LikedPostsTab({
    posts = [],
    activeUsername,
    likedPostIds = new Set(),
    onLikeToggle,
    onOpenComments
}) {
    return (
        <div className="space-y-5">
            {posts.length === 0 ? (
                <p className="text-slate-500 text-xs text-center py-8 bg-white border border-slate-200 rounded-2xl">
                    You haven't liked any posts yet.
                </p>
            ) : (
                posts.map((post) => (
                    <PostCard
                        key={post.postId}
                        post={post}
                        activeUsername={activeUsername}
                        likedPostIds={likedPostIds}
                        onLikeToggle={onLikeToggle}
                        onOpenComments={onOpenComments}
                    />
                ))
            )}
        </div>
    );
}
