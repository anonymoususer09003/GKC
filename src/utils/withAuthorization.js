import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withRole = (WrappedComponent, allowedRoles) => {
    const AuthorizedRoute = (props) => {
        const router = useRouter();

        useEffect(() => {
            const value = JSON.parse(window.localStorage.getItem("gkcAuth"));

            // Check if the user's role is allowed for this route
            const userRole = value?.role; // Fetch the user's role from the session
            if(!value){
                router.push('/auth/signin');
            }
            if (!allowedRoles.includes(userRole)) {
                router.push('/unauthorized');
            }
        }, []);

        return <WrappedComponent {...props }
        />;
    };

    return AuthorizedRoute;
};

export { withRole }