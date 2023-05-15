'use client';

import React, { useCallback } from 'react';

import { appendRevenueGroup } from '@/lib/redux/features/revenueGroupSlice';
import { useAppDispatch } from '@/lib/redux/hooks';

import RevenueGroupForm from '@/components/revenue-group/form/RevenueGroupForm';

import { triggerToast } from '@/utils/toast/triggerToast';

import { RevenueGroup } from '@/types/revenueGroup';

type Props = {};

function LeftPanel(props: Props) {
  const dispatch = useAppDispatch();

  const onSubmit = useCallback((formData: RevenueGroup) => {
    dispatch(appendRevenueGroup(formData));
    triggerToast('Revenue Group Added', 'success');
  }, []);

  return (
    <div className='w-full h-full p-3 border rounded border-slate-400'>
      <div className='text-lg'>Create Revenue Group</div>
      <RevenueGroupForm onSubmit={onSubmit} />
    </div>
  );
}

export default LeftPanel;
