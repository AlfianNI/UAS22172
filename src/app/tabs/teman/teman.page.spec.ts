import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TemanPage } from './teman.page';

describe('TemanPage', () => {
  let component: TemanPage;
  let fixture: ComponentFixture<TemanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TemanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
