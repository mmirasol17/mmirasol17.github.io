import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { IProject } from "../hooks/useProjects";
import { TechnologyType } from "../types/TechnologyType";
import { getProjectStatus, getProjectType } from "../utils";

export interface ProjectFilters {
  searchTerm: string;
  selectedTechnologies: TechnologyType[];
  selectedStatuses: string[];
  selectedTypes: string[];
}

interface ProjectFilterContextType {
  // Filter state
  filters: ProjectFilters;
  setFilters: (filters: ProjectFilters) => void;

  // Filtered data
  filteredProjects: IProject[];

  // Available filter options
  availableTechnologies: TechnologyType[];
  availableStatuses: string[];
  availableTypes: string[];

  // Helper functions
  updateSearchTerm: (searchTerm: string) => void;
  toggleTechnology: (tech: TechnologyType) => void;
  toggleStatus: (status: string) => void;
  toggleType: (type: string) => void;
  clearAllFilters: () => void;

  // Utility getters
  hasActiveFilters: boolean;
  totalFilterCount: number;
  resultCount: number;
  totalProjectCount: number;
}

const ProjectFilterContext = createContext<ProjectFilterContextType | undefined>(undefined);

interface ProjectFilterProviderProps {
  children: ReactNode;
  projects: IProject[];
}

export function ProjectFilterProvider({ children, projects }: Readonly<ProjectFilterProviderProps>) {
  const [filters, setFilters] = useState<ProjectFilters>({
    searchTerm: "",
    selectedTechnologies: [],
    selectedStatuses: [],
    selectedTypes: [],
  });

  // Extract unique technologies from all projects
  const availableTechnologies = useMemo(() => {
    const techSet = new Set<TechnologyType>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Extract unique statuses from all projects
  const availableStatuses = useMemo(() => {
    const statusSet = new Set<string>();
    projects.forEach((project) => {
      statusSet.add(getProjectStatus(project));
    });
    return Array.from(statusSet).sort();
  }, [projects]);

  // Extract unique project types from all projects
  const availableTypes = useMemo(() => {
    const typeSet = new Set<string>();
    projects.forEach((project) => {
      typeSet.add(getProjectType(project));
    });
    return Array.from(typeSet).sort();
  }, [projects]);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Technology filter
      if (filters.selectedTechnologies.length > 0) {
        const hasSelectedTech = filters.selectedTechnologies.some((tech) => project.technologies.includes(tech));
        if (!hasSelectedTech) return false;
      }

      // Status filter
      if (filters.selectedStatuses.length > 0) {
        const projectStatus = getProjectStatus(project);
        if (!filters.selectedStatuses.includes(projectStatus)) return false;
      }

      // Type filter
      if (filters.selectedTypes.length > 0) {
        const projectType = getProjectType(project);
        if (!filters.selectedTypes.includes(projectType)) return false;
      }

      return true;
    });
  }, [projects, filters]);

  // Utility functions
  const updateSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const toggleTechnology = (tech: TechnologyType) => {
    setFilters((prev) => ({
      ...prev,
      selectedTechnologies: prev.selectedTechnologies.includes(tech) ? prev.selectedTechnologies.filter((t) => t !== tech) : [...prev.selectedTechnologies, tech],
    }));
  };

  const toggleStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedStatuses: prev.selectedStatuses.includes(status) ? prev.selectedStatuses.filter((s) => s !== status) : [...prev.selectedStatuses, status],
    }));
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type) ? prev.selectedTypes.filter((t) => t !== type) : [...prev.selectedTypes, type],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: "",
      selectedTechnologies: [],
      selectedStatuses: [],
      selectedTypes: [],
    });
  };

  // Computed values
  const hasActiveFilters = filters.selectedTechnologies.length > 0 || filters.selectedStatuses.length > 0 || filters.selectedTypes.length > 0 || filters.searchTerm.length > 0;

  const totalFilterCount = filters.selectedTechnologies.length + filters.selectedStatuses.length + filters.selectedTypes.length;

  const contextValue: ProjectFilterContextType = useMemo(() => {
    return {
      // Filter state
      filters,
      setFilters,

      // Filtered data
      filteredProjects,

      // Available filter options
      availableTechnologies,
      availableStatuses,
      availableTypes,

      // Helper functions
      updateSearchTerm,
      toggleTechnology,
      toggleStatus,
      toggleType,
      clearAllFilters,

      // Utility getters
      hasActiveFilters,
      totalFilterCount,
      resultCount: filteredProjects.length,
      totalProjectCount: projects.length,
    };
  }, [filters, filteredProjects, availableTechnologies, availableStatuses, availableTypes, projects]);

  return <ProjectFilterContext.Provider value={contextValue}>{children}</ProjectFilterContext.Provider>;
}

// Custom hook to use the filter context
export function useProjectFilters() {
  const context = useContext(ProjectFilterContext);
  if (context === undefined) {
    throw new Error("useProjectFilters must be used within a ProjectFilterProvider");
  }
  return context;
}

// Optional: Custom hook for just the filtered projects (lighter dependency)
export function useProjectFiltersBasic() {
  if (!useProjectFilters) {
    throw new Error("useFilteredProjects must be used within a ProjectFilterProvider");
  }
  const { filteredProjects } = useProjectFilters();
  return filteredProjects;
}
