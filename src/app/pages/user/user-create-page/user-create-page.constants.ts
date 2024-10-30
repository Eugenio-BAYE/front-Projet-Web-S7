export const USER_CREATE_FORM_FIELDS = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Enter username',
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
      required: true,
    },
    {
      label: 'Role',
      name: 'role',
      type: 'select',
      options: ['admin', 'manager'],
      placeholder: 'Select a role',
      required: true,
    },
  ];
  