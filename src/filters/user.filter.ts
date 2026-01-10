import { whereGlobal } from 'src/common/where-global.hp';
import { optType } from 'src/types/type-filter';
import { querySearchUser } from 'src/modules/users/dto/query-search-test';

export const userFilter = (query: querySearchUser) => {
  const opt: any = {
    name: {
      value: query?.search,
      type: optType.stringLike,
      path: 'name',
    },
    cpf: {
      value: query?.search,
      type: optType.stringLike,
      path: 'cpf',
    },
    email: {
      value: query?.search,
      type: optType.stringLike,
      path: 'email',
    },
  };

  return whereGlobal(opt);
};
