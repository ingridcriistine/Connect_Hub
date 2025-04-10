
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Edit, Settings } from "lucide-react";

interface ProfileStat {
  value: number;
  label: string;
}

const ProfileStats: React.FC<{ stats: ProfileStat[] }> = ({ stats }) => {
  return (
    <div className="flex justify-center space-x-8 my-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="font-bold text-xl">{stat.value}</div>
          <div className="text-gray-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const Profile: React.FC = () => {
  const { toast } = useToast();
  
  const profileStats: ProfileStat[] = [
    { value: 12, label: "Posts" },
    { value: 86, label: "Following" },
    { value: 102, label: "Followers" }
  ];
  
  const handleFollow = () => {
    toast({
      title: "Success",
      description: "You are now following this user!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
        <div className="bg-connectHub-primary h-24 relative">
          <button className="absolute top-2 right-2 bg-white/20 p-1.5 rounded-full">
            <Settings size={18} className="text-white" />
          </button>
        </div>
        
        <div className="px-6 pb-6">
          <div className="flex justify-center -mt-12">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 bg-connectHub-primary p-1 rounded-full text-white">
                <Edit size={16} />
              </button>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500 text-sm">@johndoe</p>
          </div>
          
          <ProfileStats stats={profileStats} />
          
          <div className="flex justify-center">
            <button
              onClick={handleFollow}
              className="bg-connectHub-primary text-white px-6 py-1.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
            >
              Follow
            </button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-600 text-sm">
              I'm a software developer passionate about creating amazing user experiences. 
              Love to connect with like-minded professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
