import { Component, ElementRef,  OnInit  } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 
    mario: any = document.querySelector('.mario');
    pipe: any = document.querySelector('.pipe');
    cloud: any= document.querySelector('.cloud');
    gameOver: any = document.querySelector('.game-over');
  

  constructor(private Elementref: ElementRef,
    public alertController: AlertController
  ) {}
  ngOnInit() {
    this.mario = this.Elementref.nativeElement.querySelector('.mario');
    document.addEventListener('keydown', this.jump.bind(this));
    this.pipe = document.querySelector('.pipe');
    this.detectCollision();
  }

  jump() {
    this.mario.classList.add('jump');
    setTimeout(() => {
      this.mario.classList.remove('jump');
    }, 600);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Game Over',
      message: 'Play Again?',
      buttons: ['restart']
    });

    await alert.present();
  }
  detectCollision() {
    setInterval(() => {
      let marioRect = this.mario.getBoundingClientRect();
      let pipeRect = this.pipe.getBoundingClientRect();
  
      let collisionBuffer = 10; // Ajuste este valor para alterar o tamanho do campo de colisão
  
      if (marioRect.x < pipeRect.x + pipeRect.width - collisionBuffer &&
          marioRect.x + marioRect.width > pipeRect.x + collisionBuffer &&
          marioRect.y < pipeRect.y + pipeRect.height - collisionBuffer &&
          marioRect.y + marioRect.height > pipeRect.y + collisionBuffer) {
            this.presentAlert();
      }
    }, 100);
  }

 
  



}


