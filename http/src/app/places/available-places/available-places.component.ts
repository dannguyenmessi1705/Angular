import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";

import { Place } from "../place.model";
import { PlacesComponent } from "../places.component";
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { PlacesService } from "../places.service";

@Component({
  selector: "app-available-places",
  standalone: true,
  templateUrl: "./available-places.component.html",
  styleUrl: "./available-places.component.css",
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal<boolean>(true);
  errorMsg = signal<string | null>(null);
  private placeService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subcription = this.placeService.loadAvailablePlaces().subscribe({
      next: (places) => {
        this.places.set(places);
      },
      error: (error: Error) => {
        console.error(error.message); // msg lỗi chính từ chỗ ném lỗi ở catchError
        this.errorMsg.set(error.message);
      },
      complete: () => {
        this.isFetching.update(() => false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subcription = this.placeService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => console.log(resData),
      });

    this.destroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }
}
