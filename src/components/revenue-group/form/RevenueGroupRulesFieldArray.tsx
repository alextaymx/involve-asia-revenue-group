import RevenueGroupRuleParameterListFieldArray from '@/components/revenue-group/form/RevenueGroupRuleParameterListFieldArray';
import { RevenueGroup } from '@/types/revenueGroup';
import { defaultRevenueGroupRuleData } from '@/utils/revenue-group/formHelpers';
import { useCallback } from 'react';
import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form';

type Props = {
  name: 'rules';
  methods: UseFormReturn<RevenueGroup, any>;
};

function RevenueGroupRulesFieldArray({ methods, name }: Props) {
  const { control } = methods;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
      keyName: 'uid',
    }
  );
  const handleAppendRule = useCallback((id: number) => {
    append({ ...defaultRevenueGroupRuleData, id });
  }, []);

  const handleRemove = useCallback((index: number) => {
    remove(index);
  }, []);

  return (
    <div className='w-full my-5'>
      {/* header */}
      <div className='flex justify-between w-full gap-2 my-2'>
        <div className='text-lg'>Rules</div>
        <div>
          <button
            type='button'
            className='rounded-2xl btn btn-outline btn-sm btn-primary'
            onClick={() => handleAppendRule(fields.length)}
          >
            + Add
          </button>
        </div>
      </div>

      {/* field array */}
      <div className='grid gap-2'>
        {fields.map((field, index) => {
          return (
            <RevenueGroupRuleField
              key={field.uid}
              fieldItem={field}
              index={index}
              methods={methods}
              handleRemove={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RevenueGroupRulesFieldArray;

const ruleFieldOptions = [
  {
    label: 'afff_sub_1',
    value: 'afff_sub_1',
  },
  {
    label: 'afff_sub_2',
    value: 'afff_sub_2',
  },
  {
    label: 'afff_sub_3',
    value: 'afff_sub_3',
  },
  {
    label: 'afff_sub_4',
    value: 'afff_sub_4',
  },
];

const ruleOperatorOptions = [
  {
    label: 'is not',
    value: 'is not',
  },
  {
    label: 'is',
    value: 'is',
  },
  {
    label: 'contains',
    value: 'contains',
  },
  {
    label: "doesn't contain",
    value: "doesn't contain",
  },
  {
    label: 'starts with',
    value: 'starts with',
  },
  {
    label: 'ends with',
    value: 'ends with',
  },
];

const RevenueGroupRuleField = ({
  fieldItem,
  index,
  methods,
  handleRemove,
}: {
  fieldItem: FieldArrayWithId<RevenueGroup, 'rules', 'uid'>;
  index: number;
  methods: UseFormReturn<RevenueGroup, any>;
  handleRemove: (index: number) => void;
}) => {
  const { register } = methods;
  // const { field, id, operator, parameterList, revenuePercentage } = fieldItem;

  const PREFIX = `rules.${index}.` as const;

  return (
    <div className='p-2 text-sm border-2 border-dashed rounded-md'>
      {/* header */}
      <div className='flex justify-between gap-2'>
        {/* label */}
        <div className=''>Rule {index + 1}</div>
        {/* action */}
        <button
          className='btn btn-square btn-xs btn-ghost'
          onClick={() => handleRemove(index)}
        >
          ✕
        </button>
      </div>
      {/* content */}
      <div className='flex flex-wrap items-center w-full gap-2 p-2 bg-gray-100 rounded-md'>
        <div>If</div>
        {/* field select */}
        <div className='w-full max-w-[8rem] form-control'>
          <select
            className='select select-sm select-bordered'
            {...register(`${PREFIX}field`)}
          >
            <option disabled selected value={''}>
              Select field
            </option>
            {ruleFieldOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        {/* operator select */}
        <div className='w-full max-w-[10rem] form-control'>
          <select
            className='select select-sm select-bordered'
            {...register(`${PREFIX}operator`)}
          >
            <option disabled selected value={''}>
              Select operator
            </option>
            {ruleOperatorOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>

        <RevenueGroupRuleParameterListFieldArray
          methods={methods}
          name={`${PREFIX}parameterList` as const}
        />
      </div>

      {/* footer */}
      <div>
        <div className='flex items-center gap-2 p-2 bg-gray-100 rounded-md'>
          <div>then revenue is</div>
          <div className='form-control '>
            {/* <label className='label'>
              <span className='label-text'></span>
            </label> */}
            <label className='input-group'>
              <span className=''>%</span>
              <input
                type='number'
                placeholder='Enter amount'
                className='input input-bordered input-sm max-w-[8rem]'
                {...register(`${PREFIX}revenuePercentage`, {
                  valueAsNumber: true,
                })}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
