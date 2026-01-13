import { whereGlobal } from 'src/common/where-global.hp';
import { optType } from 'src/types/type-filter';
import { querySearchTests } from 'src/modules/tests/dto/query-search-tests';

export const testsFilter = (query: querySearchTests) => {
    const opt: any = {
        name: {
            value: query?.search,
            type: optType.stringLike,
            path: 'name',
        },
    };

    return whereGlobal(opt);
};