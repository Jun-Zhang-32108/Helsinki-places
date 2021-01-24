import React from 'react';

export const Row = (user) => (
  <tr key={user.id}>
    <td>
      <span>{user.name}</span>
    </td>
    <td>
      <span>{user.address}</span>
    </td>
    <td>
      <span>{user.opening_hours}</span>
    </td>
    <td>
      <span>{user.opening_hours_exception}</span>
    </td>
  </tr>
);