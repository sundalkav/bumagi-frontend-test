import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {


  @ViewChild('ulElement') ulElement!: ElementRef
  @ViewChild('liElement') liElement!: ElementRef
  @Output() onClickAll: EventEmitter<number> = new EventEmitter<number>();
  @Output() onClickBlock: EventEmitter<number> = new EventEmitter<number>();
  @Output() onClickActive: EventEmitter<number> = new EventEmitter<number>();
  idStatus: number = 100


  clickAll(ev: any): void {
    this.idStatus = 100
    this.onClickAll.emit(this.idStatus)
    this.activeClass(ev)
  }

  clickBlock(ev: any): void {
    this.idStatus = 2
    this.onClickBlock.emit(this.idStatus)
    this.activeClass(ev)
  }

  clickActive(ev: any): void {
    this.idStatus = 0
    this.onClickActive.emit(this.idStatus)
    this.activeClass(ev)
  }

  activeClass(ev: any) {
    this.ulElement?.nativeElement.querySelectorAll('li').forEach(
      (a: any) => a.classList.remove('active-li'))
    ev.target.classList.add('active-li')
  }

}
