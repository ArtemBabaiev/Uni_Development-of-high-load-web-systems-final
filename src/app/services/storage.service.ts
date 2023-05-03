import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) {
  }

  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public uploadImage(fileData: any, id: number) {
    let extension = fileData.name.split('.').pop()
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('image', fileData, id + '.' + extension);
    /* Image Post Request */
    this.http.post('http://localhost/save_image.php', myFormData, {
      headers: headers
    }).subscribe(data => {
      //Check success message
      console.log(data);
    });
  }
}
