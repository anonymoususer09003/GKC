import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const BASE_URL = 'https://staging-webapp.geekkidscode.com/'
const withRole = (WrappedComponent, allowedRoles) => {
    const AuthorizedRoute = (props) => {
        useEffect(() => {
            const value = JSON.parse(window.localStorage.getItem("gkcAuth"));
            // Check if the user's role is allowed for this route
            // this is comment to reload pipeline
            const userRole = value?.role.toLowerCase(); // Fetch the user's role from the session
            if(!value && userRole === "student"){
                window.location.assign(BASE_URL)
            }
            if(!value && userRole === "parent"){
                window.location.assign(`${BASE_URL}parent`)
            }   
            if(!value && userRole === "instructor"){
                window.location.assign(`${BASE_URL}instructor`)
            }
            if (!allowedRoles[0].toLowerCase().includes(userRole)) {
                window.location.assign(`${BASE_URL}auth/signin`)
            }
        }, []);

        return <WrappedComponent {...props }
        />;
    };

    return AuthorizedRoute;
};

export { withRole }