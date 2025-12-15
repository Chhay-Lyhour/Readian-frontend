import React from 'react';
import SettingsSidebar from '../components/common/SettingsSidebar';
import MyLiked from '../components/authordash/MyLiked';

const MyLikedPage = () => {
  return (
    <div className="flex min-h-screen bg-[#FFFDEE]">
      <SettingsSidebar />
      <div className="flex-1 p-6 overflow-x-hidden">
        <MyLiked />
      </div>
    </div>
  );
};

export default MyLikedPage;

