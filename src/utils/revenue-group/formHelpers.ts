import { RevenueGroupFormData } from '@/types/revenueGroup';

export const defaultRevenueGroupFormData: RevenueGroupFormData = {
  description: '',
  id: 0,
  isSpecialGroup: false,
  name: '',
  rules: [],
};

export const defaultRevenueGroupRuleParameterData: RevenueGroupFormData['rules'][number]['parameterList'][number] =
  {
    name: '',
  };

export const defaultRevenueGroupRuleData: RevenueGroupFormData['rules'][number] =
  {
    field: '',
    id: 0,
    operator: '',
    parameterList: [{ ...defaultRevenueGroupRuleParameterData }],
    revenuePercentage: '',
  };
