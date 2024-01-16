import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { IState } from '@core/interfaces';
import { rootReducersInjector } from '@core/reducers';
import { LayoutCommonModule } from './layout-common/layout-common.module';
import { TaskEffects } from '@core/effects/task.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot<IState>(rootReducersInjector, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    LayoutCommonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
