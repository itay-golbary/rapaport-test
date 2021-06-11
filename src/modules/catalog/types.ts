export interface Filters {
  page?: number | null;
  pageSize?: number | null;

  searchQuery?: string | null;

  selectedType?: string | null;
  selectedShape?: string | null;
  selectedClarity?: string | null;
  selectedColor?: string | null;

  sortBy?: string | null;
  // groupBy?: string | null;
}

export interface FilterHandlers {
  onChangePage: (value: number) => void;
  onChangePageSize: (value: number) => void;

  onChangeSearchQuery: (value?: string | null) => void;

  onChangeSelectedType: (value?: string | null) => void;
  onChangeSelectedShape: (value?: string | null) => void;
  onChangeSelectedClarity: (value?: string | null) => void;
  onChangeSelectedColor: (value?: string | null) => void;

  onChangeSortBy: (value?: string | null) => void;
}
