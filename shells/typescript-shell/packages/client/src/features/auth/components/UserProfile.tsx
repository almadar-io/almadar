import React from 'react';
import { useAuthContext } from '../AuthContext';
import { LogOut, User } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, signOut, loading } = useAuthContext();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* User Avatar */}
      <div className="flex items-center gap-2">
        {user.photoURL ? (
          <img
            className="h-8 w-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 shadow-sm"
            src={user.photoURL}
            alt={user.displayName || user.email || 'User'}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </div>
        )}
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
          {user.displayName || user.email}
        </span>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 disabled:opacity-50"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </div>
  );
};

export default UserProfile;
