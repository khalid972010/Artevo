import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: { title: string; description: string }[] = [
    {
      title: 'UI/UX',
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

  private static selectedChoices: string[] = [];

  getCategories(): { title: string; description: string }[] {
    return this.categories;
  }

  setSelectedChoice(title: string) {
    const index = CategoriesService.selectedChoices.indexOf(title);
    if (index !== -1) {
      CategoriesService.selectedChoices.splice(index, 1);
    } else {
      CategoriesService.selectedChoices.push(title);
    }
  }

  getSelectedChoices(): string[] {
    return CategoriesService.selectedChoices;
  }
}
