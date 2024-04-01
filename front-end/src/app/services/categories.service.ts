import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: { title: string; description: string }[] = [
    {
      title: 'UI/UX Design',
      description: 'User Interface and User Experience Design',
    },
    {
      title: 'Graphic Design',
      description: 'Visual Communication and Problem-solving',
    },
    {
      title: 'Photography',
      description: 'Capturing Moments and Creating Visual Stories',
    },
    {
      title: 'Art',
      description: 'Creative Expression and Imagination',
    },
  ];

  getCategories(): any {
    return this.categories;
  }
}
