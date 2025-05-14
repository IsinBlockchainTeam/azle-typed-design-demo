import Dashboard from "./pages/Dashboard";
import { CompanyProvider } from "./providers/CompanyProvider";
import { EmployeeProvider } from "./providers/EmployeeProvider";
import { IdentityProvider } from "./providers/IdentityProvider";
import { LoadingProvider } from "./providers/LoadingProvider";

export const App = () => {
  return (
    <IdentityProvider>
      <LoadingProvider>
        <CompanyProvider>
          <EmployeeProvider>
            <Dashboard />
          </EmployeeProvider>
        </CompanyProvider>
      </LoadingProvider>
    </IdentityProvider>
  );
};

export default App;
