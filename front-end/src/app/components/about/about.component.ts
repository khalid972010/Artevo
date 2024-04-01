import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const videoElement: HTMLVideoElement = this.elementRef.nativeElement.querySelector('#bg-video');
    this.renderer.setProperty(videoElement, 'autoplay', true);
    this.renderer.setProperty(videoElement, 'muted', true);
    this.renderer.setProperty(videoElement, 'loop', true);
    videoElement.play();
  }
}
