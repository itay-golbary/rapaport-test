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
