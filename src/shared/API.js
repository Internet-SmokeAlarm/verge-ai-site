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
    };

    getProject(id) {
        return fetch(`${global.config.api.baseUrl}/project/get/${this.props.match.params.id}`, {
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
        })
    }
}
