import React from 'react';

import RevenueGroupList from '@/components/revenue-group/table-list/RevenueGroupList';

type Props = {};

function RightPanel(props: Props) {
  return (
    <div className='w-full h-full col-span-2 border border-transparent rounded'>
      <div className='text-lg mb-5'>Browse Revenue Groups</div>

      <RevenueGroupList />
    </div>
  );
}

export default RightPanel;
