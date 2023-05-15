export type RevenueGroup = {
  id: number;
  name: string;
  description: string;
  isSpecialGroup: boolean;
  rules: Array<RevenueRule>;
};

export type RevenueRule = {
  id: number;
  field: string | null;
  operator: string | null;
  parameterList: Array<RevenueRuleParameter>;
  revenuePercentage: number | '';
};

export type RevenueRuleParameter = {
  name: string;
};

export type RevenueGroupFormData = RevenueGroup;
