import '../config.js';

export default class VergeAIAPI {
    constructor(user) {
        this.user = user;
        this.jwt = user.signInUserSession.accessToken.jwtToken;
    }

    createProject(name, description) {
        return fetch(`${global.config.api.baseUrl}/project/create`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({"project_name": name, "project_description": description})
        });
    }

    loadProjects() {
        return fetch(`${global.config.api.baseUrl}/user/get`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
    }

    createExperiment(name, project_id) {
        return fetch(`${global.config.api.baseUrl}/experiment/create`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({"project_id": project_id, "experiment_name": name})
        });
    }

    getProject(id) {
        return fetch(`${global.config.api.baseUrl}/project/get/${id}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
    }

    createJob(project_id, experiment_id, numDevices, numBackupDevices, numJobs, deviceSelectionStrategy, terminationCriteria) {
        return fetch(`${global.config.api.baseUrl}/job/create`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "project_id": project_id,
                "experiment_id": experiment_id,
                "num_devices": parseInt(numDevices),
                "num_backup_devices": parseInt(numBackupDevices),
                "device_selection_strategy": deviceSelectionStrategy,
                "termination_criteria": terminationCriteria,
                "num_jobs": numJobs
            })
        });
    }

    registerDevice(project_id, numDevices) {
        return fetch(`${global.config.api.baseUrl}/device/create`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Authorization': this.jwt,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                "project_id": project_id,
                "num_devices": parseInt(numDevices)
            })
        });
    }
}
