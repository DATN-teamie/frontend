import WspMemberList from '../../pages/Workspace/WspMemberList';
import WspMemberInvite from '../../pages/Workspace/WspMemberInvite';
import WspMemberTab from '../../pages/Workspace/WspMemberTab';
import listUsersWspLoader from './listUsersWspLoader';

export default {
  path: 'members',
  element: <WspMemberTab />,
  children: [
    {
      path: '',
      element: <WspMemberList />,
      index: true,
      loader: listUsersWspLoader,
    },
    {
      path: 'invite',
      element: <WspMemberInvite />,
    },
  ],
};
