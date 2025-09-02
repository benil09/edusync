import { ShieldCheck, Camera } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";

const Profile = () => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("Posts");
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Left Section: Profile Picture and Basic Info */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <div className="relative mb-4">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <label
              className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer flex items-center justify-center"
              title="Change profile picture"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
              />
              <Camera size={18} className="text-gray-700" />
            </label>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-1">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex space-x-6 mt-4 text-center">
            <div>
              <p className="text-xl sm:text-xl  text-gray-900">10</p>
              <p className="text-xs sm:text-sm text-gray-500">Posts</p>
            </div>
            <div>
              <p className="text-xl sm:text-xl  text-gray-900">129</p>
              <p className="text-xs sm:text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-xl sm:text-xl  text-gray-900">220</p>
              <p className="text-xs sm:text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>

        {/* Right Section: Personal Info and Social */}
        <div className="mt-8 md:mt-0 md:w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700 mb-6">
              <div className="flex items-center">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Username:
                </span>
                <span className="text-sm sm:text-base text-gray-800 ml-2">
                  {user.username}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Role:
                </span>
                <span className="text-sm sm:text-base text-gray-800 ml-2">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center col-span-2">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Course :
                </span>
                <span className="text-sm sm:text-base text-gray-800 ml-2">
                  {user.branch}
                </span>
                
              </div>
              <div className="flex items-center col-span-2">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Year:
                </span>
                <span className="text-sm sm:text-base text-gray-800 ml-2">
                  {user.year}
                </span>
              
              </div>
              <div className="flex items-center col-span-2">
                <span className="text-sm sm:text-base font-semibold text-gray-600">
                  Email:
                </span>
                <span className="text-sm sm:text-base text-gray-800 ml-2">
                  {user.email}
                </span>
                <span className="ml-2 text-green-600">
                  <ShieldCheck size={16} />
                </span>
              </div>
            </div>

            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4">
              Social Media
            </h2>
            <div className="flex items-center space-x-3 mb-6">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.922.43.37.823 1.1.823 2.22 0 1.604-.015 2.896-.015 3.286 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <a
                href="https://github.com/alenaparker09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline text-sm sm:text-base break-words"
              >
                github.com/alenaparker09
              </a>
            </div>
          </div>

          <button className="self-start bg-primary text-white text-sm sm:text-base px-6 py-2.5 rounded-lg shadow hover:bg-hover transition-colors mb-6 md:mb-0">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Bottom Tabs Section */}
      <div className="mt-10 border-t pt-6 flex justify-center space-x-6 sm:space-x-10 text-gray-700 font-medium text-sm sm:text-base">
        <button
          onClick={() => setActiveTab("Posts")}
          className={
            activeTab === "Posts"
              ? "bg-primary text-white px-4 py-2 rounded-md"
              : "hover:bg-gray-100 hover:rounded-md px-4 py-2 "
          }
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("Anonymous")}
          className={
            activeTab === "Anonymous"
              ? "bg-primary text-white px-4 py-2 rounded-md"
              : "hover:bg-gray-100 px-4 py-2 hover:rounded-md "
          }
        >
          Anonymous
        </button>
        <button
          onClick={() => setActiveTab("Notes")}
          className={
            activeTab === "Notes"
              ? "bg-primary text-white px-4 py-2 rounded-md"
              : "hover:bg-gray-100 hover:rounded-md px-4 py-2"
          }
        >
          Notes
        </button>
      </div>
    </div>
  );
};

export default Profile;
