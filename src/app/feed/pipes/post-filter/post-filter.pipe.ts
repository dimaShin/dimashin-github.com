import { Pipe, PipeTransform } from '@angular/core';
import {Post} from '../../../shared/services/api/post.service';

@Pipe({
  name: 'postFilter'
})
export class PostFilterPipe implements PipeTransform {

  transform(posts: Post[], query: string): any {
    if (!query) {
      return posts;
    }

    return posts.filter(post => (post.body.includes(query) || post.title.includes(query)));
  }

}
