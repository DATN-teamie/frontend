import TopBar from '../pages/TopBar';
import topBarLoader from './topBarLoader';
import CreateWorkspace from '../pages/Workspace/CreateWorkspace';
import ListWorkspace from '../pages/Workspace/ListWorkspace';
import listWorkspaceLoader from './workspace/listWorkspaceLoader';
import workspaceRoute from './workspace/workspaceRoute';


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
    workspaceRoute,
  ],
};
