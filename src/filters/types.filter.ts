import { whereGlobal } from 'src/common/where-global.hp';
import { optType } from 'src/types/type-filter';
import { querySearchTypes } from 'src/modules/types/dto/query-search-types';

export const typesFilter = (query: querySearchTypes) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    },
  };

  return whereGlobal(opt);
};
