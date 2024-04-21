import { useCallback, useState } from "react";

const sessionKey = "__g1ft5h0p__";
const userKey = "__u53r@r0l3_";

export const getInstance = () => sessionStorage.getItem(sessionKey) || "";
const useSession = () => {

    const [inSession, setInSession] = useState(() => {
        return !!sessionStorage.getItem(sessionKey);
    });
    const [user, setUser] = useState(() => {
        const sUser = sessionStorage.getItem(userKey);
        if (sUser) {
            try {
                return JSON.parse(sUser);

            } catch (e) {
                return { role: 'guest' };
            }
        }
    });
    const [instance, setInstance] = useState(() => {
        return sessionStorage.getItem(sessionKey);
    });

    const login = useCallback((data, redirectTo = "/") => {
        if (data) {
            const { user, key } = data;
            sessionStorage.setItem(sessionKey, key);
            sessionStorage.setItem(userKey, JSON.stringify(user));

            setInSession(true);
            setUser(user);
            setInstance(key);
            location.replace(redirectTo);
        }
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(sessionKey);
        sessionStorage.removeItem(userKey);
        setInSession(false);
        setUser({ role: 'guest' });
        location.replace("/");
    }, []);


    return { user, login, logout, inSession, instance };
}

export default useSession;