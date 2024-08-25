import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

export type SortDirection = 'asc' | 'dsc';
export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter;
};

export class SearchParams {
  protected __page: number;
  protected __perPage: number = 15;
  protected __sort: string | null;
  protected __sortDir: SortDirection | null;
  protected __filter: string | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
  }

  private set page(page: number) {
    let __page = +page;

    if (
      Number.isNaN(__page) ||
      __page <= 0 ||
      parseInt(__page as any) !== __page
    ) {
      __page = 1;
    }
    this.__page = __page;
  }

  private set perPage(perPage: number) {
    let __perPage = perPage === (true as any) ? this.__perPage : perPage;

    if (
      Number.isNaN(__perPage) ||
      __perPage <= 0 ||
      parseInt(__perPage as any) !== __perPage
    ) {
      __perPage = this.__perPage;
    }
    this.__perPage = __perPage;
  }

  private set sort(sort: string | null) {
    const conditions = sort === null || sort === undefined || sort === '';
    this.__sort = conditions ? null : `${sort}`;
  }

  private set sortDir(sortDir: SortDirection | null) {
    let __sortDir = `${sortDir}`.toLowerCase();
    const condition = __sortDir !== 'asc' && __sortDir !== 'dsc';

    if (condition) __sortDir = 'dsc';
    if (!this.sort) __sortDir = null;

    this.__sortDir = __sortDir as SortDirection;
  }

  private set filter(filter: string | null) {
    const conditions = filter === null || filter === undefined || filter === '';
    this.__filter = conditions ? null : `${filter}`;
  }

  get page() {
    return this.__page;
  }

  get perPage() {
    return this.__perPage;
  }

  get sort() {
    return this.__sort;
  }

  get sortDir() {
    return this.__sortDir;
  }

  get filter() {
    return this.__filter;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
