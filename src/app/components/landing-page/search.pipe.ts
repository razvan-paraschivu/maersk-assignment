import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], value: any): any[] {
        if (!items) return [];
        if (!value || value.length === 0) return items;
        return items.filter(it => (it['name'].includes(value)));
      }
}