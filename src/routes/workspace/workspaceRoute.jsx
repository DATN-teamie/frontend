import CreateBoard from '../../pages/Board/CreateBoard';
import UpdateWorkspace from '../../pages/Workspace/UpdateWorkspace';
import WorkspaceSideBar from '../../pages/Workspace/WorkspaceSideBar';
import WspBoardHomepage from '../../pages/Workspace/WspBoardHomepage';
import WspCreateRole from '../../pages/Workspace/WspCreateRole';
import WspEditRole from '../../pages/Workspace/WspEditRole';
import WspRoleSetting from '../../pages/Workspace/WspRoleSetting';
import boardRoute from '../board/boardRoute';
import detailWorkspaceLoader from './detailWorkspaceLoader';
import detailWspRoleLoader from './detailWspRoleLoader';
import listWspRoleLoader from './listWspRoleLoader';
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
      loader: listWspRoleLoader,
    },
    {
      path: 'workspace-create-role',
      element: <WspCreateRole />,
    },
    {
      path: 'workspace-create-role',
    },
    {
      path: 'workspace-edit-role/:roleWspId',
      element: <WspEditRole />,
      loader: detailWspRoleLoader,
    },
    memberWorkspaceRoute,
    boardRoute,
  ],
};
