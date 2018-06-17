import {PostService} from './post.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('test getPosts flow', () => {
  const posts = [{
    id: 1,
    userId: 1,
    title: 'TITLE 1',
    body: 'BODY 1',
  }, {
    id: 2,
    userId: 2,
    title: 'TITLE 2',
    body: 'BODY 2',
  }];
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  const masterService = new PostService(httpClientSpy);
  const stubValue = [...posts];

  httpClientSpy.get.and.returnValue(of(stubValue));

  it('get posts from http.get', () => {
    masterService.getPosts().subscribe(value => {
      expect(value).toEqual([posts[0]], 'service returned stub value');
      expect(httpClientSpy.get.calls.count()).toBe(1, 'fetch.get should be called');
      masterService.stopStream();
    });
  });

  it('should cache posts and start stream from the saved position', () => {
    masterService.getPosts().subscribe(value => {
      expect(value).toEqual([posts[0], posts[1]], 'service returned stub value');
      expect(httpClientSpy.get.calls.count()).toBe(1, 'fetch.get should be called');
      masterService.stopStream();
    });
  });

});
