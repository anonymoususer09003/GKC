import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const BASE_URL = 'https://staging-webapp.geekkidscode.com/'
const withRole = (WrappedComponent, allowedRoles) => {
    const AuthorizedRoute = (props) => {
        useEffect(() => {
            const value = JSON.parse(window.localStorage.getItem("gkcAuth"));
            // Check if the user's role is allowed for this route
            // this is comment to reload pipeline
            const userRole = value?.role; // Fetch the user's role from the session
            if(!value && userRole === "Student"){
                window.location.assign(BASE_URL)
            }
            if(!value && userRole === "Parent"){
                window.location.assign(`${BASE_URL}parent`)
            }   if(!value && userRole === "Instructor"){
                window.location.assign(`${BASE_URL}instructor`)
            }
            if (!allowedRoles.includes(userRole)) {
                window.location.assign(`${BASE_URL}auth/signin`)
            }
        }, []);

        return <WrappedComponent {...props }
        />;
    };

    return AuthorizedRoute;
};

export { withRole }