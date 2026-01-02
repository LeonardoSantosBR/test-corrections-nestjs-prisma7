import { whereGlobal } from 'src/common/where-global.hp';
import { optType } from 'src/types/type-filter';
import { querySearchTest } from 'src/modules/test/dto/query-search-test';

export const testFilter = (query: querySearchTest) => {
    const opt: any = {
        name: {
            value: query?.search,
            type: optType.stringLike,
            path: 'name',
        },
    };

    return whereGlobal(opt);
};