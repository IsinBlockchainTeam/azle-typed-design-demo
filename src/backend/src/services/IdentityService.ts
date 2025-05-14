import { msgCaller, Principal } from "azle";
import { Role } from "models";

class IdentityService {
    private static _instance: IdentityService;

    private constructor() {}

    static get instance(): IdentityService {
        if(!IdentityService._instance) {
            IdentityService._instance = new IdentityService();
        }
        return IdentityService._instance;
    }

    getRole(): Role {
        if (msgCaller().toText() === Principal.anonymous().toText()) {
            return Role.USER;
        }

        return Role.ADMIN;
    }
}

export default IdentityService;
