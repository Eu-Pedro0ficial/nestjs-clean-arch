import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

export type SortDirection = 'asc' | 'desc';
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

  constructor(props: SearchProps) {
    this.__page = props.page;
    this.__perPage = props.perPage;
    this.__sort = props.sort;
    this.__sortDir = props.sortDir;
    this.__filter = props.filter;
  }

  private set page(page: number) {
    this.__page = page;
  }

  private set perPage(perPage: number) {
    this.__perPage = perPage;
  }

  private set sort(sort: string | null) {
    this.__sort = sort;
  }

  private set sortDir(sortDir: SortDirection | null) {
    this.__sortDir = sortDir;
  }

  private set filter(filter: string | null) {
    this.__filter = filter;
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
