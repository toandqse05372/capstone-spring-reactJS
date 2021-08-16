import React from 'react';
import UserInformation from './UserInformation/UserInformation';
import UserUpdateInformation from './UserUpdateInformation/UserUpdateInformation';
import UserOrders from './UserOrders/UserOrders';
import UserChangePassword from './UserChangePassword/UserChangePassword';
import UserOrderDetail from './UserOrderDetail/UserOrderDetail';



const subMenuRouter = [
    {
        path: '/userProfile/myProfile',
        exact: false,
        main: ({ history, location, match }) => <UserInformation history={history} location={location} match={match}  />
    },
    {
        path: '/userProfile/ediProfile',
        exact: false,
        main: ({ history, location }) => <UserUpdateInformation history={history} location={location} />
    },
    {
        path: '/userProfile/myOrders',
        exact: false,
        main: ({ history, location, match }) => <UserOrders history={history} location={location} match={match} />
    },
    {
        path: '/userProfile/changePassword',
        exact: false,
        main: ({ history, location }) => <UserChangePassword history={history} location={location} />
    },
    {
        path: '/userProfile/myOrder/:id',
        exact: false,
        main: ({ history, location, match }) => <UserOrderDetail history={history} location={location} match={match} />
    },
];
export default subMenuRouter;