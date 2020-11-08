import { loadUserFromCache } from './auth';
import VergeAIAPI from '../API';

export async function loadProjectInformation(selectedProjectContext, forceReload) {
    if (selectedProjectContext.selectedProject === "") {
        return;
    }

    if (Object.keys(selectedProjectContext.project).length === 0
        || forceReload
        || selectedProjectContext.project["ID"] != selectedProjectContext.selectedProject) {
        const api = new VergeAIAPI(await loadUserFromCache());
        api.getProject(selectedProjectContext.selectedProject)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                selectedProjectContext.setProject(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
