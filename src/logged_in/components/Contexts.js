import React from "react";

export const SelectedProjectContext = React.createContext({
    selectedProject: "",
    setSelectedProject: () => {}
});

export const ProjectListContext = React.createContext({
    projects: {}
});
