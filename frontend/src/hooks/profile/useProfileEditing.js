import { updateMe } from "../../services/userService";

export function useProfileEditing({
    currentUser,
    setCurrentUser,
    triggerMessage,
    loadProfileData,
    editDescription,
    editSummary,
    editPrivacy,
    isSavingProfile,
    setIsSavingProfile,
    isEditingProfile,
    setIsEditingProfile
}) {
    // Update profile settings
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSavingProfile(true);
        try {
            const updated = await updateMe({
                description: editDescription,
                summary: editSummary,
                followPrivacy: editPrivacy
            });
            setCurrentUser(updated);
            setIsEditingProfile(false);
            triggerMessage("Profile updated successfully!");
        } catch (err) {
            triggerMessage(err.message, "error");
        } finally {
            setIsSavingProfile(false);
        }
    };

    // Profile photo update trigger
    const handleProfilePhotoUpdate = async (uploadedUrl) => {
        try {
            const updated = await updateMe({
                profilePhotoUrl: uploadedUrl
            });
            setCurrentUser(updated);
            triggerMessage("Profile photo uploaded!");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    return {
        isSavingProfile,
        isEditingProfile,
        setIsEditingProfile,
        handleUpdateProfile,
        handleProfilePhotoUpdate
    };
}
