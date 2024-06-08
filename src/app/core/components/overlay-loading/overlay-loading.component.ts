import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-overlay-loading',
  standalone: true,
  imports: [],
  templateUrl: './overlay-loading.component.html',
  styleUrl: './overlay-loading.component.css'
})
export class OverlayLoadingComponent {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}
  
  ngOnInit(): void {
    this.loadingService.requestCountSubject.subscribe((count) => {
      this.isLoading = count > 0;
    });
  }
} 
