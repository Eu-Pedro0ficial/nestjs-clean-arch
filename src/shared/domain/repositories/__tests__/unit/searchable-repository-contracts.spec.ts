import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts';

describe('Searchable Repository', () => {
  describe('Search Params unit tests', () => {
    it('page prop', () => {
      const sut = new SearchParams();
      expect(sut.page).toStrictEqual(1);

      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: 0 as any, expected: 1 },
        { page: -2 as any, expected: 1 },
        { page: 5.5 as any, expected: 1 },
        { page: true as any, expected: 1 },
        { page: false as any, expected: 1 },
        { page: {} as any, expected: 1 },
        { page: 1 as any, expected: 1 },
        { page: 2 as any, expected: 2 },
      ];

      params.forEach(param => {
        expect(new SearchParams({ page: param.page }).page).toEqual(
          param.expected,
        );
      });
    });

    it('perPage prop', () => {
      const sut = new SearchParams();
      expect(sut.perPage).toEqual(15);

      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: 0 as any, expected: 15 },
        { perPage: -2 as any, expected: 15 },
        { perPage: 5.5 as any, expected: 15 },
        { perPage: true as any, expected: 15 },
        { perPage: false as any, expected: 15 },
        { perPage: {} as any, expected: 15 },
        { perPage: 1 as any, expected: 1 },
        { perPage: 2 as any, expected: 2 },
        { perPage: 25 as any, expected: 25 },
      ];

      params.forEach(param => {
        expect(new SearchParams({ perPage: param.perPage }).perPage).toEqual(
          param.expected,
        );
      });
    });

    it('sort prop', () => {
      const sut = new SearchParams();
      expect(sut.sort).toBeNull();

      const params = [
        { sort: null as any, expected: null },
        { sort: undefined as any, expected: null },
        { sort: '' as any, expected: null },
        { sort: 0 as any, expected: '0' },
        { sort: -2 as any, expected: '-2' },
        { sort: 5.5 as any, expected: '5.5' },
        { sort: true as any, expected: 'true' },
        { sort: false as any, expected: 'false' },
        { sort: {} as any, expected: '[object Object]' },
        { sort: 1 as any, expected: '1' },
        { sort: 2 as any, expected: '2' },
        { sort: 25 as any, expected: '25' },
        { sort: 'name', expected: 'name' },
      ];

      params.forEach(param => {
        expect(new SearchParams({ sort: param.sort }).sort).toEqual(
          param.expected,
        );
      });
    });

    it('sortDir prop', () => {
      let sut = new SearchParams();
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: null });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: undefined });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: '' });
      expect(sut.sortDir).toBeNull();

      const params = [
        { sortDir: null as any, expected: 'dsc' },
        { sortDir: undefined as any, expected: 'dsc' },
        { sortDir: '' as any, expected: 'dsc' },
        { sortDir: 0 as any, expected: 'dsc' },
        { sortDir: -2 as any, expected: 'dsc' },
        { sortDir: 5.5 as any, expected: 'dsc' },
        { sortDir: true as any, expected: 'dsc' },
        { sortDir: false as any, expected: 'dsc' },
        { sortDir: {} as any, expected: 'dsc' },
        { sortDir: 1 as any, expected: 'dsc' },
        { sortDir: 2 as any, expected: 'dsc' },
        { sortDir: 25 as any, expected: 'dsc' },
        { sortDir: 'name', expected: 'dsc' },
        { sortDir: 'dsc', expected: 'dsc' },
        { sortDir: 'asc', expected: 'asc' },
        { sortDir: 'DSC', expected: 'dsc' },
        { sortDir: 'ASC', expected: 'asc' },
      ];

      params.forEach(param => {
        expect(
          new SearchParams({ sort: 'field', sortDir: param.sortDir }).sortDir,
        ).toEqual(param.expected);
      });
    });

    it('filter prop', () => {
      const sut = new SearchParams();
      expect(sut.filter).toBeNull();

      const params = [
        { filter: null as any, expected: null },
        { filter: undefined as any, expected: null },
        { filter: '' as any, expected: null },
        { filter: 0 as any, expected: '0' },
        { filter: -2 as any, expected: '-2' },
        { filter: 5.5 as any, expected: '5.5' },
        { filter: true as any, expected: 'true' },
        { filter: false as any, expected: 'false' },
        { filter: {} as any, expected: '[object Object]' },
        { filter: 1 as any, expected: '1' },
        { filter: 2 as any, expected: '2' },
        { filter: 25 as any, expected: '25' },
        { filter: 'name', expected: 'name' },
      ];

      params.forEach(param => {
        expect(new SearchParams({ filter: param.filter }).filter).toEqual(
          param.expected,
        );
      });
    });
  });

  describe('SearchResult Params', () => {
    it('constructor props', () => {
      let sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      });

      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        lastPage: 2,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      });

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'teste',
      });

      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        lastPage: 2,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'teste',
      });

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: 'teste',
      });

      expect(sut.lastPage).toStrictEqual(1);

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: 'teste',
      });

      expect(sut.lastPage).toStrictEqual(6);
    });
  });
});
