import { Role } from "models";
import { useIdentity } from "../../providers/IdentityProvider";

export interface TopBarProps {
  title: string;
}

export const TopBar = ({ title }: TopBarProps) => {
  const { changeRole, role, principal } = useIdentity();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
        <div className="mr-2">
          <span className="text-gray-300 text-sm">Principal ID:</span>
        </div>
        <div className="font-mono text-sm truncate max-w-xs">
          {principal.toString()}
        </div>
      </div>

      <div className="flex items-center">
        <span className="mr-2">View as:</span>
        <div className="flex rounded overflow-hidden">
          {Object.values(Role).map((internalRole, index) => (
            <button
              key={internalRole}
              onClick={() => changeRole(internalRole)}
              className={`
                          px-4 py-2 cursor-pointer
                          ${role === internalRole ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}
                          ${index === 0 ? "rounded-l" : ""}
                          ${index === Object.values(Role).length - 1 ? "rounded-r" : ""}
                      `}
            >
              {internalRole}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
