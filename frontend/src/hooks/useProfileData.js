import { useProfileLoader } from "./profile/useProfileLoader";
import { useProfileEditing } from "./profile/useProfileEditing";
import { useProfilePosts } from "./profile/useProfilePosts";
import { usePostDetails } from "./profile/usePostDetails";
import { useProfileLikes } from "./profile/useProfileLikes";
import { useProfileComments } from "./profile/useProfileComments";
import { useProfileConnections } from "./profile/useProfileConnections";

export function useProfileData({ triggerMessage }) {
    // 1. Data loading state & trigger
    const loader = useProfileLoader();
    const {
        profileTab,
        setProfileTab,
        loadingData,
        currentUser,
        setCurrentUser,
        myPosts,
        likedPosts,
        myComments,
        friends,
        followers,
        following,
        likedPostIds,
        setLikedPostIds,
        loadProfileData
    } = loader;

    // 2. Profile updating & editing
    const editing = useProfileEditing({
        currentUser,
        setCurrentUser,
        triggerMessage,
        loadProfileData,
        editDescription: loader.editDescription,
        setEditDescription: loader.setEditDescription,
        editSummary: loader.editSummary,
        setEditSummary: loader.setEditSummary,
        editPrivacy: loader.editPrivacy,
        setEditPrivacy: loader.setEditPrivacy,
        isSavingProfile: loader.isSavingProfile,
        setIsSavingProfile: loader.setIsSavingProfile,
        isEditingProfile: loader.isEditingProfile,
        setIsEditingProfile: loader.setIsEditingProfile
    });

    // 3. Create / edit / delete posts
    const posts = useProfilePosts({
        loadProfileData,
        triggerMessage
    });

    // 4. Post details view modal
    const postDetails = usePostDetails({
        triggerMessage
    });
    const { selectedPostDetails, setSelectedPostDetails, viewPostDetails } = postDetails;

    // 5. Likes toggler
    const likes = useProfileLikes({
        likedPostIds,
        setLikedPostIds,
        loadProfileData,
        selectedPostDetails,
        viewPostDetails
    });

    // 6. Comments modal & handlers
    const comments = useProfileComments({
        loadProfileData,
        triggerMessage,
        selectedPostDetails,
        viewPostDetails
    });

    // 7. Connections handlers
    const connections = useProfileConnections({
        loadProfileData,
        triggerMessage
    });

    return {
        profileTab,
        setProfileTab,
        loadingData,
        currentUser,
        myPosts,
        likedPosts,
        myComments,
        friends,
        followers,
        following,
        likedPostIds,

        // Profile editing
        editDescription: loader.editDescription,
        setEditDescription: loader.setEditDescription,
        editSummary: loader.editSummary,
        setEditSummary: loader.setEditSummary,
        editPrivacy: loader.editPrivacy,
        setEditPrivacy: loader.setEditPrivacy,
        isSavingProfile: editing.isSavingProfile,
        isEditingProfile: editing.isEditingProfile,
        setIsEditingProfile: editing.setIsEditingProfile,
        handleUpdateProfile: editing.handleUpdateProfile,
        handleProfilePhotoUpdate: editing.handleProfilePhotoUpdate,

        // Post creation / edit / delete
        newPostContent: posts.newPostContent,
        setNewPostContent: posts.setNewPostContent,
        newPostVisibility: posts.newPostVisibility,
        setNewPostVisibility: posts.setNewPostVisibility,
        newPostType: posts.newPostType,
        setNewPostType: posts.setNewPostType,
        newMediaUrl: posts.newMediaUrl,
        setNewMediaUrl: posts.setNewMediaUrl,
        createLoading: posts.createLoading,
        editingPostId: posts.editingPostId,
        setEditingPostId: posts.setEditingPostId,
        editingContent: posts.editingContent,
        setEditingContent: posts.setEditingContent,
        editingVisibility: posts.editingVisibility,
        setEditingVisibility: posts.setEditingVisibility,
        handleCreatePost: posts.handleCreatePost,
        handleEditPost: posts.handleEditPost,
        handleSavePostEdit: posts.handleSavePostEdit,
        handleDeletePost: posts.handleDeletePost,

        // Likes
        handleLikeToggle: likes.handleLikeToggle,

        // Comments modal & actions
        modalPost: comments.modalPost,
        setModalPost: comments.setModalPost,
        postComments: comments.postComments,
        commentTexts: comments.commentTexts,
        setCommentTexts: comments.setCommentTexts,
        submittingCommentId: comments.submittingCommentId,
        handleOpenCommentsModal: comments.handleOpenCommentsModal,
        handleAddComment: comments.handleAddComment,
        handleDeleteComment: comments.handleDeleteComment,
        handleDeleteOwnCommentFromList: comments.handleDeleteOwnCommentFromList,

        // Post details view modal
        selectedPostDetails,
        setSelectedPostDetails,
        loadingPostDetails: postDetails.loadingPostDetails,
        viewPostDetails,

        // Connections management
        handleRemoveFriend: connections.handleRemoveFriend,
        handleRemoveFollower: connections.handleRemoveFollower,
        handleUnfollow: connections.handleUnfollow,

        // Global load data
        loadProfileData
    };
}
