'use client';

import RevenueGroupRulesTable from '@/components/revenue-group/table-list/RevenueGroupRulesTable';
import {
  removeRevenueGroup,
  selectRevenueGroupList,
} from '@/lib/redux/features/revenueGroupSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { RevenueGroup } from '@/types/revenueGroup';

type Props = {};

function RevenueGroupList(props: Props) {
  const revenueGroupList = useAppSelector(selectRevenueGroupList);

  return (
    <div className='grid gap-5'>
      {revenueGroupList.map((revenueGroup) => {
        return (
          <div key={revenueGroup.id}>
            <RevenueGroupTable revenueGroup={revenueGroup} />
          </div>
        );
      })}
      {/* <pre>{JSON.stringify(revenueGroupList, null, 2)}</pre> */}
    </div>
  );
}

export default RevenueGroupList;

const RevenueGroupTable = ({
  revenueGroup,
}: {
  revenueGroup: RevenueGroup;
}) => {
  const { id, name, isSpecialGroup, description, rules } = revenueGroup;

  const hasRule = rules.length > 0;
  const dispatch = useAppDispatch();
  const handleDeleteGroup = () => {
    dispatch(removeRevenueGroup(id));
  };
  return (
    <div className='border border-gray-200 rounded-md'>
      <div className='flex items-center gap-5 p-2'>
        <div className='text-lg'>{name}</div>
        {isSpecialGroup ? (
          <div className='badge badge-primary'>Special Group</div>
        ) : null}
        <div className='flex-grow'></div>
        <button className='btn btn-ghost btn-sm' onClick={handleDeleteGroup}>
          ✕
        </button>
      </div>

      <div className='p-2'>
        <div title={`description`} className='text-sm text-gray-500'>
          {description}
        </div>
      </div>

      {/* rules table */}
      {hasRule ? (
        <div className='p-2'>
          <RevenueGroupRulesTable rules={rules} revenueGroup={revenueGroup} />
        </div>
      ) : null}
    </div>
  );
};
