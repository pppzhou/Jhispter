import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Book } from './book.model';
import { BookService } from './book.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-book',
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
books: Book[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private bookService: BookService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['book']);
    }

    loadAll() {
        this.bookService.query().subscribe(
            (res: Response) => {
                this.books = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBooks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Book) {
        return item.id;
    }
    registerChangeInBooks() {
        this.eventSubscriber = this.eventManager.subscribe('bookListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    public chartOption = {
             title: {
               text: '堆叠区域图'
             },
             tooltip : {
               trigger: 'axis'
             },
             legend: {
               data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
             },
             toolbox: {
               feature: {
                 saveAsImage: {}
               }
             },
             grid: {
               left: '3%',
               right: '4%',
               bottom: '3%',
               containLabel: true
             },
             xAxis : [
               {
                 type : 'category',
                 boundaryGap : false,
                 data : ['周一','周二','周三','周四','周五','周六','周日']
               }
             ],
             yAxis : [
               {
                 type : 'value'
               }
             ],
             series : [
               {
                 name:'邮件营销',
                 type:'line',
                 stack: '总量',
                 areaStyle: {normal: {}},
                 data:[120, 132, 101, 134, 90, 230, 210]
               },
               {
                 name:'联盟广告',
                 type:'line',
                 stack: '总量',
                 areaStyle: {normal: {}},
                 data:[220, 182, 191, 234, 290, 330, 310]
               },
               {
                 name:'视频广告',
                 type:'line',
                 stack: '总量',
                 areaStyle: {normal: {}},
                 data:[150, 232, 201, 154, 190, 330, 410]
               },
               {
                 name:'直接访问',
                 type:'line',
                 stack: '总量',
                 areaStyle: {normal: {}},
                 data:[320, 332, 301, 334, 390, 330, 320]
               },
               {
                 name:'搜索引擎',
                 type:'line',
                 stack: '总量',
                 label: {
                   normal: {
                     show: true,
                     position: 'top'
                   }
                 },
                 areaStyle: {normal: {}},
                 data:[820, 932, 901, 934, 1290, 1330, 1320]
               }
             ]
           }
}
