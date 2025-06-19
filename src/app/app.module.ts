import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoHybridComponent } from './components/todo-hybrid/todo-hybrid.component';
import { FormsModule } from '@angular/forms';

declare var angular: any;

@NgModule({
  declarations: [
    AppComponent,
    TodoHybridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    console.log('Starting bootstrap...');
  }
}
