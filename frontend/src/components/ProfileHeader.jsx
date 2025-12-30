import "../styles/ProfileHeader.css";

function ProfileHeader({ user, onLogout }) {
  // Always show the first letter of the username as the avatar
  const fallbackLetter = user?.username
    ? user.username.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="profile-header">
      <div className="profile-info">
        <div className="avatar">
          <span className="avatar-fallback">{fallbackLetter}</span>
        </div>
        <div className="names">
          <div className="title">
            {user?.first_name || user?.username || "User"}
          </div>
          <div className="subtitle">{user?.last_name || ""}</div>
        </div>
      </div>
      <button className="logout-fallback" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProfileHeader;
