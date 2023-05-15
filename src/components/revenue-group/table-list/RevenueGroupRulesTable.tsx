import {
  removeRuleForRevenueGroup,
  revenueGroup,
} from '@/lib/redux/features/revenueGroupSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import {
  RevenueGroup,
  RevenueRule,
  RevenueRuleParameter,
} from '@/types/revenueGroup';
import React from 'react';

type Props = { rules: RevenueRule[]; revenueGroup: RevenueGroup };

function RevenueGroupRulesTable({ rules, revenueGroup }: Props) {
  const ruleWithMaximumParameterCount = rules.reduce((prev, current) => {
    if (!prev) return current;
    return prev.parameterList.length > current.parameterList.length
      ? prev
      : current;
  }, rules[0]);

  const maxParameterList = ruleWithMaximumParameterCount?.parameterList ?? [];

  return (
    <div className='overflow-x-auto max-w-[50vw]'>
      <table className='table w-full table-compact'>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Field</th>
            <th>Operator</th>
            {maxParameterList.map((_, index) => {
              return <th key={index}>Parameter {index + 1}</th>;
            })}
            <th>Revenue</th>
            <th>Action</th>
          </tr>
        </thead>
        <RevenueGroupRulesTableBody
          rules={rules}
          maxParameterList={maxParameterList}
          revenueGroup={revenueGroup}
        />
        {/* <tfoot>
          <tr>
            <th>Rule</th>
            <th>Field</th>
            <th>Operator</th>
            {maxParameterList.map((_, index) => {
              return <th key={index}>Parameter {index + 1}</th>;
            })}
            <th>Revenue</th>
            <th>Action</th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}

export default RevenueGroupRulesTable;

const RevenueGroupRulesTableBody = ({
  rules,
  maxParameterList,
  revenueGroup,
}: {
  rules: RevenueRule[];
  maxParameterList: RevenueRuleParameter[];
  revenueGroup: RevenueGroup;
}) => {
  return (
    <tbody>
      {rules.map((rule, index) => {
        return (
          <RevenueGroupRulesTableRow
            key={index}
            rule={rule}
            maxParameterList={maxParameterList}
            revenueGroup={revenueGroup}
          />
        );
      })}
    </tbody>
  );
};
const RevenueGroupRulesTableRow = ({
  rule,
  maxParameterList,
  revenueGroup,
}: {
  rule: RevenueRule;
  maxParameterList: RevenueRuleParameter[];
  revenueGroup: RevenueGroup;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteRule = () => {
    dispatch(
      removeRuleForRevenueGroup({ groupId: revenueGroup.id, ruleId: rule.id })
    );
  };
  return (
    <tr>
      <td>{rule.id + 1}</td>
      <td>{rule.field}</td>
      <td>{rule.operator}</td>
      {maxParameterList.map((parameter, index) => {
        const currentParameterList = rule.parameterList;
        const currentParameter = currentParameterList[index];
        return <td key={index}>{currentParameter?.name}</td>;
      })}
      <td>{rule.revenuePercentage}</td>
      <td>
        <button className='btn btn-sm btn-danger' onClick={handleDeleteRule}>
          Delete
        </button>
      </td>
    </tr>
  );
};
