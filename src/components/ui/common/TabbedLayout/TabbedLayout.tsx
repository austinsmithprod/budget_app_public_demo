import React, { useState } from 'react';

export interface TabItem {
  label?: string,
  content: React.ReactNode,
  Icon?: React.ElementType;
}

type TabbedLayoutProps = {
  tabItems: TabItem[]
}

export const TabbedLayout = ({ tabItems }: TabbedLayoutProps) => {

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className='flex'>
      {/* Tab Buttons */}
      <div className='flex flex-col space-y-2 p-2'>
        {tabItems.map((tab, index) => (
          <button
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`text-white m-2 w-16 h-16 px-2 py-2 rounded-lg transition ${selectedTab === index ? 'bg-blue-500' : 'bg-blue-200'}`}
          >
            {tab.Icon && <tab.Icon className="icon" />}
            {/* {tab.label && tab.label} */}
          </button>
        ))}
      </div>
      <div className="h-full border-l-2 border-gray-200"></div>
      {/* Tab Content */}
      <div className='flex-1'>
        {tabItems[selectedTab] && <div>{tabItems[selectedTab].content}</div>}
      </div>
    </div>
  );
};