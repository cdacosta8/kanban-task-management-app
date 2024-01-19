import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}
