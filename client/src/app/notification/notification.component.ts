import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uni-notification',
  template: `
    <div class="cont">
      <div class="msg">
        <button>x</button>
        <div class="left">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKuvjmj5syIRX22nP4OBMaQtR32ziUhaVOvXt7bYm&s"
            alt="">
        </div>
        <div class="right">
          <div class="title">
            Yaha pe title rakh
          </div>
          <div class="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  styles: [
    `
    .cont {
      width: 100vw;
      height: 100vh;
      position: relative;
      display: block;
      font-family: sans-serif;
    }

    .msg {
      width: 25vw;
      min-width: 350px;
      height: 5rem;
      max-height: 8rem;
      background-color: rgba(255, 255, 255, 0.4);
      border: 2px solid rgb(37, 204, 37, 0.3);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 15%;
      right: 2rem;
      border-radius: .8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .left {
      display: flex;
      align-items: center;
      width: 25%;
      justify-content: center;
      height: 100%;
      padding: 0.6rem;
      border-radius: .8rem;
    }

    img {
      float: left;
      height: 3rem;
      width: 3rem;
      border-radius: 100%;
    }

    .right {
      width: 75%;
      height: 100%;
      padding: 0.3rem 0.8rem;
      padding-left: 0;
      padding-left: 0;
      border-radius: .8rem;
      vertical-align: middle;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .title {
      font-size: .9rem;
      text-align: left;
      font-weight: bold;
      letter-spacing: 1px;
      height: 1rem;
    }

    .text {
      display: flex;
      font-size: .7rem;
      padding-top: 0.2rem;
      overflow: hidden;
    }

    button {
      height: 1.6rem;
      width: 1.6rem;
      color: black;
      border-radius: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      outline: 1px solid black;
      position: absolute;
      top: -.8rem;
      right: -.8rem;
      cursor: pointer;
      transition: 0.2s;
    }

    button:hover {
      background-color: white;
      outline: 1px solid rgba(0, 0, 0, 0.5);
      scale: 1.05;
      transition: 250ms;
    }

    button:active {
      scale: 0.95;
    }
    `
  ],
  imports: [
    CommonModule
  ]
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}