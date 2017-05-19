import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';

import { AngularEchartsModule } from 'angular2-echarts';

import {
    BookService,
    BookPopupService,
    BookComponent,
    BookDetailComponent,
    BookDialogComponent,
    BookPopupComponent,
    BookDeletePopupComponent,
    BookDeleteDialogComponent,
    bookRoute,
    bookPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bookRoute,
    ...bookPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        AngularEchartsModule,
    ],
    declarations: [
        BookComponent,
        BookDetailComponent,
        BookDialogComponent,
        BookDeleteDialogComponent,
        BookPopupComponent,
        BookDeletePopupComponent,
    ],
    entryComponents: [
        BookComponent,
        BookDialogComponent,
        BookPopupComponent,
        BookDeleteDialogComponent,
        BookDeletePopupComponent,
    ],
    providers: [
        BookService,
        BookPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterBookModule {}
