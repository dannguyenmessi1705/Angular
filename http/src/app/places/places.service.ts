import { inject, Injectable, signal } from "@angular/core";

import { Place } from "./place.model";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/places",
      "Failed to fetch places"
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/user-places",
      "Failed to fetch user places"
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces(); // Lưu trữ danh sách địa điểm trước đó

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.update((prev) => [...prev, place]);
    } // Nếu địa điểm chưa tồn tại trong danh sách, thêm nó vào

    return this.httpClient
      .put("http://localhost:3000/user-places", {
        placeId: place.id,
      })
      .pipe(
        catchError((err) => {
          this.userPlaces.set(prevPlaces); // Khôi phục lại danh sách địa điểm trước đó nếu có lỗi
          return throwError(
            () => new Error("Failed to add place to user places")
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces(); // Lưu trữ danh sách địa điểm trước đó

    this.userPlaces.update((prev) => prev.filter((p) => p.id !== place.id)); // Xóa địa điểm khỏi danh sách

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((err) => {
          this.userPlaces.set(prevPlaces); // Khôi phục lại danh sách địa điểm trước đó nếu có lỗi
          return throwError(() => new Error("Failed to remove place from user places"));
        })
      );
  }

  private fetchPlaces(url: string, errorMsg: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .pipe(
        map((res) => res.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMsg)); // ném ra lỗi
        })
      );
  }
}
