import { Component, OnInit } from '@angular/core';
import { Subject, Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-order-update-page',
  templateUrl: './delivery-order-update-page.component.html',
  styleUrls: ['./delivery-order-update-page.component.scss']
})
export class DeliveryOrderUpdatePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  subjectData1: string;
  subjectData2: string;
  observerData1: string;
  observerData2: string;
  vanillaSubject: string = '';
  behaviorSubject: string = '';
  replaySubject: string = '';

  myFunc() {
    const subject = new Subject();
    subject.subscribe(val => console.log('from sub', val));
    
    subject.pipe(
      map((num: any) => num * 3)
      ).subscribe(val => console.log('from sub2', val));
    
      subject.next(5);
      subject.next(25);
  }

  promiseFunc(){
    var promise = new Promise(resolve => {
     setTimeout(() => {
       resolve('Hallo mein Freund!');
       resolve('Hallo mein Freund!2');//1: lost
       resolve('Hallo mein Freund!3');//1: lost
     }, 200);
    })
    promise.then(val => {
      console.log('from promise: ', val);
    })
  }

  observerFunc(){
    var observable = new Observable(observer =>{
      setTimeout(() => {
        observer.next('Hello mine friend!')
        observer.next('Hello mine friend!2')//1: not lost in comparisson with promise
        observer.next('Hello mine friend!3')//1: --||--
      }, 200);
      setTimeout(() => {
        observer.next('Goodbye mine friend!')// 2: lost for sub1 (due to unsub), not lost for sub2
        observer.next('Goodbye mine friend!2')//2: --||--
        observer.next('Goodbye mine friend!3')//2: --||--
      }, 2000);
    });
    var sub1 = observable.subscribe(result => {
      console.log('from obsrvable(sub1): ', result);
    });
    setTimeout(() => {
      sub1.unsubscribe()
    }, 300);
    var sub2 = observable.subscribe(result => {
      console.log('from obsrvable(sub2): ', result);
    });
    setTimeout(() => {
      sub2.unsubscribe()
    }, 3000);
  }

  subjectFunc() {
    var subject = new Subject();
    subject.subscribe((result: string) => {
      this.subjectData1 = result;
    })
    subject.subscribe((result: string) => {
      this.subjectData2 = result; // same values as obsevers are the same
    })
    
    subject.next(Math.random());
  }

  observer2Func() {
    var observer = new Observable(observer =>
      {
        observer.next(Math.random())
      });
    observer.subscribe((result: string) => {
      this.observerData1 = result;// different values as observers are different
    })
    observer.subscribe((result: string) => {
      this.observerData2 = result;
    })
  }

  vanillaSubjectFunc() {
    var subject = new Subject();//doesn't keep before subscription values
    subject.next('1');
    subject.subscribe((result: string) => {
      this.vanillaSubject += '1st-' + result + ' ';
    })
    subject.next('2')
    subject.subscribe((result: string) => {
      this.vanillaSubject += '2nd ' + result + ' '; 
    })
    subject.next('3')
    
  }
  behaviorSubjectFunc() {//keps one previos cached before subscription
    var subject = new BehaviorSubject('1');
    subject.next('2');
    subject.subscribe((result: string) => {
      this.behaviorSubject += '1st-' + result + ' ';
    })
    subject.next('3')
    subject.subscribe((result: string) => {
      this.behaviorSubject += '2nd-' + result + ' '; 
    })
    subject.next('4')
  }

  replaySubjectFunc() {//keeps buffer-sized calls before subscription
    var subject = new ReplaySubject(3);
    subject.next('1');
    subject.next('2');
    subject.next('3');
    subject.next('4');
    subject.subscribe((result: string) => {
      this.replaySubject += '1st-' + result + ' ';
    })
    subject.next('5')
    subject.subscribe((result: string) => {
      this.replaySubject += '2nd-' + result + ' '; 
    })
    subject.next('6')
  }
}
