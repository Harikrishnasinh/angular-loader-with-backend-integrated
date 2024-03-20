import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadingValue: any;
  title = 'client';
  constructor(
    private mainService: MainService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.mainService.connect();
    this.mainService.getEventBehaviorSubject().subscribe((data: any) => {
      this.print(data);
      this.cdref.detectChanges();
    });
  }

  print(data: any) {
    if (typeof data == 'string') {
      let parsedJson = JSON.parse(data);
      this.loadingValue = parsedJson.loading;
    }
  }
  stopDataFetching() {
    this.mainService.stopEvent();
  }
  ngOnDestroy(): void {
    this.stopDataFetching;
  }
}
