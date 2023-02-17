import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
const MINUTE = 60000;

@Component({
  selector: 'app-date',
  standalone: true,
  providers: [DatePipe],
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}
  TIMEZONE_DEVICE = new Date().getTimezoneOffset() / -60;
  TIMEZONE_SHOP = -5;
  TIMEZONE_CONVERSION = this.getTimezoneConversion();
  ngOnInit() {
    const d = new Date('2023-02-17T12:00');
    const shop_d = this.datePipe.transform(
      d.getTime() - this.TIMEZONE_CONVERSION,
      'full',
      `UTC ${this.TIMEZONE_SHOP >= 0 ? '+' : '-'}${String(
        Math.abs(this.TIMEZONE_SHOP)
      )
        .padClock()
        .join(':')}`
    );
    this.justLog(d, shop_d);
    this.shopDateISOToFE(d);
  }
  justLog(d: Date, shop_d: string) {
    console.log(d);
    console.log(shop_d);
    console.log('UTC form shop', this.shopDateISOToBE(d));
  }

  shopDateISOToBE(d: Date) {
    return new Date(d.getTime() - this.TIMEZONE_CONVERSION).toISOString();
  }
  shopDateISOToFE(d: Date) {
    console.log(this.shopDateISOToBE(d));
  }

  getTimezoneConversion() {
    const [int_TIMEZONE_SHOP = '0', dec_TIMEZONE_SHOP = '0'] =
      `${this.TIMEZONE_SHOP}`.padClock();
    const [int_TIMEZONE_DEVICE = '0', dec_TIMEZONE_DEVICE = '0'] =
      `${this.TIMEZONE_DEVICE}`.padClock();

    const CONVERSION =
      (+int_TIMEZONE_SHOP * 60 + +dec_TIMEZONE_SHOP) * MINUTE -
      (+int_TIMEZONE_DEVICE * 60 + +dec_TIMEZONE_DEVICE) * MINUTE;
    return CONVERSION;
  }
}
