import CreateBoard from '../../pages/Board/CreateBoard';
import UpdateWorkspace from '../../pages/Workspace/UpdateWorkspace';
import WorkspaceSideBar from '../../pages/Workspace/WorkspaceSideBar';
import WspBoardHomepage from '../../pages/Workspace/WspBoardHomepage';
import WspRoleSetting from '../../pages/Workspace/WspRoleSetting';
import boardRoute from '../board/boardRoute';
import detailWorkspaceLoader from './detailWorkspaceLoader';
import memberWorkspaceRoute from './memberWorkspaceRoute';

export default {
  path: 'w/:workspaceId',
  element: <WorkspaceSideBar />,
  loader: detailWorkspaceLoader,
  children: [
    {
      path: '',
      element: <WspBoardHomepage />,
      loader: detailWorkspaceLoader,
    },
    {
      path: 'workspace-update',
      element: <UpdateWorkspace />,
    },
    {
      path: 'create-board',
      element: <CreateBoard />,
    },
    {
      path: 'workspace-role-setting',
      element: <WspRoleSetting />,
    },
    {
      path: 'workspace-create-role'
      
    },
    memberWorkspaceRoute,
    boardRoute,
  ],
};
