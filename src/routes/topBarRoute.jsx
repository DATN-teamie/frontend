import TopBar from '../pages/TopBar';
import topBarLoader from './topBarLoader';
import CreateWorkspace from '../pages/Workspace/CreateWorkspace';
import ListWorkspace from '../pages/Workspace/ListWorkspace';
import listWorkspaceLoader from './workspace/listWorkspaceLoader';
import workspaceRoute from './workspace/workspaceRoute';
import UpdateUser from '../pages/User/UpdateUser';
import ResetPassword from '../pages/User/ResetPassword';


export default {
  path: '/h',
  element: <TopBar />,
  loader: topBarLoader,
  children: [
    {
      path: '',
      element: <ListWorkspace />,
      loader: listWorkspaceLoader,
    },
    {
      path: 'create-workspace',
      element: <CreateWorkspace />,
    },
    {
      path: 'update-user',
      element: <UpdateUser />,
    },
    {
      path: 'reset-password',
      element: <ResetPassword />,
    },
    workspaceRoute,
  ],
};
