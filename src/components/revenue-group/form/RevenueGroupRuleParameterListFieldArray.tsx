import { useCallback } from 'react';
import {
  FieldArrayWithId,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';

import { defaultRevenueGroupRuleParameterData } from '@/utils/revenue-group/formHelpers';

import { RevenueGroup } from '@/types/revenueGroup';

type Props = {
  name: `rules.${number}.parameterList`;
  methods: UseFormReturn<RevenueGroup, any>;
};

function RevenueGroupRuleParameterListFieldArray({ methods, name }: Props) {
  const { control } = methods;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
      keyName: 'uid',
    }
  );
  const handleAppendRuleParam = useCallback(() => {
    append({ ...defaultRevenueGroupRuleParameterData });
  }, []);

  const handleRemove = useCallback((index: number) => {
    remove(index);
  }, []);
  const parentPrefix = `${name}.` as const;
  return (
    <div className='grid w-full gap-2'>
      {/* field array */}
      {fields.map((field, index) => {
        return (
          <RevenueGroupRuleParameterListField
            key={field.uid}
            fieldItem={field}
            index={index}
            methods={methods}
            handleRemove={handleRemove}
            parentPrefix={parentPrefix}
            handleAppendRuleParam={handleAppendRuleParam}
          />
        );
      })}
    </div>
  );
}

export default RevenueGroupRuleParameterListFieldArray;

const RevenueGroupRuleParameterListField = ({
  fieldItem,
  index,
  methods,
  handleRemove,
  parentPrefix,
  handleAppendRuleParam,
}: {
  fieldItem: FieldArrayWithId<
    RevenueGroup,
    `rules.${number}.parameterList`,
    'uid'
  >;
  index: number;
  methods: UseFormReturn<RevenueGroup, any>;
  handleRemove: (index: number) => void;
  handleAppendRuleParam: () => void;
  parentPrefix: `rules.${number}.parameterList.`;
}) => {
  const { register } = methods;
  const { name } = fieldItem;

  const PREFIX = `${parentPrefix}${index}.` as const;

  return (
    <div className='flex items-center w-full gap-2 text-sm'>
      {/* input */}
      <div className='form-control '>
        <div className='w-full form-control'>
          <input
            type='text'
            placeholder='Enter parameter'
            className='w-full input input-bordered input-sm'
            {...register(`${PREFIX}name`)}
          />
        </div>
      </div>
      {/* action */}
      {index === 0 ? (
        <button
          type='button'
          className='font-bold btn btn-square btn-xs btn-ghost '
          onClick={handleAppendRuleParam}
        >
          +
        </button>
      ) : (
        <button
          type='button'
          className='btn btn-square btn-xs btn-ghost'
          onClick={() => handleRemove(index)}
        >
          ✕
        </button>
      )}
    </div>
  );
};
