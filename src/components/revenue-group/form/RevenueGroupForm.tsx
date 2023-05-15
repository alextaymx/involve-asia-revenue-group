'use client';

import RevenueGroupRulesFieldArray from '@/components/revenue-group/form/RevenueGroupRulesFieldArray';
import { RevenueGroupFormData } from '@/types/revenueGroup';
import { defaultRevenueGroupFormData } from '@/utils/revenue-group/formHelpers';
import { triggerToast } from '@/utils/toast/triggerToast';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onSubmit: (data: RevenueGroupFormData) => void;
};

function RevenueGroupForm({ onSubmit: onSubmitProp }: Props) {
  const methods = useForm<RevenueGroupFormData>({
    defaultValues: defaultRevenueGroupFormData,
  });
  const { register, handleSubmit, reset } = methods;

  const handleReset = useCallback(() => {
    reset();
  }, []);
  const onSubmit = useCallback(
    (data: RevenueGroupFormData) => {
      console.log(data);
      if (!data.name || !data.rules.length) {
        triggerToast('Please fill in group name and add some rules', 'error');
        return;
      }
      onSubmitProp(data);
      handleReset();
    },
    [onSubmitProp, handleReset]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-start gap-2 my-5'
    >
      {/* name */}
      <div className='w-full form-control'>
        <label className='label'>
          <span className='label-text'>Group Name</span>
        </label>
        <input
          type='text'
          placeholder='Name'
          className='w-full input input-bordered input-sm'
          {...register('name')}
        />
      </div>

      {/* description */}
      <div className='w-full form-control'>
        <label className='label'>
          <span className='label-text'>Group Description</span>
        </label>
        <textarea
          className='h-24 textarea textarea-bordered input-sm'
          placeholder='Add description'
          {...register('description')}
        ></textarea>
        <label className='label'>
          <span className='label-text-alt'></span>
          <span className='label-text-alt'>0 / 200</span>
        </label>
      </div>
      <div className='form-control'>
        <label className='cursor-pointer label'>
          <input
            type='checkbox'
            className='rounded-md checkbox checkbox-primary checkbox-sm'
            {...register('isSpecialGroup')}
          />
          <span className='mx-2 label-text'>Special group</span>
        </label>
      </div>

      <RevenueGroupRulesFieldArray name='rules' methods={methods} />

      <div className='flex justify-end w-full gap-2'>
        <button
          type='button'
          onClick={handleReset}
          className='rounded-md btn btn-outline btn-sm'
        >
          Reset
        </button>

        <button type='submit' className='rounded-md btn btn-primary btn-sm'>
          Submit
        </button>
      </div>
    </form>
  );
}

export default RevenueGroupForm;
