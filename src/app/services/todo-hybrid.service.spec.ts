import { TestBed } from '@angular/core/testing';

import { TodoHybridService } from './todo-hybrid.service';

describe('TodoHybridService', () => {
  let service: TodoHybridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoHybridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
