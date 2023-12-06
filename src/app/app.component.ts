import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
// import * as cv from 'opencv4nodejs';
// declare const cv = 'opencv4nodejs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'testbarcode';

  @ViewChild(BarcodeScannerLivestreamComponent) barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue: any;

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(data => {
      navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          console.log(videoDevices);

          // if(this.barcodeScanner.config.decoder !== undefined)
          //   this.barcodeScanner.config.decoder.readers = ['code_32_reader'];

          this.barcodeScanner.deviceId = videoDevices[1].deviceId;
          this.barcodeScanner.start();
        } else {
          console.error('No video devices found.');
        }
      })
      .catch(error => {
        console.error('Error enumerating devices:', error);
      });
    });

  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
    console.log(result);
  }

  onStarted(started: any) {
    console.log(started);
  }
}
