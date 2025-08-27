import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";

import { Place } from "../place.model";
import { PlacesComponent } from "../places.component";
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-available-places",
  standalone: true,
  templateUrl: "./available-places.component.html",
  styleUrl: "./available-places.component.css",
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subcription = this.httpClient
      .get<{ places: Place[] }>("http://localhost:3000/places", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .subscribe({
        next: (res) => {
          this.places.set(res.places);
        },
        error: (error) => {
          console.error(error);
        },
      });

    this.destroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }
}
