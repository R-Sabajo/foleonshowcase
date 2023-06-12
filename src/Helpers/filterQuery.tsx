import qs from 'qs';

export const filterQuery = (
  page: number,
  limit: number,
  //  Search
  field0: string,
  type0: string,
  value0: string | number,
  // Sort
  orderbyField: string,
  orderbyType: string,
  orderbyDirection: string,
  // Filter
  field1?: string,
  type1?: string,
  value1?: string | number,
  // Project
  field2?: string,
  type2?: string,
  value2?: string | number
) => {
  let query = qs.stringify({
    page: page,
    limit: limit,
    filter: [
      {
        field: field0,
        type: type0,
        value: typeof value0 === 'number' ? value0 : `%${value0}%`,
      },
      {
        field: field1,
        type: type1,
        value: value1,
      },
      {
        field: field2,
        type: type2,
        value: value2,
      },
    ],

    'order-by': [
      {
        field: orderbyField,
        type: orderbyType,
        direction: orderbyDirection,
      },
    ],
  });
  return query;
};
