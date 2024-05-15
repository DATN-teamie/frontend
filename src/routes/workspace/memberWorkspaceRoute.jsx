import WspMemberList from '../../pages/Workspace/WspMemberList';
import WspMemberInvite from '../../pages/Workspace/WspMemberInvite';
import WspMemberTab from '../../pages/Workspace/WspMemberTab';

export default {
  path: 'members',
  element: <WspMemberTab />,
  children: [
    {
      path: '',
      element: <WspMemberList />,
      index: true,
    },
    {
      path: 'invite',
      element: <WspMemberInvite />,
    },
  ],
};
