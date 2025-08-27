import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";

import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { Place } from "../place.model";
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { PlacesService } from "../places.service";

@Component({
  selector: "app-user-places",
  standalone: true,
  templateUrl: "./user-places.component.html",
  styleUrl: "./user-places.component.css",
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal<boolean>(true);
  errorMsg = signal<string | null>(null);
  private placeService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = this.placeService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadUserPlaces().subscribe({
      error: (error: Error) => {
        console.error(error);
        this.errorMsg.set(error.message);
        this.isFetching.set(false);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRemovePlace(place: Place) {
    const sub = this.placeService.removeUserPlace(place).subscribe({
      next: (resData) => console.log(resData),
      error: (error) => console.error(error),
    });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
