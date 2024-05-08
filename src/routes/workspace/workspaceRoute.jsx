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
    },
  ],
};
