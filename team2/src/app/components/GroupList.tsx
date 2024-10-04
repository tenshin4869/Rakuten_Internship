"use client"; // クライアントコンポーネントとして指定

type Group = {
  id: string;
  name: string;
  color: string;
};

interface GroupListProps {
  groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col items-center">
          <div
            className={`w-24 h-24 rounded-full ${group.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
          >
            {group.name.charAt(0)}
          </div>
          <span className="mt-2 text-sm font-medium text-gray-700">
            {group.name}
          </span>
        </div>
      ))}
      <div className="flex flex-col items-center">
        <button className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="sr-only">新しいグループを作成</span>
        </button>
        <span className="mt-2 text-sm font-medium text-gray-700">新規作成</span>
      </div>
    </div>
  );
};

export default GroupList;
