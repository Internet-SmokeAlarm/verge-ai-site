import React from "react";

export const SelectedProjectContext = React.createContext({
    selectedProject: "",
    setSelectedProject: () => {}
});

export const ProjectListContext = React.createContext({
    projects: {}
});

export const TabContext = React.createContext({
    value: 0
});
