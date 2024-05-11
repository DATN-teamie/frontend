import CreateBoard from '../../pages/Board/CreateBoard';
import UpdateWorkspace from '../../pages/Workspace/UpdateWorkspace';
import WorkspaceSideBar from '../../pages/Workspace/WorkspaceSideBar';
import WspBoardHomepage from '../../pages/Workspace/WspBoardHomepage';
import detailWorkspaceLoader from './detailWorkspaceLoader';

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
  ],
};
