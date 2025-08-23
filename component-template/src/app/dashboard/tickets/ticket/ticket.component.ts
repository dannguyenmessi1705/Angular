import {
  Component,
  input,
  output,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { type Ticket } from "../ticket.modal";

@Component({
  selector: "app-ticket",
  standalone: true,
  imports: [],
  templateUrl: "./ticket.component.html",
  styleUrl: "./ticket.component.css",
})
export class TicketComponent {
  data = input.required<Ticket>();
  close = output();
  detailsVisible = signal(false);

  onToggleDetails() {
    this.detailsVisible.update((prev) => !prev);
  }

  onMarkAsClosed() {
    this.close.emit();
  }
}
