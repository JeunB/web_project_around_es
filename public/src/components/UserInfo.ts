export interface UserInfoSelectors {
  nameSelector: string;
  jobSelector: string;
}

export interface UserData {
  name: string;
  job: string;
}

export class UserInfo {
  private _nameElement: HTMLHeadingElement;
  private _jobElement: HTMLParagraphElement;

  constructor({
    nameSelector,
    jobSelector,}:
         UserInfoSelectors) {
    const nameElement =
      document.querySelector<HTMLHeadingElement>(
        nameSelector
      );

    const jobElement =
      document.querySelector<HTMLParagraphElement>(
        jobSelector
      );

    if (!nameElement) {
      throw new Error(
        `No se encontró el elemento: ${nameSelector}`
      );
    }

    if (!jobElement) {
      throw new Error(
        `No se encontró el elemento: ${jobSelector}`
      );
    }

    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  /*** Devuelve la información actual del usuario.*/
  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent ?? "",
      job: this._jobElement.textContent ?? "",
    };
  }

  /*** Actualiza la información del usuario.*/
  public setUserInfo(data: UserData): void {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}