import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponentHybridComponent } from './components/todo-component-hybrid/todo-component-hybrid.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponentHybridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (private upgrade: UpgradeModule) {}

  ngDoBootStrap() {
    console.log('Starting bootstrap...');
  }
}
