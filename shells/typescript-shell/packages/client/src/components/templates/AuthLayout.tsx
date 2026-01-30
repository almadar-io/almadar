import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

export interface AuthLayoutProps {
  /** App name */
  appName?: string;
  /** Logo component or URL */
  logo?: React.ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Show branding panel on the side */
  showBranding?: boolean;
  /** Branding panel content */
  brandingContent?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  appName = '{{APP_TITLE}}',
  logo,
  backgroundImage,
  showBranding = true,
  brandingContent,
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Branding panel (desktop only) */}
      {showBranding && (
        <div
          className={cn(
            'hidden lg:flex lg:w-1/2 bg-primary-600 relative overflow-hidden',
            'flex-col justify-between p-12'
          )}
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }
              : undefined
          }
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90" />

          {/* Content */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3">
              {logo || (
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <span className="text-white font-bold text-lg">
                    {appName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-2xl font-bold text-white">{appName}</span>
            </Link>
          </div>

          {/* Custom branding content or default */}
          <div className="relative z-10">
            {brandingContent || (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white leading-tight">
                  Welcome to {appName}
                </h1>
                <p className="text-lg text-white/80 max-w-md">
                  Sign in to access your dashboard and manage your account.
                </p>

                {/* Testimonial or feature list */}
                <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur">
                  <p className="text-white/90 italic">
                    "This platform has transformed how we work. Highly recommended!"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full" />
                    <div>
                      <p className="text-white font-medium">Jane Doe</p>
                      <p className="text-white/60 text-sm">CEO, Example Co.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
        </div>
      )}

      {/* Auth form panel */}
      <div
        className={cn(
          'flex-1 flex items-center justify-center p-6 sm:p-12',
          'bg-white'
        )}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-3">
              {logo || (
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {appName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-2xl font-bold text-gray-900">{appName}</span>
            </Link>
          </div>

          {/* Auth form content (from child routes) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
