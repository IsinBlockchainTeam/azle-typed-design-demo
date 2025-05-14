import { AnonymousIdentity, Identity } from "@dfinity/agent";
import { Role } from "models";
import { createContext, ReactNode, useContext, useState } from "react";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";

export type IdentityProviderContextState = {
  identity: Identity;
  principal: Principal;
  role: Role;
  changeRole: (role: Role) => void;
};

export const IdentityProviderContext =
  createContext<IdentityProviderContextState>(
    {} as IdentityProviderContextState,
  );

export const useIdentity = (): IdentityProviderContextState => {
  const context = useContext(IdentityProviderContext);
  if (!context) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return context;
};

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentity] = useState<Identity>(new AnonymousIdentity());
  const [role, setRole] = useState<Role>(Role.USER);
  const [principal, setPrincipal] = useState<Principal>(Principal.anonymous());

  const createRandomIdentity = (): Identity => {
    return Ed25519KeyIdentity.generate();
  };

  const changeRole = (role: Role) => {
    let identity: Identity;

    switch (role) {
      case Role.ADMIN:
        identity = createRandomIdentity();
        break;
      case Role.USER:
        identity = new AnonymousIdentity();
        break;
    }

    setIdentity(identity);
    setPrincipal(identity.getPrincipal());
    setRole(role);
  };

  return (
    <IdentityProviderContext.Provider
      value={{ identity, principal, role, changeRole }}
    >
      {children}
    </IdentityProviderContext.Provider>
  );
}
