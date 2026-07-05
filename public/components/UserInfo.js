export class UserInfo {
    _nameElement;
    _jobElement;
    constructor({ nameSelector, jobSelector, }) {
        const nameElement = document.querySelector(nameSelector);
        const jobElement = document.querySelector(jobSelector);
        if (!nameElement) {
            throw new Error(`No se encontró el elemento: ${nameSelector}`);
        }
        if (!jobElement) {
            throw new Error(`No se encontró el elemento: ${jobSelector}`);
        }
        this._nameElement = nameElement;
        this._jobElement = jobElement;
    }
    /*** Devuelve la información actual del usuario.*/
    getUserInfo() {
        return {
            name: this._nameElement.textContent ?? "",
            job: this._jobElement.textContent ?? "",
        };
    }
    /*** Actualiza la información del usuario.*/
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.job;
    }
}
